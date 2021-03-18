import axios from 'axios';
import Authentication from '../../utills/Authentication';
import * as actionType from '../actionType';

export const loginUser = formData => async dispatch => {
    const { email, password } = formData;
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        email,
        password
    })

    try {
        const response = await axios.post('/api/users/login', body, config);
        dispatch({
            type: actionType.LOGIN_USER,
            data: response.data
        })
        localStorage.setItem('userInfo', JSON.stringify(response.data));
    } catch (error) {
        dispatch({
            type: actionType.LOGIN_FAIL,
            data: error.response.data
        })
        setTimeout(() => {
            dispatch({
                type: actionType.CLEAR_MESSAGE
            })
        }, 3000)
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('userInfo');
    dispatch({
        type: actionType.LOGOUT
    })
}

export const registerUser = (formData, history) => async dispatch => {
    const { name, email, password, confirm } = formData;
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        name,
        email,
        password,
        confirm
    })

    try {
        const response = await axios.post('/api/users/register', body, config);
        dispatch({
            type: actionType.REGISTER_USER,
            data: response.data
        })
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        history.push('/');
    } catch (error) {
        dispatch({
            type: actionType.REGISTER_FAIL,
            data: error.response.data
        })
        setTimeout(() => {
            dispatch({
                type: actionType.CLEAR_MESSAGE
            })
        }, 3000)
    }
}

export const updateProfile = formData => async (dispatch, getState) => {
    Authentication(getState().userReducer.userInfo.token);
    const { name, password } = formData;
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        name,
        password
    })

    const response = await axios.put('/api/users/profile/update', body, config);
    dispatch({
        type: actionType.UPDATE_PROFILE,
        data: response.data
    })
    localStorage.setItem('userInfo', JSON.stringify(getState().userReducer.userInfo));
}


export const putProduct = (productId, history, quantity) => async (dispatch, getState) => {
    if (getState().userReducer.userInfo) {
        Authentication(getState().userReducer.userInfo.token);
        const response = await axios.put(`/api/users/cart/${productId}/${quantity}`);
        dispatch({
            type: actionType.ADD_TO_CART,
            data: response.data
        })
        localStorage.setItem('userInfo', JSON.stringify(getState().userReducer.userInfo));
        return history.push('/cart');
    }
   history.push('/login');
}

export const deleteFromCart = id => async (dispatch, getState) => {
    Authentication(getState().userReducer.userInfo.token);
    const response = await axios.delete(`/api/users/cart/remove/${id}`);
    dispatch({
        type: actionType.DELETE_FROM_CART,
        data: response.data
    })
    localStorage.setItem('userInfo', JSON.stringify(getState().userReducer.userInfo));
}

export const dropNoteUpdate = () => dispatch => {
    dispatch({
        type: actionType.UPDATE_FAIL,
        data: { message: 'Please make sure to fill out this form' }
    })
    setTimeout(() => {
        dispatch({
            type: actionType.CLEAR_MESSAGE
        })
    }, 3000)
}

export const dropNote = () => dispatch => {
    dispatch({
        type: actionType.REGISTER_FAIL,
        data: { message: 'Please make sure to fill out this form' }
    })
    setTimeout(() => {
        dispatch({
            type: actionType.CLEAR_MESSAGE
        })
    }, 3000)
}

export const dropSpinner = () => dispatch => {
    dispatch({
        type: actionType.SET_SPINNER
    })
}