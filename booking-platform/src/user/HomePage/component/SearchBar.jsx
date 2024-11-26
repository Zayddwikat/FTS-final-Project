import { useFormik } from "formik";
// import ReactStars from "react-rating-stars-component";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useSearchContext } from "../../Context/SearchContextApi";
import { useNavigate } from "react-router-dom";
import Button from "../../../Login/component/LoginButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState } from "react";
import PopOver from "./PopOverCalender";
import BedIcon from "@mui/icons-material/Bed";
import PersonIcon from "@mui/icons-material/Person";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export default function SearchBar() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [calenderOption, setCalenderOption] = useState(null);
  const [roomOptions, setRoomOption] = useState(null);

  // const openCalenderOption = Boolean(calenderOption);
  // const idCalenderOption = openCalenderOption ? "simple-popover" : undefined;

  const handleCalenderOption = (event) => {
    setCalenderOption(event.currentTarget);
  };

  const handleClosePopOverCalender = () => {
    console.log("Button Clicked");
    setCalenderOption(null); // Reset anchor element to null to close the popover
  };

  const openRoomsOption = Boolean(roomOptions);
  const idRoomsOption = openRoomsOption ? "simple-popover" : undefined;

  const handleRoomElement = (event) => {
    setRoomOption(roomOptions ? null : event.currentTarget);
  };
  const handleClosePopOverRooms = () => {
    setRoomOption(null); // Reset anchor element to null to close the popover
  };

  const navigation = useNavigate();

  const { onSearch, searchResult, setSearchResult } = useSearchContext();

  //   const [rooms, setRoomsNum] = useState(1);
  //   const [startRate, setStarRate] = useState(0);
  const formik = useFormik({
    initialValues: {
      adult: 2,
      children: 0,
      city: "",
      rooms: 1,
      CheckIn: new Date().toISOString().split("T")[0],
      CheckOut: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      Rate: 4,
    },
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      const data = await onSearch({
        adults: values.adult,
        childrenWithAdults: values.children,
        city: values.city,
        numOfRooms: values.rooms,
        checkIn: values.CheckIn,
        checkOut: values.CheckOut,
        starRate: 4,
      });

      console.table(data);
      setSearchResult(data);
      alert(JSON.stringify(searchResult));

      if (data) {
        // <SearchResult values={searchResult} />;
        navigation("/searchResult");
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
                label="Basic date picker"
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
                label="Basic date picker"
              />
            </DemoContainer>
          </LocalizationProvider>
          {formik.touched.CheckOut && formik.errors.CheckOut ? (
            <div className="error">{formik.errors.CheckOut}</div>
          ) : null}
        </div>
      </main>

      <Button
        size="small"
        color="orange"
        value="Done"
        handleClick={() => handleClosePopOverCalender()}
      />
    </div>
  );
  const roomsChildrenAdult = (
    <>
      <div className=" w-full flex items-center my-2 gap-2">
        <div className="flex flex-row items-center gap-2  px-2 ">
          <label htmlFor="numberOfRooms">Rooms</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.rooms}
            className="w-2/12 bg-transparent"
            name="rooms"
            id="numberOfRooms"
          />
          <div className="flex flex-col">
            <button type="button">
              <ArrowUpwardIcon
                fontSize="small"
                onClick={() => {
                  formik.setFieldValue("rooms", formik.values.rooms + 1);
                }}
              />
            </button>
            <button type="button">
              <ArrowDownwardIcon
                fontSize="small"
                onClick={() => {
                  if (formik.values.rooms > 1)
                    formik.setFieldValue("rooms", formik.values.rooms - 1);
                }}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-2 items-start">
        <div className="flex flex-col">
          <label htmlFor="adult" className="text-sm">
            Adults
          </label>
          <input
            onChange={formik.handleChange}
            className="rounded p-2 border border-black w-11/12"
            type="number"
            name="adult"
            id="adult"
            min={0}
            value={formik.values.adult}
            placeholder="Adults Number"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="children" className="text-sm">
            Children
          </label>
          <input
            onChange={formik.handleChange}
            className="rounded p-2 border border-black w-11/12"
            type="number"
            name="children"
            id="children"
            value={formik.values.children}
            min={0}
            placeholder="Children Number"
          />
        </div>
      </div>
    </>
  );
  const CheckInCheckOutComponent = (
    <TextField
      onClick={handleCalenderOption}
      className="bg-white w-[30%] text-field"
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
              <CalendarMonthIcon />
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
        className="bg-white w-[30%] text-field"
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
    <main className="flex flex-row flex-wrap items-center mx-8 justify-center">
      <form
        className="flex flex-row flex-wrap lg:w-[70dvw] md:w-[70dvw] items-start justify-start  border border-black rounded-md  m-4"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          className="bg-white w-[30%]"
          disabled={true}
          placeholder="City"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BedIcon />
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

        <Button size="thick" value="Search" color="orange" />
      </form>
    </main>
  );
}
