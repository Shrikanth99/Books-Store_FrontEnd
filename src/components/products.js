import { Card, Row, Col, Form, Button, Pagination,Dropdown, DropdownButton, FloatingLabel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/product.css";
import { useEffect, useState } from "react";
import axios from "../config/axios";
import { startGetProduct } from "../actions/product-action";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.products.data;
  });
  console.log('ch',products)
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(
    localStorage.getItem("categoryId") ? localStorage.getItem("categoryId") : ""
  );
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage) : 1;
  });

  const [sort, setSort] = useState(localStorage.getItem('sort')? localStorage.getItem('sort'):'');
  const sortValues = ["a-z", "z-a", "lowest-highest", "highest-lowest"];

  const productsPerPage = 8;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  console.log("cp", currentProducts);   

  const totalPages = Math.ceil(products.length / productsPerPage);

  let filteredProduct;
  if (categoryId ) {
    filteredProduct = products.filter((product) => {
      return product.categoryId === categoryId;
    });
    console.log('fp',filteredProduct)
  }
  let catProducts
    if(categoryId && filteredProduct?.length > 0){
    catProducts = filteredProduct.slice(indexOfFirstProduct,indexOfLastProduct)
  } 
  console.log('catP',catProducts)
  

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (e) => {
    setSort(e.target.value)
    localStorage.setItem('sort',e.target.value)
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/categories/list");
        setCategories(res.data);
      } catch (e) {
        console.log("categories err", e.message);
      }
    })();
  }, []);

  useEffect(() => {
    if( categoryId && search ){
        if(sort){
            console.log('ssc',sort)
            dispatch(startGetProduct(search,categoryId,sort))
        }else {
            console.log('else')
            dispatch(startGetProduct(search,categoryId,null))
        }
    }
    else if (search) {
        if(sort){
            dispatch(startGetProduct(search,null,sort))
        }else{
            dispatch(startGetProduct(search,null,null));
        }
    }else if(categoryId){
        if(sort){
            dispatch(startGetProduct(null,categoryId,sort))
        }else {
            dispatch(startGetProduct(null,categoryId,null))
        }
    }
    else {
        if(sort){
            dispatch(startGetProduct(null,null,sort))
        }else{
            dispatch(startGetProduct(null,null,null));
        }
    }
    return () => {
        console.log('som')
    }
  }, [search,categoryId,sort]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  return (
    <div>
      <Form.Select
        className="mb-5"
        style={{ width: "300px", display: "inline-block" }}
        onChange={(e) => {
          setCategoryId(e.target.value);
          localStorage.setItem("categoryId", e.target.value);
        }}
      >
        <option value="">Select-All</option>
        {categories.map((ele) => (
          <option
            key={ele._id}
            value={ele._id}
            selected={ele._id == categoryId}
          >
            {ele.name}
          </option>
        ))}
      </Form.Select>
      <Form.Control
        className="mb-5"
        style={{ width: "300px", display: "inline-block", marginLeft: "8px" }}
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Button style={{ marginLeft: "5px", display:'inline-block' }} onClick={() => setSearch("")}>
        Clear Search
      </Button>
      
        <FloatingLabel className="mb-5" style={{ width: "300px", display: "inline-block",marginLeft:'10px' }} >
        <Form.Select className="mb-5" style={{ width: "300px", display: "inline-block" }} 
                    onChange={handleSort}
        >
            <option value='' >Sort</option>
            {sortValues.map((ele,i)=>(
                <option key={i} value={ele} selected={ele == sort} >{ele}</option>
            ))}
        </Form.Select>
        </FloatingLabel>
      
      <Row xs={1} md={2} lg={3} className="g-4 mb-2" >
        {categoryId && !search
          ? catProducts?.map((ele) => (
              <Col
                key={ele._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                onClick={() => handleClick(ele._id)}
              >
                <Card border="success" className="custom-card">
                  <Card.Img
                    className="custom-card-img"
                    src={ele.image[0].url}
                    key={ele.image[0].key}
                  />
                  <Card.Body>
                    <Card.Title>{ele.title}</Card.Title>
                    <Card.Text>₹{ele.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : currentProducts?.map((ele) => (
              <Col
                key={ele._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                onClick={() => handleClick(ele._id)}
              >
                <Card className="custom-card">
                  <Card.Img
                    className="custom-card-img"
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
      <Pagination style={{ marginLeft: "700px" }}>
        <Pagination.First onClick={() => handlePaginationClick(1)} />
        <Pagination.Prev onClick={() => handlePaginationClick(currentPage)} />

        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePaginationClick(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePaginationClick(currentPage)} />
        <Pagination.Last onClick={() => handlePaginationClick(totalPages)} />
      </Pagination>
    </div>
  );
};

export default Products;
