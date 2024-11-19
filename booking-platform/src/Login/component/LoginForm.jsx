import PasswordField from "./passwordField";
import UserNameField from "./userName";
import { useFormik } from "formik";
import "../../tailwindCss.css";
import Button from "./LoginButton";
import PropTypes from "prop-types";
import { useLoginContext } from "../utils/LoginContext";

export default function LoginForm({ passwordError }) {
  const { Login } = useLoginContext();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      alert(JSON.stringify(values, null, 2));
      try {
        console.log(values);
        const data = await Login({
          email: values.userName,
          password: values.password,
        });
        console.log("Login successful!");
        console.log(data);
      } catch (error) {
        console.error("Error during login:", error.message);
      }
      setSubmitting(false);
    },
  });
  return (
    <main className="">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2 ">
        <UserNameField label="User Name" formik={formik} />
        <PasswordField
          label="Password"
          error={passwordError ? passwordError : false}
          formik={formik}
        />{" "}
        <Button color="orange" size="large" isSubmitting={false} />
      </form>
    </main>
  );
}

LoginForm.propTypes = {
  emailError: PropTypes.string,
  passwordError: PropTypes.bool,
};
