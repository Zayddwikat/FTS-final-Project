import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { Button } from "../../login/component/loginButton";
import { useHotelContext } from "../context/hotelContext";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useRoomContext } from "../context/roomcontext";

export const EditRoomDialog: React.FC<any> = ({
  open,
  handleClose,
  handleConfirm,
  setOpenSnackBar,
  label,
  room,
}) => {
  const { editRoom } = useRoomContext();

  const confirmButton = async (values) => {
    console.table(values);
    console.log(room.roomId);
    const data = await editRoom(room.roomId, values);
    console.log(data);

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
              <p className="text-2xl">Confirm Edit the {label} ?</p>
              <div className="w-full">
                <Formik
                  initialValues={{
                    roomNumber: room.roomNumber ?? "",
                    cost: room.price ?? 0,
                  }}
                  validationSchema={validateSchema}
                  onSubmit={async (values) => {
                    confirmButton(values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="flex flex-col gap-4 w-full">
                      <div className="flex flex-row items-start justify-center gap-2">
                        <div className="flex flex-col">
                          <label htmlFor="roomNumber">Room Number</label>
                          <Field
                            name="roomNumber"
                            id="roomNumber"
                            placeholder="Room number"
                            className="p-2 border focus:border-black "
                            type="text"
                          />
                          {touched.roomNumber && errors.roomNumber ? (
                            <div style={{ color: "red" }}>
                              This input is required
                            </div>
                          ) : (
                            <div style={{ height: "23px" }}></div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="cost">Cost</label>
                          <Field
                            name="cost"
                            id="cost"
                            placeholder="Cost"
                            className="p-2 border focus:border-black "
                            type="number"
                            min={0}
                          />
                          {touched.cost && errors.cost ? (
                            <div style={{ color: "red" }}>
                              This input is required
                            </div>
                          ) : (
                            <div style={{ height: "23px" }}></div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center">
                        <Button
                          color={""}
                          size={"small"}
                          value={"Edit"}
                          isSubmitting={false}
                          handleClick={() => {
                            handleConfirm();
                          }}
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
