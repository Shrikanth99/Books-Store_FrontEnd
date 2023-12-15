import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBRipple,
    MDBRow,
    MDBTooltip,
    MDBTypography,
} from "mdb-react-ui-kit";

import '../../styles/cart.css'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { startIncCartQuantity, startRemoveCart } from "../../actions/product-action";
import { startRemCartQuantity } from "../../actions/product-action";
import { startCreateWishlist } from "../../actions/wishlist-action";

export default function Cart() {
    const dispatch = useDispatch()
    const carts = useSelector(state => state.products.cart)
    console.log('carts', carts)
    const totalPrice = carts.reduce((acc,curr)=>{
        return acc + curr.productId.price * curr.quantity
    },0)
    let shippingPrice
    if(totalPrice > 1000 || totalPrice === 0){
        shippingPrice = 0
    }
    else{
        shippingPrice = 100
    }
    const handleIncrement = (id) => {
        dispatch(startIncCartQuantity(id))
    }
    const handleDecrement = (id) => {
        dispatch(startRemCartQuantity(id))
    }
    const handleRemoveItem = (id) =>{
        dispatch(startRemoveCart(id))
    }

    const handleWishlist = (id) =>{
        dispatch(startCreateWishlist(id))
    }
    return (
        <section className="h-100 gradient-custom">
            <MDBContainer className="py-5 h-100">

                <MDBRow className="justify-content-center my-4">
                    <MDBCol md="8">
                        <MDBCard className="mb-4">
                            <MDBCardHeader className="py-3">
                                <MDBTypography tag="h5" className="mb-0">
                                    Cart - {carts.length}
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                {carts.map(product => {
                                    return (
                                        <div>

                                            <MDBRow>
                                                <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">


                                                    <img
                                                        src={product.productId.image[0].url}
                                                        className="w-100"
                                                    />
                                                    <a href="#!">
                                                        <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", }}>
                                                        </div>
                                                    </a>

                                                </MDBCol>

                                                <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                                                    <p>
                                                        <strong>{product.productId.title}</strong>
                                                    </p>
                                                    {/* <p>Color: blue</p>
                                        <p>Size: M</p> */}

                                                    <div style={{ backgroundColor: '#0d6efd', padding: '5px', display: 'inline-block', margin: '5px' }} title="Remove Item" 
                                                        onClick={()=>{handleRemoveItem(product.productId._id)}}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} className="me-2 fa-lg" />
                                                    </div>

                                                    {/* <MDBTooltip wrapperProps={{ size: "sm", color: "danger" }} wrapperClass="me-1 mb-2"
                                                        title="Move to the wish list"> */}
                                                    {/* <MDBIcon fas icon="heart" /> */}
                                                    <div style={{ backgroundColor: 'red', padding: '5px', display: 'inline-block' }} onClick={()=>{handleWishlist(product.productId._id)}}>
                                                        <FontAwesomeIcon icon={faHeart} className="me-2 fa-lg" />
                                                    </div>
                                                    {/* <FontAwesomeIcon icon={faHeart} className="me-2 fa-lg" /> */}
                                                    {/* </MDBTooltip> */}
                                                </MDBCol>
                                                <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                                                    <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                                                        <Button variant="primary" onClick={() => { handleDecrement(product.productId._id) }}>
                                                            <FontAwesomeIcon icon={faMinus} className="me-2" />
                                                        </Button>

                                                        <MDBInput value={product.quantity} min={0} type="text" label="Quantity" />
                                                        <Button variant="primary" onClick={()=>{handleIncrement(product.productId._id)}}>
                                                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                                                        </Button>
                                                    </div>

                                                    <p className="text-start text-md-center">
                                                        <strong>₹{product.productId.price*product.quantity}</strong>
                                                    </p>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr className="my-4" />
                                        </div>
                                    )
                                })}
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <p>
                                    <strong>Expected shipping delivery</strong>
                                </p>
                                <p className="mb-0">12.10.2020 - 14.10.2020</p>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4 mb-lg-0">
                            <MDBCardBody>
                                <p>
                                    <strong>We accept</strong>
                                </p>
                                <MDBCardImage className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                    alt="Visa" />
                                <MDBCardImage className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                    alt="American Express" />
                                <MDBCardImage className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                    alt="Mastercard" />
                                <MDBCardImage className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                                    alt="PayPal acceptance mark" />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBCard className="mb-4">
                            <MDBCardHeader>
                                <MDBTypography tag="h5" className="mb-0">
                                    Summary
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBListGroup flush>
                                    <MDBListGroupItem
                                        className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Products
                                        <span>₹{totalPrice}</span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                                        Shipping
                                        <span>{shippingPrice}</span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem
                                        className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Total amount</strong>
                                            <strong>
                                                <p className="mb-0">(including GST)</p>
                                            </strong>
                                        </div>
                                        <span>
                                            <strong>{totalPrice+shippingPrice}</strong>
                                        </span>
                                    </MDBListGroupItem>
                                </MDBListGroup>

                               <Button variant="primary">
                                    Go to Checkout
                               </Button>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}