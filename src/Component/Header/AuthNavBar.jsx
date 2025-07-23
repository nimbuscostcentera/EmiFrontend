import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Offcanvas, Nav, Button, Container, Navbar } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Image from "../../Asset/logo.png";
import "./authNavBar.css";
import "../../GlobalStyle/GlobalTheme.css";
import SideBar from "./SideBar";
function AuthNavBar() {
  const { Open } = useSelector((state) => state.controlSideBar);
  useEffect(() => {
    const logoimg = document.getElementById("logoNimbus");
     const head = document.getElementById("head-nav");
    if (!Open)
    {
      head.classList.add("close");
    }
    else {
      head.classList.remove("close");
    }
  },[Open])
  return (
    <nav
      className="navbar px-0 mx-0 d-flex justify-content-between"
      id="head-nav"
    >
      <div>
        <a
          href="https://www.winpace-solution.co.in/"
          style={{ textDecoration: "none", display: "flex" , justifyContent:"flex-start", alignItems:"center" }}
        >
          <img
            src={Image}
            alt="Winpace Solution Pvt. Ltd."
            id="logoNimbus"
            className={`logoPic`}
          />
          <h6 className="white-icon m-1" >
            Winpace Solution Pvt. Ltd.
          </h6>
        </a>
      </div>
      <div className="">
        <Link>
          <i className="bi bi-person-circle white-icon"></i>
        </Link>
        <Link>
          <i className="bi bi-gear-fill white-icon"></i>
        </Link>
        <Link>
          <i className="bi bi-bell-fill white-icon"></i>
        </Link>
        <Button
          style={{ padding: 0, margin: 0 }}
          variant="link"
          onClick={() => {
            window.localStorage.clear();
            window.location.reload();
          }}
        >
          <i className="bi bi-box-arrow-right white-icon"></i>
        </Button>
      </div>
    </nav>
  );
}

export default AuthNavBar;
