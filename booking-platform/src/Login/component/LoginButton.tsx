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
  // Determine the button size based on the 'size' prop
  const buttonSize = size === "large"
    ? "w-full"
    : size === "small"
    ? "w-auto px-3 py-1"
    : size === "thick"
    ? "w-[6.99dvw] px-4 py-2"
    : "w-[10dvw] px-4 py-2";

  // Conditional class names based on primary prop
  const buttonStyle = primary
    ? "bg-blue-300 text-white border rounded"
    : "underline text-blue-500 border-none";

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`${buttonSize} ${buttonStyle} ${className} disabled:opacity-50`}
      disabled={isSubmitting}
    >
      {children}
      {value && <span>{value}</span>}
    </button>
  );
};
