const initialState = {data:[]}

export const procurementReducer = (state=initialState, action) =>{
    switch(action.type){
        case 'CREATE_PROC':{
            return {...state,data:[...state.data,action.payload]}
        }
        default:{
            return {...state}
        }
    }
}