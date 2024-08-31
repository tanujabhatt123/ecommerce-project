import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteProductStart, getProductStart } from '../../../redux/action/product.action'

const Product = () => {
  let products = useSelector(state => state.product.products)
  const dispatch = useDispatch();

  const getProduct = useCallback(() => {
    dispatch(getProductStart())
  }, [dispatch])

  
  const deleteProduct = (id) => {
    dispatch(deleteProductStart(id))
  }

  useEffect(() => {
    getProduct()
  }, [products.length, getProduct])

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between ">
        <h5>Product</h5>
        <Link to="/admin/product/add" className='btn btn-primary btn-sm text-white'>Add Product</Link>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                products.length > 0 && products.map((product, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th><img src={product.image} alt="" height={50} /></th>
                    <th>{product.name}</th>
                    <th>{product.type}</th>
                    <th>{product.category}</th>
                    <th>$ {product.price}</th>
                    <th>{product.quantity}</th>
                    <td>{product.status === "active" ? "Active" : "Inactive"}</td>
                    <td>
                      <Link to={`/admin/product/edit/${product.id}`} className='btn btn-primary me-2'>Edit</Link>
                      <button onClick={() => deleteProduct(product.id)}  className='btn btn-secondary'>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Product