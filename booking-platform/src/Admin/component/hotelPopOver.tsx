import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { CloseDialogBtn } from "./addCityDialog";
import { hotelObject } from "./CityInformationDrawer";

interface hotelPopoverProps {
  open: any;
  handleClose: () => void;
  hotel: hotelObject;
}

export const HotelPopOver: React.FC<hotelPopoverProps> = ({
  handleClose,
  open,
  hotel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "5px",
        },
      }}
    >
      <DialogContent>
        <DialogContentText className="w-full" id="alert-dialog-description">
          <div className="flex flex-row items-start">
            <article className="w-full flex flex-col items-center border border-black rounded gap-4 py-5">
              {hotel.name}
            </article>
            <CloseDialogBtn handleClose={handleClose} />
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
