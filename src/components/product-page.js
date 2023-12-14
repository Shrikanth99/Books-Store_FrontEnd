// ProductPage.js

import React, { useContext, useState } from 'react';
import _ from 'lodash';
import { Container, Row, Col, Image, Button, Carousel } from 'react-bootstrap';
import { useParams,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { startRemoveCart, startCreateCart } from '../actions/product-action';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../App';
import { startCreateWishlist, startRemoveWishlist } from '../actions/wishlist-action';

  const ProductPage = () => {
  const [cartToggle, setCartToggle] = useState(false)
  const [wishlistToggle,setWishlistToggle] = useState(false)
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [product] = useSelector(state => {
    return state.products.data.filter(ele => ele._id === id)
  })

  const cart = useSelector(state => {
    return state.products.cart
  })
  const wishlist = useSelector(state=>{
    return state.wishlist.data
  })
  console.log('satwik',wishlist)
  const index = cart.findIndex(product => product.productId._id == id)
  const wishlistIndex = wishlist.findIndex(product=>product.product == id)
  const wishlistItem = wishlist.find(product=>product.product==id)
  console.log('lav',wishlistItem)
  if(index!==-1 && !cartToggle){
    setCartToggle(true)
  } 

  if(wishlistIndex!=-1 && !wishlistToggle){
    setWishlistToggle(true)
  }

  console.log("nishan",index)

  const cartToggleSet = () => {
    setCartToggle(!cartToggle)
  }

  const wishlistToggleSet = () =>{
    setWishlistToggle(!wishlistToggle)
  }
  const {userState} = useContext(UserContext)
  console.log('ni',userState)
  const user = userState.user.role
  const handleClick = () => {
    if(!localStorage.getItem('token')){
      navigate('/login',{state:{msg:'You need to Login first'}})
    }
    else{
      if (!cartToggle) {
        dispatch(startCreateCart(id, cartToggleSet))
      }
      else {
        dispatch(startRemoveCart(id, cartToggleSet))
        // console.log("I am working")
      }
    }

  }

  const handleWishlist = () =>{
    if(!localStorage.getItem('token')){
      navigate('/login',{state:{msg:'You need to Login first'}})
    }
    else{
      if (!wishlistToggle) {
        dispatch(startCreateWishlist(id, wishlistToggleSet))
      }
      else {
        dispatch(startRemoveWishlist(wishlistItem?._id, wishlistToggleSet))
        console.log("I am working")
      }
    }
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Carousel>
            {
              product?.image.map(ele => (
                <Carousel.Item key={ele._id}>
                  <Image src={ele.url} alt="Product Image" fluid />
                </Carousel.Item>
              ))
            }

          </Carousel>
        </Col>
        <Col md={6}>
          <h2>{product?.title}</h2>
          <p>{product?.description}</p>
          <p className="price">₹{product?.price}</p>
          {cartToggle  ? (
            <Button variant="warning" className="mr-2" onClick={handleClick}>
              Remove from the Cart
            </Button>
          ) : (
            <Button variant="success" className="mr-2" onClick={handleClick} disabled={userState.user?.role === 'admin'} >
              Add to Cart 
            </Button>
          )}
          {wishlistToggle ? (
            <Button variant="warning" className="mr-2" onClick={handleWishlist} style={{marginLeft:'10px'}}>
              Remove from the Wishlist
            </Button>
          ) : (
            <Button variant="success" className="mr-2" onClick={handleWishlist} style={{marginLeft:'10px'}} disabled={userState.user?.role === 'admin'}>
              Add to Wishlist
            </Button>
          )}
          <Toaster />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
