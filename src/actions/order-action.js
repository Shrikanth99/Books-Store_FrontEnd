import axios from "../config/axios"

export const startOrder = (orderData) => {
    console.log(orderData,'lk')
    return async(dispatch) => {
        const res = await axios.post('/order/create',orderData, {
            headers : {
                'Authorization' : localStorage.getItem('token')
            }
        })
        console.log(res.data)
        
    }
}

export const startGetOrder = () =>{
    return async(dispatch) =>{
        const res = await axios.get('/order/list',{
            headers : {
                'Authorization' : localStorage.getItem('token')
            }
        })
        dispatch(getOrder(res.data))
    }
}

const getOrder = (data) =>{
    return({type:'GET_ORDER',payload:data})
}


