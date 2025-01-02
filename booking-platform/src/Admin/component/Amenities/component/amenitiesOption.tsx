import { useQuery } from "@tanstack/react-query";

import { useState } from "react";

import React from "react";
import { Snackbar } from "@mui/material";
import { useSnakeBar } from "../../../hooks/useSnakBar";
import { Button } from "../../../../Login/component/LoginButton";
import { AddCityDialog } from "../../addCityDialog";
import { CityInformation } from "../../../../classes/Cities";
import { CityDrawer } from "../../CityDrawer";
import { useLocation } from "react-router-dom";
import { useAmenitiesContext } from "../../../context/amenitiesContext";
import { ErrorPage } from "../../../../ErrorPage";
import { LoadingScreen } from "../../../../component/LoadingPage";
import { AmenitiesInformation } from "../../../../classes/amenitiesInformation";
import { AddAmenitiesDialog } from "./addAmenitiesDialog";
import { DeleteConfirmation } from "../../deleteConfirmation";
import { hotelObject } from "../../CityInformationDrawer";
import { TableContent } from "./tableContent";
import { EditAmenitiesDialog } from "./EditAmenitiesDialog";

export const AmenitiesOption: React.FC<any> = () => {
  const { state } = useLocation();
  console.log(state);
  const hotel = state.data;

  const { openSnackBar, handleCloseSnackBar, action, setOpenSnackBar } =
    useSnakeBar();
  const { getAmenities, amenities, handleDeleteAmenities, editHotelAmenities } =
    useAmenitiesContext();
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedAmenity(null);
  };
  const handleOpenEditDialog = (amenity: AmenitiesInformation) => {
    setSelectedAmenity(amenity);
    setOpenEditDialog(true);
  };

  const amenitiesQuery = useQuery({
    queryKey: ["amenities"],
    queryFn: async () => {
      return getAmenities(state.data.id);
    },
  });

  const [pageNum, setPageNum] = useState<number>(0);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(amenities.length / itemsPerPage);
  const data = amenities.slice(
    pageNum * itemsPerPage,
    (pageNum + 1) * itemsPerPage
  );

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [selectedAmenity, setSelectedAmenity] =
    useState<AmenitiesInformation | null>(null);

  const handleOpenDialog = (amenity: AmenitiesInformation) => {
    setSelectedAmenity(amenity);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAmenity(null);
  };

  const handleClose = () => {
    setOpenIndex(null);
  };

  const handleDeleteAmenity = async () => {
    if (selectedAmenity !== null)
      await handleDeleteAmenities(hotel, selectedAmenity.id);
    setOpenSnackBar(true);
  };

  const handleClickOpen = (index: number) => {
    setOpenIndex(index);
  };

  if (amenitiesQuery.error) return <ErrorPage />;
  if (amenitiesQuery.isLoading) return <LoadingScreen />;
  console.table(amenitiesQuery.data);

  return (
    <>
      <div className="self-start w-11/12 flex items-center justify-between mx-10 ">
        <h1 className=" text-2xl font-bold">Amenities in {hotel.name} </h1>
        <Button
          children
          className=""
          color="blue"
          handleClick={handleClickOpen}
          isSubmitting={false}
          primary={true}
          size="small"
          value="Add Amenities"
        />
        <AddAmenitiesDialog
          handleClose={handleClose}
          open={openIndex}
          hotel={hotel}
        />
      </div>
      <div className="flex flex-col items-start justify-between h-[80dvh]">
        <TableContent
          data={data}
          handleOpenDialog={handleOpenDialog}
          handleOpenEditDialog={handleOpenEditDialog}
          withEdit={true}
        />
        <DeleteConfirmation
          open={openDialog}
          handleClose={handleCloseDialog}
          handleConfirm={() => {
            handleDeleteAmenity();
          }}
          setOpenSnackBar={setOpenSnackBar}
          label="Amenity"
        />
        <EditAmenitiesDialog
          open={openEditDialog}
          handleClose={handleCloseEditDialog}
          handleConfirm={editHotelAmenities}
          setOpenSnackBar={setOpenSnackBar}
          label="Amenity"
          amenity={selectedAmenity}
        />

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
        message="Successfully deleted"
        action={action}
      />
    </>
  );
};
