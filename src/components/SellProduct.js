import { Card, Row, Col, Form, Button} from "react-bootstrap"
import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import '../styles/product.css'
import { useEffect, useState } from "react"
import axios from "../config/axios"
import { startGetProduct } from "../actions/product-action"


const SellProduct = () => {
    const [categories,setCategories] = useState([])
    const [categoryId,setCategoryId] = useState(localStorage.getItem('categoryId')?localStorage.getItem('categoryId'):'')
    const [search,setSearch] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const products = useSelector(state => {
        return state.products.data
    })
    // console.log(products)
    let filteredProduct
    if(categoryId){
        filteredProduct = products.filter(product=>{
            return product.categoryId === categoryId
        })
    }

    // const handleClick = (id) =>{
    //     navigate(`/product/${id}`)
    // }

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/categories/list')
                setCategories(res.data)   
            } catch (e) {
                console.log('categories err',e)
            }
        })()

    },[categories])

    useEffect(()=>{
        if(search){
            dispatch(startGetProduct(search))
        }
        else{
            dispatch(startGetProduct())
        }
    },[search])

    return (
        <div>
            <Form.Select className='mb-5' style={{width: '300px',display:'inline-block'}} onChange={(e) => {
                setCategoryId(e.target.value)
                localStorage.setItem('categoryId',e.target.value)
            }}>
                <option  value="">Select-All</option>
                {categories.map((ele) => (
                    <option key={ele._id} value={ele._id} selected={ele._id==categoryId}>{ele.name}</option>
                ))}
            </Form.Select>
            <Form.Control className='mb-5' style={{width: '300px',display:'inline-block',marginLeft:'5px'}}
                type="text"
                placeholder="search"
                value={search}
                onChange={(e)=>{setSearch(e.target.value)}}
            />
            <Button style={{marginLeft:'5px'}} onClick={()=>setSearch('')}>Clear Search</Button>
            <Row xs={1} md={2} lg={3} className="g-4">
                {categoryId ? (
                    filteredProduct.map(ele=>(
                        <Col key={ele._id} xs={12} sm={6} md={4} lg={3} >
                        <Card className="custom-card">
                            <Card.Img
                                className="custom-card-img"
                                src={ele.image[0].url}
                                key={ele.image[0].key}
                            />
                            <Card.Body>
                                <Card.Title>{ele.title}</Card.Title>
                                <Card.Text> <strong>Condition :- Good</strong> ₹{ele.price}</Card.Text>
                                <Card.Text><b>Condition :- Fair</b> ₹{(ele.price*50)/100}</Card.Text>                            </Card.Body>
                        </Card>
                    </Col>
                    ))
                )  :
                (products?.map((ele) => (
                    <Col key={ele._id} xs={12} sm={6} md={4} lg={3} >
                        <Card className="custom-card">
                            <Card.Img
                                className="custom-card-img"
                                src={ele.image[0].url}
                                key={ele.image[0].key}
                            />
                            <Card.Body>
                                <Card.Title>{ele.title}</Card.Title>
                                <Card.Text> <strong>Condition :- Good</strong> ₹{ele.price}</Card.Text>
                                <Card.Text><b>Condition :- Fair</b> ₹{(ele.price*50)/100}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )))
}
                
            </Row>
        </div>
    )
}

export default SellProduct
