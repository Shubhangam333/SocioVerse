import PropTypes from "prop-types";

const RadioButtonField = ({ id, name, value, label }) => {
  return (
    <div className="sm:flex sm:items-center gap-2">
      <label htmlFor={id} className="text-slate-950 mb-2">
        {label}
      </label>
      <input type="radio" id={id} name={name} value={value} />
    </div>
  );
};

export default RadioButtonField;

RadioButtonField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
