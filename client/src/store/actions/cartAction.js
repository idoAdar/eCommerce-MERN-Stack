import axios from 'axios';
import Authentication from '../../utills/Authentication'; 
import * as actionType from '../actionType';

export const shippingOrder = (formData, history) => dispatch => {
    const { address, city, country, postalCode } = formData;
    const data = {address, city, country, postalCode}
    dispatch({
        type: actionType.SHIPPING_ADDRESS,
        data: data
    })
    history.push('/payment');
}

export const paymentMethod = (method, history) => dispatch => {
    dispatch({
        type: actionType.PAYMENT_METHOD,
        data: method
    })
    history.push('/place_order');
}

export const createOrder = (order, history) => async (dispatch, getState) => {
    Authentication(getState().userReducer.userInfo.token);
    
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        ...order
    })
    try {
        await axios.post('/api/users/cart/order', body, config);
        dispatch({
            type: actionType.SEND_ORDER
        })
        localStorage.setItem('userInfo', JSON.stringify(getState().userReducer.userInfo));
        history.push('/profile');
    } catch (error) {
        console.dir(error);
    }
}

export const fetchUserOrders = () => async (dispatch, getState) => {
    Authentication(getState().userReducer.userInfo.token);

    try {
        const response = await axios.get('/api/users/cart/orders');
        console.log(response);
        dispatch({
            type: actionType.GET_ORDERS,
            data: response.data
        })
    } catch (error) {
        console.dir(error);
    }
}