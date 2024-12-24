import { Divider } from "@mui/material";
import { formatDateToReadable } from "../hooks/formatDate";
import { onDateSub } from "../../HomePage/component/SearchPost";

interface checkIn_CheckOutSection {
  checkIn: string;
  checkOut: string;
}

export const CheckInCheckOutSection: React.FC<checkIn_CheckOutSection> = ({
  checkIn,
  checkOut,
}) => {
  const differenceInDays = onDateSub(checkIn, checkOut);
  return (
    <>
      {" "}
      <h3 className="font-bold">Your booking details</h3>
      <div className=" flex gap-2 ">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <h4 className="text">Check-In</h4>
            <h2 className="text-lg">{formatDateToReadable(checkIn)}</h2>
          </div>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className="flex flex-row">
          <div className="flex flex-col">
            <h4 className="text">Check-Out</h4>
            <h2 className="text-lg">{formatDateToReadable(checkOut)}</h2>
          </div>
        </div>
      </div>
      <div>
        <h3>Total length of stay: </h3>
        <p>{differenceInDays} Night</p>
      </div>
    </>
  );
};
