// ProductPage.js

import React, { useState } from 'react';
import { Container, Row, Col, Image, Button, Carousel } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { startRemoveCart, startCreateCart } from '../actions/product-action';
import { Toaster } from 'react-hot-toast';

const ProductPage = () => {
  const [toggle, setToggle] = useState(false)
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product] = useSelector(state => {
    return state.products.data.filter(ele => ele._id === id)
  })

  const cart = useSelector(state => {
    return state.products.cart
  })
  console.log('satwik',cart)
  const index = cart.findIndex(product => product.productId._id == id)
  if(index!==-1 && !toggle){
    setToggle(true)
  } 

  console.log("nishan",index)

  const toggleSet = () => {
    setToggle(!toggle)
  }
console.log(toggle)
  const handleClick = () => {
    if (!toggle) {
      dispatch(startCreateCart(id, toggleSet))
    }
    else {
      dispatch(startRemoveCart(id, toggleSet))
      // console.log("I am working")
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
          {toggle ? (
            <Button variant="warning" className="mr-2" onClick={handleClick}>
              Remove from the Cart
            </Button>
          ) : (
            <Button variant="success" className="mr-2" onClick={handleClick}>
              Add to Cart
            </Button>
          )}
          <Toaster />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
