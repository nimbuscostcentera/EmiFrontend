import React, { useState, useEffect } from "react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Col, FormCheck } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./Admin.css";

import DateRangeInput from "../../Component/DateRangeInput";
import InputBox from "../../Component/InputBox";
import Table from "../../Component/Table";
import SelectOption from "../../Component/SelectOption";

import useFetchUser from "../../Custom_Hooks/useFetchUser";
import { useDispatch, useSelector } from "react-redux";
import { ClearStateUserEdit, UserEditFunc } from "../../Slice/UserEditSlice";
import CrossFilterIcon from "../../Component/icons/CrossFilterIcon";
import CheckBox from "../../Component/CheckBox";

import SortArrayByNumber from "../../GlobalFunctions/SortArrayByNumber";
import SortArrayByDate from "../../GlobalFunctions/SortArrayByDate";
import SortArrayByString from "../../GlobalFunctions/SortarrayByString";

function AdminPanel() {
  const currentdate = moment();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    isloadingUserEdit,
    isSuccessUserEdit,
    isErrorUserEdit,
    errorUserEdit,
    ResultUserEdit,
  } = useSelector((state) => state.useredit);

  const { Open } = useSelector((state) => state.controlSideBar);
  useEffect(() => {
    const tconainer = document.getElementById("table-container");
    if (!Open) {
      tconainer.classList.add("close");
    } else {
      tconainer.classList.remove("close");
    }
  }, [Open]);
  // console.log(ResultUserEdit);
  const { UserList = [], isSuccess16 } = useFetchUser(
    {
      data: { utype: userInfo?.User_Type },
      token: userInfo?.token,
    },
    []
  );
  const [filter, setFilter] = useState({
    EndDate: currentdate.format("YYYY-MM-DD"),
    StartDate: "",
    search: null,
    overdue: 2,
    order: "Asc",
    followUp: 2,
  });
  const [updatedObj, setUpdatedObject] = useState({});
  const [ActionId, SetActionId] = useState(null);
  const [tab, setTab] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const onChangeHandler = (e) => {
    var key = e.target.name;
    var value = e.target.value;
    setFilter({ ...filter, [key]: value });
  };
  const UpdateTable = (index, e) => {
    let mainArray = [...filteredData];
    let newobj = { ...mainArray[index] };
    let key = e.target.name;
    let value = e.target.value;
    newobj[key] = value;
    console.log(newobj);
    setUpdatedObject(newobj);
    mainArray[index] = newobj;
    setFilteredData(mainArray);
  };
  const SaveChange = (obj, e) => {
    e.preventDefault();
    dispatch(UserEditFunc({ updatedObj, userInfo }));
    SetActionId(null);
  };
  //load table data when userlist updated
  useEffect(() => {
    setTab(UserList);
    setFilteredData(UserList);
  }, [isSuccess16, isSuccessUserEdit]);
  //toaster
  useEffect(() => {
    if (isSuccessUserEdit && !isloadingUserEdit) {
      toast.success(ResultUserEdit.message, {
        autoClose: 5000,
        position: "top-right",
      });
    } else if (isErrorUserEdit && !isloadingUserEdit) {
      toast.error(errorUserEdit.message, {
        autoClose: 5000,
        position: "top-right",
      });
    }
  }, [isSuccessUserEdit, isErrorUserEdit]);
  //sort table
  const SortMyTable = (header) => {
    console.log(header, "ji");
    if (filter?.order === "Asc") {
      setFilter((prev) => {
        return { ...prev, order: "Desc" };
      });
    } else if (filter?.order === "Desc") {
      setFilter((prev) => {
        return { ...prev, order: "Asc" };
      });
    }
    console.log(filter);
    if (header === "company_name") {
      SortArrayByString(filter?.order, filteredData, header);
    } else if (header === "End_Date" || header === "Start_Date") {
      SortArrayByDate(filter?.order, filteredData, header);
    } else {
      SortArrayByNumber(filter?.order, filteredData, header);
    }
  };
  //search table
  const SearchFunction = (e) => {
    e.preventDefault();
    let SearchData = [];
    if (
      e?.target?.value === "" ||
      e?.target?.value === null ||
      e?.target?.value === undefined
    ) {
      setFilteredData(tab);
    } else {
      tab.map((item) => {
        let flag = false;
        let keyArray = Object.keys(item);
        for (let key = 0; key <= keyArray.length - 1; key++) {
          let text = item[`${keyArray[key]}`]?.toString().toUpperCase();
          let inputstring = String(filter?.search).toUpperCase();
          let isin = text?.includes(inputstring);
          console.log(text, inputstring);
          if (isin) {
            flag = true;
            break;
          }
        }
        if (flag === true) {
          SearchData.push(item);
        }
      });
      setFilteredData(SearchData);
    }
  };
  //date filter
  const HandleDateFilter = () => {
    let sdate = moment(filter?.StartDate);
    let edate = moment(filter?.EndDate);
 
    let table = filteredData.filter((item) => {
      let eitemdate = moment(item?.End_Date);
      let ediff = eitemdate.diff(edate, "days");
      let sdiff = eitemdate?.diff(sdate, "days");
     
      console.log(
  "range",
  edate.format("DD/MM/YYYY"),
  "item:",
  eitemdate.format("DD/MM/YYYY"),
  "sd:",
  sdiff,
  "ed:",
  ediff
);
      if (sdiff>0 && ediff < 0) {
         return item;
      }
     
    });
    setFilteredData(table);
  };
  //subscription over
  const HandleSubcriptionOver = () => {
    let array = [...tab];
    let table = array.filter((item) => item?.isOver == 1);
    setFilteredData(table);
  };
  //follow up function
  const HandleFollowUpfunc = () => {
    let array = [...tab];
    let table = array.filter((item) => item?.isFollowUp == 1);
    setFilteredData(table);
  };
  //filter overdue
  useEffect(() => {
    if (filter?.overdue == 1) {
      console.log("hi");

      HandleSubcriptionOver();
    }
    if (filter?.overdue == 2) {
      setFilteredData(tab);
    }
  }, [filter?.overdue]);

  //filter follow up
  useEffect(() => {
    if (filter?.followUp == 1) {
      HandleFollowUpfunc();
    }
    if (filter?.followUp == 2) {
      setFilteredData(tab);
    }
  }, [filter?.followUp]);
  //filter date
  useEffect(() => {
    HandleDateFilter();
  }, [filter?.EndDate, filter?.StartDate]);
  return (
    <Container
      fluid
      style={{
        marginTop: "50px",
        padding: "0 0 0 20px",
      }}
    >
      <ToastContainer />
      <Row>
        <Col lg={12} sm={12} className="pt-3 ps-3">
          <h5 className="text-secondary-emphasis">Admin Panel</h5>
          <hr />
        </Col>
        <Col lg={9} md={12} sm={12} xs={12} className="pt-0 mt-0">
          {/* <div className="d-flex justify-content-between align-items-center"> */}
          <Row>
            <Col xl={5} md={7} sm={12}>
              {" "}
              <DateRangeInput
                EndDate={"EndDate"}
                EndDateValue={filter?.EndDate}
                InputHandler={onChangeHandler}
                StartDate={"StartDate"}
                StartDateValue={filter?.StartDate}
                maxdate1={currentdate.format("YYYY-MM-DD")}
                mindate1={"1947-01-01"}
                mindate2={filter?.StartDate}
                maxdate2={currentdate.format("YYYY-MM-DD")}
                key={1}
              />
            </Col>
            <Col xl={3} md={3}>
              <div className="px-1 pt-4">
                <CheckBox
                  Label={"Subscription Over"}
                  onChange={onChangeHandler}
                  key={2}
                  cname="overdue"
                  isChecked={filter?.overdue == 1 ? true : false}
                  cvalue={filter?.overdue == 1 ? 2 : 1}
                />
              </div>
            </Col>
            <Col xl={3} md={2}>
              <div className="px-1 pt-4">
                <CheckBox
                  Label={"Follow Up"}
                  onChange={onChangeHandler}
                  key={3}
                  cname="followUp"
                  isChecked={filter?.followUp == 1 ? true : false}
                  cvalue={filter?.followUp == 1 ? 2 : 1}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} md={12} sm={12} xs={12} className="pt-2 mt-0">
          <div className="d-flex justify-content-end align-items-center pb-2">
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search...."
              onChange={(e) => {
                let value = e.target.value;
                setFilter({ ...filter, search: value });
                SearchFunction(e);
              }}
              style={{
                padding: "2px 5px",
                width: "200px",
                marginTop: "20px",
              }}
            />
          </div>

          {/* </div> */}
        </Col>
        <Col lg={12} sm={12}>
          <div className="table-responsive tconainer" id="table-container">
            <Table
              tab={filteredData}
              isAction={true}
              ActionFunc={(id) => {
                SetActionId(id);
              }}
              ActionId={ActionId}
              ChangeHandler={UpdateTable}
              Value={filteredData?.[ActionId]?.Reminder || ""}
              Value1={filteredData?.[ActionId]?.End_Date || ""}
              Value2={filteredData?.[ActionId]?.dashboard_url || ""}
              Value3={filteredData?.[ActionId]?.company_name || ""}
              SaveChange={SaveChange}
              onSorting={SortMyTable}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPanel;
