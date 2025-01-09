import { useQuery } from "@tanstack/react-query";

import { useState } from "react";

import React from "react";
import { Snackbar } from "@mui/material";
import { useSnakeBar } from "../../../hooks/useSnakBar";
import { Button } from "../../../../Login/component/LoginButton";
import { AddCityDialog } from "../../addCityDialog";
import { CityInformation } from "../../../../data_module/Cities";
import { CityDrawer } from "../../CityDrawer";
import { useLocation } from "react-router-dom";
import { useAmenitiesContext } from "../../../context/amenitiesContext";
import { ErrorPage } from "../../../../ErrorPage";
import { LoadingScreen } from "../../../../component/LoadingPage";
import { AmenitiesInformation } from "../../../../data_module/amenitiesInformation";
import { AddAmenitiesDialog } from "./addAmenitiesDialog";
import { DeleteConfirmation } from "../../deleteConfirmation";
import { hotelObject } from "../../CityInformationDrawer";
import { TableContent } from "./tableContent";
import { EditAmenitiesDialog } from "./EditAmenitiesDialog";

export const AllAmenities: React.FC<any> = () => {
  const { openSnackBar, handleCloseSnackBar, action, setOpenSnackBar } =
    useSnakeBar();
  const { getAllAmenities, amenities, handleDeleteAmenities } =
    useAmenitiesContext();

  const [pageNum, setPageNum] = useState<number>(0);

  const amenitiesQuery = useQuery({
    queryKey: ["amenities", pageNum],
    queryFn: async () => {
      return getAllAmenities("", 1000000000, pageNum + 1);
    },
  });

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




  

  

  if (amenitiesQuery.error) return <ErrorPage />;
  if (amenitiesQuery.isLoading) return <LoadingScreen />;
  console.table(amenitiesQuery.data);

  return (
    <>
      <div className="self-start w-11/12 flex items-center justify-between mx-10 ">
        <h1 className=" text-2xl font-bold">Amenities </h1>
      </div>
      <div className="flex flex-col items-start justify-between h-[80dvh]">
        <TableContent
          data={data}
          handleOpenDialog={undefined}
          handleOpenEditDialog={() => {}}
          withEdit={false}
          withDelete={false}
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
