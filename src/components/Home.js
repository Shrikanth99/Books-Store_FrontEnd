import { Carousel } from 'react-bootstrap'
import img1 from '../images/79_inr.jpg'
import img2 from '../images/83_inr.jpg'
import img3 from '../images/85_inr.jpg'
import { Toaster, toast } from 'react-hot-toast'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import {Card} from 'react-bootstrap'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from 'react-redux'

const Home = () => {
    const navigate = useNavigate()
    const location = useLocation()

    console.log('hhh',location.state)
    // alert('lhjkhhj')
    const handleClick = (id) => {
        navigate(`/product/${id}`);
      };
    function Arrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "black" }}
            onClick={onClick}
          />
        );
      }
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "black" }}
            onClick={onClick}
          />
        );
      }

    const products = useSelector(state=>state.products.data)
    const newArrivals = products.slice((50*products.length)/100)
    var settings = {
        dots: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <Arrow />,
        prevArrow: <SamplePrevArrow />,
        infinite:true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

    const handleNavigate = () => {
        navigate('/products')
    }

    useEffect(() =>{
        if(location.state?.msg){
            // console.log('sal')
            toast.success('Logged In')
        }
    },[])

    console.log('ng')

    return (
        <div style={{minHeight:'82%',display:'flex',flexDirection:'column', backgroundColor:'#fafdea' }} >
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
            <h2 style={{display:'inline-block',margin:'50px auto'}}>New Arrivals</h2>
            <span style={{marginLeft:'60px'}} onClick={handleNavigate} ><Link style={{color:'red'}} >See-all</Link></span>
            <Slider {...settings} style={{width:'80vw', margin:'0 auto'}} >
               {newArrivals.map(ele=>{
                return (
                <Card style={{margin:'0 10px'}} onClick={()=>{handleClick(ele._id)}}>
                <Card.Img
                  className="custom-card-img"
                  src={ele.image[0].url}
                  key={ele.image[0].key}
                />
                <Card.Body>
                  <Card.Title>{ele.title}</Card.Title>
                  <Card.Text>₹{ele.price}</Card.Text>
                </Card.Body>
              </Card>)
               })} 
            </Slider>
        </div>
    )
}

export default Home