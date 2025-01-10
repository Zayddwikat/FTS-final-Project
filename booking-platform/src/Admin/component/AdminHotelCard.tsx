import { useQuery } from "@tanstack/react-query";
import { ErrorPage } from "../../ErrorPage";
import { LoadingScreen } from "../../component/loadingPage";
import { useHotel } from "../../user/hotelPage/Hooks/useGetHotel";
import TripImg from "../../assets/TripImg.jpg";
import { hotelObject } from "./cityInformationDrawer";
import { Button } from "../../login/loginForm/loginButton";
import { CityInformation } from "../../data_module/Cities";
import { useHotelContext } from "../context/hotelContext";
import { useState } from "react";
import { DeleteConfirmation } from "./deleteConfirmation";
import { EditHotelDialog } from "./edithotelDialog";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { useGetAvailableRooms } from "../../user/hotelPage/component/availableRooms/useAvailableRooms";
import { Divider } from "@mui/material";
import { SwiperSection } from "./photosSection/component/swiperSection";
import { useImageContext } from "../context/imageContext";

interface adminHotelCardProps {
  hotel: hotelObject;
  city: CityInformation;
  toggleDrawer: (
    anchor: "right",
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  setOpenSnakeBar: (prop: boolean) => void;
  setMassage: (prop: string) => void;
}

export const AdminHotelCard: React.FC<adminHotelCardProps> = ({
  hotel,
  city,
  toggleDrawer,
  setOpenSnakeBar,
  setMassage,
}) => {
  const { handleDeleteHotel, handleEditHotel } = useHotelContext();
  const { hotelImages, getHotelGallery } = useImageContext();

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
    handleDeleteHotel(hotel, city.id);
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
  console.log(hotelQuery.data)
  const hotelPhoto = useQuery({
    queryKey: ["hotelPhoto", "hotelId"],
    queryFn: async () => {
      return await getHotelGallery(hotel.id);
    },
  });
  console.log(hotelPhoto);

  if (hotelQuery.error) return <ErrorPage />;
  if (hotelQuery.isLoading) return <LoadingScreen />;

  return (
    <div className="md:w-[50dvw] flex flex-col  gap-4 overflow-x-hidden mx-4">
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
      <div className="flex flex-col gap-4 mx-4">
        <SwiperSection imgs={hotelImages} />
        <Link
          to={`/AdminHome/photos/:${hotel.id}`}
          state={{
            data: hotel,
          }}
          className="text-blue-400 underline"
        >
          all photos
        </Link>
      </div>
      <Divider />
      <div className="mx-4 w-full flex flex-col gap-2">
        <article className="flex md:flex-row flex-col items-start md:items-center w-12/12 justify-between mr-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl">{hotelQuery.data.hotelName}</h1>
            <p className="text-md border text-white bg-blue-700 p-0.5 rounded-md">
              {hotelQuery.data.starRating * 2}
            </p>
          </div>
          <p>{hotelQuery.data.location}</p>
        </article>
        <p className="text-sm text-pretty">{hotelQuery.data.description}</p>
      </div>
      <div className="mx-4 flex flex-col items-start gap-2">
        <div className="self-start">
          <Link
            className="text-blue-500 underline pointer"
            to={`/AdminHome/amenities/hotel/:${hotel.name}`}
            state={{
              data: hotel,
            }}
          >
            Manage amenities
          </Link>
        </div>
        <ul className="list-disc mx-4">
          {hotelQuery.data.amenities.map((amenity, index: number) => {
            return (
              <div key={index}>
                <li className="text-blue-400">{amenity.name}:</li>
                <p className="mx-4">{amenity.description}</p>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="mx-4 flex flex-col items-start gap-2">
        <Link
          to={`/AdminHome/${hotel.id}/Rooms`}
          state={{ hotel: hotel, hotelData: hotelQuery.data }}
          className="text-lg text-blue-500 underline"
        >
          Rooms
        </Link>
        <p>
          Number of rooms:{" "}
          <i className="text-blue-400ب">{hotelQuery.data.availableRooms}</i>{" "}
          room available
        </p>
      </div>
      <div className="flex flex-row self-end w-full items-center justify-end gap-4">
        <Button
          color={""}
          size={"small"}
          value={"Edit Hotel"}
          isSubmitting={false}
          handleClick={handleOpenEditDialog}
          className={""}
          children={undefined}
          primary={true}
        />
        <EditHotelDialog
          open={openEditDialog}
          handleClose={handleCloseEditDialog}
          handleConfirm={handleConfirmEditing}
          setOpenSnackBar={setOpenSnakeBar}
          label="Hotel"
          hotel={hotel}
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
          label="Hotel"
        />
      </div>
    </div>
  );
};
