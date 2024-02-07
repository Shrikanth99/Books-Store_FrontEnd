import React, { useState } from 'react';
import { Card, Button, Row,Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { startRemoveWishlist } from '../../actions/wishlist-action';
import '../../styles/product.css'

const WishList = () => {
    const dispatch = useDispatch()
    const wishlist = useSelector(state => {
        return state.wishlist.data
    })

    const products = useSelector(state => {
        return state.products.data
    })
    const handleWishlist = (id) => {
        const wishlistItem = wishlist.find(ele=>ele.product===id)
        dispatch(startRemoveWishlist(wishlistItem._id))
    }
    let wishlistItems = []
    wishlist.forEach(ele => {
        wishlistItems.push(products.find(ele2 => ele2._id === ele.product))
    })
    console.log('syook', wishlistItems)
    return (
        <div style={{ backgroundColor: '#fafdea', height: '100%', padding: '20px', minHeight:'75vh' }} >
        <h2>Wishlisted Items</h2>
        {/* <div style={{ display: 'flex', flexWrap: 'wrap' }} > */}
        <Row xs={1} md={2} lg={3} className="g-4 mb-2" style={{marginRight:'0'}}>
            {wishlistItems.map((item) => (
                <Col key={item._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className='ml-4' >
                    <Card  key={item._id} className='custom-card'  >
                        <Card.Img variant="top" src={item.image[0].url} className='custom-card-img'  />
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>Price: ₹{item.price}</Card.Text>
                            <Button variant="danger" onClick={() => handleWishlist(item._id)}>Remove from Wishlist</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>        
        </div>

    );

};

export default WishList;
