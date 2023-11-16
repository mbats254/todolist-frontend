// InputComponent.js
import React from 'react';

const InputComponent = ({ label, type, value, onChange, readOnly, defaultValue }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} readOnly={readOnly}
          defaultValue={defaultValue} />
    </div>
  );
};

export default InputComponent;
