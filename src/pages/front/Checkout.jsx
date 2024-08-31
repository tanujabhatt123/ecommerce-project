import React, { useCallback, useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import { useFormData } from '../../hooks/useFormData'
import { initialState } from './checkoutValidation';
import TextInput from './../../components/ui/TextInput';
import { modifyFormData } from '../../helpers/formHelper';
import EmailInput from '../../components/ui/EmailInput';
import { placeOrderStart } from '../../redux/action/order.action';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  let currentCart = useSelector(state => state.cart.currentCart)
  let [formStatus, setFormStatus] = useState(true);


  let [errorMessage, setErrorMessage] = useState("Please Enter all required Field");
  let [formData, , setFormData, inputChange] = useFormData(initialState, "");

  const submit = async (event) => {
    event.preventDefault();

    let result = modifyFormData(formData);

    if (result.isFormValid) {

      let orderObject = {...currentCart, billingAddress: result.modifyObject}

      dispatch(placeOrderStart(orderObject));

      setTimeout(() => {
        navigate("/thank-you")
      }, 1000)
      
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
  }, [setDefaultValue])

  return (
    <>

      {/* <!-- Single Page Header start --> */}
      <Breadcrumb marginTop={"150px"} />
      {/* <!-- Single Page Header End --> */}


      {/* <!-- Checkout Page Start --> */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <h1 className="mb-4">Billing details</h1>
          <form onSubmit={submit}>
            <div className="row g-5">
              <div className="col-md-12 col-lg-6 col-xl-7">

                {!formStatus && <h5 className='text-danger text-center'>{errorMessage}</h5>}

                {initialState.length > 0 && initialState.map((state, index) => {

                  if (state.type === "text") {
                    return <TextInput formControl={state} inputChange={inputChange} key={index} />
                  }

                  if (state.type === "email") {
                    return <EmailInput formControl={state} inputChange={inputChange} key={index} />
                  }

                  return null;
                })}
              </div>
              <div className="col-md-12 col-lg-6 col-xl-5">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Products</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentCart.items.length > 0 && currentCart.items.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">
                              <div className="d-flex align-items-center mt-2">
                                <img src={item.image} className="img-fluid rounded-circle" style={{ height: "90px", width: "90px" }} alt={item.name} />
                              </div>
                            </th>
                            <td className="py-5">{item.name}</td>
                            <td className="py-5">${item.price}</td>
                            <td className="py-5">{item.purchaseQuantity}</td>
                            <td className="py-5">${item.price * item.purchaseQuantity}</td>
                          </tr>
                        ))
                      }


                      <tr>
                        <th scope="row">
                        </th>
                        <td className="py-5"></td>
                        <td className="py-5"></td>
                        <td className="py-5">
                          <p className="mb-0 text-dark py-3">Subtotal</p>
                        </td>
                        <td className="py-5">
                          <div className="py-3 border-bottom border-top">
                            <p className="mb-0 text-dark">${currentCart.subTotal}</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                        </th>
                        <td className="py-5"></td>
                        <td className="py-5"></td>
                        <td className="py-5">
                          <p className="mb-0 text-dark py-3">Tax</p>
                        </td>
                        <td className="py-5">
                          <div className="py-3 border-bottom border-top">
                            <p className="mb-0 text-dark">${currentCart.tax}</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                        </th>
                        <td className="py-5">
                          <p className="mb-0 text-dark text-uppercase py-3">TOTAL</p>
                        </td>
                        <td className="py-5"></td>
                        <td className="py-5"></td>
                        <td className="py-5">
                          <div className="py-3 border-bottom border-top">
                            <p className="mb-0 text-dark">${currentCart.grandTotal}</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                  <button className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Place Order</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <!-- Checkout Page End --> */}
    </>
  )
}

export default Checkout