import axios from 'axios';
import * as actionType from '../actionType';

export const getAll = () => async dispatch => {
    try {
        const response = await axios.get('/api/products/all');
        dispatch({
            type: actionType.FETCH_ALL,
            data: response.data
        });
    } catch (error) {
        dispatch({
            type: actionType.FETCH_FAIL,
            data: error.response.data
        })
    }
}

export const getProd = (productId) => async dispatch => {
    try {
        const response = await axios.get(`/api/products/${productId}`);
        dispatch({
            type: actionType.FETCH_ONE,
            data: response.data
        });
    } catch (error) {
        dispatch({
            type: actionType.FETCH_FAIL,
            data: error.response.data
        })
    }
}