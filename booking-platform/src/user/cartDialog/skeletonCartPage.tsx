import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

export const CartPageSkeleton: React.FC<{ open: boolean; handleClose: () => void }> = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="skeleton-dialog-title"
      aria-describedby="skeleton-dialog-description"
      fullWidth
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "8px",
        },
      }}
    >
      <DialogContent>
        <DialogContentText className="w-full" id="skeleton-dialog-description">
          <div className="flex flex-row items-start">
            <article className="w-full flex flex-row gap-2">
              <div className="flex flex-col w-full gap-4">
                <Skeleton variant="rectangular" height={200} className="w-full rounded-lg" />
                <Skeleton variant="text" height={40} width="60%" />
                <Skeleton variant="text" height={30} width="80%" />
                <Skeleton variant="text" height={30} width="40%" />
              </div>
            </article>
            <Skeleton variant="circular" width={32} height={32} />
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default CartPageSkeleton;
