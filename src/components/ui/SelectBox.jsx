import React from 'react'

const SelectBox = ({formControl, inputChange, values}) => {
    return (
        <div className={formControl.required && formControl.touched && formControl.value === "" ? 'form-group mb-4 text-danger' : 'form-group mb-4'}>
            <label htmlFor={formControl.name} className='mb-2'>{formControl.name}</label>
            <select
                id={formControl.name}
                className={formControl.required && formControl.touched && formControl.value === "" ? 'form-control border-danger' : 'form-control'}
                name='status'
                value={formControl.value}
                onChange={(event) => inputChange(event, formControl)}>
                <option value="" hidden>Select {formControl.name}</option>
                {values.length && values.map((value, index) => (
                    <option value={value.name} key={index}>{value.name}</option>
                ))}
            </select>
            {
                formControl.required && formControl.touched && formControl.value === "" &&
                <p className="mt-2 text-danger">{formControl.description}</p>
            }
        </div>
    )
}

export default SelectBox