import { Modal, Form, Col, Row, Card, Button } from "react-bootstrap";
import { useState } from "react";
const ConditionModal = (props) => {
    const {show,handleClose,handleProceed} = props
    const [condition,setCondition] = useState('')
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Book Condition</Modal.Title>
      </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Check type='radio' name='condition' value='Good' onChange={(e)=>{setCondition(e.target.value)}}/>Good
            <Form.Check type='radio' name='condition' value='Fair' onChange={(e)=>{setCondition(e.target.value)}}/>Fair
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
