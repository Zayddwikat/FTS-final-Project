import { useFormik } from "formik";
import { UserNameField } from "../../../login/component/userName";
import { useState } from "react";

export const CustomerInformationForm: React.FC<any> = ({
  hotel,
  roomInformationObject,
  handleNext,
  formik,
}) => {
  const [cardSelected, setCardSelected] = useState<boolean>(false);

  return (
    <div className="md:w-[60%] border flex flex-col border-black px-8 items-start justify-start gap-8">
      <div className=" flex flex-row w-full  items-start justify-between gap-8">
        <div className="w-[45%]">
          <UserNameField
            id="customerName"
            label="Customer Name"
            formik={formik}
          />
        </div>
        <div className="w-[45%]">
          <UserNameField id="hotelName" label="Hotel Name" formik={formik} />
        </div>
      </div>
      <div className="flex flex-row flex-wrap w-full gap-8 justify-start">
        <label
          className="flex gap-2 font-bold items-center "
          htmlFor="roomNumber"
        >
          Room number:
          <p className="font-bold  text-md">
            {roomInformationObject.roomNumber}
          </p>
        </label>
        <label className="flex gap-2 items-center font-bold" htmlFor="roomType">
          Room Type:
          <p className="font-bold  text-md">{roomInformationObject.roomType}</p>
        </label>
        <label
          className="flex gap-2 font-bold text-lg items-center"
          htmlFor="roomType"
        >
          Cost:
          <p className="font-bold text-blue-400 text-md">
            ${roomInformationObject.price}
          </p>
        </label>
        <label className="flex gap-2 font-bold items-center" htmlFor="roomType">
          Date Time Booking:
          <p className="font-bold text-md">
            {formatTimestampWithoutSeconds(new Date().toISOString())}
          </p>
        </label>
        <label
          className="flex gap-2 font-bold mb-8 items-center"
          htmlFor="paymentMethod"
        >
          payment method:
          <select
            id="paymentMethod"
            name="paymentMethod"
            onChange={(e) => {
              formik.handleChange(e);
              if (e.currentTarget.value === "CreditCard") {
                setCardSelected((prev) => !prev);
                handleNext();
              } else {
                handleNext();
                handleNext();
              }
            }}
          >
            <option value="" disabled selected>
              Select One
            </option>
            <option value="Cash">Cash</option>
            <option value="CreditCard">Credit Card</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export function formatTimestampWithoutSeconds(isoString: string): string {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}${" ----     "}${hours}:${minutes}`;
}
