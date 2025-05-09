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

// admin
export const startGetAllOrders = (params = {}) => {
    return async(dispatch) => {
        try {
            dispatch({ type: 'ORDERS_LOADING' });
            
            // Build query string from params
            const { sort = -1, page = 1, limit = 8, status = '' } = params;
            const queryParams = new URLSearchParams();
            
            if (sort) queryParams.append('sort', sort);
            if (page) queryParams.append('page', page);
            if (limit) queryParams.append('limit', limit);
            if (status && status !== 'all') queryParams.append('status', status);
            
            const queryString = queryParams.toString();
            const endpoint = queryString ? `/order/listAll?${queryString}` : '/order/listAll';
            
            const res = await axios.get(endpoint, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            
            dispatch(allOrder(res.data));
            return res.data;
        } catch (e) {
            console.log('admin-od', e);
            dispatch({ type: 'ORDERS_ERROR', payload: e.message });
            return null;
        }
    }
}

const allOrder = (data) => {
    return { type: 'ALL_ORDERS', payload: data }
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