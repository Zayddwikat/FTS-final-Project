import UserNameField from "./userName";

export default {
  title: "UserNameField",
  component: UserNameField,
};
export const Default = {
  title: "UserNameField",
  args: {
    label: "User name",
    error: false,
  },
};
export const errorUserName = {
  title: "UserNameField",
  args: {
    label: "User name",
    error: true,
  },
};
