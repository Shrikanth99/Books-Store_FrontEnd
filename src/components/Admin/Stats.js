import { PieChart,BarChart } from '@mui/x-charts';
import React from 'react'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography';



const Stats = () => {
    
    const products = useSelector((state) => {
        return state.products.data;
    });
    const orders = useSelector((state) => {
        return state.order.orders
    })
    console.log('od',orders)
    const categories = useSelector(state => state.categories.categories )

    const data = categories?.map((ele,i)=> {
        return products?.reduce((acc,cv) => {
            if(cv.categoryId == ele._id ){
                acc.value += 1
            }
            return acc
        },{ id : i, label : ele.name , value : 0  })
    })
  

    const barData = categories?.map((ele,i)=>{
        return products?.reduce((acc,cv)=>{
            if(cv.categoryId == ele._id){
                acc += 1
            }
            return acc
        },0)
    })
    // console.log('bd',barData)

    const orderData = categories?.map((ele,i)=> {
        return orders.reduce((acc,cv) => {
            acc += cv.orderItem.reduce((acc2,cv2) => {
                if(cv2.product.categoryId == ele._id){
                    acc2 += cv2.quantity
                }
                return acc2
            } ,0)
            return acc
        },0)
    })
    console.log('dani',orderData)

    const orderPieData = categories?.map((ele,i)=> {
        return orders?.reduce((acc,cv) => {
            acc.value += cv.orderItem.reduce((acc2,cv2) => {
                if( cv2.product.categoryId == ele._id ) {
                    acc2 += cv2.quantity
                }
                return acc2
            },0)
            return acc
        },{id:i,label: ele.name, value : 0 })
    })
    console.log('oP',orderPieData)

    const sizing = {
        margin : {right: 20},
        width : 200,
        height : 200
    }

    return (
        <>
        { products.length > 0 && categories.length > 0 && (
            <div>
            <Typography raphy sx={{ fontSize: 45, display: 'flex', justifyContent: 'center' }} color="text.secondary" >Categories Statistics</Typography>
            <div style={{display:'flex'}}>
            <PieChart series={[
                {
                data: data
                },
            ]}
            width={650}
            height={300}
            margin={{right:200}}         
            />
            <BarChart
            series={[
               {
                data: barData,
                label: 'Products Count'
               }
            ]}
            xAxis={[{ data: categories.map(ele=>ele.name), scaleType: 'band' }]}
            width={950}
            height={300}
            margin={{ right: 100 }}
        />
            </div>
            <Typography raphy sx={{ fontSize: 45, display: 'flex', justifyContent: 'center' }} color="text.secondary" >Orders Statistics</Typography>
            <div style={{display:'flex'}}>
            <PieChart series={[
                {
                data: orderPieData
                },
            ]}
            width={650}
            height={300}
            margin={{right:200}}         
            />
            <BarChart
            series={[
               {
                data: orderData,
                label: 'Products Count'
               }
            ]}
            xAxis={[{ data: categories.map(ele=>ele.name), scaleType: 'band' }]}
            width={950}
            height={300}
            margin={{ right: 100 }}
        />
            </div>
        </div>
        ) }
        </>
        
  )
}

export default Stats
