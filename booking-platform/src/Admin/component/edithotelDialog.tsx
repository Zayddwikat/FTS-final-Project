import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { Button } from "../../login/loginForm/loginButton";
import { useHotelContext } from "../context/hotelContext";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

export const EditHotelDialog: React.FC<any> = ({
  open,
  handleClose,
  handleConfirm,
  setOpenSnackBar,
  label,
  hotel,
}) => {
  const { handleEditHotel } = useHotelContext();
  const confirmButton = async (values) => {
    console.table(values);
    const data = await handleEditHotel(hotel, values);
    console.log(data);
    if (data) {
      await handleConfirm();
      handleClose();
      setOpenSnackBar(true);
    } else {
      console.log("error in editing");
    }
  };

  const validateSchema = Yup.object({
    name: Yup.string().required(),
    description: Yup.string().required(),
    hotelType: Yup.number().required(),
    starRating: Yup.number().required(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
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
                    name: hotel.name,
                    description: hotel.description,
                    hotelType: hotel.hotelType,
                    starRating: hotel.starRating * 2,
                    latitude: hotel.latitude,
                    longitude: hotel.longitude,
                  }}
                  validationSchema={validateSchema}
                  onSubmit={async (values) => {
                    confirmButton(values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="flex flex-col gap-4 w-full">
                      <div className="flex flex-row items-center   gap-2">
                        <label htmlFor="cityName">Hotel Name: </label>
                        <Field
                          name="name"
                          id="cityName"
                          placeholder="City name"
                          className="p-2 border focus:border-black "
                          type="text"
                        />
                        {touched.name && errors.name && (
                          <div style={{ color: "red" }}>
                            This input is required
                          </div>
                        )}
                        <label htmlFor="hotelType">Hotel Type</label>
                        <Field
                          name="hotelType"
                          id="hotelType"
                          placeholder="hotelType"
                          className="p-2 border focus:border-black "
                          type="number"
                          min={0}
                          max={10}
                        />
                        {touched.hotelType && errors.hotelType && (
                          <div style={{ color: "red" }}>
                            This input is required
                          </div>
                        )}
                        <label htmlFor="starRating">Hotel Rating</label>
                        <Field
                          name="starRating"
                          id="starRating"
                          placeholder="starRating"
                          className="p-2 border focus:border-black "
                          type="number"
                          min={0}
                          max={10}
                        />
                        {touched.hotelType && errors.hotelType && (
                          <div style={{ color: "red" }}>
                            This input is required
                          </div>
                        )}
                      </div>
                      <div className="flex flex-row">
                        <div className="w-7/12 flex flex-col">
                          <label htmlFor="hotelDescription">
                            Hotel Description:{" "}
                          </label>
                          <Field
                            name="description"
                            id="hotelDescription"
                            as="textarea"
                            type="textarea"
                            className="border border-black px-2 py-1 rounded w-11/12"
                            placeholder="City description"
                          />
                          {touched.description && errors.description && (
                            <div style={{ color: "red" }}>
                              This input is required
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="latitude">latitude</label>
                          <Field
                            name="latitude"
                            id="latitude"
                            type="text"
                            className="p-2 border focus:border-black "
                          />
                          {touched.latitude && errors.latitude && (
                            <div style={{ color: "red" }}>
                              This input is required
                            </div>
                          )}
                          <label htmlFor="latitude">longitude</label>
                          <Field
                            name="longitude"
                            id="longitude"
                            type="text"
                            className="p-2 border focus:border-black "
                          />
                          {touched.longitude && errors.longitude && (
                            <div style={{ color: "red" }}>
                              This input is required
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center">
                        <Button
                          color={""}
                          size={"small"}
                          value={"Edit"}
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
