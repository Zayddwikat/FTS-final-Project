import React from "react";
import { ReservationDetails } from "../../data_module/reservationInfo";
import { Button } from "../../Login/component/LoginButton";

interface ReservationTicketProps extends ReservationDetails {
  deleteReservation: (confirmationNumber: string) => void;
}

export const ReservationTicket: React.FC<ReservationTicketProps> = ({
  customerName,
  hotelName,
  roomNumber,
  roomType,
  bookingDateTime,
  totalCost,
  paymentMethod,
  bookingStatus,
  confirmationNumber,
  deleteReservation,
}) => {
  const handleDelete = () => {
    deleteReservation(confirmationNumber); 
  };

  return (
    <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto bg-white border shadow-lg rounded-xl relative overflow-hidden p-4">
      <div className="flex justify-between items-center bg-blue-600 text-white px-3 py-1.5 rounded-t-lg">
        <h2 className="text-xs sm:text-sm font-semibold">Reservation Ticket</h2>
        <p className="text-xs sm:text-sm font-medium">{bookingStatus}</p>
      </div>

      <div className="p-3">
        <div className="flex flex-col gap-1.5">
          <p className="text-xs sm:text-sm font-medium">
            Customer: <span className="font-normal">{customerName}</span>
          </p>
          <p className="text-xs sm:text-sm font-medium">
            Hotel: <span className="font-normal">{hotelName}</span>
          </p>
          <p className="text-xs sm:text-sm font-medium">
            Room:{" "}
            <span className="font-normal">
              #{roomNumber} ({roomType})
            </span>
          </p>
          <p className="text-xs sm:text-sm font-medium">
            Booking Date:{" "}
            <span className="font-normal">
              {new Date(bookingDateTime).toLocaleString()}
            </span>
          </p>
          <p className="text-xs sm:text-sm font-medium">
            Payment Method: <span className="font-normal">{paymentMethod}</span>
          </p>
          <p className="text-xs sm:text-sm font-medium">
            Total Cost: <span className="font-normal">${totalCost}</span>
          </p>
          <p className="text-xs sm:text-sm font-medium">
            Confirmation No.:{" "}
            <span className="font-mono text-blue-600">
              {confirmationNumber}
            </span>
          </p>
        </div>
      </div>

      <div className="border-t border-dashed my-3"></div>

      <div className="flex justify-center">
        <div className="bg-gray-100 p-3 rounded-md shadow-inner">
          <p className="text-xs sm:text-sm text-gray-500 text-center mb-1.5">
            Scan for Details
          </p>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
              confirmationNumber
            )}&size=80x80`}
            alt="QR Code"
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Button
          color="red"
          size="small"
          value="Delete Reservation"
          isSubmitting={false}
          handleClick={handleDelete}
          className="bg-red-500 text-white"
          primary={true}
          children={undefined}
        />
      </div>
    </div>
  );
};
