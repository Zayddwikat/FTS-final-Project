import PropTypes from "prop-types";

export default function Button({
  color,
  isSubmitting,
  size,
  value,
  handleClick,
}) {
  return (
    <button
      onClick={handleClick}
      type="submit"
      value="Login"
      className={`px-4  ${
        size === "large"
          ? `w-[15dvw]`
          : size === "small"
          ? "w-[5dvw]"
          : size === "thick"
          ? "w-[6.99dvw] self-stretch"
          : "w-[10dvw]"
      }  border bg-orange-300 rounded`}
      disabled={isSubmitting}
    >
      {value}
    </button>
  );
}

Button.propTypes = {
  color: PropTypes.string.isRequired, // Ensure color is passed and is a string
  isSubmitting: PropTypes.bool,
  size: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};
