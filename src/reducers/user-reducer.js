 function userReducer(state,action){
    switch(action.type){
        case 'USER_LOGIN':{
            return {...state,user:action.payload,isLoggedIn:true}
        }
        case 'LOGOUT_USER':{
            return {...state,user:{},isLoggedIn:false}
        }
        default:{
            return {...state}
        }
    }
 }

 export default userReducer