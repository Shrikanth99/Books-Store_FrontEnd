// ProductPage.js

import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Carousel,
  ProgressBar,
  ListGroup,
  Card,

} from "react-bootstrap";
import Rating from "@mui/material/Rating";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { startRemoveCart, startCreateCart } from "../actions/product-action";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../App";
import {
  startCreateWishlist,
  startRemoveWishlist,
} from "../actions/wishlist-action";
import { startGetProductReview } from "../actions/review-action";

const ProductPage = () => {
  const [cartToggle, setCartToggle] = useState(false);
  const [wishlistToggle, setWishlistToggle] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //view single product
  const [product] = useSelector((state) => {
    return state.products.data.filter((ele) => ele._id === id);
  });
  console.log('pp',product)

  const cart = useSelector((state) => {
    return state.products.cart;
  });
  const wishlist = useSelector((state) => {
    return state.wishlist.data;
  });

  const reviews = useSelector((state) => {
    return state.review.productReview;
  });
  console.log("re", reviews);

  const fiveStars = reviews.filter(review=> review.rating > 4 && review.rating <= 5)
  console.log('helena',fiveStars)
  const fourStars = reviews.filter(review=> review.rating > 3 && review.rating <=4)
  console.log('lana',fourStars)
  const threeStars = reviews.filter(review=>review.rating > 2 && review.rating <=3 )
  const twoStars = reviews.filter(review=>review.rating > 1 && review.rating <=2)
  const oneStar = reviews.filter(review=>review.rating > 0 && review.rating <=1)

  //console.log('satwik',wishlist)
  const index = cart.findIndex((product) => product.productId._id == id);
  const wishlistIndex = wishlist.findIndex((product) => product.product == id);
  const wishlistItem = wishlist.find((product) => product.product == id);
  //console.log('lav',wishlistItem)
  if (index !== -1 && !cartToggle) {
    setCartToggle(true);
  }

  if (wishlistIndex != -1 && !wishlistToggle) {
    setWishlistToggle(true);
  }

  // console.log("nishan",index)

  const cartToggleSet = () => {
    setCartToggle(!cartToggle);
  };

  const wishlistToggleSet = () => {
    setWishlistToggle(!wishlistToggle);
  };
  const { userState } = useContext(UserContext);
  // console.log('ni',userState)
  const user = userState.user.role;
  const handleClick = () => {
    const body = {
      mode: 'buy'
    }
    if (!localStorage.getItem("token")) {
      navigate("/login", { state: { msg: "You need to Login first" } });
    } else {
      if (!cartToggle) {
        dispatch(startCreateCart(id,body,cartToggleSet));
      } else {
        dispatch(startRemoveCart(id,body,cartToggleSet));
        // console.log("I am working")
      }
    }
  };

  const handleWishlist = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { state: { msg: "You need to Login first" } });
    } else {
      if (!wishlistToggle) {
        dispatch(startCreateWishlist(id, wishlistToggleSet));
      } else {
        dispatch(startRemoveWishlist(wishlistItem?._id, wishlistToggleSet));
        console.log("I am working");
      }
    }
  };

  useEffect(() => {
    dispatch(startGetProductReview(id));
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Carousel style={{ width: "500px" }}>
            {product?.image.map((ele) => (
              <Carousel.Item key={ele._id}>
                <Image
                  src={ele.url}
                  alt="Product Image"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    maxHeight: "300px",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={6}>
          <h2>{product?.title}</h2>
          <p>
            {" "}
            <b>Description :-</b> {product?.description}
          </p>
          <p className="price">₹{product?.price}</p>
          {cartToggle ? (
            <Button variant="warning" className="mr-2" onClick={handleClick}>
              Remove from the Cart
            </Button>
          ) : (
            <Button
              variant="success"
              className="mr-2"
              onClick={handleClick}
              disabled={userState.user?.role === "admin" || product?.stockCount === 0 }

            >
              Add to Cart
            </Button>
          )}
          {wishlistToggle ? (
            <Button
              variant="warning"
              className="mr-2"
              onClick={handleWishlist}
              style={{ marginLeft: "10px" }}
            >
              Remove from the Wishlist
            </Button>
          ) : (
            <Button
              variant="success"
              className="mr-2"
              onClick={handleWishlist}
              style={{ marginLeft: "10px" }}
              disabled={userState.user?.role === "admin"}
            >
              Add to Wishlist
            </Button>
          )}
          <Toaster />
          <hr />
         
            {reviews.length > 0 && (
               <Card>
              <Card.Header>Product Reviews</Card.Header>
              <ListGroup variant="flush">
                {reviews.map((review, index) => (
                  <ListGroup.Item key={index}>
                    <strong>{review.userId.userName}<Rating
                      value={review.rating} 
                      precision={0.5}
                      readOnly 
                    /></strong>
                    <p>{review.review}</p>
                    {/* You can add more details like date, rating, etc. if available in your review data */}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
            )}
            
        </Col>  
      </Row>
      <Row style={{ width: "20%" ,  height: '5vh' }}>
        <div>
          <span >5⭐</span>
          <ProgressBar animated now={(fiveStars.length/reviews.length)*100} style={{ marginBottom: "10px" }} />
        </div>
        <div>
          <span>4⭐</span>
          <ProgressBar animated now={(fourStars.length/reviews.length)*100} style={{ marginBottom: "10px" }} />
        </div>
        <div>
          <span>3⭐</span>
          <ProgressBar animated now={(threeStars.length/reviews.length)*100} style={{ marginBottom: "10px" }} />
        </div>
        <div>
          <span>2⭐</span>
          <ProgressBar animated now={(twoStars.length/reviews.length)*100} style={{ marginBottom: "10px" }} />
        </div>
        <div>
          <span>1⭐</span>
          <ProgressBar animated now={(oneStar.length/reviews.length)*100} style={{ marginBottom: "10px" }} />
        </div>
      </Row>
    </Container>
  );
};

export default ProductPage;
