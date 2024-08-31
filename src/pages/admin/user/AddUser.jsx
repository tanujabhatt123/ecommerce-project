import React, { useCallback, useEffect, useState } from 'react'
import { modifyFormData } from '../../../helpers/formHelper';
import { useFormData } from '../../../hooks/useFormData';
import { initialState } from './userValidation';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUserStart } from '../../../redux/action/user.action';
import TextInput from '../../../components/ui/TextInput';
import FileInput from '../../../components/ui/FileInput';
import SelectBox from '../../../components/ui/SelectBox';
import EmailInput from '../../../components/ui/EmailInput';
import PasswordInput from '../../../components/ui/PasswordInput';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase.config';

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [formStatus, setFormStatus] = useState(false);
  let [errorMessage, setErrorMessage] = useState("Please Enter all required Field");

  let [formData, uploadFileStatus,setFormData , inputChange, uploadFiles] = useFormData([...initialState], "user");

  const submit = async (event) => {
    event.preventDefault();
    let result = modifyFormData(formData);
    
    if(result.isFormValid) {
      try {
        let userCredential = await createUserWithEmailAndPassword(auth, result.modifyObject.email, result.modifyObject.password)

        dispatch(addUserStart({...result.modifyObject, uid : userCredential.user.uid}))
  
        setFormStatus(true)
  
        setFormData([...initialState])
  
        setTimeout(() => {
          navigate("/admin/user")
        }, 1000)
      } catch (error) {
        setFormStatus(true);
        setErrorMessage("Email id already exists");
      }
     
    }else {
      setFormStatus(true)

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
        <h5>Add User</h5>
        <Link to="/admin/user" className='btn btn-primary btn-sm text-white'>Back</Link>
      </div>
      <div className="card-body">
        {formStatus  && <h5 className='text-danger text-center'>{errorMessage}</h5>}
        <form onSubmit={submit}>
          {initialState.length > 0 && initialState.map((state, index) => {
            if(state.type === "text") {
              return <TextInput formControl={state} inputChange={inputChange} key={index}/>
            }

            if(state.type === "file") {
              return <FileInput formControl={state} uploadFiles={uploadFiles}  key={index} />
            }

            if(state.type === "email") {
              return <EmailInput formControl={state} inputChange={inputChange}  key={index} />
            }

            if(state.type === "password") {
              return <PasswordInput formControl={state} inputChange={inputChange}  key={index} />
            }

            if(state.type === "select") {
              if(state.name === "status") {
                return <SelectBox formControl={state} inputChange={inputChange} values={[{name: "active"}, {name:"inactive"}]} key={index} />
              }

              if(state.name === "role") {
                return <SelectBox formControl={state} inputChange={inputChange} values={[{name: "Admin"}, {name:"Customer"}]} key={index} />
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

export default AddUser