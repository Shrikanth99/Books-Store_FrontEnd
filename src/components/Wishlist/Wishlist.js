import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { startRemoveWishlist } from '../../actions/wishlist-action';

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

        <div>
            <h2>Wishlisted Items</h2>
            {wishlistItems.map((item) => (
                <Card key={item._id} style={{ width: '18rem', marginBottom: '10px' }}>
                    <Card.Img variant="top" src={item.image[0].url} />
                    <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>Price: ₹{item.price}</Card.Text>
                        <Button variant="danger" onClick={() => handleWishlist(item._id)}>Remove from Wishlist</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );

};

export default WishList;
