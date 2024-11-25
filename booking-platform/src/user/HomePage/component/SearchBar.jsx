import { useFormik } from "formik";
// import ReactStars from "react-rating-stars-component";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState } from "react";
import { useSearchContext } from "../../Context/SearchContextApi";
import { useNavigate } from "react-router-dom";
import SearchResult from "./SearchResult";
import Deals from "./Deals";

export default function SearchBar() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const [rate, setRate] = useState(0);

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
  return (
    <main className="flex flex-col flex-wrap items-center justify-center">
      <form
        className="flex flex-row flex-wrap lg:w-[25dvw] md:w-[40dvw] items-start justify-start gap-2 border border-black rounded-md p-2 m-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col  items-start ">
          <label className="text-sm" htmlFor="CheckIn">
            Check-in
          </label>
          <input
            className="rounded p-2 border border-black"
            type="date"
            id="CheckIn"
            name="CheckIn"
            placeholder="Check-in"
            value={formik.values.CheckIn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.CheckIn && formik.errors.CheckIn ? (
            <div className="error">{formik.errors.CheckIn}</div>
          ) : null}
        </div>

        <div className="flex flex-col  items-start ">
          <label className="text-sm" htmlFor="CheckOut">
            Check-out
          </label>
          <input
            className="rounded p-2 border border-black"
            type="date"
            id="CheckOut"
            name="CheckOut"
            placeholder="Check-out"
            value={formik.values.CheckOut}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.CheckOut && formik.errors.CheckOut ? (
            <div className="error">{formik.errors.CheckOut}</div>
          ) : null}
        </div>

        <div className=" w-full flex items-center my-2 gap-2">
          <input
            className="p-2  rounded border border-black"
            type="text"
            placeholder="City"
            name="city"
            onChange={formik.handleChange}
          />
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

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
