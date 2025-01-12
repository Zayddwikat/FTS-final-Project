import { Dispatch, SetStateAction } from "react";
import { DeleteConfirmation } from "../../component/deleteConfirmation";

interface DeleteCityDialogProps {
  open: boolean;
  handleCloseDialog: () => void;
  handleDeleteCities: () => void;
  setOpenSnackBar: Dispatch<SetStateAction<boolean>>;
}

const DeleteCityDialog: React.FC<DeleteCityDialogProps> = ({
    open,
    handleCloseDialog,
    handleDeleteCities,
    setOpenSnackBar,
  }) => {
    return (
      <div className="p-4 sm:p-6">
        <DeleteConfirmation
          open={open}
          handleClose={handleCloseDialog}
          handleConfirm={handleDeleteCities}
          setOpenSnackBar={setOpenSnackBar}
          label="City"
        />
      </div>
    );
  };
  

export default DeleteCityDialog;
