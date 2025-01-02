import { Button } from "../../../Login/component/LoginButton";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { AmenitiesInformation } from "../../../classes/amenitiesInformation";
import { useCartContext } from "../../Context/cartContext";

export const RoomDialogInformation: React.FC<any> = ({
  element,
  handleOpenCheckOut,
  index,
  handleClose,
}) => {
  
  return (
    <>
      <article className="flex flex-col w-full justify-between ">
        <div>
          <h2 className="text-2xl font-bold">Select {element.roomType} Room</h2>
          <ul className=" mx-5 list-disc">
            {element.roomAmenities.map(
              (amentias: AmenitiesInformation, index: number) => {
                return (
                  <>
                    <li className="text-blue-500" key={index}>
                      {amentias.name}
                    </li>
                    <p className="mx-3">{amentias.description}</p>
                  </>
                );
              }
            )}
          </ul>
          <div className="my-4">
            <div className="flex items-center gap-2 ">
              <EmojiPeopleIcon className="text-blue-500" />
              <h3>Capacity of Adults: {element.capacityOfAdults}</h3>
            </div>
            <div className="flex items-center gap-2 ">
              <ChildCareIcon className="text-blue-500" />
              <h3>Capacity of Children: {element.capacityOfChildren}</h3>
            </div>
          </div>
        </div>

        <div className="gap-4 self-end flex flex-row items-center justify-end">
          <p className="text-xl font-bold">${element.price}</p>
          <Button
            className=""
            color="blue"
            handleClick={() => {
              handleClose();
              handleOpenCheckOut(index);
            }}
            isSubmitting={false}
            size="small"
            value="Reserve"
            children={undefined}
            primary={true}
          />
        </div>
      </article>
    </>
  );
};
