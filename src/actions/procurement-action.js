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
            
        }
        catch(e){
            console.log(e)
        }
    }
}