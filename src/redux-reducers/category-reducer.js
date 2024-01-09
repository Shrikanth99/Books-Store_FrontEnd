const initialState = { categories : [] }

export const categoryReducer = (state=initialState,action) => {
    switch(action.type){
        case 'ALL_CAT' : {
            return { ...state, categories : action.payload }
        }
        case 'ADD_CAT' : {
            return {...state, categories : [...state.categories,action.payload] }
        }
        default : {
            return {...state}
        }
    }
}