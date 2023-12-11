import { Card, Row, Col} from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Products = () => {
    const navigate = useNavigate()
    const products = useSelector(state => {
        return state.products.data
    })

    const handleClick = (id) =>{
        navigate(`/product/${id}`)
    }

    return (
        <div>
            <Row xs={1} md={2} lg={3} className="g-4">
                {products?.map((ele) => (
                    <Col key={ele._id} xs={12} sm={6} md={4} lg={3} onClick={()=>handleClick(ele._id)}>
                        <Card style={{ width: "100%", marginBottom: "20px" }}>
                            <img
                                className="d-block w-100 carousel-image"
                                src={ele.image[0].url}
                                key={ele.image[0].key}
                            />
                            <Card.Body>
                                <Card.Title>{ele.title}</Card.Title>
                                <Card.Text>₹{ele.price}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Products