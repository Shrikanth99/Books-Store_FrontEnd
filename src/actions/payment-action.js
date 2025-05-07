import axios from "../config/axios";
import {toast} from 'react-hot-toast'
import { startEmptyCart } from "./product-action";

export const startPayment = (products, totalAmount, userEmail) => {
  // console.log('pc',products)
  // console.log(totalAmount)
  // console.log(userEmail)
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "/payment/create",
        { products, totalAmount, userEmail },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      //console.log("pa", res.data);
      localStorage.setItem("transactionId", res.data.id);
      window.location = res.data.url;
    } catch (e) {
      console.log("payErr", e);
    }
  };
};

// export const  startListingPayment = () => {
//     return async(dispatch) => {
//         try{
//             const response = await axios.get('/payment/list',{
//                 headers : {
//                     'Authorization':localStorage.getItem('token')
//                 }
//             })
//             //console.log('lisPayment',response.data)
//             dispatch(pendinPayments(response.data))
//         }catch(e){
//             console.log('listErr',e)
//         }
//     }
// }



export const startUpdatePayment = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/payment/update/${id}`, null, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      });
      if(Object.keys(response.data).length > 0){
        toast.success('Payment successfully done')
        console.log('nis',response.data)
          dispatch(successPayment(response.data))
          localStorage.removeItem('transactionId')
      }
    } catch (e) {
      console.log(e);
    }
  };
};

const successPayment = (data) => {
    return {type:'SUCCESS_PAYMENT',payload:data}
}

export const startRemovePayment = (id) =>{
    return async (dispatch) =>{
        try{
            const response = await axios.delete(`/payment/delete/${id}`,{
                headers: {
                    Authorization: localStorage.getItem("token"),
                  }
            })
            localStorage.removeItem('transactionId')
            console.log('op',response.data)
        }
        catch(e){
            console.log(e)
        }
    }
}

