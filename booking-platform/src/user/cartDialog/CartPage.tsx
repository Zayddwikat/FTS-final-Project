import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { CloseDialogBtn } from "../hotelPage/component/availableRooms/roomInfoDialog/roomDialog";
// import { HotelInformationDialog } from "./checkOutCheckInPage/hotelInformation";
import { roomInformation } from "../../data_models/roomInformation";
import { HotelInformationDialog } from "./checkOutCheckInPage/hotelInformation";
import { hotelInformation } from "../../data_models/hotelInformation";

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
  handleClose: () => void;
  open: boolean;
  hotel: hotelInformation;
  checkIn: string;
  checkOut: string;
  searchOption: any;
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
