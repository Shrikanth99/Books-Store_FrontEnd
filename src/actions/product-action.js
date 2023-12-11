import axios from '../config/axios'
import {toast} from 'react-hot-toast'
export const startGetProduct = () =>{
    return async (dispatch) =>{
        try{
            const response = await axios.get('/product')
            dispatch(setProduct(response.data))
        }
        catch(e){
            console.log(e)
        }
    }
}

const setProduct = (data) =>{
    return ({type:'SET_PRODUCTS',payload: data})
}

export const startCreateCart = (id,toggleSet) =>{
    return async (dispatch) =>{
        try{
            const formData = {}
            const response = await axios.post(`/product/cart/${id}`,formData,{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })
            toast.success("Product added to the cart successfully")
            toggleSet()
            dispatch(setCart(response.data.products))
        }
        catch(e){
            console.log(e)
        }
    }
}

export const startSetCart = () =>{
    return async(dispatch) =>{
        try{
            const response = await axios.get(`/product/cart/list`,{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })
            dispatch(setCart(response.data.products))
        }
        catch(e){
            console.log(e)
        }
    }
}

const setCart = (products) =>{
    return ({type:'SET_CARTS',payload:products})
}

export const startRemoveCart = (id,toggleSet) =>{
    return async (dispatch) =>{
        try{
            const response = await axios.put(`/product/cartItemRemove/${id}`,{},{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
        })
        console.log("nishan",response.data)
        toast.success("Product removed from the cart successfully")
        toggleSet()
    }
    catch(e){
        console.log(e)
    }
}
}

// export const startSetCart = () =>{
//     return async(dispatch) =>{
//         try{

//         }
//         catch(e){
//             console.log(e)
//         }
//     }
// }