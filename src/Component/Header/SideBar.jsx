import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Image from "../../Asset/Nimbus_Logo_Transparent_white.png";
import "./authNavBar.css";
import "../../GlobalStyle/GlobalTheme.css";
import {
  CloseSideBarMenu,
  OpenSideBarMenu,
} from "../../Slice/SideBarControlSlice";
function SideBar() {
  const { Open } = useSelector((state) => state.controlSideBar);

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  function toggleNav() {
    setShow(!show);
    const titlediv = document.getElementById("title-div");
    const title = document.getElementById("title-h");
    const sidebar = document.getElementById("mySidebar");
    if (Open) {
      dispatch(CloseSideBarMenu());
       title.classList.add("close");
      titlediv.classList.add("close");
      sidebar.classList.add("close");
    } else {
      dispatch(OpenSideBarMenu());
       title.classList.remove("close");
      titlediv.classList.remove("close");
       sidebar.classList.remove("close");
    }
  }

  return (
    <div className="sidebar" id="mySidebar">
      <div className="sidebar-header ml-3" id="title-div">
        <h6 className="sidebar-title" id="title-h">
          Menu
        </h6>
        <button className="toggle-btn" onClick={toggleNav}>
          <i className="bi bi-list"></i>
        </button>
      </div>
      <div>
        {userInfo?.UserDetails?.User_Type == 1 ? (
          <Link to={"/auth"}>
            <i className="bi bi-bar-chart"></i> <span>Dashboard</span>
          </Link>
        ) : null}

        {userInfo?.UserDetails?.User_Type == 1 ? (
          <Link to={"/auth/user-registration"}>
            <i className="bi bi-person-fill"></i>
            <span>Registration</span>
          </Link>
        ) : null}

        <Link to="/auth/customer">
          <i className="bi bi-calendar"></i>
          <span>EMI Link</span>
        </Link>
      </div>{" "}
    </div>
  );
}

export default SideBar;
