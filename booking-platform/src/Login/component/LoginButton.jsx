import PropTypes from "prop-types";

export default function Button({ color, isSubmitting, size }) {
  return (
    <div className="flex flex-row items-center justify-center mt-4">
      <button
        type="submit"
        value="Login"
        className={`px-4  ${
          size === "large" ? "w-6/12" : size === "small" ? "w-3/12" : "w-4/12"
        }  border bg-${color}-300 rounded`}
        disabled={isSubmitting}
      >
        Login
      </button>
    </div>
  );
}

Button.propTypes = {
  color: PropTypes.string.isRequired, // Ensure color is passed and is a string
  isSubmitting: PropTypes.bool,
  size: PropTypes.string.isRequired,
};
