import {
  Avatar,
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
} from "@mui/material";
import ReviewObjectInfo from "../../../data_models/reviewsObjectInfo";
import { CloseDialogBtn } from "./roomDialog";

interface ReviewPopOverProps {
  review: ReviewObjectInfo;
  handleClose: (index: number) => void;
  open: boolean;
}

export const ReviewPopOver: React.FC<ReviewPopOverProps> = ({
  review,
  handleClose,
  open,
}) => {
  return (
    <>
      {" "}
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
            <div className="flex flex-row items-center">
              <article className="w-full flex flex-row items-center gap-2">
                <div className="flex gap-2  justify-start ">
                  <Avatar
                    sx={{
                      width: 25,
                      height: 25,
                    }}
                  >
                    {review.customerName[0]}
                  </Avatar>
                  {review.customerName}
                </div>
                <Divider orientation="vertical" flexItem />
                <div className="flex flex-col items-start justify-between w-[80%]">
                  <p className="font-bold text-sm">
                    {" "}
                    Reviewed at: {new Date().toISOString().split("T")[0]}
                  </p>
                  <div className="flex items-start justify-between w-full">
                    <p className="text-xl">{review.description}</p>
                    <p className="text-md border text-white bg-blue-700 p-1 rounded-md">
                      {review.rating * 2}
                    </p>
                  </div>
                </div>
              </article>
              <CloseDialogBtn handleClose={handleClose} />
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};
