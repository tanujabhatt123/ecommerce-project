import { GET_CATEGORY_SUCCESS } from "../constant/category.constant";

const initialState = {
    categories: localStorage.getItem("categories") ? 
        JSON.parse(localStorage.getItem("categories")) : []
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY_SUCCESS:
            localStorage.setItem("categories", JSON.stringify(action.payload))

            return {
                ...state,
                categories: [...action.payload]
            }

        default:
            return state;
    }
}