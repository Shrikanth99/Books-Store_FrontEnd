import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useContext, useState } from "react";
import "../../styles/MyOrders.css";
import { UserContext } from "../../App";
import { useSelector,useDispatch } from "react-redux";

import { faL } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import ReviewModal from "../ReviewModal/ReviewModal";
import { startRemoveOrder } from "../../actions/order-action";

export default function MyOrders() {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.order.orders);
  const review = useSelector((state) => state.review.data);

  console.log(orders, "luna");
  console.log("rrr", review);
  const { userState } = useContext(UserContext);

  const [show, setShow] = useState(false);
  const [productId, setProductId] = useState("");

  const handleClose = () => {
    setShow(false);
    setProductId("");
  };
  const handleShow = (id) => {
    setShow(true);
    setProductId(id);
  };

    const handleCancel = (id) =>{
      dispatch(startRemoveOrder(id))
    }
  return (
    <>
      <section
        className=" gradient-custom2"
      >
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="10" xl="8">
              <MDBCard style={{ borderRadius: "10px" }}>
                <MDBCardHeader className="px-4 py-5">
                  <MDBTypography tag="h5" className="text-muted mb-0">
                    Thanks for your Order,{" "}
                    <span style={{ color: "#a8729a" }}>
                      {userState.user?.userName}
                    </span>
                    !
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p
                      className="lead fw-normal mb-0"
                      style={{ color: "#a8729a" }}
                    >
                      Receipt
                    </p>
                    <p className="small text-muted mb-0">
                      OrderID : {userState.user?._id}
                    </p>
                  </div>
                  {orders.map((ele) => {
                    return (
                      <div>
                        <MDBCard className="shadow-0 border mb-4">
                          {ele.orderItem.map((order) => {
                            return (
                              <MDBCardBody>
                                <MDBRow>
                                  <MDBCol md="2">
                                    <MDBCardImage
                                      src={order.product.image[0].url}
                                      fluid
                                      alt="Phone"
                                    />
                                  </MDBCol>
                                  <MDBCol
                                    md="2"
                                    className="text-center d-flex justify-content-center align-items-center"
                                  >
                                    <p className="text-muted mb-0">
                                      {order.product.title}
                                    </p>
                                  </MDBCol>
                                  {/* <MDBCol
                            md="2"
                            className="text-center d-flex justify-content-center align-items-center"
                          >
                            <p className="text-muted mb-0 small">White</p>
                          </MDBCol> */}
                                  <MDBCol
                                    md="2"
                                    className="text-center d-flex justify-content-center align-items-center"
                                  >
                                    <p className="text-muted mb-0 small">
                                      {order.product.condition}
                                    </p>
                                  </MDBCol>
                                  <MDBCol
                                    md="2"
                                    className="text-center d-flex justify-content-center align-items-center"
                                  >
                                    <p className="text-muted mb-0 small">
                                      Qty: {order.quantity}
                                    </p>
                                  </MDBCol>
                                  <MDBCol
                                    md="2"
                                    className="text-center d-flex justify-content-center align-items-center"
                                  >
                                    <p className="text-muted mb-0 small">
                                      ₹{order.quantity * order.product.price}
                                    </p>
                                  </MDBCol>
                                  <MDBCol
                                    md="2"
                                    className="text-center d-flex justify-content-center align-items-center"
                                  >
                                    {review.find((ele) => {
                                      return ele.product == order.product._id;
                                    }) ? (
                                      <Button variant="success" disabled>
                                        Reviewed
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="primary"
                                        onClick={() => {
                                          handleShow(order.product._id);
                                        }}
                                      >
                                        Rating & Review
                                      </Button>
                                    )}
                                  </MDBCol>
                                </MDBRow>
                                {/* <hr
                          className="mb-4"
                          style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                        /> */}
                                {/* <MDBRow className="align-items-center">
                          <MDBCol md="2">
                            <p className="text-muted mb-0 small">Track Order</p>
                          </MDBCol>
                          <MDBCol md="10">
                            <MDBProgress
                              style={{ height: "6px", borderRadius: "16px" }}
                            >
                              <MDBProgressBar
                                style={{
                                  borderRadius: "16px",
                                  backgroundColor: "#a8729a",
                                }}
                                width={65}
                                valuemin={0}
                                valuemax={100}
                              />
                            </MDBProgress>
                            <div className="d-flex justify-content-around mb-1">
                              <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                Out for delivary
                              </p>
                              <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                Delivered
                              </p>
                            </div>
                          </MDBCol>
                        </MDBRow> */}
                              </MDBCardBody>
                            );
                          })}
                          {ele.orderStatus === 'Pending' && (
                            <MDBBtn
                            color="danger"
                            onClick={(e) => handleCancel(ele._id)}
                          >
                            Cancel
                          </MDBBtn>
                          )}
                          
                        </MDBCard>
                      </div>
                    );
                  })}

                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        {show && (
          <ReviewModal
            show={show}
            productId={productId}
            handleClose={handleClose}
          />
        )}
      </section>
    </>
  );
}
