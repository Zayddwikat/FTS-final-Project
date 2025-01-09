import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { CloseDialogBtn } from "../HotelPage/component/roomDialog";
import { HotelInformationDialog } from "./component/hotelInformation";
import { roomInformation } from "../../data_models/roomInformation";

export const CartPage: React.FC<any> = ({
  handleClose,
  open,
  room,
  hotel,
  checkIn,
  checkOut,
  searchOption,
}: {
  room: roomInformation;
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "8px",
        },
      }}
    >
      <DialogContent>
        <DialogContentText className="w-full" id="alert-dialog-description">
          <div className="flex flex-row items-start">
            <article className="w-full flex flex-row gap-2">
              <HotelInformationDialog
                roomInformationObject={room}
                hotel={hotel}
                checkIn={checkIn}
                checkOut={checkOut}
                searchOption={searchOption}
              />
            </article>
            <CloseDialogBtn handleClose={handleClose} />
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
