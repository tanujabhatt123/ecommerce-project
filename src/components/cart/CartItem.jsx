import React, { useState } from 'react'
import { useCart } from '../../hooks/useCart';
import { useDispatch, useSelector } from 'react-redux';
import { addCartStart } from '../../redux/action/cart.action';

const CartItem = ({item}) => {
    let [quantity, setQuantity] = useState(item.purchaseQuantity);
    let currentUser = useSelector((state) => state.user.currentUser);
    let currentCart = useSelector((state) => state.cart.currentCart);
    const dispatch = useDispatch();

    let [, updateItemToCart, removeItemFromCart] = useCart({...currentCart}, currentUser);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);

        let cartObject = updateItemToCart({...item}, quantity + 1);
        dispatch(addCartStart(cartObject))
    }

    const decrementQuantity = () => {
        setQuantity(quantity - 1);

        let cartObject = updateItemToCart({...item}, quantity - 1);
        dispatch(addCartStart(cartObject))
    }

    const removeItem = () => {
        let cartObject = removeItemFromCart({...item});
        dispatch(addCartStart(cartObject))
    }

    return (
        <tr>
            <th scope="row">
                <div className="d-flex align-items-center">
                    <img src={item.image} className="img-fluid me-5 rounded-circle" style={{ height: "80px", width: "80px" }} alt={item.name} />
                </div>
            </th>
            <td>
                <p className="mb-0 mt-4">{item.name}</p>
            </td>
            <td>
                <p className="mb-0 mt-4">$ {item.price}</p>
            </td>
            <td>
                <div className="input-group quantity mt-4" style={{ width: "100px" }}>
                    <div className="input-group-btn">
                        <button className=" btn-sm btn-minus rounded-circle bg-light border me-1" onClick={decrementQuantity} >
                            <i className="fa fa-minus"></i>
                        </button>
                    </div>
                    <input 
                        type="text" 
                        className="form-control form-control-sm text-center border-0 me-1"
                        onChange={() => {}}
                        value={quantity}
                        readOnly />
                    <div className="input-group-btn">
                        <button className=" btn-sm btn-plus rounded-circle bg-light border" onClick={incrementQuantity}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </td>
            <td>
                <p className="mb-0 mt-4"> $ {item.price * item.purchaseQuantity}</p>
            </td>
            <td>
                <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={removeItem}>
                    <i className="fa fa-times text-danger"></i>
                </button>
            </td>
        </tr>
    )
}

export default CartItem