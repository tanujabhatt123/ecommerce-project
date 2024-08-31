import React from 'react'

const TextInput = ({ formControl, inputChange }) => {
    return (
        <div className={formControl.required && formControl.touched && formControl.value === "" ? 'form-group mb-4 text-danger' : 'form-group mb-4'}>
            <label htmlFor={formControl.name} className='mb-2'>{formControl.name}</label>
            <input
                type="text"
                id={formControl.name}
                className={formControl.required && formControl.touched && formControl.value === "" ? 'form-control border-danger' : 'form-control'}
                name={formControl.name}
                value={formControl.value}
                onChange={(event) => inputChange(event, formControl)} />
            {
                formControl.required && formControl.touched && formControl.value === "" &&
                <p className="mt-2 text-danger">{formControl.description}</p>
            }
        </div>
    )
}

export default TextInput