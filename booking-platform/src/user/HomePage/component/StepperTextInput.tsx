import PropTypes from "prop-types";
import { FormikProps } from "formik";

interface StepperTextInputProps {
  elem: string;
  formik: FormikProps<any>;
}

export const StepperTextInput: React.FC<StepperTextInputProps> = ({
  elem,
  formik,
}) => {
  const tagName = elem[0].toUpperCase() + elem.slice(1);
  return (
    <div className="flex flex-col">
      <label htmlFor={elem} className="text-sm">
        {tagName}
      </label>
      <input
        onChange={formik.handleChange}
        className="rounded w-full p-2 border border-black"
        type="number"
        name={elem}
        id={elem}
        min={0}
        max={elem === "rate" ? 5 : undefined}
        value={formik.values[elem]}
        placeholder={tagName}
      />
    </div>
  );
};
