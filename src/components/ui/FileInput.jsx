import React, { useState } from "react";

const FileInput = ({ formControl, uploadFiles }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      uploadFiles(event, formControl);
    }
  };

  return (
    <div
      className={
        formControl.required && formControl.touched && formControl.value === ""
          ? "form-group mb-4 text-danger"
          : "form-group mb-4"
      }
    >
      <label htmlFor={formControl.name} className="mb-2">
        {formControl.name}
      </label>
      <input
        type="file"
        id={formControl.name}
        className={
          formControl.required && formControl.touched && formControl.value === ""
            ? "form-control border-danger"
            : "form-control"
        }
        onChange={handleFileChange}
      />
      {file && (
        <div className="mt-2">
          <img src={URL.createObjectURL(file)} alt="" height={"50px"} />
        </div>
      )}
      {formControl.required && formControl.touched && formControl.value === "" && (
        <p className="mt-2 text-danger">{formControl.description}</p>
      )}
    </div>
  );
};

export default FileInput;
