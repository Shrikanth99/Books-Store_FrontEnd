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
            console.log("response",response.data.products)
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
            console.log('cart list',response.data)
            if(response.data.length===0){
                dispatch(setCart(response.data))
            }
            else{
                dispatch(setCart(response.data.products))
            }
            
        }
        catch(e){
            console.log('pc',e)
        }
    }
}

export const startIncCartQuantity = (id) =>{
    return async(dispatch) =>{
        try{         
            const response = await axios.post(`/product/cart/${id}`,{},{
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

export const startRemCartQuantity = (id) =>{
    return async(dispatch) =>{
        try{
            const response = await axios.delete(`/product/cart/quantity/${id}`,{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })
            if(response.data     === null){
                console.log('I am')
                dispatch(setCart([]))
            }
            else{
                console.log('I am 2')
                dispatch(setCart(response.data.products))
            }
        }
        catch(e){
            console.log(e)
        }
    }
}

const setCart = (products) =>{
    console.log('ids',products)
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
        toast.success("Product removed from the cart successfully")
        toggleSet()
        // dispatch(removeCart(response.data.products[0].productId))
        dispatch(removeCart(id))
        console.log('deleting',response.data)
        // console.log("i am")
    }
    catch(e){
        console.log(e)
    }
}
}

const removeCart = (id) =>{
    return ({type:'REMOVE_CART',payload:id})
}



