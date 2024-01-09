import React from 'react'
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';    
import { Form, Button, Card, InputGroup, Col } from 'react-bootstrap';
import axios from '../config/axios';
import { startAddProduct } from '../actions/product-action';
import { useNavigate } from 'react-router-dom';
import { addCategory } from '../actions/category-action';



    const AddProduct = () => {

        const categories = useSelector(state => state.categories.categories )

        const [title,setTitle] = useState('')
        const [author,setAuthor] = useState('')
        const [description,setDescription] = useState('')
        const [price,setPrice] = useState('')
        const [ratings,setRatings] = useState('')
        const [stockCount,setStockCount] = useState('')
        // const [categories,setCategories] = useState([])
        const [categoryId,setCategoryId] = useState('')
        const [categoryName,setCategoryName] = useState('')
        const [condition,setCondition] = useState('')
        const [files,setFiles] = useState([])
        const [formError,setFormError] = useState({})
        const errors = {}

        const dispatch = useDispatch()
        const navigate = useNavigate()

        function runValidation(){
            if(title.length === 0){
                errors.title = '* title is required'
            }
            if(author.length === 0){
                errors.author = '* Author name is required'
            }
            if( description.length === 0 ){
                errors.description = '*Description is required'
            }
            if(price.length === 0){
                errors.price = '* Price is required'
            }
            if(files.length === 0){
                errors.files = '* Images is reuired'
            }
            if(categoryId.length === 0){
                errors.categoryId = '*Category must select'
            }
            if(stockCount.length === 0){
                errors.stockCount = '* StockCount is required'
            }
            return errors
        }


        const handleSubmit = (e) => {
            e.preventDefault()
            runValidation()

            if(Object.keys(errors).length === 0 ){
                const formData = new FormData()
                formData.append('title',title)
                formData.append('author',author)
                formData.append('description',description)
                formData.append('price',Number(price))
                formData.append('stockCount',Number(stockCount))
                formData.append('categoryId',categoryId)
                formData.append('condition',condition)

                files.forEach((obj) => {
                    formData.append('image',obj)
                })
                // console.log('Fd',formData)
                dispatch(startAddProduct(formData))
                .then((
                    setTitle(''),
                    setAuthor(''),
                    setDescription(''),
                    setPrice(''),
                    setStockCount(''),
                    setCategoryId(''),
                    setCondition(''),
                    setFiles([]),
                    navigate('/products')
                    
                ))

            } else {
                console.log('fd')
                setFormError(errors)
            }
        }

        function handleFiles(e) {
            const upload = e.target.files
            setFiles(prevFiles => [...prevFiles, ...upload])
        }

        const handleAdd = async () => {
            if(categoryName){
                const data = {
                    name : categoryName
                }
                try {
                    const res = await axios.post('/categories',data, {
                        headers : {
                            'Authorization' : localStorage.getItem('token')
                        }
                    })
                    const category = res.data
                    // setCategories([...categories,category])
                    setCategoryId(category._id)
                    dispatch(addCategory(category))
                    setCategoryName('')
                } catch (e) {
                    console.log(e)
                }
            }
        }


    return (
        <div>
            <Card style={{ width: '1000px', padding: '20px' }} className="mt-5">
            <Card.Header  >
               <Card.Title  >Add Product</Card.Title>
            </Card.Header>
            <Card.Body>
               <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Form.Group  className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control style={{ width: '500px' }} 
                                        className={`${formError.title ? 'is-invalid' : ''}`}
                                        type='text' placeholder='Book-Title' 
                                        value={title} onChange={(e) => setTitle(e.target.value) }  />
                        {formError.title && (
                           <span className="invalid-feedback" >{formError.title}</span>
                        )}
                    </Form.Group>
                    <Form.Group  className="mb-3">
                        <Form.Label>Author</Form.Label>
                        <Form.Control style={{ width: '500px' }} 
                            className={`${formError.author ? 'is-invalid' : ''}`}
                            type='text' placeholder='Author' value={author} 
                            onChange={(e) => setAuthor(e.target.value) }
                        />
                        {formError.author && (
                           <span className="invalid-feedback" >{formError.author}</span>
                        )}
                    </Form.Group>
                    <Form.Group className='mb-3' >
                        <Form.Label>Description</Form.Label>
                        <Form.Control style={{width: '500px'}}
                            className={`${formError.description ? 'is-invalid' : ''}`}
                            as="textarea" placeholder='Description' value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {formError.description && (
                           <span className="invalid-feedback" >{formError.description}</span>
                        )}
                    </Form.Group>
                    <Form.Group className='mb-3' >
                        <Form.Label>Select-Category</Form.Label>
                        <Form.Select className='mb-3' style={{width: '500px'}} value={categoryId} onChange={(e)=>setCategoryId(e.target.value)} >
                            <option value='' >Select-All</option>
                            {categories.map((ele) => (
                                <option key={ele._id} value={ele._id} >{ele.name}</option>
                            ))}
                        </Form.Select>
                        {formError.categoryId && (
                           <span className="invalid-feedback" >{formError.categoryId}</span>
                        )}
                        <InputGroup className='mb-3' style={{width:'500px'}} >
                                <Form.Control placeholder='Add-Category' value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value) } />
                                <Button variant='info' onClick={handleAdd} >Add-Category</Button>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formFileMultiple" className="mb-3" style={{ width: '500px' }}>
                     <Form.Label>upload product image</Form.Label>
                     <Form.Control type="file" name='image' value={undefined} 
                        className={`${formError.files ? 'is-invalid' : ''}`} 
                        onChange={handleFiles} multiple />
                     {formError.files && (
                        <span className="invalid-feedback" >{formError.files}</span>
                     )}
                  </Form.Group>
                    <Form.Group>
                        <Form.Label  >Condition</Form.Label>
                        <Col>
                            <Form.Check type='radio' name='condition' label='Good' value='Good'
                                onChange={(e) => setCondition(e.target.value) }
                            />
                            <Form.Check type='radio' name='condition' label='Fair' value='Fair' 
                                onChange={(e) => setCondition(e.target.value) }
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group className='mb-3' >
                        <Form.Label>Price</Form.Label>
                            <Form.Control style={{width: '500px'}} placeholder='Price' 
                                className={`${formError.price ? 'is-invalid' : ''}`} 
                                value={price} type='number'
                               onChange={(e) => setPrice(e.target.value)} />
                            {formError.price && (
                                <span className="invalid-feedback" >{formError.price}</span>
                            )}
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Stock</Form.Label>
                        <Form.Control style={{width: '500px'}} placeholder='Stock'
                            className={`${formError.stockCount ? 'is-invalid' : '' }`}
                            value={stockCount} type='number'
                            onChange={(e) => setStockCount(e.target.value) }
                        />
                        {formError.stockCount && (
                           <span className="invalid-feedback" >{formError.stockCount}</span>
                        )}
                    </Form.Group>
                  
                    <div variant="primary" type="submit" className="d-flex justify-content-center mt-5 ">
                     <Button style={{ width: '400px' }} type="submit">submit</Button>
                    </div>
               </Form>
            </Card.Body>
         </Card>
        </div>
    )
    }

    export default AddProduct
