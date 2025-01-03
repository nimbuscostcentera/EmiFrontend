import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import isimg from "../../Asset/jewellery3.svg";
import bulb from "../../Asset/emi.svg";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment/moment";
import "../../GlobalStyle/GlobalTheme.css";


function CustomerPage() {
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    let curdate = moment();
    const user = userInfo?.UserDetails;

    if (user && user.End_Date && user.Reminder) {
      const endDate = moment(user.End_Date);
      const differenceInDays = endDate.diff(curdate, "days");

      if (differenceInDays <= user.Reminder) {
        toast.warning(
          `Reminder: Only ${differenceInDays} days left until your EMI End Date.`,
          { autoClose: 6000, position: "top-right" }
        );
      }
    }
  }, [userInfo]);

  return (
    <Row style={{marginTop:"55px",height:"80vh",width:"88vw"}}>
      <ToastContainer />
      <Col
        xl={6}
        lg={6}
        md={6}
        sm={12}
        xs={12}
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <img src={bulb} alt="dashboard" width={"80%"} />
        <Link
          to={userInfo?.UserDetails?.dashboard_url}
          style={{
            backgroundColor: "#2ab048",
            color: "whitesmoke",
            padding: "8px 10px",
            textDecoration: "none",
            borderRadius: "8px",
          }}
        >
          Click to View EMI
        </Link>
      </Col>
      <Col
        xl={6}
        lg={6}
        md={6}
        sm={12}
        xs={12}
        className="vanising-div align-items-center"
        style={{ height: "100%" }}
      >
        <img src={isimg} alt="img" width={"90%"} />
      </Col>
    </Row>
  );
}

export default CustomerPage;
