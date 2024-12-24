import { Field, Form, Formik } from "formik";
import { addCity } from "../hooks/addCity";
import { Button } from "../../Login/component/LoginButton";
import * as Yup from "yup";

interface AddCityFormProps {
  cities: [];
  setCities: ([]) => void;
  handleClose: () => void;
}

export const AddCityForm: React.FC<AddCityFormProps> = ({
  cities,
  setCities,
  handleClose,
}) => {
  const validateSchema = Yup.object({
    cityName: Yup.string().required(),
    cityDescription: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={{ cityName: "", cityDescription: "" }}
      validationSchema={validateSchema}
      onSubmit={async (values) => {
        console.table(values);
        console.log("Clicked");
        const data = await addCity(values);
        setCities([...cities, data]);
        handleClose();
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-4 w-10/12">
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="cityName">City Name: </label>
            <Field
              name="cityName"
              id="cityName"
              placeholder="City name"
              className="p-2 border focus:border-black w-full"
              type="text"
            />
            {touched.cityName && errors.cityName && (
              <div style={{ color: "red" }}>This input is required</div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="cityDescription">City Description: </label>
            <Field
              name="cityDescription"
              id="cityDescription"
              as="textarea"
              type="textarea"
              className="border border-black px-2 py-1 rounded w-full"
              placeholder="City description"
            />
            {touched.cityDescription && errors.cityDescription && (
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
            value="Add City"
            size="small"
          />
        </Form>
      )}
    </Formik>
  );
};