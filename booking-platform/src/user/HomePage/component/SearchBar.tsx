import { useFormik, FormikHelpers } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import BedIcon from "@mui/icons-material/Bed";
import * as Yup from "yup";
import { Button } from "../../../login/component/loginButton";
import { PopOver } from "./popOverCalender";
import { searchResult } from "../../hooks/searchHook";
import { CheckInCheckOutSection } from "./SearchBar/component/checkInCheckOut";
import { RoomsAdultChildrenSection } from "./SearchBar/component/roomInfo";

// Types for form data
interface SearchFormData {
  adult: number;
  children: number;
  city: string;
  rooms: number;
  CheckIn: string;
  CheckOut: string;
  Rate: number;
}

// Initial values and validation schema
const INITIAL_VALUES: SearchFormData = {
  adult: 2,
  children: 0,
  city: "",
  rooms: 1,
  CheckIn: new Date().toISOString().split("T")[0],
  CheckOut: new Date(Date.now() + 86400000).toISOString().split("T")[0],
  Rate: 4,
};

const validationSchema = Yup.object({
  adult: Yup.number().min(2, "At least two adults are required").required(),
  children: Yup.number().min(0).required(),
  rooms: Yup.number().min(1, "At least one room is required").required(),
  CheckIn: Yup.date().required("Check-in date is required"),
  CheckOut: Yup.date()
    .min(Yup.ref("CheckIn"), "Check-out date cannot be before check-in date")
    .required("Check-out date is required"),
  Rate: Yup.number().min(1).max(5).required(),
});

interface SearchBarProps {
  data: Partial<SearchFormData> | undefined;
  cityTextField: boolean;
  searchValues: Partial<SearchFormData>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  data,
  cityTextField,
  searchValues,
}) => {
  const [calenderOption, setCalenderOption] = useState<HTMLElement | null>(
    null
  );
  const [roomOptions, setRoomOption] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  const formik = useFormik<SearchFormData>({
    initialValues: {
      ...INITIAL_VALUES,
      ...data,
      ...searchValues,
    },
    validationSchema,
    onSubmit: async (
      values: SearchFormData,
      { setSubmitting }: FormikHelpers<SearchFormData>
    ) => {
      const searchData = await searchResult({
        adults: values.adult,
        childrenWithAdults: values.children,
        city: values.city,
        numOfRooms: values.rooms,
        checkIn: values.CheckIn,
        checkOut: values.CheckOut,
        starRate: values.Rate,
      });
      if (searchData) {
        navigate("/search-result", {
          state: { data: searchData, valuesOfSearchBar: values },
        });
      }
      setSubmitting(false);
    },
  });

  return (
    <main className="flex flex-wrap items-center justify-center m-2 w-full">
      <form
        className="flex flex-wrap items-center justify-center w-full lg:w-[80%] border-4 border-yellow-300 rounded-md m-4 gap-2 p-4"
        onSubmit={formik.handleSubmit}
      >
        {/* City TextField */}
        {cityTextField && (
          <TextField
            name="city"
            onChange={formik.handleChange}
            className="bg-white w-full sm:w-[40%] md:w-[25%] lg:w-[20%] mb-4 sm:mb-0"
            placeholder={formik.values.city || "City"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BedIcon fontSize="large" />
                </InputAdornment>
              ),
            }}
          />
        )}

        {/* Date TextField */}
        <TextField
          onClick={(event) => setCalenderOption(event.currentTarget)}
          className="bg-white w-full sm:w-[40%] md:w-[35%] lg:w-[25%] text-field mb-4 sm:mb-0"
          disabled
          placeholder={`In ${formik.values.CheckIn} --- Out ${formik.values.CheckOut}`}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon fontSize="large" />
              </InputAdornment>
            ),
          }}
        />

        {/* PopOver for Calendar */}
        <PopOver
          anchorElement={calenderOption}
          setAnchorElement={() => setCalenderOption(null)}
          position="below"
        >
          <CheckInCheckOutSection
            formik={formik}
            handleClose={() => setCalenderOption(null)}
          />
        </PopOver>

        {/* Room Options */}
        <TextField
          onClick={(event) => setRoomOption(event.currentTarget)}
          className={`bg-white w-full sm:w-[40%] md:w-[35%] lg:w-[25%] text-field`}
          disabled
          placeholder={`${formik.values.adult} adult - ${formik.values.children} children - ${formik.values.rooms} rooms`}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon fontSize="large" />
              </InputAdornment>
            ),
          }}
        />

        {/* PopOver for Rooms */}
        <PopOver
          anchorElement={roomOptions}
          setAnchorElement={() => setRoomOption(null)}
          position="below"
        >
          <RoomsAdultChildrenSection formik={formik} />
        </PopOver>

        {/* Search Button */}
        <Button
          color="primary"
          size="large" // or any suitable size for the button
          value="Search"
          isSubmitting={formik.isSubmitting}
          handleClick={formik.handleSubmit}
          className="w-full sm:w-auto px-6 py-2 text-base sm:text-lg md:text-xl font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all duration-300"
          primary={true}
        />
      </form>
    </main>
  );
};
