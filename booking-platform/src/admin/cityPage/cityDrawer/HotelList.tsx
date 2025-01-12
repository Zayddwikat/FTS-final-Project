import { Dispatch, SetStateAction } from "react";
import { HotelCard } from "../../hotelPage/hotelCard";
import { hotelObject } from "./cityInformationDrawer";

interface HotelListProps {
  hotels: hotelObject[];
  setOpenSnackBar: Dispatch<SetStateAction<boolean>>;
  cityId: number;
}

const HotelList: React.FC<HotelListProps> = ({
  hotels,
  setOpenSnackBar,
  cityId,
}) => {
  return (
    <ul className="flex w-full flex-col gap-4">
      <HotelCard
        city={{ name: "plaza", id: cityId }}
        setOpenSnackBar={setOpenSnackBar}
      />
    </ul>
  );
};

export default HotelList;
