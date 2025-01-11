import { useQuery } from "@tanstack/react-query";
import { hotelObject } from "../cityPage/cityDrawer/cityInformationDrawer";
import { ErrorPage } from "../../ErrorPage";
import { LoadingScreen } from "../../component/loadingPage";
import { Button } from "../../login/loginForm/loginButton";
import { Dispatch, SetStateAction, useState } from "react";
import { useHotelContext } from "./context/hotelContext";
import { DeleteConfirmation } from "../component/deleteConfirmation";
import { CityInformation } from "../../data_models/cities";


interface hotelCardProp {
  city: CityInformation;

  setOpenSnackBar: Dispatch<SetStateAction<boolean>>;
}

export const HotelCard: React.FC<hotelCardProp> = ({
  city,
  setOpenSnackBar,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { hotels, handleDeleteHotel } = useHotelContext();

  const handleClose = () => {
    setOpenIndex(null);
  };

  const handleClickOpen = (index: number) => {
    setOpenIndex(index);
  };
  const openDialog = (index: number) => {
    console.log("clicked", index);
    handleClickOpen(index);
  };

  const hotelsQuery = useQuery({
    queryKey: ["hotels", hotels],
    queryFn: () => hotels,
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState<number | null>();

  const handleOpenDeleteDialog = (index: number) => {
    setOpenDeleteDialog(index);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(null);
  };

  if (hotelsQuery.error) return <ErrorPage />;
  if (hotelsQuery.isLoading) return <LoadingScreen />;

  return (
    <>
      {hotelsQuery.data?.map((hotel: hotelObject, index: number) => {
        return (
          <div
            key={index}
            className="w-11/12 p-3 rounded border border-gray-500  "
          >
            <div className="flex items-center justify-between w-full">
              <p className="text-lg">
                Hotel Name: <i className="font-bold">{hotel.name}</i>
              </p>
              <section className="flex flex-row items-center gap-2">
                <p className="text-md">Hotel Rating:</p>
                <p className="text-md"> {hotel.starRating * 2}</p>
              </section>
            </div>
            <p className="line-clamp-1 text-balance w-full text-sm">
              Hotel description: {hotel.description}
            </p>
            <div className="flex my-2 flex-row items-center justify-end">
              <Button
                children={""}
                className="text-red-500"
                color="red"
                primary={false}
                handleClick={() => handleOpenDeleteDialog(index)}
                isSubmitting={false}
                size="small"
                value="Delete"
              />
              <DeleteConfirmation
                open={openDeleteDialog === index}
                handleClose={handleCloseDeleteDialog}
                handleConfirm={() => handleDeleteHotel(hotel, city.id)}
                setOpenSnackBar={setOpenSnackBar}
                label="Hotel"
              />
            </div>
          </div>
        );
      })}
    </>
  );
};
