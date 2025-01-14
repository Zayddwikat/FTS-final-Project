import { useLocation } from "react-router-dom";
import { hotelObject } from "../cityPage/cityDrawer/cityInformationDrawer";
import { Button } from "../../login/loginForm/loginButton";
import { Snackbar } from "@mui/material";
import { useSnakeBar } from "../hooks/useSnackBar";
import { useState } from "react";
import { AddHotelDialog } from "../hotelPage/addNewHotel/addHotelDialog";
import { useQuery } from "@tanstack/react-query";
import { useHotelContext } from "../hotelPage/context/hotelContext";
import { HotelTable } from "../hotelPage/allHotel/hotelTable";
import { PaginationControls } from "../hotelPage/allHotel/paginationControls";

export const TableOfContent: React.FC = () => {
  const { state } = useLocation();
  const city = state.city;
  const { hotels, getCityHotels } = useHotelContext();
  const { action, handleCloseSnackBar, openSnackBar, setOpenSnackBar } = useSnakeBar();
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

  const hotelQuery = useQuery({
    queryKey: ["hotels", city.id],
    queryFn: () => getCityHotels(city.id, true),
  });

  const itemsPerPage = 11;
  const totalPages = Math.ceil(hotels.length / itemsPerPage);
  const data = hotels.slice(pageNum * itemsPerPage, (pageNum + 1) * itemsPerPage);

  return (
    <div className="mx-6 w-full self-start">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="mx-6 text-2xl">Table of Hotels in {city.name}</h1>
        <Button
          color=""
          size=""
          value="Add Hotels"
          isSubmitting={false}
          handleClick={handleOpenAddDialog}
          className="mx-8 my-4"
          children={undefined}
          primary={true}
        />
        <AddHotelDialog
          open={addHotelDialog}
          handleClose={handleCloseAddDialog}
          handleConfirm={handleConfirmAdding}
          setOpenSnackBar={setOpenSnackBar}
          label="Hotel"
          city={city}
        />
      </div>
      <div className="overflow-x-auto border border-grey-400 h-[80%] w-[97%]">
        <HotelTable
          hotels={data}
          city={city}
          setMassage={setMassage}
          setOpenSnackBar={setOpenSnackBar}
        />
      </div>
      <div className="w-[97%] flex justify-end mr-20 mt-20">
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
        message={massage}
        action={action}
      />
    </div>
  );
};
