import {
    GET_USER_SUCCESS,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    PROFILE_EDIT_SUCCESS
} from "../constant/user.constant";

const defaultValue = {
    contactNumber: "",
    email: "",
    role: "",
    password: "",
    image: "",
    status: "",
    name: "",
    id: ""
}

const initialState = {
    users: localStorage.getItem("users") ?
        JSON.parse(localStorage.getItem("users")) : [],
    currentUser: localStorage.getItem("currentUser") ?
        JSON.parse(localStorage.getItem("currentUser")) : {
            contactNumber: "",
            email: "",
            role: "",
            password: "",
            image: "",
            status: "",
            name: "",
            id: ""
        }
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_SUCCESS:
            localStorage.setItem("users", JSON.stringify(action.payload))
            return {
                ...state,
                users: [...action.payload]
            };

        case LOGIN_USER_SUCCESS:
        case PROFILE_EDIT_SUCCESS:
            localStorage.setItem("currentUser", JSON.stringify(action.payload))
            return {
                ...state,
                currentUser: {
                    ...action.payload
                }
            };

        case LOGOUT_USER_SUCCESS:
            localStorage.setItem("currentUser", JSON.stringify(defaultValue))
            return {
                ...state,
                currentUser: {
                    ...defaultValue
                }
            };

        default:
            return state;
    }
}