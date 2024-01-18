import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  FormControl,
  Typography,
  Chip,
  Stack,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Box,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useDispatch } from "react-redux";
import ViewOrderItem from "./ViewOrderItem";
import { startGetAllOrders } from "../../actions/order-action";

const ViewOrders = () => {
  const [sort,setSort] = useState(-1)
  const [pageNo, setPageNo] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage) : 1;
  });;

  const dispatch = useDispatch()

  const allOrders = useSelector((state) => state.order.orders);
  console.log(allOrders)

  const productsPerPage = 5;
  const indexOfLastProduct = pageNo * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const orderedProducts = []

  allOrders.forEach((ele) => {
     ele.orderItem.map((ele2)=> {
       orderedProducts.push({
        ...ele2,
        status:ele.orderStatus,
        orderId:ele._id,
        orderDate:ele.createdAt
      })
    })
  })
  //console.log('nagu',orderedProducts)

  const currentProducts = orderedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  console.log("cp", currentProducts);
  const totalPages = Math.ceil(orderedProducts.length / productsPerPage);
  console.log(totalPages)



  const handlePrevPage =() => {
    if(pageNo !==0){
      setPageNo( pageNo -1 )
    }
  }

  const handleNextPage = () => {
    setPageNo(pageNo +1)
  }

  useEffect(()=>{
    dispatch(startGetAllOrders(sort))
  },[sort])

  useEffect(() => {
    localStorage.setItem("currentPage", pageNo);
    return () => {
        localStorage.removeItem('currentPage');
      };
  }, [pageNo]);

  return (
    <div>
      <Typography variant="h3" gutterBottom textAlign="center" padding='20px' >All-Orders</Typography>
      <Box marginLeft="12vw" >
        <FormControl>
          <Select id="demo-simple-select" value={sort} label='Age' onChange={(e) => setSort(e.target.value) } >
            <MenuItem value={-1} >New</MenuItem>
            <MenuItem value={1} >Old</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper} sx={{ overflow: 'auto', width: "90vw", margin: 'auto' }} >
          <Table sx={{ minWidth: 65 }} size="medium" aria-label="a dense table" >
            <TableHead>
              <TableRow>
              </TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>#Order-ID</TableCell>
                <TableCell>Order-Date</TableCell>
            </TableHead>
            <TableBody>
              {currentProducts.map((ele) => <ViewOrderItem key={ele._id} item={ele} /> )}
              {/* { allOrders.map((ele) => (
                <TableRow>
                  <TableCell>{ele.orderStatus}</TableCell>
                </TableRow>
              )) } */}
              {/* { allOrders.map((ele)=> {
                return ele.orderItem.map((ele2) =>   <ViewOrderItem key={ele2._id} item={ele2} order={ele} /> )
              }) } */}
            </TableBody>
          </Table>
      </TableContainer>
      {/* Pagination buttons */}
      <Stack direction="row" justifyContent="center" gap="3vw" marginTop="2vh" >
        <Button variant='contained' disabled={pageNo === 1 } onClick={(e)=>setPageNo(pageNo -1)}>Prev</Button>
        <Chip label={pageNo } />
        <Button variant='contained' disabled={totalPages === pageNo } onClick={()=>setPageNo(pageNo +1)}>Next</Button>
      </Stack>
    </div>
  );
};

export default ViewOrders;
