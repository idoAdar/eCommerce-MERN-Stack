import * as actionType from '../actionType';

const initState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    isAuth: localStorage.userInfo ? true : false,
    isLoading: false,
    message: null
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.LOGIN_USER:
        case actionType.REGISTER_USER:
            return {
                ...state,
                userInfo: action.data,
                isAuth: true,
                isLoading: false
            }
        case actionType.LOGIN_FAIL:
        case actionType.REGISTER_FAIL:
            return {
                ...state,
                isAuth: false,
                message: action.data,
                isLoading: false
            }
        case actionType.ADD_TO_CART:
        case actionType.DELETE_FROM_CART:
            return {
                ...state,
                userInfo: {...state.userInfo, user: { ...state.userInfo.user, cart: action.data }}
            }
        case actionType.UPDATE_PROFILE:
            return {
                ...state,
                userInfo: { ...state.userInfo, user: action.data },
                isLoading: false
            }
        case actionType.UPDATE_FAIL:
            return {
                ...state,
                message: action.data
            }
        case actionType.SEND_ORDER:
            return {
                ...state,
                userInfo: {...state.userInfo, user: { ...state.userInfo.user, cart: [] }}
            }
        case actionType.LOGOUT:
            return {
                ...state,
                isAuth: false,
                userInfo: null
            }
        case actionType.CLEAR_MESSAGE:
            return {
                ...state,
                message: null
            }
        case actionType.SET_SPINNER:
            return {
                ...state,
                isLoading: true
            }
        default: return state;
    }
}

export default reducer;