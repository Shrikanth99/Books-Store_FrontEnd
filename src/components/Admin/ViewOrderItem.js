import React from 'react'
import { Typography, TableRow, TableCell, Grid, Stack, Button, } from '@mui/material';


const ViewOrderItem = (props) => {
    const {item} = props

  return (
    <TableRow>
        <TableCell  ><img  width='70rem' src={item.product.image[0].url} /></TableCell>
        <TableCell>{item.product.title}</TableCell>
        <TableCell>{item.quantity}</TableCell>
        <TableCell>{item.product.price}</TableCell>
        <TableCell>{item.orderStatus}</TableCell>
        <TableCell>{item.orderId}</TableCell>
        <TableCell>{item.orderDate}</TableCell>
    </TableRow>
  )
}

export default ViewOrderItem
