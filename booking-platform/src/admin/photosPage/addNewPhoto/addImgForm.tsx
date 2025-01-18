import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { roomInformation } from "../../../data_models/roomInformation";
import { hotelObject } from "../../cityPage/cityDrawer/cityInformationDrawer";
import { CityInformation } from "../../../data_models/cities";
import { Button } from "../../../login/loginForm/loginButton";
import { useImageContext } from "../context/imageContext";

interface AddCityFormProps {
  handleClose: () => void;
  room?: roomInformation;
  hotel?: hotelObject;
  city?: CityInformation;
}

export const AddImgForm: React.FC<AddCityFormProps> = ({
  handleClose,
  room,
  hotel,
  city,
}) => {
  const validateSchema = Yup.object({
    imgUrl: Yup.string().required(),
  });

  const { addHotelImg, addImageToRoom, addCityImg } = useImageContext();

  return (
    <Formik
      initialValues={{ imgUrl: "" }}
      validationSchema={validateSchema}
      onSubmit={async (values) => {
        console.table(values);
        console.log("Clicked");
        if (room) {
          // add img to room
          await addImageToRoom(room.roomId, values.imgUrl);
        } else if (hotel) {
          // add img to hote
          await addHotelImg(hotel.id, values.imgUrl);
        } else if (city) {
          //add img to city
          await addCityImg(city.id, values.imgUrl);
        }
        handleClose();
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-4 w-10/12">
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="imgUrl">Image Url: </label>
            <Field
              name="imgUrl"
              id="imgUrl"
              placeholder="Image Url"
              className="p-2 border focus:border-black w-full"
              type="text"
            />
            {touched.imgUrl && errors.imgUrl && (
              <div style={{ color: "red" }}>This input is required</div>
            )}
          </div>
          <Button
            children=""
            className="self-center"
            color="blue"
            handleClick={() => {}}
            isSubmitting={false}
            primary={true}
            value="Add Image"
            size="small"
          />
        </Form>
      )}
    </Formik>
  );
};
export default AddImgForm;
