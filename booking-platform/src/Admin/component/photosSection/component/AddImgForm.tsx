import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useImageContext } from "../../../context/imageContext";
import { roomInformation } from "../../../../classes/roomInformation";
import { Button } from "../../../../Login/component/LoginButton";

interface AddCityFormProps {
  handleClose: () => void;
  room: roomInformation;
}

export const AddImgForm: React.FC<AddCityFormProps> = ({
  handleClose,
  room,
}) => {
  const validateSchema = Yup.object({
    imgUrl: Yup.string().required(),
  });

  const { addImageToRoom } = useImageContext();

  return (
    <Formik
      initialValues={{ imgUrl: "" }}
      validationSchema={validateSchema}
      onSubmit={async (values) => {
        console.table(values);
        console.log("Clicked");
        const data = await addImageToRoom(room.roomId, values.imgUrl);
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
