import React from 'react'
import { Container,Form } from 'react-bootstrap';

const MyProfile = () => {
  return (
    <div>
      <h3>Profile</h3>
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Form>
            <Form.Group>
                <Form.Label>User-Name</Form.Label>
                <Form.Control type='text' />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' />
            </Form.Group>
            <Form.Group>
                <Form.Label>Phone-Number</Form.Label>
                <Form.Control type='number' />
            </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

export default MyProfile
