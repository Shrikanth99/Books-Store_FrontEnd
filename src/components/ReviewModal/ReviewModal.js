import React , {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useDispatch,useSelector } from 'react-redux';
import { startAddReview } from '../../actions/review-action';


const ReviewModal = (props) => {

    const {show,productId,handleClose} = props
    const dispatch = useDispatch()
    const [rating,setRating] = useState(0)
    const [review,setReview] = useState('')

    
    

    const handleSubmit = () => {
        const fData = {
          product: productId,
          rating,
          review      
        }
        handleClose()
        console.log('fd',fData)
        dispatch(startAddReview(fData))
        
    }

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form  >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Rating</Form.Label>
              <Stack spacing={1}>
                <Rating name="half-rating" value={rating} onChange={(e)=>setRating(e.target.value)} precision={0.5} />
              </Stack>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Review</Form.Label>
              <Form.Control as="textarea" rows={3} value={review} onChange={(e)=>setReview(e.target.value)}  />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ReviewModal
