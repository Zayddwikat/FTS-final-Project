import { hotelObject } from "../../cityPage/cityDrawer/cityInformationDrawer";
import { DrawerDrawer } from "../../component/drawer";

interface HotelTableProps {
  hotels: hotelObject[];
  setMassage: React.Dispatch<React.SetStateAction<string>>;
  setOpenSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HotelTable: React.FC<HotelTableProps> = ({
  hotels,
  setMassage,
  setOpenSnackBar,
}) => {
  return (
    <div className="overflow-x-auto h-[95%]">
      <table className="w-full bg-white border-collapse border border-gray-300 table-fixed">
        <thead className="bg-white sticky top-0 z-10">
          <tr className="border">
            <th className="border">Index</th>
            <th className="border w-[15%]">Hotel Name</th>
            <th className="border w-[50%]">Hotel Description</th>
            <th className="border w-[10%]">Star Rating</th>
            <th className="border w-[15%]">Info</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel: hotelObject, index: number) => (
            <HotelRow
              key={index}
              hotel={hotel}
              index={index}
              setMassage={setMassage}
              setOpenSnackBar={setOpenSnackBar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface HotelRowProps {
  hotel: hotelObject;
  index: number;
  setMassage: React.Dispatch<React.SetStateAction<string>>;
  setOpenSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const HotelRow: React.FC<HotelRowProps> = ({
  hotel,
  index,
  setMassage,
  setOpenSnackBar,
}) => (
  <tr className="border">
    <td className="border p-2">{index}</td>
    <td className="border">{hotel.name}</td>
    <td className="border truncate p-2">
      <p className="line-clamp-1">{hotel.description}</p>
    </td>
    <td className="border text-center">{hotel.starRating * 2}</td>
    <td>
      <DrawerDrawer
        setMassage={setMassage}
        hotel={hotel}
        setOpenSnakeBar={setOpenSnackBar}
      />
    </td>
  </tr>
);
