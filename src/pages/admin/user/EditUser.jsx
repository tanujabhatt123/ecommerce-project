import React, { useCallback, useEffect, useState } from 'react'
import { modifyFormData } from '../../../helpers/formHelper';
import { useFormData } from '../../../hooks/useFormData';
import { initialState } from './userValidation';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStart } from '../../../redux/action/user.action';
import TextInput from '../../../components/ui/TextInput';
import FileInput from '../../../components/ui/FileInput';
import SelectBox from '../../../components/ui/SelectBox';
import EmailInput from '../../../components/ui/EmailInput';
import PasswordInput from '../../../components/ui/PasswordInput';

const EditUser = () => {
  let { id } = useParams();

  let users = useSelector(state => state.user.users)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [formStatus, setFormStatus] = useState(true);
  let [formData, uploadFileStatus, setFormData, inputChange, uploadFiles] = useFormData([...initialState], "user");

  const submit = (event) => {
    event.preventDefault();
    let result = modifyFormData(formData);

    if (result.isFormValid) {
      dispatch(updateUserStart(result.modifyObject, id))

      setFormStatus(true)

      setFormData(initialState)

      setTimeout(() => {
        navigate("/admin/user")
      }, 1000)
    } else {
      setFormStatus(false)

      for (const formControl of formData) {
        formControl.touched = true;
      }

      setFormData((prevValues) => ([...prevValues]))
    }
  }

  const getUserById = useCallback((id) => {
    let user = users.find((user) => user.id === id);
    
    if(user) {
      for (const formControl of initialState) {
         for (const key in user) {
            if(key === formControl.name) {
              formControl.value = user[key]
            }
         }
      }

      setFormData((prevValue) => ([...prevValue]))
    }else {
      navigate('/admin/user')
    }

  }, [users, setFormData, navigate])

  useEffect(() => {
    getUserById(id)
  }, [id, getUserById])

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between ">
        <h5>Edit User</h5>
        <Link to="/admin/user" className='btn btn-primary btn-sm text-white'>Back</Link>
      </div>
      <div className="card-body">
        {!formStatus && <h5 className='text-danger text-center'>Please Enter all required Field</h5>}
        <form onSubmit={submit}>
          {initialState.length > 0 && initialState.map((state, index) => {
            if (state.type === "text") {
              return <TextInput formControl={state} inputChange={inputChange} key={index} />
            }

            if (state.type === "file") {
              return <FileInput formControl={state} uploadFiles={uploadFiles} key={index}  />
            }

            if (state.type === "email") {
              return <EmailInput formControl={state} inputChange={inputChange} key={index} disabled={true} />
            }

            if (state.type === "password") {
              return <PasswordInput formControl={state} inputChange={inputChange} key={index} disabled={true} />
            }

            if (state.type === "select") {
              if (state.name === "status") {
                return <SelectBox formControl={state} inputChange={inputChange} values={[{ name: "active" }, { name: "inactive" }]} key={index} />
              }

              if (state.name === "role") {
                return <SelectBox formControl={state} inputChange={inputChange} values={[{ name: "Admin" }, { name: "Customer" }]} key={index} />
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

export default EditUser