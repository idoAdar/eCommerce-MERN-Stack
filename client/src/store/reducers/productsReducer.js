import * as actionType from '../actionType';

const initState = {
    products: [],
    product: null,
    isLoading: true,
    errors: null
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.FETCH_ALL:
            return {
                ...state,
                products: action.data,
                product: null,
                isLoading: false
            }
        case actionType.FETCH_ONE:
            return {
                ...state,
                product: action.data,
                isLoading: false
            }
        case actionType.FETCH_FAIL:
            return {
                ...state,
                errors: action.data,
                isLoading: false
            }
        default: return state
    }
}

export default reducer;