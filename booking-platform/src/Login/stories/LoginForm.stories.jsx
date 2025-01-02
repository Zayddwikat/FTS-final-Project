import LoginForm from "../component/LoginForm";

export default {
  title: "LoginForm",
  component: LoginForm,
};

export const Default = {
  title: "LoginForm",
  args: {},
};
export const emailError = {
  title: "LoginForm",
  args: {
    emailError: "Enter valid Email",
  },
};
export const passwordError = {
  title: "LoginForm",
  args: {
    passwordError: true,
  },
};
