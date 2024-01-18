import { Card, Row, Col, Form, Button, Pagination,Dropdown, DropdownButton, FloatingLabel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/product.css";
import { useEffect, useState } from "react";
import { startGetProduct } from "../actions/product-action";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProduct = useSelector(state => state.products.allProduct )
  const products = useSelector((state) => {
    return state.products.data;
  });
  //console.log('ch',products)
//   const [categories, setCategories] = useState([]);
  const categories = useSelector(state => state.categories.categories )
  const [categoryId, setCategoryId] = useState(
    localStorage.getItem("categoryId") ? localStorage.getItem("categoryId") : ""
  );
  const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(() => {
      const savedPage = localStorage.getItem("currentPage");
      return savedPage ? parseInt(savedPage) : 1;
    });
  //console.log('P',currentPage)


  const [sort, setSort] = useState(localStorage.getItem('sort')? localStorage.getItem('sort'):'');
  const sortValues = ["a-z", "z-a", "lowest-highest", "highest-lowest"];

  const productsPerPage = 8;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = products.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );
  //console.log("cp", currentProducts);   

  const totalPages = Math.ceil(allProduct.length / productsPerPage);

  let filteredProduct;
  if (categoryId ) {
    filteredProduct = products.filter((product) => {
      return product.categoryId === categoryId;
    });
    //console.log('fp',filteredProduct)
  }
  let catProducts
    if(categoryId && filteredProduct?.length > 0){
    catProducts = filteredProduct.slice(indexOfFirstProduct,indexOfLastProduct)
  } 
  //console.log('catP',catProducts)
  

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handlePaginationClick = (pageNo) => {
//console.log('I am',name)
    setCurrentPage(pageNo)
  };

  const handleSort = (e) => {
    setSort(e.target.value)
    localStorage.setItem('sort',e.target.value)
  }

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get("/categories/list");
//         setCategories(res.data);
//       } catch (e) {
//         console.log("categories err", e.message);
//       }
//     })();
//   }, []);

  useEffect(() => {
    if( categoryId && search ){
        if(sort){
            console.log('ssc',sort)
            dispatch(startGetProduct(search,categoryId,sort,currentPage))
        }else {
            console.log('else')
            dispatch(startGetProduct(search,categoryId,null,currentPage))
        }
    }
    else if (search) {
        if(sort){
            dispatch(startGetProduct(search,null,sort,currentPage))
        }else{
            dispatch(startGetProduct(search,null,null,currentPage));
        }
    }else if(categoryId){
        if(sort){
            dispatch(startGetProduct(null,categoryId,sort,currentPage))
        }else {
            dispatch(startGetProduct(null,categoryId,null,currentPage))
        }
    }
    else {
        if(sort){
            dispatch(startGetProduct(null,null,sort,currentPage))
        }else{
            dispatch(startGetProduct(null,null,null,currentPage));
        }
    }
    return () => {
        console.log('som')
    }
  }, [search,categoryId,sort,currentPage]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
    return () => {
        //console.log('poye')
        localStorage.removeItem('currentPage');
      };
  }, [currentPage]);

  return (
    <div className="container" style={{backgroundColor:'#fafdea', maxWidth:'100%', padding:'1px' }} >
    <div className="mt-4" > 
      <Form.Select
        className="mb-4"
        style={{ width: "300px", display: "inline-block", }}
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
        className="mb-4"
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
      
        <Form.Select className="mb-4" style={{ width: "300px", display: "inline-block" }} 
                    onChange={handleSort}
        >
            <option value='' >Sort</option>
            {sortValues.map((ele,i)=>(
                <option key={i} value={ele} selected={ele == sort} >{ele}</option>
            ))}
        </Form.Select>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4 mb-2" style={{marginRight:'0'}}>
        {/* {categoryId && !search
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
        }    */}
          {products?.map((ele) => (
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
                    style={{ opacity: `${ele.stockCount == 0 ? '0.3' : '1'}` }}
                    src={ele.image[0].url}
                    key={ele.image[0].key}
                  />
                  <Card.Body>
                    <Card.Title>{ele.title}</Card.Title>
                    <Card.Text>₹{ele.price} { ele.stockCount == 0 && <p style={{color:'red'}} >Out-Of-Stock</p>  } </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>
      <Pagination style={{ marginLeft:'40%' }}>
        <Pagination.First name='first' onClick={(e) => setCurrentPage(1)} />
        <Pagination.Prev  name='sub' onClick={(e) => setCurrentPage(currentPage -1)} />

        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            name='item'
            onClick={() => handlePaginationClick(index + 1)}
          >
            {index +1}
          </Pagination.Item>
        ))}
        <Pagination.Next name='add' onClick={(e) => setCurrentPage(currentPage +1)} />
        <Pagination.Last name='last' onClick={(e) => setCurrentPage(totalPages)} />
      </Pagination>
    </div>
   
  );
};

export default Products;
