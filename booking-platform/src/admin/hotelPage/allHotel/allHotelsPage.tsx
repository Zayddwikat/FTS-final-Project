import { Snackbar } from "@mui/material";
import { useState } from "react";
import { useSnakeBar } from "../../hooks/useSnackBar";
import { useQuery } from "@tanstack/react-query";
import { useHotelContext } from "../context/hotelContext";
import { HotelTable } from "./hotelTable";
import { PaginationControls } from "./paginationControls";

export const AllHotelsPage: React.FC = () => {
  const { hotels, handleGetallHotels } = useHotelContext();
  const { action, handleCloseSnackBar, openSnackBar, setOpenSnackBar } =
    useSnakeBar();
  const [massage, setMassage] = useState<string>("");
  const [pageNum, setPageNum] = useState<number>(0);

  const itemsPerPage = 11;
  const totalPages = Math.ceil(hotels.length / itemsPerPage);
  const data = hotels.slice(
    pageNum * itemsPerPage,
    (pageNum + 1) * itemsPerPage
  );

  const hotelsQuery = useQuery({
    queryKey: ["hotels", pageNum],
    queryFn: async () => {
      return await handleGetallHotels("", "", 1000000, pageNum + 1);
    },
  });

  return (
    <div className="mx-8 w-full self-start">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="mx-6 text-2xl">Table of Hotels</h1>
      </div>
      <HotelTable
        hotels={data}
        setMassage={setMassage}
        setOpenSnackBar={setOpenSnackBar}
      />
      <PaginationControls
        pageNum={pageNum}
        totalPages={totalPages}
        setPageNum={setPageNum}
      />
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
