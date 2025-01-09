import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { Button } from "../../login/component/loginButton";
import { useHotelContext } from "../context/hotelContext";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useRoomContext } from "../context/roomcontext";

export const AddRoomDialog: React.FC<any> = ({
  open,
  handleClose,
  handleConfirm,
  setOpenSnackBar,
  label,
  hotel,
}) => {
  const { addRoom } = useRoomContext();

  const confirmButton = async (values) => {
    console.table(values);
    await addRoom(hotel.id, values);
    await handleConfirm();
    handleClose();
    setOpenSnackBar(true);
  };

  const validateSchema = Yup.object({
    roomNumber: Yup.string().required(),
    cost: Yup.number().required(),
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "5px",
          },
        }}
      >
        <DialogContent>
          <DialogContentText className="w-full" id="alert-dialog-description">
            <article className="w-full flex flex-col items-start justify-center border border-black rounded gap-4 p-4">
              <p className="text-2xl">Edit Delete the {label} ?</p>
              <div className="w-full">
                <Formik
                  initialValues={{
                    roomNumber: "",
                    cost: 0,
                  }}
                  validationSchema={validateSchema}
                  onSubmit={async (values) => {
                    confirmButton(values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="flex flex-col gap-4 w-full">
                      <div className="flex flex-row items-center gap-2 w-full">
                        <div
                          className="w-7/12 flex flex-col  justify-center"
                          style={{ minHeight: "10px" }}
                        >
                          <label htmlFor="roomNumber">Hotel Name: </label>{" "}
                          <Field
                            name="roomNumber"
                            id="roomNumber"
                            placeholder="Room Number"
                            className="p-2 border focus:border-black "
                            type="text"
                          />
                          {touched.roomNumber && errors.roomNumber ? (
                            <div style={{ color: "red", minHeight: "20px" }}>
                              <p className="text-xs">This input is required</p>
                            </div>
                          ) : (
                            <div style={{ height: "20px" }}></div>
                          )}
                        </div>
                        <div className="w-5/12 flex flex-col justify-center">
                          <label className="w-auto" htmlFor="cost">
                            Cost
                          </label>
                          <Field
                            name="cost"
                            id="cost"
                            placeholder="cost"
                            className="p-2 border focus:border-black w-full "
                            type="number"
                          />
                          {touched.cost && errors.cost ? (
                            <div style={{ color: "red", minHeight: "20px" }}>
                              <p className="text-xs">This input is required</p>
                            </div>
                          ) : (
                            <div style={{ height: "20px" }}></div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-row items-center justify-center">
                        <Button
                          color={""}
                          size={"small"}
                          value={"Add"}
                          isSubmitting={false}
                          handleClick={() => {}}
                          className={""}
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
                    </Form>
                  )}
                </Formik>
              </div>
            </article>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};
