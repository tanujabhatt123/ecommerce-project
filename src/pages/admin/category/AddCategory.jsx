import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addCategoryStart } from '../../../redux/action/category.action';
import { useFormData } from '../../../hooks/useFormData';
import { initialState } from './categoryValidation';
import SelectBox from '../../../components/ui/SelectBox';
import FileInput from '../../../components/ui/FileInput';
import TextInput from '../../../components/ui/TextInput';
import { modifyFormData } from '../../../helpers/formHelper';

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [formStatus, setFormStatus] = useState(true);
  let [formData, uploadFileStatus, setFormData , inputChange, uploadFiles] = useFormData(initialState, 'category')

  const submit = (event) => {
    event.preventDefault();
    let result = modifyFormData(formData);

    if(result.isFormValid) {
      dispatch(addCategoryStart(result.modifyObject))

      setFormStatus(true)

      setTimeout(() => {
        navigate("/admin/category")
      }, 1000)
    }else {
      setFormStatus(false)

      for (const formControl of formData) {
        formControl.touched = true;
      }

      setFormData((prevValues) => ([...prevValues]))
    }
  }

  const setDefaultValue = useCallback(() => {
    for (const formControl of initialState) {
       formControl.value = "";
       formControl.touched = false
   }

   setFormData((prevValue) => ([...prevValue]))
  }, [setFormData])


  useEffect(() => {
    setDefaultValue()
  }, [setDefaultValue]) 

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between ">
        <h5>Add Category</h5>
        <Link to="/admin/category" className='btn btn-primary btn-sm text-white'>Back</Link>
      </div>
      <div className="card-body">
        <form onSubmit={submit}>
          {!formStatus  && <h5 className='text-danger text-center'>Please Enter all required Field</h5>}

          {initialState.length > 0 && initialState.map((state, index) => {
            if (state.type === "text") {
              return <TextInput formControl={state} inputChange={inputChange} key={index} />
            }

            if (state.type === "file") {
              return <FileInput formControl={state} uploadFiles={uploadFiles} key={index} />
            }

            if (state.type === "select") {
              if (state.name === "status") {
                return <SelectBox formControl={state} inputChange={inputChange} values={[{ name: "active" }, { name: "inactive" }]} key={index} />
              }
            }

            return null;
          })}

          <div className='row'>
            <div className="col-sm-6 d-grid">
              <button
                type='submit'
                className='btn btn-primary text-white'
                disabled={uploadFileStatus}>Submit</button>
            </div>
            <div className="col-sm-6 d-grid">
              <button
                type='reset'
                className='btn btn-secondary text-white'
                disabled={uploadFileStatus}>Reset</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCategory