import {
    GET_CART_SUCCESS
} from "../constant/cart.constant";

export const defaultValue = {
    subTotal: 0,
    tax: 0,
    grandTotal: 0,
    customer: {},
    items: []
}

const initialState = {
    currentCart: localStorage.getItem("currentCart") ?
        JSON.parse(localStorage.getItem("currentCart")) : defaultValue
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_SUCCESS:
            localStorage.setItem("currentCart", JSON.stringify(action.payload))

            return {
                ...state,
                currentCart: {
                    ...action.payload
                }
            };

        default:
            return state;
    }
}