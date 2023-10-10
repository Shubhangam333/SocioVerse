import PropTypes from "prop-types";

const InputField = ({ type, name, id, label, placeholder }) => {
  return (
    <div className="flex flex-col my-4">
      <label htmlFor={id} className="text-slate-950 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className="py-2 px-4 w-80 self-stretch  focus:outline-none focus:border-2 border-slate-500 text-lg "
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
};

export default InputField;
