import { FormikProps } from 'formik';

interface StepperTextInputProps {
  elem: string;
  formik: FormikProps<any>;
}

export const StepperTextInput: React.FC<StepperTextInputProps> = ({
  elem,
  formik,
}) => {
  const tagName = elem[0].toUpperCase() + elem.slice(1);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value < 0) {
      formik.setFieldValue(elem, 0); // Reset to 0 if less than 0
    } else {
      formik.setFieldValue(elem, value);
    }
  };

  const incrementValue = () => {
    const currentValue = formik.values[elem] || 0;
    formik.setFieldValue(elem, currentValue + 1);
  };

  const decrementValue = () => {
    const currentValue = formik.values[elem] || 0;
    if (currentValue > 0) {
      formik.setFieldValue(elem, currentValue - 1);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Label */}
      <label htmlFor={elem} className="text-sm font-medium mb-2">
        {tagName}
      </label>
      <div className="flex items-center space-x-2">
        {/* Decrement Button */}
        <button
          type="button"
          onClick={decrementValue}
          className="text-xl font-bold text-gray-700"
        >
          -
        </button>
        
        {/* Input Field */}
        <input
          onChange={handleChange}
          className="w-16 text-center p-2 border border-black rounded"
          type="number"
          name={elem}
          id={elem}
          min={0}
          value={formik.values[elem] || 0}
          placeholder={tagName}
          readOnly
        />
        
        {/* Increment Button */}
        <button
          type="button"
          onClick={incrementValue}
          className="text-xl font-bold text-gray-700"
        >
          +
        </button>
      </div>
    </div>
  );
};
