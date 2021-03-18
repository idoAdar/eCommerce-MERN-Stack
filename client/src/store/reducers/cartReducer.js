import * as actionType from '../actionType';

const initState = {
    orders: null,
    shippingAddress: {
        address: null,
        city: null,
        country: null,
        postalCode: null
    },
    paymentMethod: null
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.data
            }
        case actionType.PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.data
            }
        case actionType.GET_ORDERS:
            return {
                orders: action.data,
                shippingAddress: {
                    address: null,
                    city: null,
                    country: null,
                    postalCode: null
                },
                paymentMethod: null
            }
        default: return state;
    }
}
 
export default reducer;