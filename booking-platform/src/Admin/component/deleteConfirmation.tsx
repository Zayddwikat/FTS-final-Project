import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { Button } from "../../login/loginForm/loginButton";

export const DeleteConfirmation: React.FC<any> = ({
  open,
  handleClose,
  handleConfirm,
  setOpenSnackBar,
  label,
}) => {
  const confirmButton = async () => {
    await handleConfirm();
    handleClose();
    setOpenSnackBar(true);
  };
  return (
    <>
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
            <article className="w-full flex flex-col items-center justify-center border border-black rounded gap-4 p-4">
              <p className="text-2xl">Confirm Delete the {label} ?</p>
              <div className="flex flex-row items-center justify-center">
                <Button
                  color={""}
                  size={"small"}
                  value={"Delete"}
                  isSubmitting={false}
                  handleClick={confirmButton}
                  className={"bg-red-500 text-white"}
                  children={undefined}
                  primary={true}
                />
                <Button
                  color={""}
                  size={"small"}
                  value={"Cancel"}
                  isSubmitting={false}
                  handleClick={handleClose}
                  className={""}
                  children={undefined}
                  primary={false}
                />{" "}
              </div>
            </article>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};
