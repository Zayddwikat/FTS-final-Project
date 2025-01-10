import { useLocation } from "react-router-dom";

import { Snackbar } from "@mui/material";
import { useState } from "react";
import { useHotelContext } from "../../context/hotelContext";
import { useSnakeBar } from "../../hooks/useSnakBar";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../../login/loginForm/loginButton";
import { hotelObject } from "../cityInformationDrawer";
import { DrawerDrawer } from "../drawer";
import { AddHotelDialog } from "../addHotelDialog";

export const AllHotelsPage: React.FC<any> = () => {
  const { hotels, handleGetallHotels } = useHotelContext();

  console.log(hotels);

  const { action, handleCloseSnackBar, openSnackBar, setOpenSnackBar } =
    useSnakeBar();
  const [massage, setMassage] = useState<string>("");

  const [addHotelDialog, setAddHotelDialog] = useState<boolean>(false);

  const [pageNum, setPageNum] = useState<number>(0);

  const handleOpenAddDialog = () => {
    setAddHotelDialog(true);
  };
  const handleCloseAddDialog = () => {
    setAddHotelDialog(false);
  };

  const handleConfirmAdding = () => {
    setOpenSnackBar(true);
    setMassage("Successfully adding new city");
  };
  const hotelsQuery = useQuery({
    queryKey: ["hotels", pageNum],
    queryFn: async () => {
      return await handleGetallHotels("", "", 1000000, pageNum + 1);
    },
  });
  console.log(hotelsQuery.data);
  const itemsPerPage = 11;
  const totalPages = Math.ceil(hotels.length / itemsPerPage);
  var data = hotels.slice(pageNum * itemsPerPage, (pageNum + 1) * itemsPerPage);

  return (
    <div className="w-full self-start ">
      <div className="self-start flex flex-row items-center justify-between w-full">
        <h1 className="self-start mx-6 text-2xl">Table of Hotels</h1>
      </div>
      <div className="flex flex-col items-start justify-between h-[85dvh]">
        <table className="self-start  w-full bg-white block ml-10 my-10 border-collapse border border-gray-300 text-start overflow-y-auto table-fixed">
          <thead className="border bg-white w-full sticky top-0 z-10">
            <tr className="border">
              <th className="border w">Index</th>
              <th className="border  w-[15%] ">Hotel Name</th>
              <th className="border  w-[50%]">Hotel Description</th>
              <th className="border  w-[10%]">Hotel star Rating</th>
              <th className="border  w-[15%] ">Hotel info</th>
            </tr>
          </thead>

          {data.map((hotel: hotelObject, index: number) => {
            return (
              <tbody className="border p-2">
                <tr className="border " key={index}>
                  <td className="border p-2 ">{index}</td>
                  <td className="border ">{hotel.name}</td>
                  <td className="border truncate line-clamp-1 p-2  w-[50dvw]  ">
                    <p className="w-[95%] line-clamp-1">{hotel.description}</p>
                  </td>
                  <td className=" border text-center">
                    {hotel.starRating * 2}
                  </td>
                  <DrawerDrawer
                    setMassage={setMassage}
                    city={undefined}
                    hotel={hotel}
                    setOpenSnakeBar={setOpenSnackBar}
                  />
                </tr>
              </tbody>
            );
          })}
        </table>
        <div className="flex justify-end self-end mb-4">
          <button
            className={`px-3 py-1 mx-1 ${
              pageNum === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-400"
            }`}
            onClick={() => pageNum > 0 && setPageNum(pageNum - 1)}
            disabled={pageNum === 0}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <a
              key={index}
              onClick={() => setPageNum(index)}
              className={`px-3 py-1 mx-1 cursor-pointer ${
                pageNum === index
                  ? "text-white bg-blue-500 rounded"
                  : "text-blue-400"
              }`}
            >
              {index + 1}
            </a>
          ))}

          <button
            className={`px-3 py-1 mx-1 ${
              pageNum === totalPages - 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-400"
            }`}
            onClick={() => pageNum < totalPages - 1 && setPageNum(pageNum + 1)}
            disabled={pageNum === totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message={massage}
        action={action}
      />
    </div>
  );
};
