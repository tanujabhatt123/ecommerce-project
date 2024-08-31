import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart';
import { addCartStart } from '../../redux/action/cart.action';

const ProductItem = ({ product }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let currentUser = useSelector((state) => state.user.currentUser);
    let currentCart = useSelector((state) => state.cart.currentCart);

    let [addItemToCart] = useCart({...currentCart}, currentUser)

    const addToCart = () => {

        if(!currentUser.id) {
            navigate("/login")
        }

        let cartObject = addItemToCart({...product})
        
        dispatch(addCartStart(cartObject))
    }

    return (
        <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="rounded position-relative fruite-item">
                <div className="fruite-img">
                    <Link to={`/product-details/${product.slug}`}>
                        <img src={product.image} className="img-fluid w-100 rounded-top" alt={product.name} />
                    </Link>
                </div>
                <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{
                    top: "10px", left: "10px"
                }}>{product.category}</div>
                <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                    <Link to={`/product-details/${product.slug}`}>
                        <h4>{product.name}</h4>
                    </Link>
                    <p>{product.shortDescription.length > 100 ? product.shortDescription.slice(0, 100) + "..." : product.shortDescription}</p>
                    <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold mb-0">$ {product.price}</p>
                        <button onClick={addToCart} className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem