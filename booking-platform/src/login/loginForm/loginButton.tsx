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
  const buttonSize =
    size === "large"
      ? "w-full sm:w-auto px-6 py-3 text-lg"
      : size === "small"
      ? "w-auto px-4 py-2 text-sm"
      : size === "thick"
      ? "w-[6.99dvw] px-4 py-3 text-base"
      : "w-[10dvw] px-4 py-2 text-base";

  // Define button style based on the primary prop
  const buttonStyle = primary
    ? "bg-blue-500 hover:bg-blue-600 text-white border rounded-md"
    : "bg-transparent hover:bg-blue-500 text-blue-500 hover:text-black border border-blue-500 rounded-md";

  return (
    <button
      onClick={handleClick}
      type="submit"
      className={`${buttonSize} ${buttonStyle} ${className} disabled:opacity-50 transition-all duration-300`}
      disabled={isSubmitting}
    >
      {children}
      {value && <span className="ml-2">{value}</span>}
    </button>
  );
};
