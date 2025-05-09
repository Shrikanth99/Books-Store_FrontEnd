import { act } from "react-dom/test-utils"

const initialState = {
    data: [],
    pagination: {
        total: 0,
        page: 1,
        limit: 8,
        pages: 0
    },
    loading: false,
    error: null
}

export const procurementReducer = (state=initialState, action) =>{
    switch(action.type){
        case 'PROCUREMENT_LOADING': {
            return { ...state, loading: true, error: null }
        }
        case 'PROCUREMENT_ERROR': {
            return { ...state, loading: false, error: action.payload }
        }
        case 'LIST_PROC' : {
            return { 
                ...state, 
                data: action.payload.procurements || action.payload, // Handle both new and old API format
                pagination: action.payload.pagination || state.pagination,
                loading: false,
                error: null
            }
        }
        case 'CREATE_PROC':{
            const newData = Array.isArray(state.data) 
                ? [...state.data, action.payload]
                : [action.payload];
                
            return {...state, data: newData }
        }
        case 'UPDATE_PROC' : {
            const updatedData = Array.isArray(state.data)
                ? state.data.map((ele) => {
                    if(ele._id === action.payload._id){
                        return { ...ele, ...action.payload }
                    } else {
                        return {...ele}
                    }
                })
                : state.data;
                
            return { ...state, data: updatedData }
        }
        case 'DEL_PROC' : {
            const filteredData = Array.isArray(state.data)
                ? state.data.filter((ele) => ele._id !== action.payload._id)
                : state.data;
                
            return { ...state, data: filteredData }
        }
        default:{
            return {...state}
        }
    }
}