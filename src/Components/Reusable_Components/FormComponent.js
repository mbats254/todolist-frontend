import React, { useState, useEffect } from 'react';
import InputComponent from '../Template_Components/InputComponent';
import TextareaComponent from '../Template_Components/TextAreaComponent';
import SelectComponent from '../Template_Components/SelectComponent';
import axios from 'axios'; // Import Axios
import { API_ROUTES, API_DOMAIN } from './apiConfig';

  const FormComponent = ({ fields, route, initialFormData, redirectRoute  }) => {
    // console.log(Object.keys(initialFormData).length)
    
  const defaultValues = {};
  const [formData, setFormData] = useState(initialFormData || {});
  const [submitResult, setSubmitResult] = React.useState(null);
  const [isLoading, setLoading] = useState(false);
    fields.forEach((field) => {
      if (field.value !== undefined) {       
        defaultValues[field.name] = field.value;       
      }


    
    });
  
  useEffect(() => {     
      //first test if the data is already present for update purposes   
    if (initialFormData) {
      // Set initial form data if provided      
      setFormData(initialFormData);
    }
  }, [initialFormData]);
  
  const handleChange = (fieldName, value) => { 
       
    setFormData((prevData) => ({ ...prevData, ...defaultValues, [fieldName]: value }));
  };

   const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true)
      const apiUrl = Object.keys(initialFormData).length > 0 ? `${API_DOMAIN}${API_ROUTES[route]}/${formData['id']}/` : `${API_DOMAIN}${API_ROUTES[route]}`;
        // Retrieve the token from localStorage
        
        const token = localStorage.getItem('token');
       
      
       const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`  }
     
       const hasFileInput = fields.some((field) => field.type === 'file' && formData[field.name]);

       if (hasFileInput) {
         // If there's a file, set the appropriate Content-Type for file upload
         headers['Content-Type'] = 'multipart/form-data';
         headers['Authorization'] = `Bearer ${token}`;
       }

     
      // Check if initialFormData exists to determine whether to use POST or PUT
      const axiosMethod = Object.keys(initialFormData).length > 0 ? axios.put : axios.post;
      const formDataObject = new FormData();

        // Append fields to FormData
        fields.forEach((field) => {
          if (field.type === 'file' && formData[field.name]) {
            // Append file to FormData
            formDataObject.append(field.name, formData[field.name]);
          } else {
            // Append other fields
            formDataObject.append(field.name, formData[field.name] || '');
          }
        });
   
      const response = await axiosMethod(apiUrl, formDataObject, { headers });
      setLoading(false)
      
        console.log(response.status)
      if(response.status === 200) {
        console.log('Response from the backend:', response.data);
        setSubmitResult({ success: true, message: 'Data submitted successfully!' });
       if(response.data['success']['token'])
       {
          localStorage.setItem('token',response.data['success']['token'])
       }
      if(redirectRoute)
      {

          window.location.href = redirectRoute
      }
      
      
      } 
      else if(response.status === 201) {
        console.log('Response from the backend:', response.data);
        setSubmitResult({ success: true, message: 'Data submitted successfully!' });
       if(response.data['success']['token'])
       {
          localStorage.setItem('token',response.data['success']['token'])
       }
      if(redirectRoute)
      {

          window.location.href = redirectRoute
      }
      
    }
      
      
      else {
        console.log('Response from the backend:', response.data);
        setSubmitResult({ success: false, message: 'Failed to submit data' });
      }
    } catch (error) {
      
      setSubmitResult({ success: false, message: 'Error submitting data' });
      console.log('Error submitting data:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
      {fields.map((field) => {
        switch (field.type) {
          case 'textarea':
            return (
              <TextareaComponent
                key={field.name}
                label={field.label}
                value={formData[field.name] || field.value ||''}
                onChange={(value) => handleChange(field.name, value)}
              />
            );
          case 'select':
            return (
              <SelectComponent
                key={field.name}
                label={field.label}
                options={field.options}
                value={formData[field.name] || ''}
                onChange={(value) => handleChange(field.name, value)}
              />
            );
            case 'file':
              return (
                <InputComponent
                  key={field.name}
                  label={field.label}
                  type={field.type}
                  onChange={(e) => handleChange(field.name, e.target.files[0], true)}
                />
              );
            case 'checkbox':
              return (
                <InputComponent
                  key={field.name}
                  label={field.label}
                  type={field.type}
                  checked={formData[field.name] || false}
                  onChange={(e) => handleChange(field.name, e.target.checked)}
                />
              );
          default:
            return (
              <InputComponent
                key={field.name}
                label={field.label}
                type={field.type}
                value={formData[field.name] || field.defaultValue || field.value || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
               
                readOnly={field.readOnly} // Pass readOnly
              />
            );
        }
      })}
      <button type="submit">{isLoading ? 'Loading'  : 'Submit'}</button>

      {submitResult && (
        <div style={{ marginTop: '10px', color: submitResult.success ? 'green' : 'red' }}>
          {submitResult.message}
        </div>
      )}
    </form>
  );
};

export default FormComponent;
