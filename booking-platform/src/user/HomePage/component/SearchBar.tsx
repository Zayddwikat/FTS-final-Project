import { useFormik } from "formik";
// import ReactStars from "react-rating-stars-component";
import { useSearchContext } from "../../Context/SearchContextApi";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../Login/component/LoginButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState } from "react";
import { PopOver } from "./PopOverCalender";
import BedIcon from "@mui/icons-material/Bed";
import PersonIcon from "@mui/icons-material/Person";
import { StepperTextInput } from "./StepperTextInput";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

interface DataObjectInfo {
  adult: number;
  children: number;
  city: string;
  rooms: number;
  CheckIn: Date;
  CheckOut: Date;
  Rate: number;
}
interface SearchBarProps {
  data: DataObjectInfo;
}

export const SearchBar: React.FC<SearchBarProps> = ({ data }) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [calenderOption, setCalenderOption] =
    useState<HTMLButtonElement | null>(null);
  const [roomOptions, setRoomOption] = useState<HTMLButtonElement | null>(null);

  const handleCalenderOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCalenderOption(event.currentTarget);
  };

  const handleClosePopOverCalender = () => {
    console.log("Button Clicked");
    setCalenderOption(null);
  };

  const openRoomsOption = Boolean(roomOptions);
  const idRoomsOption = openRoomsOption ? "simple-popover" : undefined;

  const handleRoomElement = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRoomOption(roomOptions ? null : event.currentTarget);
  };
  const handleClosePopOverRooms = () => {
    setRoomOption(null);
  };

  const navigation = useNavigate();

  const { onSearch, setSearchResult } = useSearchContext();

  //   const [rooms, setRoomsNum] = useState(1);
  //   const [startRate, setStarRate] = useState(0);
  const formik = useFormik({
    initialValues: {
      adult: data?.adult ?? 2,
      children: data?.children ?? 0,
      city: data?.city ?? "",
      rooms: data?.rooms ?? 1,
      CheckIn: data?.CheckIn ?? new Date().toISOString().split("T")[0],
      CheckOut:
        data?.CheckOut ??
        new Date(Date.now() + 86400000).toISOString().split("T")[0],
      Rate: data?.Rate ?? 4,
    },

    onSubmit: async (values) => {
      const searchData = await onSearch({
        adults: values.adult,
        childrenWithAdults: values.children,
        city: values.city,
        numOfRooms: values.rooms,
        checkIn: values.CheckIn,
        checkOut: values.CheckOut,
        starRate: values.Rate,
      });

      console.table(searchData);
      setSearchResult(searchData);
      if (searchData) {
        navigation("/search-result", {
          state: {
            data: searchData,
            valuesOfSearchBar: values,
          },
        });
      }
    },
  });
  const checkInCheckOut = (
    <div className="flex flex-col gap-4">
      <main>
        <div className="flex flex-col  items-start ">
          <label className="text-sm" htmlFor="CheckIn">
            Check-in
          </label>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                onChange={(newValue) =>
                  formik.setFieldValue(
                    "CheckIn",
                    new Date(newValue + 86400000).toISOString().split("T")[0]
                  )
                }
                label="Check IN"
              />
            </DemoContainer>
          </LocalizationProvider>

          {formik.touched.CheckIn && formik.errors.CheckIn ? (
            <div className="error">{formik.errors.CheckIn}</div>
          ) : null}
        </div>

        <div className="flex flex-col  items-start ">
          <label className="text-sm" htmlFor="CheckOut">
            Check-out
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                onChange={(newValue) =>
                  formik.setFieldValue(
                    "CheckOut",
                    new Date(newValue + 86400000).toISOString().split("T")[0]
                  )
                }
                label="Check Out"
              />
            </DemoContainer>
          </LocalizationProvider>
          {formik.touched.CheckOut && formik.errors.CheckOut ? (
            <div className="error">{formik.errors.CheckOut}</div>
          ) : null}
        </div>
      </main>
      <div className="flex flex-row items-center justify-center">
        <Button
          size="thick"
          color="blue"
          value="Done"
          handleClick={() => handleClosePopOverCalender()}
        />
      </div>
    </div>
  );
  const roomsChildrenAdult = (
    <main>
      <div className="flex flex-row gap-2 items-start justify-between">
        <StepperTextInput elem="adult" formik={formik} />
        <StepperTextInput elem="children" formik={formik} />
      </div>

      <div className=" w-full flex items-center my-2 gap-2">
        <StepperTextInput elem="room" formik={formik} />
        <StepperTextInput elem="Rate" formik={formik} />
      </div>
    </main>
  );
  const CheckInCheckOutComponent = (
    <TextField
      onClick={handleCalenderOption}
      className="bg-white w-full md:w-[30%] text-field"
      disabled={true}
      placeholder={
        "In " +
        formik.values.CheckIn +
        "  " +
        "---" +
        " Out " +
        formik.values.CheckOut
      }
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <CalendarMonthIcon fontSize="large" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
  const adultRoomsComponent = (
    <>
      <TextField
        onClick={handleRoomElement}
        aria-describedby={idRoomsOption}
        className="bg-white w-full md:w-[30%] text-field"
        disabled={true}
        placeholder={
          formik.values.adult +
          " adult - " +
          formik.values.children +
          " children - " +
          formik.values.rooms +
          " rooms "
        }
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon fontSize="large" />
              </InputAdornment>
            ),
          },
        }}
      />
    </>
  );

  return (
    <main className="flex flex-row flex-wrap w-full items-center mx-8 justify-center">
      <form
        className="flex md:flex-row flex-col w-full  flex-wrap lg:w-[80dvw] md:w-[80dvw] p-1 gap-1 md:items-start md:justify-start border border-black rounded-md m-4 items-center justify-center"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          name="city"
          onChange={formik.handleChange}
          className="bg-white w-full md:w-[30%]"
          placeholder={formik.values.city || "City"}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BedIcon fontSize="large" />
                </InputAdornment>
              ),
            },
          }}
        />
        <>
          {CheckInCheckOutComponent}
          <PopOver
            anchorElement={calenderOption}
            setAnchorElement={handleClosePopOverCalender}
          >
            {checkInCheckOut}
          </PopOver>
        </>
        <>
          {adultRoomsComponent}
          <PopOver
            anchorElement={roomOptions}
            setAnchorElement={handleClosePopOverRooms}
          >
            {roomsChildrenAdult}
          </PopOver>
        </>

        <Button
          handleClick={() => {}}
          isSubmitting={false}
          size="thick"
          className="self-stretch md:self-stretch lg:self-stretch"
          value="Search"
          color="blue"
        />
      </form>
    </main>
  );
};
