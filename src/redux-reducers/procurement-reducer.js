import { act } from "react-dom/test-utils"

const initialState = {data:[]}

export const procurementReducer = (state=initialState, action) =>{
    switch(action.type){
        case 'LIST_PROC' : {
            return { ...state, data : action.payload  }
        }
        case 'CREATE_PROC':{
            return {...state, data:[...state.data, action.payload] }
        }
        case 'UPDATE_PROC' : {
            return { ...state , data : state.data.map((ele) => {
                if(ele._id === action.payload._id ){
                    return { ...ele, ...action.payload }
                }else {
                    return {...ele}
                }
            }) }
        }
        case 'DEL_PROC' : {
            return { ...state , data : state.data.filter((ele) => {
                return ele._id !== action.payload._id
            }) }
        }
        default:{
            return {...state}
        }
    }
}