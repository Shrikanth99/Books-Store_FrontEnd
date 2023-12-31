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
            const response = await axios.post('/address', formData, {
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
            })
            console.log('nad',response.data)
            dispatch(addAddress(response.data))
            resetForm()
            redirect()

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
            // const res = await axios.put(`/address/${}`)
        } catch (e) {
            
        }
    }
}

const setServerErrors = (err) => {
    return { type : 'SET_ERRORS', payload: err }
}