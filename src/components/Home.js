import { Card, Carousel } from 'react-bootstrap'
import img1 from '../images/79_inr.jpg'
import img2 from '../images/83_inr.jpg'
import img3 from '../images/85_inr.jpg'
import { Toaster, toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from 'react-redux'

const Home = () => {
    const navigate = useNavigate()
    const location = useLocation()
    console.log('hhh',location.state)
    // alert('lhjkhhj')

    useEffect(() =>{
        if(location.state?.msg){
            // console.log('sal')
            toast.success('Logged In')
        }
    },[])
    let newProducts = products.slice((90*products.length)/100)
    console.log('ng',newProducts)

    return (
        <div style={{minHeight:'82%'}} >
            <Toaster/>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={img1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={img2} // Replace with your image URL
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={img3} // Replace with your image URL
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        </div>
    )
}

export default Home