import { useQuery } from "@tanstack/react-query";
import { lazy, memo, useState } from "react";
import React from "react";
import { Snackbar } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useSnakeBar } from "../../hooks/useSnackBar";
import { useAmenitiesContext } from "../context/amenitiesContext";
import { AmenitiesInformation } from "../../../data_models/amenitiesInformation";
import { ErrorPage } from "../../../ErrorPage";
import { LoadingScreen } from "../../../component/loadingPage";
import { Button } from "../../../login/loginForm/loginButton";

const PaginationControls = memo(
  lazy(() => import("../../hotelPage/allHotel/paginationControls"))
);
const AddAmenitiesDialog = memo(
  lazy(() => import("../addNewAmenities/addAmenitiesDialog"))
);
const TableContent = memo(lazy(() => import("../hotelAmenities/tableContent")));
const DeleteConfirmation = memo(
  lazy(() => import("../../component/deleteConfirmation"))
);
const EditAmenitiesDialog = memo(
  lazy(() => import("../editAmenities/editAmenitiesDialog"))
);

export const AmenitiesPageRoom: React.FC<any> = () => {
  const { state } = useLocation();
  console.log("state in Page Room", state);
  const room = state.data;

  const { openSnackBar, handleCloseSnackBar, action, setOpenSnackBar } =
    useSnakeBar();
  const {
    roomAmenities,
    handleEditAmenityRoom,
    handleDeleteAmenityRoom,
    getAmenitiesFromRoom,
  } = useAmenitiesContext();

  const amenitiesQuery = useQuery({
    queryKey: ["roomAmenities"],
    queryFn: async () => {
      return getAmenitiesFromRoom(state.data.roomId);
    },
  });

  const [pageNum, setPageNum] = useState<number>(0);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(roomAmenities?.length / itemsPerPage);
  const data = roomAmenities?.slice(
    pageNum * itemsPerPage,
    (pageNum + 1) * itemsPerPage
  );

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  const [selectedAmenity, setSelectedAmenity] =
    useState<AmenitiesInformation | null>(null);

  const handleOpenEditDialog = (amenity: AmenitiesInformation) => {
    setSelectedAmenity(amenity);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedAmenity(null);
  };

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
  const handleClickOpen = (index: number) => {
    setOpenIndex(index);
  };

  const handleDeleteAmenity = async () => {
    console.log(room);

    if (selectedAmenity?.id !== null)
      await handleDeleteAmenityRoom(room.roomId, selectedAmenity?.id);
    setOpenSnackBar(true);
  };

  if (amenitiesQuery.error) return <ErrorPage />;
  if (amenitiesQuery.isLoading) return <LoadingScreen />;

  return (
    <>
      <div className="self-start w-11/12 flex items-center justify-between mx-10 ">
        <h1 className=" text-2xl font-bold">
          Amenities in {room.roomType} room{" "}
        </h1>
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
        <div className="hidden">
          <AddAmenitiesDialog
            handleClose={handleClose}
            open={openIndex}
            room={room}
          />
        </div>
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
          handleConfirm={handleEditAmenityRoom}
          setOpenSnackBar={setOpenSnackBar}
          label="Amenity"
          amenity={selectedAmenity}
        />
        <PaginationControls
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPages={totalPages}
        />
        {/* <div className="flex justify-end self-end mb-4">
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
        </div> */}
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
