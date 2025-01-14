import { CityInformation } from "../../../data_models/cities";
// import CityDrawer from "../cityDrawer/cityDrawer";
import Pagination from "./pagination";

import React, { Suspense } from "react";
const CityDrawer = React.lazy(() => import("../cityDrawer/cityDrawer"));

interface CityTableProps {
  cities: CityInformation[];
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  setCities: React.Dispatch<React.SetStateAction<CityInformation[]>>;
  setOpenSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const CityTable: React.FC<CityTableProps> = ({
  cities,
  pageNum,
  setPageNum,
  itemsPerPage,
  setCities,
  setOpenSnackBar,
}) => {
  const data = cities?.slice(
    pageNum * itemsPerPage,
    (pageNum + 1) * itemsPerPage
  );
  const totalPages = Math.ceil(cities?.length / itemsPerPage);

  return (
    <>
      <table className="w-full h-[70dvh] block ml-10 my-10 border-collapse border border-gray-300 text-start overflow-y-auto">
        <thead className="border">
          <tr className="border">
            <th className="border">ID</th>
            <th className="border">Name</th>
            <th className="border">Description</th>
            <th className="border">City info</th>
          </tr>
        </thead>
        {data.map((city: CityInformation, index: number) => (
          <tbody key={index} className="border p-2">
            <tr className="border">
              <td className="border p-2 w-1/12">{city.id}</td>
              <td className="border w-3/12">{city.name}</td>
              <td className="border truncate line-clamp-1 p-2 w-[50dvw]">
                <p className="w-[95%] line-clamp-1">{city.description}</p>
              </td>
              <td className="w-2/12 text-center">
                <Suspense fallback={<div>Loading city table...</div>}>
                  <CityDrawer
                    city={city}
                    setCities={setCities}
                    setOpenSnackBar={setOpenSnackBar}
                  />
                </Suspense>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <Pagination
        totalPages={totalPages}
        pageNum={pageNum}
        setPageNum={setPageNum}
      />
    </>
  );
};

export default CityTable;
