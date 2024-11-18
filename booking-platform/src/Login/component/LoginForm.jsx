import PasswordField from "./passwordField";
import UserNameField from "./userName";
import { Formik, Form } from "formik";
import "../../tailwindCss.css";
import Button from "./LoginButton";
import PropTypes from "prop-types";

export default function LoginForm({ passwordError }) {
  return (
    <main>
      <Formik>
        <Form className="flex flex-col gap-2 ">
          <UserNameField label="User Name" />
          <PasswordField
            label="Password"
            error={passwordError ? passwordError : false}
          />
          <Button color="blue" />
        </Form>
      </Formik>
    </main>
  );
}

LoginForm.propTypes = {
  emailError: PropTypes.string,
  passwordError: PropTypes.bool,
};
