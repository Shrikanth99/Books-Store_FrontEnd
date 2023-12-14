import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom'
import { createContext,useReducer,useEffect} from 'react';
import {useDispatch} from 'react-redux'
import axios from './config/axios';
import { startGetProduct, startSetCart } from './actions/product-action.js';
import NavBar from "./components/NavBar/NavBar.js"
import UserNavBar from './components/NavBar/UserNavBar.js';
import Home from './components/Home';
import Register from './components/Register';
import LoginForm from './components/Login';
import AdminNavBar from './components/NavBar/AdminNavBar.js';
import userReducer from './reducers/user-reducer';
import Product from './components/products.js';
import ProductPage from './components/product-page.js';
import ProductAdd from './components/product-add.js';
import Carts from './components/Carts/Carts.js';
import MyAccount from './components/My-Account/MyAccount.js';
import ShowAddress from './components/AddressForm/ShowAddress.js';
import {startGetUserAddress} from './actions/address-action.js'
import { useSelector } from 'react-redux';
import AddressForm from './components/AddressForm/AddressForm.js';
import MyProfile from './components/My-Account/MyProfile.js';
import MyOrders from './components/My-Account/MyOrders.js';

export const UserContext = createContext()
const App = () =>{

  const {addres} = useSelector(state => state.address )

  const [userState,userDispatch] = useReducer(userReducer,{user:{},isLoggedIn:false})
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(startGetProduct())
   
  },[])

  useEffect(()=>{
    if(localStorage.getItem('token')){
      (async()=>{
        try{
          const profile = await axios.get('/api/users/profile',{
            headers: {
                'Authorization' : localStorage.getItem('token')
            } 
        })
        userDispatch({type:'USER_LOGIN',payload:profile.data})
        dispatch(startSetCart())
        }
        catch(e){
          alert(e)
        }
      })()
     
    }
  },[])

  console.log('us',userState)

  return (
    <UserContext.Provider value={{userState,userDispatch}}>
      {userState.isLoggedIn ? userState.user.role === 'admin' && <AdminNavBar/> || userState.user.role === 'user' && <UserNavBar /> : <NavBar />}

      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/products' element={<Product />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/products/add' element={<ProductAdd/>} />
        <Route path='/myCart' element={<Carts/>} />
        <Route path='/account' element={<MyAccount/>} >
            <>
              <Route path='/account/my-orders' element={<MyOrders/>} />
              <Route path='/account/my-profile' element={<MyProfile/>} />
              <Route path='/account/address' element={<ShowAddress/>} />
              <Route path='/account/addressForm' element={<AddressForm/>} />
              <Route path='/account/addressForm/:id'  element={<AddressForm/>}/>
            </>
        </Route>
        
      </Routes>
    </UserContext.Provider>
  )
}

export default App