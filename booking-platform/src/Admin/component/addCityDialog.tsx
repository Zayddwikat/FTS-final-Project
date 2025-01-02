import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AddCityForm } from "./addCityForm";

export const CloseDialogBtn = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  return (
    <button onClick={handleClose}>
      <CloseIcon />
    </button>
  );
};
export const AddCityDialog: React.FC<any> = ({ handleClose, open }) => {
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
              <AddCityForm handleClose={handleClose} />
            </article>
            <CloseDialogBtn handleClose={handleClose} />
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
