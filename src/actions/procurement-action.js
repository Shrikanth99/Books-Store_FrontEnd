import axios from "../config/axios";
import { startEmptyCart } from "./product-action";


export const startCreateProcurement = (products,func) =>{
    return async (dispatch) =>{
        console.log('cdcd',products)
        try{
            const res = await axios.post('/procurement/create',products,{
                headers: {
                    Authorization: localStorage.getItem("token"),
                  }
            })
            func()
            dispatch(createProcurement(res.data))
            dispatch(startEmptyCart('sell'))
        }
        catch (e) {
            console.log(e);
          }
    }
}

const createProcurement = (data) =>{
    return ({type:'CREATE_PROC',payload:data})
}

export const startGetProcurement = (params = {}) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'PROCUREMENT_LOADING' });
            
            // Build query string from params
            const { sort = -1, page = 1, limit = 8, status = '' } = params;
            const queryParams = new URLSearchParams();
            
            if (sort) queryParams.append('sort', sort);
            if (page) queryParams.append('page', page);
            if (limit) queryParams.append('limit', limit);
            if (status && status !== 'all') queryParams.append('status', status);
            
            const queryString = queryParams.toString();
            const endpoint = queryString ? `/procurement/list?${queryString}` : '/procurement/list';
            
            const res = await axios.get(endpoint, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            console.log('proc-res',res.data)
            dispatch(getProcurment(res.data));
            return res.data;
        } catch (e) {
            console.log('procurement-err', e);
            dispatch({ type: 'PROCUREMENT_ERROR', payload: e.message });
            return null;
        }
    }
}

const getProcurment = (data) => {
    return { type : 'LIST_PROC' , payload : data }
}

export const startUpdateProcurment = (id) => {
    return async(dispatch) => {
        try {
            const res = await axios.put(`/procurement/update/${id}`,null,{
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
            })
            console.log('up',res.data)
            dispatch(updateProcurment(res.data))
        } catch (e) {
            console.log('Update-err',e)
        }
    }
}

const updateProcurment = (data) => {
    return { type : 'UPDATE_PROC', payload : data }
}

export const startCancelProcurement = (id) => {
    return async(dispatch) => {
        try {
            const res = await axios.delete(`/procurement/cancel/${id}`,{
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
            })
            dispatch(cancelProcurement(res.data))
        } catch (e) {
            console.log('Proc_del-Err',e)
        }
    }
}

const cancelProcurement = (data) => {
    return { type : 'DEL_PROC' , payload: data }
}