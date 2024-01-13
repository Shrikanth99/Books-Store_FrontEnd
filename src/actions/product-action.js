import axios from '../config/axios'
import {toast} from 'react-hot-toast'

export const startGetProduct = (search,categoryId,sort) =>{
    return async (dispatch) =>{
        try{
            if(search && categoryId){
                if(sort){
                    const sortRes = await axios.get(`/product?search=${search}&categoryId=${categoryId}&sort=${sort}`)
                    console.log('sR',sortRes.da)
                    dispatch(setProduct(sortRes.data))
                }else{
                    const res = await axios.get(`/product?search=${search}&categoryId=${categoryId}`)
                    console.log('daemon',res.data)
                    dispatch(setProduct(res.data))
                }
            }
            else if(search){
                if(sort){
                    const response = await axios.get(`/product?search=${search}&sort=${sort}`)
                    dispatch(setProduct(response.data))
                }else{
                    const res = await axios.get(`/product?search=${search}`)
                    console.log('searches',res.data)
                    dispatch(setProduct(res.data))
                }
            }
            else if(categoryId){
                if(sort){
                    
                    const res = await axios.get(`/product?categoryId=${categoryId}&sort=${sort}`)
                    dispatch(setProduct(res.data))
                }else {
                    console.log('catee',categoryId)
                    const res = await axios.get(`/product?categoryId=${categoryId}`)
                    dispatch(setProduct(res.data))
                }
            }
            else{
                if(sort){
                    const res = await axios.get(`/product?sort=${sort}`)
                    dispatch(setProduct(res.data))
                }else {
                    const response = await axios.get('/product')
                    // console.log('tyrion',response.data)
                    dispatch(setProduct(response.data))
                }
            }
        }
        catch(e){
            console.log(e)
        }
    }
}

const setProduct = (data) =>{
    return ({type:'SET_PRODUCTS',payload: data})
}

export const startAddProduct = (formData) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/product',formData,{
                headers : {
                    'Content-Type' : 'multipart/form-data',
                    'Authorization' : localStorage.getItem('token')
                }
            })
            console.log('pd',res.data)
            dispatch(addProduct(res.data))

        } catch (e) {
            console.log('adP',e)
        }
    }
}

const addProduct = (product) => {
    return { type : 'ADD_PRODUCT' , payload : product }
}

export const startCreateCart = (id,body,toggleSet) =>{
    return async (dispatch) =>{
        try{
            const response = await axios.post(`/product/cart/${id}`,body,{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })
            toast.success("Product added to the cart successfully")
            if(toggleSet){

                toggleSet()
            }
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

export const startIncCartQuantity = (id,mode) =>{
    return async(dispatch) =>{
        try{         
            const response = await axios.post(`/product/cart/${id}`,mode,{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })
            if(response.data.msg){
                toast.error(response.data.msg)
            }else{

                dispatch(setCart(response.data.products))
            }
        }
        catch(e){
            console.log(e)
        }
    }
}

export const startRemCartQuantity = (id,mode) =>{
    return async(dispatch) =>{
        try{
            const response = await axios.delete(`/product/cart/quantity/${id}?mode=${mode}`,{
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
    return ({type:'SET_CARTS',payload:products})
}

export const startRemoveCart = (id,body,toggleSet) =>{
    return async (dispatch) =>{
        try{
            const response = await axios.put(`/product/cartItemRemove/${id}`,body,{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
        })
        toast.success("Product removed from the cart successfully")
        // console.log('checking',toggleSet)
        if(toggleSet){
            toggleSet()
        }
        
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
    console.log('I am there')
    return ({type:'REMOVE_CART',payload:id})
}

export const setClearCart = (mode) =>{
    return ({type:'CLEAR_CART', payload : mode })
}

export const startEmptyCart = (mode) =>{
    console.log('in EC',)
    return async(dispatch) =>{
        try{
            const response = await axios.delete(`/product/cart/removeAll?mode=${mode}`,{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log('deleted',response.data)
            dispatch(setClearCart(mode))
        }
        catch(e){
            console.log(e)
        }
    }
}



