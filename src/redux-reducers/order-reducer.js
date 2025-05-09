const initialState = {
  orders: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 8,
    pages: 0
  },
  loading: false,
  error: null
}

export const orderReducer = (state=initialState, action) => {
  switch(action.type){
    case 'GET_ORDER': {
      return {...state, orders: action.payload}
    }
    case 'ORDERS_LOADING': {
      return {...state, loading: true, error: null}
    }
    case 'ORDERS_ERROR': {
      return {...state, loading: false, error: action.payload}
    }
    case 'ALL_ORDERS': {
      // Handle new paginated data structure
      return { 
        ...state, 
        orders: action.payload.orders || action.payload, // Handle both new and old API format
        pagination: action.payload.pagination || state.pagination,
        loading: false,
        error: null
      }
    }
    case 'REMOVE_ORDER': {
      return {
        ...state,
        orders: Array.isArray(state.orders) 
          ? state.orders.filter(ele => ele._id !== action.payload)
          : state.orders
      }
    }
    default: {
      return {...state}
    }
  }
}