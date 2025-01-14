import { useFormik } from "formik";
import "../../tailwindCss.css";
import { useLoginContext } from "./Context/loginContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { lazy, Suspense } from "react";
import { LoadingScreen } from "../../component/loadingPage";
interface ButtonProps {
  passwordError: boolean;
}

const UserNameField = lazy(() => import("./userName"));
const PasswordField = lazy(() => import("./passwordField"));
const Button = lazy(() => import("./loginButton"));

export const LoginForm: React.FC<ButtonProps> = ({ passwordError }) => {
  const navigate = useNavigate();
  const { Login } = useLoginContext();

  const validateSchema = Yup.object({
    userName: Yup.string().required("User Name is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log(values);
        const data = await Login({
          email: values.userName,
          password: values.password,
        });
        if (data.userType === "User") {
          navigate("/Home");
          localStorage.setItem("USER_TOKEN", data.authentication);
        } else if (data.userType === "Admin") {
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
        <Suspense fallback={<LoadingScreen />}>
          <UserNameField
            id="userName"
            label="User Name"
            formik={formik}
            primary
            error={formik.touched.userName && formik.errors.userName}
          />
          <PasswordField
            label="Password"
            error={formik.touched.password && formik.errors.password}
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
        </Suspense>
      </form>
    </main>
  );
};
export default LoginForm;
