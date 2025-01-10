import { useQuery } from "@tanstack/react-query";
import { getCities } from "../hooks/getCities";
import { ErrorPage } from "../../ErrorPage";
import { LoadingScreen } from "../../component/loadingPage";
import { CityInformation } from "../../data_module/Cities";
import { Button } from "../../login/loginForm/loginButton";
import { useState } from "react";
import { addCity } from "../hooks/addCity";
import { CityDrawer } from "./cityDrawer";
import { AddCityDialog } from "./addCityDialog";
import React from "react";
import { Snackbar } from "@mui/material";
import { useSnakeBar } from "../hooks/useSnakBar";
import { useCityContext } from "../context/cityContext";

export const CityOptions: React.FC<any> = () => {

  const { cities, getCities, setCities } = useCityContext();

  const { openSnackBar, handleCloseSnackBar, action, setOpenSnackBar } =
    useSnakeBar();

  const citiesQuery = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const data = await getCities({ name: "", searchQuery: "" });
      return data;
    },
    enabled: true,
    staleTime: 0,
  });
  const [pageNum, setPageNum] = useState<number>(0);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(cities?.length / itemsPerPage);
  const data = cities?.slice(
    pageNum * itemsPerPage,
    (pageNum + 1) * itemsPerPage
  );

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const handleClose = () => {
    setOpenIndex(null);
  };

  const handleClickOpen = (index: number) => {
    setOpenIndex(index);
  };

  if (citiesQuery.error) return <ErrorPage />;
  if (citiesQuery.isLoading) return <LoadingScreen />;
  console.table(citiesQuery.data);
  return (
    <>
      <div className="self-start w-11/12 flex items-center justify-between mx-10 ">
        <h1 className=" text-2xl font-bold">Cities</h1>
        <Button
          children
          className=""
          color="blue"
          handleClick={handleClickOpen}
          isSubmitting={false}
          primary={true}
          size="small"
          value="Add City"
        />
        <AddCityDialog
          handleClose={handleClose}
          open={openIndex}
          cities={cities}
        />
      </div>
      <table className="w-full h-[70dvh] block ml-10 my-10 border-collapse border border-gray-300 text-start overflow-y-auto">
        <thead className="border">
          <tr className="border">
            <th className="border">ID</th>
            <th className="border ">Name</th>
            <th className="border">Description</th>
            <th className="border">City info</th>
          </tr>
        </thead>

        {data.map((city: CityInformation, index: number) => {
          return (
            <tbody className="border p-2">
              <tr className="border" key={index}>
                <td className="border p-2 w-1/12">{city.id}</td>
                <td className="border w-3/12">{city.name}</td>
                <td className="border truncate line-clamp-1 p-2 w-[50dvw]  ">
                  <p className="w-[95%] line-clamp-1">{city.description}</p>
                </td>
                <td className="w-2/12 text-center">
                  <CityDrawer
                    city={city}
                    setCities={setCities}
                    setOpenSnackBar={setOpenSnackBar}
                  />
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <div className="flex justify-end self-end mb-4">
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
        message="Successfully deleted"
        action={action}
      />
    </>
  );
};
