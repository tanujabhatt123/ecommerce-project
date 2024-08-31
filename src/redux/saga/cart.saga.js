import { put, takeLatest } from "redux-saga/effects";
import { addCartError, deleteCartError, getCartError, getCartStart, getCartSuccess, updateCartError } from "../action/cart.action";
import { ADD_CART_START, DELETE_CART_START, GET_CART_START, UPDATE_CART_START } from "../constant/cart.constant";
import { addCartToAPI, deleteCartToAPI, getCartFromAPI, updateCartToAPI } from "../service/cart.service";

function* getCart() {
    try {
       let result =  yield getCartFromAPI();
       yield put(getCartSuccess(result))
    } catch (error) {
        yield put(getCartError(error.message))
    }
}

function* addCart({payload}) {
    try {
        yield addCartToAPI(payload)
        yield put(getCartStart())
    } catch (error) {
        yield put(addCartError(error.message))
    }
}

function* updateCart({payload}) {
    try {
        yield updateCartToAPI(payload.category, payload.id)
        yield put(getCartStart())
    } catch (error) {
        yield put(updateCartError(error.message))
    }
}

function* deleteCart({payload}) {
    try {
        yield deleteCartToAPI(payload)
        yield put(getCartStart())
    } catch (error) {
        yield put(deleteCartError(error.message))
    }
}

export default function* cart() {
    yield takeLatest(GET_CART_START, getCart);
    yield takeLatest(ADD_CART_START, addCart);
    yield takeLatest(UPDATE_CART_START, updateCart);
    yield takeLatest(DELETE_CART_START, deleteCart);
}