import { PasswordField } from "./passwordField";
import { UserNameField } from "./userName";
import { useFormik } from "formik";
import "../../tailwindCss.css";
import { Button } from "./LoginButton";
import PropTypes from "prop-types";
import { useLoginContext } from "../Context/LoginContext";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  passwordError: boolean;
}

export const LoginForm: React.FC<ButtonProps> = ({ passwordError }) => {
  const navigate = useNavigate();
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
        (await data.userType) === "User"
          ? navigate("/Home")
          : alert("Invalid Credentials");
      } catch (error: any) {
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
        <div className="flex w-full flex-row items-center justify-center">
          <Button
            handleClick={() => {}}
            color="blue"
            size="large"
            value="Login"
            isSubmitting={false}
            className=""
          />
        </div>
      </form>
    </main>
  );
};
