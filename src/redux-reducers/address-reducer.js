const initialState = {address : [], serverErrors : [] }

export const addressReducer = (state=initialState,action) => {
    switch(action.type) {
        case 'LOGOUT' : {
            return { ...state, address : [] }
        }
        case 'SET_USER_ADDRESS' : {
            return { ...state, address : action.payload }
        }
        case 'ADD_ADDRESS' : {
            return { ...state, address : [...state.address, action.payload ]  }
        }
        case 'EDIT_ADD' : {
            return {...state, address : state.address.map((ele) => {
                if(ele._id === action.payload._id){
                    return action.payload
                }else {
                    return ele
                }
            }) }
        }
        case  'DEL_ADDRESS' : {
            return { ...state, address : state.address.filter((ele) => {
                return ele._id !== action.payload
            }) }
        }
        case 'SET_ERRORS' : {
            return { ...state , serverErrors : action.payload }
        }
        default : {
            return {...state}
        }
    }

} 
