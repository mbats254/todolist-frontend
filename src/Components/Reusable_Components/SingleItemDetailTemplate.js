// SingleItemDetailTemplate.js
import React from 'react';

const SingleItemDetailTemplate = ({ details, columns }) => {
 
  return (
    <div>
      {columns.map((column) => (
        <div key={column.field}>
          <strong>{column.label}:</strong> {details[column.field]}
        </div>
      ))}
    </div>
  );
};

export default SingleItemDetailTemplate;
