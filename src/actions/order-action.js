import axios from "../config/axios"

export const startOrder = (orderData) => {
    console.log(orderData,'lk')
    return async(dispatch) => {
        const res = await axios.post('/order/create',orderData, {
            headers : {
                'Authorization' : localStorage.getItem('token')
            }
        })
        localStorage.removeItem('addID')
        console.log(res.data,'rana')
        
    }
}

export const startGetOrder = () =>{
    return async(dispatch) =>{
        try {
            const res = await axios.get('/order/list',{
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
            })
            dispatch(getOrder(res.data))
        } catch (e) {
            console.log('od-err',e)
        }
    }
}

const getOrder = (data) =>{
    return({type:'GET_ORDER',payload:data})
}

// admmin
export const startgetAllOrders = () => {
    return async(dispatch) => {
        try {
            const res = await axios.get('/order/listAll',{
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
            })
            //console.log('all-od',res.data)
            dispatch(allOrder(res.data))
        } catch (e) {
            console.log('admin-od',e)
        }

    }
}

const allOrder = (data) => {
    return { type : 'ALL_ORDERS', payload : data }
}

export const startRemoveOrder = (id) =>{
    return async (dispatch) =>{
        const res = await axios.delete(`/order/delete/${id}`,{
            headers : {
                'Authorization' : localStorage.getItem('token')
            }
        })
        dispatch(removeOrder(res.data._id))
    }
}

const removeOrder = (id) =>{
    return ({type:'REMOVE_ORDER',payload:id})
}