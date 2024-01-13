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
import "../../styles/MyOrders.css";
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Button } from "react-bootstrap";
import { startCancelProcurement } from "../../actions/procurement-action";

const MySelling = () => {
    const dispatch = useDispatch()

    const procurement = useSelector(state => state.procurements.data )
    console.log('sel',procurement)

    const handleCancel = (id) => {
        dispatch(startCancelProcurement(id))
    }

    return (
    <section className=" gradient-custom2" >
    <MDBContainer className="py-5 ">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="10" xl="8">
          <MDBCard style={{ borderRadius: "10px" }}>
            <MDBCardHeader className="px-4 py-5">
              <MDBTypography tag="h5" className="text-muted mb-0">
                Listing Non Procured Items
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
                  {/* OrderID : {userState.user?._id} */}
                </p>
              </div>
              <MDBCard className=" mt-5 mb-5 p-4 " >
              {procurement.map((ele) => {
                return (<div>
                     <MDBCard className="shadow-0 border mb-4">
                    {ele.products.map((ele2) => {
                  return (
                   
                      <MDBCardBody>
                        <MDBRow>
                          <MDBCol md="2">
                            <MDBCardImage
                              src={ele2.product.image[0].url}
                              fluid
                              alt="Phone"
                            />
                          </MDBCol>
                          
                          <MDBCol
                            md="2"
                            className="text-center d-flex justify-content-center align-items-center"
                            
                          >
                            
                            <p className="text-muted mb-0">
                              {ele2.product.title}
                            </p>
                          </MDBCol>
                          <MDBCol
                            md="2"
                            className="text-center d-flex justify-content-center align-items-center"
                          >
                            <p className="text-muted mb-0 small">
                              {/* {order.product.condition} */}
                            </p>
                          </MDBCol>
                          <MDBCol
                            md="2"
                            className="text-center d-flex justify-content-center align-items-center"
                          >
                            <p className="text-muted mb-0 small">
                              {ele.procurementDate}
                            </p>
                          </MDBCol>
                          <MDBCol
                            md="2"
                            className="text-center d-flex justify-content-center align-items-center"
                          >
                            <p className="text-muted mb-0 small">
                            Qty: -{ele2.quantity}
                            </p>
                          </MDBCol>
                          <MDBCol
                            md="2"
                            className="text-center d-flex justify-content-center align-items-center"
                          >
                           
                            
                           
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                  )
                })}
                { ele.status === 'Pending' && (
                    <Button variant="danger" onClick={(e) => handleCancel(ele._id) }  >Cancel</Button>
                ) }
                </MDBCard>
                </div>)
              })}
               
              </MDBCard>
              

             
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </section>
  )
}

export default MySelling
