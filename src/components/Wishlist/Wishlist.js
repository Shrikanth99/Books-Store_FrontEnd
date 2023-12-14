import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const WishList = () => {
  const [wishList, setWishList] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ]);

  return (
    <div>
      <h2>Wishlisted Items</h2>
      {wishList.map((item) => (
        <Card key={item.id} style={{ width: '18rem', marginBottom: '10px' }}>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Button variant="danger">Remove from Wishlist</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default WishList;
