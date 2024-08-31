import { put, takeLatest } from "redux-saga/effects";
import { GET_ORDER_START, PLACE_ORDER_START } from "../constant/order.constant";
import { getOrderError, getOrderStart, getOrderSuccess, placeOrderError } from "../action/order.action";
import { getOrderFromAPI, placeOrderToAPI } from "../service/order.service";
import { getCartStart } from "../action/cart.action";

function* getOrder() {
    try {
       let result =  yield getOrderFromAPI();
       yield put(getOrderSuccess(result))
    } catch (error) {
        yield put(getOrderError(error.message))
    }
}

function* placeOrder({payload}) {
    try {
        yield placeOrderToAPI(payload)
        yield put(getOrderStart())
        yield put(getCartStart())
    } catch (error) {
        yield put(placeOrderError(error.message))
    }
}

export default function* order() {
    yield takeLatest(GET_ORDER_START, getOrder);
    yield takeLatest(PLACE_ORDER_START, placeOrder);
}