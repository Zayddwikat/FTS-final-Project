import { PasswordField } from "./passwordField";
import { UserNameField } from "./userName";
import { useFormik } from "formik";
import "../../tailwindCss.css";
import { Button } from "./loginButton";
import PropTypes from "prop-types";
import { useLoginContext } from "./Context/loginContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
interface ButtonProps {
  passwordError: boolean;
}

export const LoginForm: React.FC<ButtonProps> = ({ passwordError }) => {
  const navigate = useNavigate();
  const { Login } = useLoginContext();

  // const validateSchema = Yup.object({
  //   userName: Yup.string().required(),
  //   password: Yup.string().required(),
  // });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },

    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log(values);
        const data = await Login({
          email: values.userName,
          password: values.password,
        });
        if ((await data.userType) === "User") {
          navigate("/Home");
          localStorage.setItem("USER_TOKEN", data.authentication);
        } else if ((await data.userType) === "Admin") {
          navigate("/AdminHome");
          localStorage.setItem("ADMIN_TOKEN", data.authentication);
        } else {
          alert("Invalid Credentials");
        }
      } catch (error: any) {
        console.error("Error during login:", error.message);
      }
      setSubmitting(false);
    },
  });
  return (
    <main className="self-start flex flex-col ">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 justify-evenly"
      >
        <UserNameField
          id="userName"
          label="User Name"
          formik={formik}
          primary
        />
        <PasswordField
          label="Password"
          error={passwordError ? passwordError : false}
          formik={formik}
        />{" "}
        <div className="flex w-full my-4 flex-row items-center justify-center">
          <Button
            primary
            handleClick={formik.handleSubmit}
            color="blue"
            size=""
            value="Login"
            isSubmitting={false}
            className=""
            children={undefined}
          />
        </div>
      </form>
    </main>
  );
};
