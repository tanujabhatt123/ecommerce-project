import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { useSelector } from 'react-redux'
import CartItem from '../../components/cart/CartItem'
import { Link } from 'react-router-dom'

const Cart = () => {
  let currentCart = useSelector(state => state.cart.currentCart)
  
  return (
    <>

      {/* <!-- Single Page Header start --> */}
      <Breadcrumb marginTop={"150px"} />
      {/* <!-- Single Page Header End --> */}

      {/* <!-- Cart Page Start --> */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Handle</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentCart.items.length > 0 && currentCart.items.map((item, index) => (
                    <CartItem key={index} item={item} />
                  ))
                }
              </tbody>
            </table>
          </div>

          <div className="row g-4 justify-content-end">
            <div className="col-8"></div>
            <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
              <div className="bg-light rounded">
                <div className="p-4">
                  <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                  <div className="d-flex justify-content-between mb-4">
                    <h5 className="mb-0 me-4">Subtotal:</h5>
                    <p className="mb-0">$ {currentCart.subTotal.toFixed(2)}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5 className="mb-0 me-4">Tax</h5>
                    <div className="">
                      <p className="mb-0">${currentCart.tax.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                  <h5 className="mb-0 ps-4 me-4">Total</h5>
                  <p className="mb-0 pe-4">${currentCart.grandTotal.toFixed(2)}</p>
                </div>
                <Link to="/checkout" className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Cart Page End --> */}
    </>
  )
}

export default Cart