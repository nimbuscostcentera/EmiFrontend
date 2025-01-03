import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Col} from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

import InputBox from "../../Component/InputBox";
import SubmitButton from "../../Component/SubmitButton";
import CheckBox from "../../Component/CheckBox/index.jsx";
import ResetButton from "../../Component/ResetButton";
import JobImg from "../../Asset/learninmobile2.svg";
import RadioButton from "../../Component/RadioButton.jsx";
import PhnoValidation from "../../GlobalFunctions/PhnoValidation";

import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "../../GlobalStyle/GlobalTheme.css";
import "./UserReg.css";

import { CompanyRegFunc, ClearState15 } from "../../Slice/CompanyRegSlice.js";

function UserReg() {
      const { Open } = useSelector((state) => state.controlSideBar);
      useEffect(() => {
        const boxCon = document.getElementById("boxCon");
        if (!Open) {
          boxCon.classList.add("close");
        } else {
          boxCon.classList.remove("close");
        }
      }, [Open]);
  
  const [showPass, setShowPass] = useState(false);
    const [regData, setRegData] = useState({
      dashboard_url: null,
      company_name: null,
      company_mobile: null,
      password: null,
      Reminder: null,
      Start_Date: null,
      End_Date: null,
      User_Type:null
    });
    
  const [inputVal, setInputVal] = useState({
    company_mobile: true,
  });

  const dispatch = useDispatch();
  const { isloading15, Result15, error15, isError15, isSuccess15 } = useSelector(
    (state) => state.compreg
  );
  const { userInfo } = useSelector((state) => state.auth);


  useEffect(() => {
    if (isSuccess15 && !isError15 & !isloading15) {
      toast.success(Result15, { autoClose: 6000, position: "top-right" });
      setRegData({
        dashboard_url: null,
        company_name: null,
        company_mobile: null,
        password: null,
        Reminder: null,
        Start_Date: null,
        End_Date: null,
        User_Type: null,
      });
      setShowPass(false)
    } else if (isError15 && !isSuccess15 && !isloading15) {
      toast.error(error15, { autoClose: 6000, position: "top-right" });
    }
    dispatch(ClearState15());
  }, [isError15, isSuccess15, isloading15]);

  const InputHandler = (e) => {
    var key = e.target.name;
    var value = e.target.value;
    console.log(key,value);
    
    if (key === "User_Type") {
      if (value === "Admin") {
        setRegData({ ...regData, [key]: 1 });
      } else {
        setRegData({ ...regData, [key]: 2 });
      }
    } else {
      setRegData({ ...regData, [key]: value });
    }
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    console.log(regData);
  dispatch(CompanyRegFunc({data:regData,token:userInfo?.token}));
  };

  return (
    <Container
      fluid
      style={{ marginTop: "55px" }}
      id="boxCon"
      className="box-container"
    >
      <ToastContainer />

      <Row style={{ height: "90%" }}>
        <Col xl={12} sm={12} xs={12}>
          <div className="title_container mt-2">
            <h5>Company Registration Form</h5>
          </div>
          <hr />
        </Col>
        <Col xl={6} sm={12} xs={12} md={12} lg={12} style={{ height: "100%" }}>
          {/* <div className="form_wrapper"> */}
          {/* <div className="form_container"> */}
          <form
            className="px-5 py-5 border border-light rounded"
            style={{ backgroundColor: "#f5f5f5" }}
          >
            <Row>
              <Col xl={6} lg={6} md={6} className="py-2">
                <InputBox
                  Icon={<i className="bi bi-person fs-6"></i>}
                  type={"text"}
                  placeholder={"Company Name"}
                  label={"company_name"}
                  Name={"company_name"}
                  value={regData?.company_name || ""}
                  maxlen={50}
                  error={false}
                  errorMsg={"enter Correct name"}
                  onChange={InputHandler}
                />
              </Col>{" "}
              <Col xl={6} lg={6} md={6} className="py-2">
                <InputBox
                  Icon={<i className="bi bi-telephone fs-6"></i>}
                  type={"tel"}
                  placeholder={"Company Mobile No."}
                  label={"phone"}
                  value={regData?.company_mobile || ""}
                  Name={"company_mobile"}
                  error={!inputVal?.company_mobile}
                  errorMsg={"Enter Correct Phone Number"}
                  maxlen={10}
                  onChange={(e) => {
                    if (
                      e?.target?.value !== "" &&
                      e?.target?.value !== null &&
                      e?.target?.value !== undefined
                    ) {
                      let res = PhnoValidation(e?.target?.value);
                      setInputVal({ ...inputVal, company_mobile: res });
                    } else {
                      setInputVal({ ...inputVal, company_mobile: true });
                    }
                    InputHandler(e);
                  }}
                />
              </Col>{" "}
              <Col xl={6} lg={6} md={6} className="py-2">
                <InputBox
                  Icon={<i className="bi bi-bell fs-6"></i>}
                  type={"number"}
                  placeholder={"Reminder Days"}
                  label={"Reminder"}
                  value={regData?.Reminder || ""}
                  Name={"Reminder"}
                  error={false}
                  errorMsg={"Enter Correct password"}
                  maxlen={10}
                  onChange={InputHandler}
                />
              </Col>{" "}
              <Col xl={6} lg={6} md={6} sm={12} className="py-2">
                <InputBox
                  Icon={<i className="bi bi-envelope fs-6"></i>}
                  type={"text"}
                  placeholder={"Dashboard Url"}
                  label={"Dashboard Url"}
                  value={regData?.dashboard_url || ""}
                  Name={"dashboard_url"}
                  error={false}
                  errorMsg={"Enter Correct Phone Number"}
                  maxlen={500}
                  onChange={InputHandler}
                />
              </Col>{" "}
              <Col xl={6} lg={6} md={6} sm={12}>
                <label style={{ width: "100%" }}>
                  Start Date:
                  <InputBox
                    Icon={<i className="bi bi-calendar fs-6"></i>}
                    type={"date"}
                    placeholder={"Subscription Starting Date"}
                    label={"Start_Date"}
                    value={regData?.Start_Date || ""}
                    Name={"Start_Date"}
                    error={false}
                    errorMsg={"Enter Correct password"}
                    maxlen={10}
                    onChange={InputHandler}
                  />
                </label>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12}>
                <label style={{ width: "100%" }}>
                  End Date:
                  <InputBox
                    Icon={<i className="bi bi-calendar fs-6"></i>}
                    type={"date"}
                    placeholder={"Subscription Starting Date"}
                    label={"End_Date"}
                    value={regData?.End_Date || ""}
                    Name={"End_Date"}
                    error={false}
                    errorMsg={"Enter Correct password"}
                    maxlen={10}
                    onChange={InputHandler}
                  />
                </label>
              </Col>
              <Col xl={6} lg={6} md={6} className="py-2">
                <InputBox
                  Icon={<i className="bi bi-key fs-6"></i>}
                  type={showPass ? "text" : "password"}
                  placeholder={"password"}
                  label={"password"}
                  value={regData?.password || ""}
                  Name={"password"}
                  error={false}
                  errorMsg={"Enter Correct password"}
                  maxlen={10}
                  onChange={InputHandler}
                />
                <CheckBox
                  Label={"Show password"}
                  onChange={(e) => {
                    setShowPass(!showPass);
                  }}
                />
              </Col>{" "}
              <Col xl={6} lg={6} md={6} className="py-2">
                <RadioButton
                  OptionArray={[
                    { name: "Admin", value: 1 },
                    { name: "User", value: 2 },
                  ]}
                  RName={"User_Type"}
                  OnClick={InputHandler}
                  value={regData?.User_Type || ""}
                />
              </Col>{" "}
              <Col xl={6} lg={6} md={6} className="py-2"></Col>
            </Row>

            <Row>
              <Col xs={6}>
                <SubmitButton
                  OnClickBtn={SubmitHandler}
                  type={"submit"}
                  isdisable={
                    !(
                      regData?.company_mobile !== null &&
                      regData?.dashboard_url !== null &&
                      regData?.company_name !== null &&
                      regData?.User_Type !== null &&
                      regData?.password !== null
                    )
                  }
                />
              </Col>
              <Col xs={6}>
                <ResetButton
                  type={"reset"}
                  onClick={(e) => {
                    setRegData({
                      dashboard_url: null,
                      company_name: null,
                      company_mobile: null,
                      User_Type: null,
                      CompanyCode: null,
                      password: null,
                      LOCID: null,
                      LOGINCODE: null,
                      EndDate: null,
                      Reminder: null,
                    });
                  }}
                />
              </Col>
            </Row>
          </form>
          {/* </div> */}
          {/* </div> */}
        </Col>
        <Col
          xl={6}
          sm={12}
          xs={12}
          md={12}
          lg={6}
          className="vanising-div"
        >
          <img src={JobImg} width={"80%"} />
        </Col>
      </Row>
    </Container>
  );
}

export default UserReg;
