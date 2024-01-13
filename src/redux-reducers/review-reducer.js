const initialState = {data:[],productReview:[]}

export const reviewReducer = (state=initialState,action) => {
    switch(action.type) {
        case 'GET_REVIEW' : {
            return {...state, data: action.payload}
        }
        case 'GET_PRO_REVIEW' : {
            return {...state, productReview: action.payload }
        }
        case 'ADD_REVIEW' : {
            return {...state, data : [...state.data, action.payload ] }
        }
        default : {
            return {...state}
        }
    }
}