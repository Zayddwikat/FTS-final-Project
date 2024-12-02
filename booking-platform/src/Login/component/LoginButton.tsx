import PropTypes from "prop-types";

interface ButtonProps {
  color: string;
  size: string;
  value: string;
  isSubmitting: boolean;
  handleClick: () => void;
  className: string;
}

export const Button: React.FC<ButtonProps> = ({
  color,
  isSubmitting,
  size,
  value,
  handleClick,
  className,
}) => {
  return (
    <button
      onClick={handleClick}
      type="submit"
      value="Login"
      className={
        `px-4  ${
          size === "large"
            ? `w-full`
            : size === "small"
            ? "w-[5dvw]"
            : size === "thick"
            ? "w-[6.99dvw] "
            : "w-[10dvw]"
        }  border bg-blue-300 rounded` + className
      }
      disabled={isSubmitting}
    >
      {value}
    </button>
  );
};
