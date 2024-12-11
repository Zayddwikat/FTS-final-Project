import PropTypes from "prop-types";

interface ButtonProps {
  color: string;
  size: string;
  value: string;
  isSubmitting: boolean;
  handleClick: () => void;
  className: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  color,
  isSubmitting,
  size,
  value,
  handleClick,
  className,
  children,
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
            ? ""
            : size === "thick"
            ? "w-[6.99dvw] "
            : "w-[10dvw]"
        }  border bg-blue-300 rounded` + className
      }
      disabled={isSubmitting}
    >
      {children}
      {value}
    </button>
  );
};
