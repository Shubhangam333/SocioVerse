import PropTypes from "prop-types";

const InputField = ({
  type,
  name,
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  errorObj,
}) => {
  return (
    <div className="flex flex-col my-2">
      <label htmlFor={id} className="text-slate-950 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`py-1 px-4 w-80  focus:outline-none border-2 focus:border-slate-500 text-lg ${
          errorObj ? "border-red-500 " : null
        }`}
      />
    </div>
  );
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  errorObj: PropTypes.bool.isRequired,
};

InputField.defaultProps = {
  errorObj: false,
  onBlur: () => {},
};

export default InputField;
