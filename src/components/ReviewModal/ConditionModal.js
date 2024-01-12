import { Modal, Form, Col, Row, Card, Button } from "react-bootstrap";
import { useState } from "react";
const ConditionModal = (props) => {
    const {show,handleClose,handleProceed} = props
    const [condition,setCondition] = useState(false)
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Book Condition</Modal.Title>
      </Modal.Header>
    <Modal.Body>
        Price will differ based on your book Condition as per shown, If the condition is Good full amount will be funded if it is Fair the price will be slashed by 50%
        <Form>
            <Form.Check type='checkbox' name='condition' value={condition} onChange={(e)=>{setCondition(!condition)}}/>Agree
        </Form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="primary" onClick={()=>{handleProceed(condition)}} disabled={!condition}>
            Next
          </Button>
    </Modal.Footer>
    </Modal>
  );
};

export default ConditionModal
