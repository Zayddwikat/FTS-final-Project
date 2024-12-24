import { useGetAvailableRooms } from "../Hooks/useAvailableRooms";
import { SearchBar } from "../../HomePage/component/SearchBar";
import { useState } from "react";
import { LoadingScreen } from "../../../component/LoadingPage";
import { ErrorPage } from "../../../ErrorPage";
import { useQuery } from "@tanstack/react-query";
import { DialogDemo } from "./roomDialog";
import { Button } from "../../../Login/component/LoginButton";
import { useCartContext } from "../../Context/cartContext";
import { CartPage } from "../../cartDialog/CartPage";
import { roomInformation } from "../../../classes/roomInformation";

export const AvailableRooms: React.FC<any> = ({
  hotel,
  checkIn,
  checkOut,
  searchOption,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openCheckOut, setOpenCheckOut] = useState<number | null>(null);
  const { addOneToCart } = useCartContext();

  const handleOpenCheckOut = (index: number) => {
    setOpenCheckOut(index);
  };
  const handleCloseCheckOut = (index: number) => {
    setOpenCheckOut(null);
  };
  const openCheckInDialog = (index: number) => {
    handleOpenCheckOut(index);
  };

  const handleClickOpen = (index: number) => {
    setOpenIndex(index);
  };

  const handleClose = () => {
    setOpenIndex(null);
  };
  const roomsQuery = useQuery({
    queryKey: ["roomsAvailable"],
    queryFn: () => useGetAvailableRooms({ hotel, checkIn, checkOut }),
  });
  if (roomsQuery.isLoading) return <LoadingScreen />;
  if (roomsQuery.isError) return <ErrorPage />;

  return (
    <>
      <section className="w-full mb-12">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="w-[18%] bg-blue-400 border border-gray-300">
                Room
              </th>
              <th className="w-[18%] bg-blue-400 border border-gray-300">
                Capacity
              </th>
              <th className="w-[18%] bg-blue-400 border border-gray-300">
                Amenities
              </th>
              <th className="w-[18%] bg-blue-400 border border-gray-300">
                Price
              </th>
              <th
                className="w-[10%] bg-blue-400 border border-gray-300"
                colSpan={roomsQuery.data.length}
              >
                Reserve
              </th>
            </tr>
          </thead>
          <tbody>
            {roomsQuery.data.map((element: roomInformation, index: number) => (
              <>
                <tr key={index} className="border border-gray-300 ">
                  <td className="border border-gray-300 p-2">
                    <p
                      className="text-blue-700 underline cursor-pointer"
                      onClick={() => handleClickOpen(index)}
                    >
                      {element.roomType}
                    </p>
                    <DialogDemo
                      handleClose={handleClose}
                      open={openIndex === index}
                      element={element}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <p>Adult: {element.capacityOfAdults}</p>
                    <p>Children: {element.capacityOfChildren}</p>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <ul>
                      {element.roomAmenities.map((elem, index: number) => {
                        return <li key={index}>{elem.name}</li>;
                      })}
                    </ul>
                  </td>
                  <td className="border border-gray-300  ">
                    <p className="flex flex-row w-full items-center justify-center">
                      ${element.price}
                    </p>
                  </td>
                  <td>
                    <div className="flex flex-row w-full items-center justify-center">
                      <Button
                        className="flex flex-row items-center justify-center"
                        color="blue"
                        handleClick={() => openCheckInDialog(index)}
                        size="small"
                        value="Reserve"
                        primary={false}
                        isSubmitting={false}
                      >
                        {null}
                      </Button>
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
              </>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};
