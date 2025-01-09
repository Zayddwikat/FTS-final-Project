import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { Button } from "../../login/component/loginButton";
import { useHotelContext } from "../context/hotelContext";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

export const AddHotelDialog: React.FC<any> = ({
  open,
  handleClose,
  handleConfirm,
  setOpenSnackBar,
  label,
  city,
}) => {
  const { addHotels } = useHotelContext();

  const confirmButton = async (values) => {
    console.table(values);
    await addHotels(values, city.id);
    await handleConfirm();
    handleClose();
    setOpenSnackBar(true);
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
                    name: "",
                    description: "",
                    hotelType: "",
                    starRating: "",
                    latitude: "",
                    longitude: "",
                  }}
                  validationSchema={validateSchema}
                  onSubmit={async (values) => {
                    confirmButton(values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="flex flex-col gap-4 w-full">
                      <div className="flex flex-row items-center gap-2">
                        <div
                          className="w-3/12 flex flex-col  justify-center"
                          style={{ minHeight: "10px" }}
                        >
                          <label htmlFor="cityName">Hotel Name: </label>{" "}
                          <Field
                            name="name"
                            id="cityName"
                            placeholder="Hotel name"
                            className="p-2 border focus:border-black "
                            type="text"
                          />
                          {touched.name && errors.name ? (
                            <div style={{ color: "red", minHeight: "20px" }}>
                              <p className="text-xs">This input is required</p>
                            </div>
                          ) : (
                            <div style={{ height: "20px" }}></div>
                          )}
                        </div>
                        <div className="w-2/12 flex flex-col justify-center">
                          <label className="w-auto" htmlFor="hotelType">
                            Hotel Type
                          </label>
                          <Field
                            name="hotelType"
                            id="hotelType"
                            placeholder="Hotel Type"
                            className="p-2 border focus:border-black w-full "
                            type="number"
                            min={0}
                            max={5}
                          />
                          {touched.hotelType && errors.hotelType ? (
                            <div style={{ color: "red", minHeight: "20px" }}>
                              <p className="text-xs">This input is required</p>
                            </div>
                          ) : (
                            <div style={{ height: "20px" }}></div>
                          )}
                        </div>
                        <div className="w-2/12 flex flex-col justify-center">
                          <label htmlFor="starRating">Hotel Rating</label>
                          <Field
                            name="starRating"
                            id="starRating"
                            placeholder="Star Rating"
                            className="p-2 border focus:border-black "
                            type="number"
                            min={0}
                            max={5}
                          />
                          {touched.starRating && errors.starRating ? (
                            <div style={{ color: "red", minHeight: "20px" }}>
                              <p className="text-xs">This input is required</p>
                            </div>
                          ) : (
                            <div style={{ height: "20px" }}></div>
                          )}
                        </div>
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
                            placeholder="Hotel description"
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
