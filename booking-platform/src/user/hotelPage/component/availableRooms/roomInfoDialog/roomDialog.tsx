import { useQuery } from "@tanstack/react-query";
import { getRoomGallery } from "./getRoomGallery";
import { ErrorPage } from "../../../../../ErrorPage";
import { LoadingScreen } from "../../../../../component/loadingPage";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DialogImageContainer } from "./dialogImageContainer";
import { RoomDialogInformation } from "./roomDialogInformation";

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
export const DialogDemo: React.FC<any> = ({
  handleClose,
  open,
  element,
  handleOpenCheckOut,
  index,
}) => {
  const roomGallery = useQuery({
    queryKey: ["roomGallery"],
    queryFn: () => {
      return getRoomGallery(element);
    },
  });
  if (roomGallery.error) return <ErrorPage />;
  if (roomGallery.isLoading) return <LoadingScreen />;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="lg"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px",
        },
      }}
    >
      <DialogContent>
        <DialogContentText className="w-full" id="alert-dialog-description">
          <div className="flex flex-row items-start">
            <article className="w-full flex flex-col md:flex-row lg:flex-row gap-2">
              <DialogImageContainer
                roomGallery={roomGallery}
                element={element}
              />
              <RoomDialogInformation
                element={element}
                handleOpenCheckOut={handleOpenCheckOut}
                index={index}
                handleClose={handleClose}
              />
            </article>
            <CloseDialogBtn handleClose={handleClose} />
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
