import axios from "../config/axios";

export const setEmptyAddress = () => {
    //console.log('ji')
    return { type : 'LOGOUT' }
}

export const  startGetUserAddress = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('/address', {
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
            } )
            //console.log('address',response.data)
            dispatch(setUserAddress(response.data))
        } catch (e) {
            alert('from-GEt address',e.message)
        }
    }
}

const setUserAddress = (userAddress) => {
    return { type : 'SET_USER_ADDRESS', payload : userAddress }
}

export const startNewAddress = (formData,resetForm,redirect) => {

    return async (dispatch) => {
        try {
            if(localStorage.getItem('token')){
                
                const response = await axios.post('/address', formData, {
                    headers : {
                        'Authorization' : localStorage.getItem('token')
                    }
                })
                //console.log('nad',response.data)
                dispatch(addAddress(response.data))
                resetForm()
                redirect()
            }
            else{
                const data = JSON.parse(localStorage.getItem('registerFormData'))
                const response = await axios.post('/api/register',data)
                
                formData.userId = response.data.usr._id
                const response2 = await axios.post('/address/create',formData)
                resetForm()
                redirect()
                console.log('lk',response2.data)
            }

        } catch (e) {
            console.log(e)
            // alert('add-adrees')
            dispatch(setServerErrors(e.response.data.errors))
        }
    }
}

const addAddress = (address) => {
    return { type : 'ADD_ADDRESS', payload : address }
}

export const startEditAddress = ({formData,resetForm,redirect,id}) => {
    return async (dispatch) => {
        console.log('uId',id)
        try {
            const res = await axios.put(`/address/${id}`,formData,{
                headers : {
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log('edit',res.data)
            dispatch(editAdd(res.data))
            resetForm()
            redirect()

        } catch (e) {
            console.log('edit-err',e)
        }
    }
}

const editAdd = (obj) => {
    return { type: 'EDIT_ADD', payload:obj }
}

export const startDeleteAddress = (id) => {
    return async(dispatch) => {
        const delRes = await axios.delete(`/address/${id}`,{
            headers :{
                'Authorization' : localStorage.getItem('token')
            }
        })
        dispatch(deleteAddress(delRes.data._id))
    }
}

const deleteAddress = (id) => {
    return { type : 'DEL_ADDRESS', payload : id }
}

const setServerErrors = (err) => {
    return { type : 'SET_ERRORS', payload: err }
}