import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../reducer/root.reducer";
import createSagaMiddleware from "redux-saga";
import root from "../saga/root.saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(sagaMiddleware),
    devTools: process.env.NODE_ENV === "development" ? true : false
})

export default store

sagaMiddleware.run(root)