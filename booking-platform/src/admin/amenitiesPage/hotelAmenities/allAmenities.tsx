import { useQuery } from "@tanstack/react-query";
import { lazy, memo, useState } from "react";
import React from "react";
import { Snackbar } from "@mui/material";
import { useSnakeBar } from "../../hooks/useSnackBar";
import { ErrorPage } from "../../../ErrorPage";
import { LoadingScreen } from "../../../component/loadingPage";
import { useAmenitiesContext } from "../context/amenitiesContext";
import { AmenitiesInformation } from "../../../data_models/amenitiesInformation";

const TableContent = memo(lazy(() => import("./tableContent")));
const PaginationControls = memo(
  lazy(() => import("../../hotelPage/allHotel/paginationControls"))
);

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
          handleOpenDialog={handleOpenDialog}
          handleOpenEditDialog={() => {}}
          withEdit={false}
          withDelete={false}
        />
        <PaginationControls
          pageNum={pageNum}
          totalPages={totalPages}
          setPageNum={setPageNum}
        />
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
export default AllAmenities;
