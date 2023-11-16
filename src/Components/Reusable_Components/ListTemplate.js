import React from 'react';

const ListTemplate = ({ columns, data, onEdit, onAccessDetails }) => {
    // console.log(data)
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column.label}</th>
          ))}
         
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
            
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column}>{item[column.value]}</td>
            ))}
            {onEdit &&
             <td>
               <button onClick={() => onEdit(item.id)}>Edit</button>
             </td>
             }
              {onAccessDetails &&
             <td>
               <button onClick={() => onAccessDetails(item.id)}>Access Details</button>
             </td>
              }
           </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListTemplate;
