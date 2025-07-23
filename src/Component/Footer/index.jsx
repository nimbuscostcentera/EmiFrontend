import React,{useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./Footer.css";
import { useSelector } from "react-redux";
function Footer() {
    const { Open } = useSelector((state) => state.controlSideBar);
    useEffect(() => {
      const foot = document.getElementById("foot");
      if (!Open) {
        foot.classList.add("close");
      } else {
        foot.classList.remove("close");
      }
    }, [Open]);
  return (
    <div
      className="d-flex justify-content-center align-items-center footer"
      id="foot"
    >
      Copyright &nbsp;
      <a href="#"> Winpace Solution Pvt. Ltd. </a>
      &nbsp; {new Date().getFullYear()}
    </div>
  );
}

export default Footer;
