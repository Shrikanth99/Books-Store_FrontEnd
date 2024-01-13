import { date } from "yup";
import axios from "../config/axios";
import {toast} from 'react-hot-toast'

export const startAddReview = (fData) => {
    return async(dispatch) => {
        try {
            const res = await axios.post('/product/review',fData,{
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
            })
            dispatch(addReview(res.data))
            toast.success('Reviewed successfully')

        } catch (e) {
            (e.response.data.errors?.map(ele => toast.error(ele.msg)))
        }
    }
}

const addReview = (data) => {
    return {type : 'ADD_REVIEW', payload : data }
}

export const startGetReview = () => {
    return async (dispatch) => {
        try{
            const res = await axios.get('/product/user/review',{
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
            })
            dispatch(getReview(res.data))
        }catch(e){
            console.log(e)
        }
    }
}

const getReview = (data) => {
    return {type: 'GET_REVIEW', payload:data}
}

export const startGetProductReview = (id) => {
    return async(dispatch) => {
        const res = await axios.get(`/product/review/${id}`)
        dispatch(getProductReview(res.data))
    }
}

const getProductReview = (data) => {
    return {type:'GET_PRO_REVIEW',payload:data}
}