import { useQuery } from "@tanstack/react-query";
import { ErrorPage } from "../../ErrorPage";
import { LoadingScreen } from "../../component/LoadingPage";
import { useHotel } from "../../user/HotelPage/Hooks/useGetHotel";
import TripImg from "../../assets/TripImg.jpg";
import { hotelObject } from "./CityInformationDrawer";
import { Button } from "../../Login/component/LoginButton";
import { CityInformation } from "../../classes/Cities";
import { useHotelContext } from "../context/hotelContext";
import { useState } from "react";
import { DeleteConfirmation } from "./deleteConfirmation";
import { EditHotelDialog } from "./edithotelDialog";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { useGetAvailableRooms } from "../../user/HotelPage/Hooks/useAvailableRooms";
import { roomInformation } from "../../classes/roomInformation";
import { useRoomContext } from "../context/roomcontext";
import { Divider } from "@mui/material";
import { EditRoomDialog } from "./editRoomDialog";

interface adminHotelCardProps {
  hotel: hotelObject;
  room: roomInformation;
  toggleDrawer: (
    anchor: "right",
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  setOpenSnakeBar: (prop: boolean) => void;
  setMassage: (prop: string) => void;
}

export const RoomCardDrawer: React.FC<adminHotelCardProps> = ({
  hotel,
  room,
  toggleDrawer,
  setOpenSnakeBar,
  setMassage,
}) => {
  const { deleteRoom, handleEditHotel } = useRoomContext();

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  const handleConfirmEditing = () => {
    toggleDrawer("right", false);
    setOpenSnakeBar(true);
    setMassage("Hotel edited successfully");
  };

  const handleConfirmDeleting = () => {
    deleteRoom(hotel.id, room.roomId);
    toggleDrawer("right", false);
    setOpenSnakeBar(true);
    setMassage("Successfully deleting");
  };

  const hotelQuery = useQuery({
    queryKey: ["hotel", "hotelId"],
    queryFn: async () => {
      return await useHotel(hotel.id);
    },
  });

  if (hotelQuery.error) return <ErrorPage />;
  if (hotelQuery.isLoading) return <LoadingScreen />;

  return (
    <div className="md:w-[40dvw] flex flex-col  gap-4 overflow-x-hidden mx-4 p-2">
      <div className=" flex items-center justify-start  w-full">
        <Button
          color={""}
          size={"small"}
          value={""}
          isSubmitting={false}
          handleClick={() => toggleDrawer("right", false)}
          className={""}
          primary={false}
        >
          <CloseIcon />
        </Button>
      </div>
      <div className="">
        <img
          src={room?.roomPhotoUrl}
          alt="image"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="mx-4 w-full flex flex-col gap-2">
        <article className="flex md:flex-row flex-col items-start md:items-center w-12/12 justify-between mr-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl">{room.roomType}</h1>
          </div>
          <div className="flex flex-row gap-4">
            <p>${room.price}</p>
            {room.availability ? (
              <p className="text-green-500">Available</p>
            ) : (
              <p className="text-red-500">Not Available</p>
            )}
          </div>
        </article>
        <p className=" text-pretty">
          Capacity of adults:{" "}
          <i className="font-bold">{room.capacityOfAdults}</i>
        </p>
        <p className="text-pretty">
          Capacity of Children:{" "}
          <i className="font-bold">{room.capacityOfChildren}</i>
        </p>
      </div>
      <Divider />
      <div className="mx-4 flex flex-col items-start gap-2">
        <div className="self-start">
          <Link
            className="text-blue-500 underline pointer"
            to={`/AdminHome/amenities/room/${room.roomId}`}
            state={{ data: room }}
          >
            Manage amenities
          </Link>
        </div>
        <ul className="list-disc mx-4">
          {room?.roomAmenities?.map((amenity, index: number) => {
            return (
              <div key={index}>
                <li className="text-blue-400">{amenity.name}:</li>
                <p className="mx-4 w-11/12">{amenity.description}</p>
              </div>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-row self-end w-full items-center justify-end gap-4">
        <Button
          color={""}
          size={"small"}
          value={"Edit"}
          isSubmitting={false}
          handleClick={handleOpenEditDialog}
          className={""}
          children={undefined}
          primary={true}
        />
        <EditRoomDialog
          open={openEditDialog}
          handleClose={handleCloseEditDialog}
          handleConfirm={handleConfirmEditing}
          setOpenSnackBar={setOpenSnakeBar}
          label="Room"
          room={room}
        />
        <Button
          color={""}
          size={"small"}
          value={"Delete"}
          isSubmitting={false}
          handleClick={handleOpenDeleteDialog}
          className={" text-red-500 border border-red-500"}
          children={undefined}
          primary={false}
        />
        <DeleteConfirmation
          open={openDeleteDialog}
          handleClose={handleCloseDeleteDialog}
          handleConfirm={handleConfirmDeleting}
          setOpenSnackBar={setOpenSnakeBar}
          label="Room"
        />
      </div>
    </div>
  );
};
