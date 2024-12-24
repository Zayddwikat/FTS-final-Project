import { Field, Form, Formik } from "formik";

import * as Yup from "yup";
import { Button } from "../../../../Login/component/LoginButton";
import { useAmenitiesContext } from "../../../context/amenitiesContext";
import { AmenitiesInformation } from "../../../../classes/amenitiesInformation";

interface AddCityFormProps {
  handleClose: () => void;
  amenity: AmenitiesInformation;
}

export const EditAmenitiesForm: React.FC<AddCityFormProps> = ({
  handleClose,
  amenity,
}) => {
  const { handleEditAmenityRoom } = useAmenitiesContext();

  const validateSchema = Yup.object({
    name: Yup.string().required(),
    description: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={{
        name: amenity?.name ?? "",
        description: amenity?.description ?? "",
      }}
      validationSchema={validateSchema}
      onSubmit={async (values) => {
        console.table(values);
        await handleEditAmenityRoom(amenity.id, values);
        console.log("Clicked");
        handleClose();
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-4 w-10/12">
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="name">Amenity Name: </label>
            <Field
              name="name"
              id="name"
              placeholder="Amenity name"
              className="p-2 border focus:border-black w-full"
              type="text"
            />
            {touched.name && errors.name ? (
              <div className="text-sm" style={{ color: "red" }}>
                This input is required
              </div>
            ) : (
              <div style={{ height: "23px" }}></div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Amenity Description: </label>
            <Field
              name="description"
              id="description"
              as="textarea"
              type="textarea"
              className="border border-black px-2 py-1 rounded w-full"
              placeholder="Amenity description"
            />
            {touched.description && errors.description ? (
              <div className="text-sm" style={{ color: "red" }}>
                This input is required
              </div>
            ) : (
              <div style={{ height: "23px" }}></div>
            )}
          </div>
          <Button
            children=""
            className="self-center"
            color="blue"
            handleClick={() => {}}
            isSubmitting={false}
            primary={true}
            value="Edit Amenity"
            size="small"
          />
        </Form>
      )}
    </Formik>
  );
};
