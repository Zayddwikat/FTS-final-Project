import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../login/loginForm/loginButton";
import { AddRoomDialog } from "./addNewRoom/addRoomDialog";
import { useSnakeBar } from "../hooks/useSnackBar";
import { hotelObject } from "../cityPage/cityDrawer/cityInformationDrawer";
import { RoomDrawer } from "./roomDrawer/roomDrawer";
import { Snackbar } from "@mui/material";
import { roomInformation } from "../../data_models/roomInformation";
import { AdminSearch } from "../component/adminSearchBar";
import { useRoomContext } from "./context/roomContext";

export const HotelRooms: React.FC = () => {
  const { state } = useLocation();
  const { getRooms, rooms } = useRoomContext();

  const [pageNum, setPageNum] = useState<number>(0);

  const [addRoomDialog, setAddRoomDialog] = useState<boolean>(false);
  const [massage, setMassage] = useState<string>("");
  const { action, handleCloseSnackBar, openSnackBar, setOpenSnackBar } =
    useSnakeBar();

  const handleOpenAddDialog = () => {
    setAddRoomDialog(true);
  };
  const handleCloseAddDialog = () => {
    setAddRoomDialog(false);
  };

  const handleConfirmAdding = () => {
    setOpenSnackBar(true);
    setMassage("Successfully adding new Room");
  };

  const hotel = state.hotel as hotelObject;

  console.table(hotel);

  
  const checkIn = new Date().toISOString().split("T")[0];
  const checkOut = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split("T")[0];

  const roomQuery = useQuery({
    queryKey: ["rooms", hotel.id, checkIn, checkOut],
    queryFn: () =>
      getRooms({
        checkIn,
        checkOut,
        hotel,
      }),
  });

  const itemsPerPage = 7;
  const totalPages = Math.ceil(rooms.length / itemsPerPage);
  const data = rooms.slice(
    pageNum * itemsPerPage,
    (pageNum + 1) * itemsPerPage
  );
  console.log("the Data is : ", data);

  if (roomQuery.isLoading) {
    return <div>Loading available rooms...</div>;
  }

  if (roomQuery.isError) {
    return <div>Error fetching rooms. Please try again later.</div>;
  }

  return (
    <main className="w-auto flex-1 flex flex-col items-center justify-center my-4">
      <header className="  ">
        <AdminSearch />
      </header>

      <div className="self-start flex flex-row items-center justify-between w-full">
        <h1 className="self-start mx-6 text-2xl">
          Table of Room in {hotel.name}
        </h1>
        <Button
          color={""}
          size={""}
          value={"Add Room"}
          isSubmitting={false}
          handleClick={handleOpenAddDialog}
          className={""}
          children={undefined}
          primary={true}
        />
        <AddRoomDialog
          open={addRoomDialog}
          handleClose={handleCloseAddDialog}
          handleConfirm={handleConfirmAdding}
          setOpenSnackBar={setOpenSnackBar}
          label="Hotel"
          hotel={hotel}
        />
      </div>
      <table className="self-start  w-11/12 bg-white h-[70dvh] block ml-10 my-10 border-collapse border border-gray-300 text-start overflow-y-auto">
        <thead className="border bg-white w-full sticky top-0 z-10">
          <tr className="border">
            <th className="border w-[5%]">Room ID</th>
            <th className="border  w-[5%] ">Room Number</th>
            <th className="border  w-[10%]">Room Type</th>
            <th className="border  w-[10%]">Price</th>
            <th className="border  w-[30%] ">Room Amenities</th>
            <th className="border  w-[20%] ">Room Capacity</th>
            <th className="border  w-[10%] ">Room Availability</th>
            <th className="border  w-[10%] ">Show more</th>
          </tr>
        </thead>

        {data.map((room: roomInformation, index: number) => {
          return (
            <tbody className="border p-2">
              <tr className="border " key={index}>
                <td className="border p-2 ">{room?.roomId}</td>
                <td className="border p-2 ">{room?.roomNumber}</td>
                <td className="border ">{room?.roomType}</td>
                <td className=" border text-center">{room?.price}</td>
                <td className=" border ">
                  <ul className="mx-2">
                    {room?.roomAmenities?.slice(0, 3).map((amenity, index) => {
                      return <li key={index}>{amenity.name}</li>;
                    })}
                  </ul>
                </td>
                <td className=" border">
                  <p>Capacity of Adult : {room?.capacityOfAdults}</p>
                  <p>Capacity of children : {room?.capacityOfChildren}</p>
                </td>
                <td className=" text-center p-6 truncate line-clamp-1 ">
                  <p>{room?.availability ? "Available" : "Not Available"}</p>
                </td>
                <td>
                  <RoomDrawer
                    setMassage={setMassage}
                    room={room}
                    hotel={hotel}
                    setOpenSnakeBar={setOpenSnackBar}
                  />
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <div className="flex justify-center self-end mb-4">
        <button
          className={`px-3 py-1 mx-1 ${
            pageNum === 0 ? "text-gray-400 cursor-not-allowed" : "text-blue-400"
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
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message={massage}
        action={action}
      />
    </main>
  );
};
