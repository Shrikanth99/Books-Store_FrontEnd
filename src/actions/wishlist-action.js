import axios from "../config/axios"
import toast from "react-hot-toast"

export const startCreateWishlist = (id,toggleSet) =>{
    return async(dispatch) =>{
        try{
            const response = await axios.post(`/product/wishlist/${id}`,{},{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }

            })
            toast.success(response.data.message)
            if(response.data.wishlistItem){
                dispatch(createWishlist(response.data.wishlistItem))
                toggleSet()
            }
        }
        catch(e){
            console.log(e)
        }
    }
}

const createWishlist = (item) =>{
    return ({type:'CREATE_WISHLIST',payload:item})
}

export const startRemoveWishlist = (id,toggleSet) =>{
    return async(dispatch) =>{
        try{
            const response = await axios.delete(`/product/wishlist/${id}`,{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }

            })
            toast.success('Product removed from the wishlist')
            if(toggleSet){

                toggleSet()
            }
           dispatch(removeWishlist(id))

        }
        catch(e){
            console.log(e)
        }
    }
}

    const removeWishlist = (id) =>{
        return({type:'REMOVE_WISHLIST',payload:id})
    }

export const startSetWishlist = () =>{
    return async(dispatch) =>{
        const response = await axios.get('/product/wishlist/list',{
            headers:{
                'Authorization': localStorage.getItem('token')
            }
        })
        dispatch(setWishlist(response.data))
    }
}

const setWishlist = (items) =>{
    return ({type:'SET_WISHLIST',payload:items})
}

export const setClearWishlist = () =>{
    console.log('raven')
    return ({type:'CLEAR_WISHLIST'})
}
