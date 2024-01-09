import axios from "../config/axios"

export const startGetCategories = () => {
   return async(dipatch) => {
      const res = await axios.get('/categories/list')
      dipatch(getCategories(res.data))
   }
}

const getCategories = (data) => {
   return { type : 'ALL_CAT' , payload : data }
}

export const addCategory = (data) => {
   return  { type : 'ADD_CAT', payload: data  }
}