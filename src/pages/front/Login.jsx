
import React, { useCallback, useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import Styles from "./LoginForm.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { initialState } from './loginValidation';
import { useFormData } from '../../hooks/useFormData';
import EmailInput from '../../components/ui/EmailInput';
import PasswordInput from '../../components/ui/PasswordInput';
import { modifyFormData } from '../../helpers/formHelper';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase.config';
import { getUserStart, loginUserStart } from '../../redux/action/user.action';

const Login = () => {
  let users = useSelector(state => state.user.users)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [formStatus, setFormStatus] = useState(true);
  let [errorMessage, setErrorMessage] = useState("Please Enter all required Field");
  let [formData, , setFormData, inputChange] = useFormData(initialState, "");

  const submit = async (event) => {
    event.preventDefault();

    let result = modifyFormData(formData);

    if (result.isFormValid) {
      try {

        let userCredential = await signInWithEmailAndPassword(auth, result.modifyObject.email, result.modifyObject.password)

        let user = users.find((usr) => usr.uid === userCredential.user.uid)

        if (user) {
          dispatch(loginUserStart({ ...user }))

          setTimeout(() => {
            navigate("/admin/dashboard")
          }, 1000)

        } else {
          setFormStatus(false);
          setErrorMessage("Email id and password does not exists");
        }

      } catch (error) {
        setFormStatus(false);
        setErrorMessage("Email id and password does not exists");
      }

    } else {
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
    dispatch(getUserStart())
  }, [setDefaultValue,dispatch])

  return (
    <>
      <Breadcrumb marginTop={"150px"} />

      <div className='container mt-4'>
        <div className={`row ${Styles.mainContent} bg-success`}>
          <div className={`col-md-12 col-xs-12 col-sm-12 ${Styles.loginForm}`}>
            <div className="container-fluid">
              <div className="row mt-4 text-center">
                <h2>Login</h2>
              </div>
              <div className="row">
                <form className="form-group" onSubmit={submit}>
                  {!formStatus && <h5 className='text-danger text-center'>{errorMessage}</h5>}

                  {initialState.length > 0 && initialState.map((state, index) => {

                    if (state.name === "email") {
                      return <EmailInput formControl={state} inputChange={inputChange} key={index} />
                    }

                    if (state.name === "password") {
                      return <PasswordInput formControl={state} inputChange={inputChange} key={index} />
                    }

                    return null;
                  })}
                  <div className='d-grid'>

                    <button className="btn btn-primary py-2 text-white">Submit</button>
                  </div>
                </form>
              </div>
              <div className="row text-center mt-4">
                <p>Do not have an account? <Link to="/register">Register</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login