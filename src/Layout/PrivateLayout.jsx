import React from "react";
import { Container} from "react-bootstrap";
import AuthNavBar from "../Component/Header/AuthNavBar";
import Footer from "../Component/Footer";
import SideBar from "../Component/Header/SideBar";
import "../GlobalStyle/GlobalTheme.css";
import "./AuthLayout.css";


function PrivateWrapper({ children }) {
  return (
    <Container fluid className="base-container d-flex">
      <SideBar />
      <div style={{width:"100%"}}>
        <AuthNavBar />
        {children}
        <Footer />
      </div>
    </Container>
  );
}

export default PrivateWrapper;
