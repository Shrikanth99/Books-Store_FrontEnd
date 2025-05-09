import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { createContext, useReducer, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "./config/axios";
import { startGetAllProducts, startGetProduct, startSetCart } from "./actions/product-action.js";
import NavBar from "./components/NavBar/NavBar.js";
import UserNavBar from "./components/NavBar/UserNavBar.js";
import Home from "./components/Home";
import Register from "./components/Register";
import LoginForm from "./components/Login";
import AdminNavBar from "./components/NavBar/AdminNavBar.js";
import ModeratorNavBar from "./components/NavBar/moderatorNavbar.js";
import userReducer from "./reducers/user-reducer";
import Product from "./components/products.js";
import ProductPage from "./components/product-page.js";
import Carts from "./components/Carts/Carts.js";
import MyAccount from "./components/My-Account/MyAccount.js";
import ShowAddress from "./components/AddressForm/ShowAddress.js";
import { startGetUserAddress } from "./actions/address-action.js";
import { useSelector } from "react-redux";
import AddressForm from "./components/AddressForm/AddressForm.js";
import MyOrders from "./components/My-Account/MyOrders.js";
import Wishlist from "./components/Wishlist/Wishlist.js";
import { startSetWishlist } from "./actions/wishlist-action.js";
import Profile from "./components/Profile/Profile.js";
import AddProduct from "./components/AddProduct.js";
import SellProduct from "./components/SellProduct.js";
import { startGetOrder, startGetAllOrders } from "./actions/order-action.js";
import { startGetReview } from "./actions/review-action.js";
import ViewOrders from "./components/Admin/ViewOrders.js";
import Stats from "./components/Admin/Stats.js";
import { startGetCategories } from "./actions/category-action.js";
import { startGetProcurement } from "./actions/procurement-action.js";
import Notification from "./components/Notification/Notification.js";
import MySelling from "./components/My-Account/MySelling.js";
import Footer from "./components/Footer/Footer.js";
import About from "./components/About";

export const UserContext = createContext();
const App = () => {
  const { addres } = useSelector((state) => state.address);

  const [userState, userDispatch] = useReducer(userReducer, {
    user: {},
    isLoggedIn: false,
  });
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(startGetProduct(null, null, null));
    dispatch(startGetCategories())
    dispatch(startGetAllProducts())
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      (async () => {
        try {
          const profile = await axios.get("/api/users/profile", {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          userDispatch({ type: "USER_LOGIN", payload: profile.data });
          if (profile.data.role === "user") {
            dispatch(startSetCart());
            dispatch(startSetWishlist());
            dispatch(startGetOrder());
            dispatch(startGetReview())
            dispatch(startGetUserAddress())
            dispatch(startGetProcurement())
          }else if( profile.data.role === 'admin' ){
            dispatch(startGetAllOrders(null))
            dispatch(startGetProcurement())
          }else if(profile.data.role === 'moderator') {
            dispatch(startGetProcurement()) 
          }
        } catch (e) {
          console.log('app-Err',e)
        }
      })();
    }
  }, []);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
    
      {userState.isLoggedIn ? (
        (userState.user.role === "admin" && <AdminNavBar />) ||
        (userState.user.role === "user" && <UserNavBar />)  || 
        (userState.user.role === 'moderator' && <ModeratorNavBar/> )
      ) : (
        <NavBar />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/products" element={<Product />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/all-Orders" element={<ViewOrders/> } />
        <Route path="/stats" element={<Stats/>} />
        <Route path="/myCart" element={<Carts />} />
        <Route path="/account" >
              {/* Nested Routes */}
            <Route path="profile" element={<Profile />} />
            <Route path="/account/my-orders" element={<MyOrders />} />
            <Route path="/account/my-sell" element={<MySelling/>} />
            <Route path="/account/address" element={<ShowAddress />} />
            <Route path="/account/addressForm" element={<AddressForm />} />
            <Route path="/account/addressForm/:id" element={<AddressForm />} />
          
        </Route>

        <Route path="/account" element={<MyAccount />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/sellProduct" element={<SellProduct />} />
        <Route path="/notifications" element={<Notification/>} />
        {/* <Route path='/addresses' element={<AddressForm/>} /> */}
      </Routes>
     
     <footer className="bottom" >

      <Footer/>
     </footer>
      
     
    </UserContext.Provider>
  );
};

export default App;
