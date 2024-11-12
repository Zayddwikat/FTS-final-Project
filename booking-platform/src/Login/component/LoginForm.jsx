import PasswordField from "./passwordField";
import UserNameField from "./userName";
import { Formik, Form } from "formik";
import "../../tailwindCss.css";

import PropTypes from "prop-types";
export default function LoginForm({ passwordError }) {
  return (
    <main className="flex flex-col items-start justify-evenly p-8 bg-transparent">
      <h1 className="text-3xl self-start">Login</h1>
      {/* <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, setSubmitting) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {(errors) => (
          <form>
            <UserNameField
              label="User Name"
              error={errors.email ? errors.email : false}
            />
            <PasswordField
              label="Password"
              error={passwordError ? passwordError : false}
            />
            <div className="mt-4 flex flex-row items-center justify-center ">
              <input
                className="border px-4 rounded bg-green-300"
                type="submit"
                value="Login"
              />
            </div>
          </form>
        )}
      </Formik> */}

      <Formik>
        <Form>
          <UserNameField label="User Name" />
          <PasswordField
            label="Password"
            error={passwordError ? passwordError : false}
          />
          <div className=" flex flex-row items-center justify-center mt-4">
            <input
              type="submit"
              value="Login"
              className="px-4 border bg-green-300 rounded"
            />
          </div>
        </Form>
      </Formik>
    </main>
  );
}

LoginForm.propTypes = {
  emailError: PropTypes.string,
  passwordError: PropTypes.bool,
};
