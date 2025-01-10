import { useGetAvailableRooms } from "../Hooks/useAvailableRooms";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DialogDemo } from "./roomDialog";
import { Button } from "../../../login/component/loginButton";
import { useCartContext } from "../../Context/cartContext";
import { CartPage } from "../../cartDialog/cartPage";
import { LoadingScreen } from "../../../component/loadingPage";
import { ErrorPage } from "../../../ErrorPage";
import { roomInformation } from "../../../data_module/roomInformation";

export const AvailableRooms: React.FC<any> = ({
  hotel,
  checkIn,
  checkOut,
  searchOption,
}) => {
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const [openCheckOut, setOpenCheckOut] = useState<number>(-1);
 

  const handleOpenCheckOut = (index: number) => {
    setOpenCheckOut(index);
  };

  const handleCloseCheckOut = () => {
    setOpenCheckOut(-1);
  };

  const handleClickOpen = (index: number) => {
    setOpenIndex(index);
  };

  const handleClose = () => {
    setOpenIndex(-1);
  };

  const roomsQuery = useQuery({
    queryKey: ["roomsAvailable"],
    queryFn: () => useGetAvailableRooms({ hotel, checkIn, checkOut }),
  });

  if (roomsQuery.isLoading) return <LoadingScreen />;
  if (roomsQuery.isError) return <ErrorPage />;

  return (
    <section className="w-full mb-12 px-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="bg-blue-400 border border-gray-300 px-2 py-1 text-xs md:text-sm">
              Room
            </th>
            <th className="bg-blue-400 border border-gray-300 px-2 py-1 text-xs md:text-sm">
              Capacity
            </th>
            <th className="bg-blue-400 border border-gray-300 px-2 py-1 text-xs md:text-sm">
              Amenities
            </th>
            <th className="bg-blue-400 border border-gray-300 px-2 py-1 text-xs md:text-sm">
              Price
            </th>
            <th className="bg-blue-400 border border-gray-300 px-2 py-1 text-xs md:text-sm">
              Reserve
            </th>
          </tr>
        </thead>
        <tbody>
          {roomsQuery.data.map((element: roomInformation, index: number) => (
            <tr key={index} className="border border-gray-300">
              <td className="border border-gray-300 px-2 py-1">
                <p
                  className="text-blue-700 underline cursor-pointer text-xs md:text-sm"
                  onClick={() => handleClickOpen(index)}
                >
                  {element.roomType}
                </p>
                <DialogDemo
                  handleClose={handleClose}
                  open={openIndex === index}
                  element={element}
                  handleOpenCheckOut={handleOpenCheckOut}
                  index={index}

                />
              </td>
              <td className="border border-gray-300 px-2 py-1 text-xs md:text-sm">
                <p>Adult: {element.capacityOfAdults}</p>
                <p>Children: {element.capacityOfChildren}</p>
              </td>
              <td className="border border-gray-300 px-2 py-1 text-xs md:text-sm">
                <ul>
                  {element.roomAmenities.map((amenity, i) => (
                    <li key={i}>{amenity.name}</li>
                  ))}
                </ul>
              </td>
              <td className="border border-gray-300 px-2 py-1 text-xs md:text-sm">
                <p className="text-center">${element.price}</p>
              </td>
              <td className="border border-gray-300 px-2 py-1 text-xs md:text-sm">
                <div className="flex justify-center">
                  <Button
                    className="px-2 py-1 text-xs md:text-sm"
                    color="blue"
                    handleClick={() => handleOpenCheckOut(index)}
                    size="small"
                    value="Reserve"
                    primary={false}
                    isSubmitting={false}
                    children={undefined}
                  />
                </div>
                <CartPage
                  handleClose={handleCloseCheckOut}
                  open={openCheckOut === index}
                  room={element}
                  hotel={hotel}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  searchOption={searchOption}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
