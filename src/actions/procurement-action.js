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

export const startGetProcurement = () =>{
    return async (dispatch) =>{
        try{
            const res = await axios.get('/procurement/list',{
                headers: {
                    Authorization: localStorage.getItem("token"),
                  }
            })
            // console.log('pc',res.data)
            dispatch(getProcurment(res.data))
        }
        catch(e){
            console.log(e)
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