import PropTypes from "prop-types";
import { useLoginContext } from "../utils/LoginContext";

export default function Button({ color }) {
  const { Login } = useLoginContext(); // Destructure Login from the context

  const handleClickedButton = async () => {
    try {
      const data = await Login({ email: "Zayd", password: "123456789" });
      console.log("Login successful!");
      console.log(data);
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center mt-4">
      <input
        type="submit"
        value="Login"
        onClick={handleClickedButton}
        className={`px-4 w-6/12 border bg-${color}-300 rounded`}
      />
    </div>
  );
}

Button.propTypes = {
  color: PropTypes.string.isRequired, // Ensure color is passed and is a string
};
