import React, { useCallback, useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useCart } from '../../hooks/useCart'
import { addCartStart } from '../../redux/action/cart.action'

const ProductDetails = () => {
    const products = useSelector(state => state.product.products);
    let currentCart = useSelector(state => state.cart.currentCart);
    let currentUser = useSelector((state) => state.user.currentUser);

    let [addItemToCart] = useCart({...currentCart}, currentUser)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let { slug } = useParams();
    let [currentProduct, setCurrentProduct] = useState({})
    let [quantity, setQuantity] = useState(0);

    const getProductBySlug = useCallback((slug) => {
        let product = products.find((product) => product.slug === slug);
        let currentCartProductExists = currentCart.items.find((product) => product.slug === slug);

        if (product) {
            setCurrentProduct(product);
            if(currentCartProductExists) {
                setQuantity(+currentCartProductExists.purchaseQuantity)
            }
            
        } else {
            navigate("/");
        }
    }, [products, navigate, currentCart.items])

    const addToCart = () => {

        if(!currentUser.id) {
            navigate("/login")
        }

        let cartObject = addItemToCart({...currentProduct})
        
        dispatch(addCartStart(cartObject))
    }

    useEffect(() => {
        getProductBySlug(slug)
    }, [slug, getProductBySlug])

    return (
        <>

            {/* <!-- Single Page Header start --> */}
            <Breadcrumb marginTop={"150px"} />

            {/* <!-- Single Page Header End --> */}

            {/* <!-- Single Product Start --> */}
            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="row g-4 mb-5">
                        <div className="col-lg-12 col-xl-12">
                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div className="border rounded">
                                        <Link to="#">
                                            <img src={currentProduct.image}
                                                className="img-fluid rounded" alt={currentProduct.name}
                                                height={"100%"}
                                                width={"100%"} />
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <h4 className="fw-bold mb-3">{currentProduct.name}</h4>
                                    <p className="mb-3">Category: {currentProduct.category}</p>
                                    <h5 className="fw-bold mb-3">$ {currentProduct.price}</h5>
                                    <p className="mb-3">Color: {currentProduct.color}</p>
                                    <p className="mb-3">Size: {currentProduct.size}</p>
                                    <p className="mb-3">Weight: {currentProduct.weigth}</p>



                                    <p className="mb-4">{currentProduct.shortDescription}</p>
                                    <div className="input-group quantity mb-5" style={{ width: "100px" }}>
                                        <div className="input-group-btn">
                                            <button
                                                className="btn btn-sm btn-minus rounded-circle bg-light border"
                                                onClick={() => setQuantity(quantity - 1)}  >
                                                <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm text-center border-0"
                                            value={quantity}
                                            onChange={() => { }} />
                                        <div className="input-group-btn">
                                            <button 
                                                className="btn btn-sm btn-plus rounded-circle bg-light border"
                                                onClick={() => setQuantity(quantity + 1)}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <button 
                                        className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                                        onClick={addToCart}
                                        >
                                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                                    </button>
                                </div>
                                <div className="col-lg-12">
                                    <nav>
                                        <div className="nav nav-tabs mb-3">
                                            <button className="nav-link active border-white border-bottom-0" type="button" role="tab"
                                                id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                                                aria-controls="nav-about" aria-selected="true">Description</button>
                                        </div>
                                    </nav>
                                    <div className="tab-content mb-5">
                                        <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                            <p>{currentProduct.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            {/* <!-- Single Product End --> */}

        </>
    )
}

export default ProductDetails