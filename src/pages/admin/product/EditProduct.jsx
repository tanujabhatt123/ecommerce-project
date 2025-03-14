import React, { useCallback, useEffect, useState } from 'react'
import { initialState } from './productValidation'
import { useFormData } from '../../../hooks/useFormData'
import { Link, useNavigate, useParams } from 'react-router-dom';
import TextInput from '../../../components/ui/TextInput';
import TextArea from '../../../components/ui/TextArea';
import Number from '../../../components/ui/Number';
import SelectBox from '../../../components/ui/SelectBox';
import { useDispatch, useSelector } from 'react-redux';
import FileInput from './../../../components/ui/FileInput';
import { modifyFormData } from '../../../helpers/formHelper';
import { updateProductStart } from '../../../redux/action/product.action';

const EditProduct = () => {
  let categories = useSelector(state => state.category.categories);
  let products = useSelector(state => state.product.products)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  let [formStatus, setFormStatus] = useState(true);
  let [formData, uploadFileStatus, setFormData, inputChange, uploadFiles] = useFormData(initialState, "product");

  const submit = (event) => {
    event.preventDefault();
    let result = modifyFormData(formData);

    if (result.isFormValid) {
      dispatch(updateProductStart(result.modifyObject, id))

      setFormStatus(true)

      setTimeout(() => {
        navigate("/admin/product")
      }, 1000)
    } else {
      setFormStatus(false)

      for (const formControl of formData) {
        formControl.touched = true;
      }

      setFormData((prevValues) => ([...prevValues]))
    }
  }

  const getProductById = useCallback((id) => {
    let product = products.find((product) => product.id === id);
    
    if(product) {
      for (const formControl of initialState) {
         for (const key in product) {
            if(key === formControl.name) {
              formControl.value = product[key]
            }
         }
      }

      setFormData((prevValue) => ([...prevValue]))
    }else {
      navigate('/admin/product')
    }

  }, [products, setFormData, navigate])

  useEffect(() => {
    getProductById(id)
  }, [id, getProductById])

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between ">
        <h5>Edit Product</h5>
        <Link to="/admin/product" className='btn btn-primary btn-sm text-white'>Back</Link>
      </div>
      <div className="card-body">
        {!formStatus && <h5 className='text-danger text-center'>Please Enter all required Field</h5>}
        <form onSubmit={submit}>
          {initialState.length > 0 && initialState.map((state, index) => {
            if (state.type === "text") {
              return <TextInput formControl={state} inputChange={inputChange} key={index} />
            }

            if (state.type === "file") {
              return <FileInput formControl={state} uploadFiles={uploadFiles} key={index} />
            }

            if (state.type === "textarea") {
              return <TextArea formControl={state} inputChange={inputChange} key={index} />
            }

            if (state.type === "number") {
              return <Number formControl={state} inputChange={inputChange} key={index} />
            }

            if (state.type === "select") {
              if (state.name === "status") {
                return <SelectBox formControl={state} inputChange={inputChange} values={[{ name: "active" }, { name: "inactive" }]} key={index} />
              }

              if (state.name === "type") {
                return <SelectBox formControl={state} inputChange={inputChange} values={[{ name: "simple" }, { name: "virtual" }]} key={index} />
              }

              if (state.name === "category") {
                return <SelectBox formControl={state} inputChange={inputChange} values={categories} key={index} />
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

export default EditProduct