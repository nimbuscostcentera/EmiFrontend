import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ImgLogo from "../../Asset/logo.png";

import InputBox from "../../Component/InputBox";
import SubmitButton from "../../Component/SubmitButton";
import CheckBox from "../../Component/CheckBox";
import { authenticate } from "../../Slice/AuthSlice";
import PhnoValidation from "../../GlobalFunctions/PhnoValidation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

import "./Login.css";
import { Container } from "react-bootstrap";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isloading, userInfo, error, isError, isSuccess } = useSelector(
    (state) => state.auth
  );
  // console.log(userInfo,error);
  
  //states
  const [showPass, setShowPass] = useState(false);
  const [inputVal, setInputVal] = useState({
    company_mobile: true,
    password: true,
  });
  const [data, setData] = useState({
    company_mobile: null,
    password: null,
  });
// console.log(userInfo,)
  //useEffects
  useEffect(() => {
    if (isSuccess && !isloading && !isError) {
    navigate("/auth/customer")
    }
    else if (isError && !isloading && !isSuccess) {
      toast.error(error, { autoClose: 4000, position: "top-right" });
    }
  }, [isSuccess, isError, isloading]); 

  //functions
  const InputHandler = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    let string = value.trimStart();
    setData({ ...data, [key]: string });
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    
    dispatch(authenticate(data));
  };

  return (
    <Container fluid style={{
      width: "100vw",
      height: "95vh",
      padding: 0,
      margin:0
    }}>
      <ToastContainer />
      <div className="formWrapper" style={{width:"100%"}}>
        <div className="form-layout mt-4 pt-2 pb-3 px-3" style={{width:"60vh"}}>
          <div className="d-flex justify-content-center align-items-center">
            <img src={ImgLogo} width="25%" />
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <p className="mt-1 fs-5 fw-normal color-header">
              EMI Management System
            </p>
          </div>
          <form className="px-3">
            <InputBox
              Icon={<i className="bi bi-telephone fs-5"></i>}
              type={"text"}
              label={"company_mobile"}
              placeholder={"Mobile Number"}
              onChange={(e) => {
                InputHandler(e);
              }}
              Name={"company_mobile"}
              error={false}
              errorMsg={"Enter Correct Phone Number"}
              maxlen={10}
            />
            <InputBox
              Icon={<i className="bi bi-key fs-5"></i>}
              type={showPass ? "text" : "password"}
              label={"password"}
              placeholder={"password"}
              onChange={InputHandler}
              Name={"password"}
              error={false}
              errorMsg={""}
              maxlen={16}
            />
            <div className="d-flex justify-content-between align-items-center flex-wrap px-1 mt-3">
              <CheckBox
                Label={"Show password"}
                onChange={(e) => {
                  setShowPass(!showPass);
                }}
              />
              <div className="mx-2 mt-1">
                <Link to="/resetpass">Forgot password ?</Link>
              </div>
            </div>
            <div className="my-3">
              <SubmitButton
                OnClickBtn={SubmitHandler}
                type={"submit"}
                isdisable={
                  !(
                    data?.company_mobile !== "" &&
                    data?.company_mobile !== null &&
                    data?.password !== null &&
                    data?.password !== ""
                  )
                }
              />
            </div>
          </form>
        </div>{" "}
      </div>
    </Container>
  );
}

export default LoginPage;
