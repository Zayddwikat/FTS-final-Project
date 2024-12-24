import PropTypes from "prop-types";

interface ButtonProps {
  color: string;
  size: string;
  value: string;
  isSubmitting: boolean;
  handleClick: () => any;
  className: string;
  children: React.ReactNode;
  primary: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  color,
  isSubmitting,
  size,
  value,
  handleClick,
  className,
  children,
  primary,
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
        } ${
          primary
            ? `border bg-blue-300 rounded`
            : `underline text-blue-500`
        } ` + className
      }
      disabled={isSubmitting}
    >
      {children}
      {value}
    </button>
  );
};
