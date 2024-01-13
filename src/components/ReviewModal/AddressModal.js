import React from 'react'
import {useState} from 'react'
import { Modal,Form, Col, Row, Card,Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const AddressModal = (props) => {
    const { show,handleClose,handleAddressId,handleCheckOut } = props

    const [btn,setBtn] = useState(false)

    const address = useSelector(state => state.address.address )
    console.log('add',address)

    const handleBtn = (bool) => {
        setBtn(bool)
    }

  return (
    <div>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
            <Modal.Title>Select-Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                { address?.map(ele => {
                    return (
                       
                        <Form.Group >
                            <Row>
                            <Col xs={1}>
                            <Form.Check type='radio' name='address' value={ele._id} onChange={() => {handleAddressId(ele._id) ; handleBtn(true) } }  />
                            </Col>
                            <Col>
                            
                            <Card style={{paddingLeft:'10px'}}>
                                <span>House Number - {ele.houseNumber}<br/></span>
                                <span>City - {ele.city}<br/></span>
                                <span>Pincode - {ele.pincode}<br/></span>
                                </Card>
                                </Col>
                            </Row>
                            
                        </Form.Group>
                        
                    )
                } ) }
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  disabled={ !btn } variant="success" onClick={handleCheckOut}>
            Next
          </Button>
          </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddressModal
