// Select.js
import React from 'react';

const SelectComponent = ({ label, value, options, onChange }) => {

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
     <div>
    <label>{label}</label>    
    <select value={value} className="form-control" onChange={handleChange}>
    <option disabled selected value="">
          -- Select an option --
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  </div>
  );
};

export default SelectComponent;
// const SelectComponent = ({ label, value, options, onChange }) => (
  

// );