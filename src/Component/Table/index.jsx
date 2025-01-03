import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./table.css";
import moment from "moment";

function Table({
  tab,
  isAction,
  ActionFunc,
  ActionId,
  ChangeHandler,
  Value,
  Value1,
  SaveChange,
  Value2,
  Value3,
  onSorting,
}) {
  return (
    <table className="table table-responsive table-sm table-hover align-middle">
      <thead>
        <tr className="table-secondary">
          <th scope="col" style={{ minWidth: "55px" }}>
            Srl &nbsp;
            <Button
              variant="link"
              style={{ padding: "1px 1px", color: "white" }}
              onClick={() => {
                onSorting("id");
              }}
            >
              <i className="bi bi-arrow-down-up"></i>
            </Button>
          </th>
          <th scope="col" style={{ minWidth: "150px" }}>
            Company Name &nbsp;
            <Button
              style={{ padding: "1px 1px", color: "white" }}
              variant="link"
              onClick={() => {
                onSorting("company_name");
              }}
            >
              <i className="bi bi-arrow-down-up"></i>
            </Button>
          </th>
          <th scope="col" style={{ minWidth: "85px" }}>
            Phone &nbsp;
            <Button
              style={{ padding: "1px 1px", color: "white" }}
              variant="link"
              onClick={() => {
                onSorting("company_mobile");
              }}
            >
              <i className="bi bi-arrow-down-up"></i>
            </Button>
          </th>
          <th scope="col">Dashboard URL</th>
          <th scope="col" style={{ minWidth: "100px" }}>
            Start Date &nbsp;
            <Button
              style={{ padding: "1px 1px", color: "white" }}
              variant="link"
              onClick={() => {
                onSorting("Start_Date");
              }}
            >
              <i className="bi bi-arrow-down-up"></i>
            </Button>
          </th>
          <th scope="col" style={{ minWidth: "100px" }}>
            End Date &nbsp;
            <Button
              style={{ padding: "1px 1px", color: "white" }}
              variant="link"
              onClick={() => {
                onSorting("End_Date");
              }}
            >
              <i className="bi bi-arrow-down-up"></i>
            </Button>
          </th>
          <th scope="col" style={{ minWidth: "130px" }}>
            Due/OverDue &nbsp;
            <Button
              style={{ padding: "1px 1px", color: "white" }}
              variant="link"
              onClick={() => {
                onSorting("DueDays");
              }}
            >
              <i className="bi bi-arrow-down-up"></i>
            </Button>
          </th>
          <th scope="col" style={{ minWidth: "100px" }}>
            Reminder &nbsp;
            <Button
              style={{ padding: "1px 1px", color: "white" }}
              variant="link"
              onClick={() => {
                onSorting("Reminder");
              }}
            >
              <i className="bi bi-arrow-down-up"></i>
            </Button>
          </th>
          {isAction ? (
            <th scope="col" style={{ minWidth: "70px" }}>
              Edit
            </th>
          ) : null}
          {isAction ? (
            <th scope="col" style={{ minWidth: "60px" }}>
              Save
            </th>
          ) : null}
        </tr>
      </thead>
      <tbody>
        {tab.map((item, index) => {
          return (
            <tr key={index}>
              <td scope="row">{item["id"]}</td>
              <td>
                {index === ActionId ? (
                  <input
                    name="company_name"
                    label="company_name"
                    placeholder="Customer Name"
                    value={Value3}
                    type="text"
                    onChange={(e) => {
                      ChangeHandler(index, e);
                    }}
                    className="ActionInput"
                  />
                ) : (
                  item["company_name"]
                )}
                {/* {item["company_name"]} */}
              </td>
              <td>{item["company_mobile"]}</td>
              <td>
                {index === ActionId ? (
                  <input
                    name="dashboard_url"
                    label="dashboard_url"
                    placeholder="DashBoard Url"
                    value={Value2}
                    type="text"
                    onChange={(e) => {
                      ChangeHandler(index, e);
                    }}
                    className="ActionInput"
                  />
                ) : (
                  item["dashboard_url"]
                )}
              </td>

              <td>{moment(item["Start_Date"]).format("DD/MM/YYYY")}</td>

              <td>
                {index === ActionId ? (
                  <input
                    name="End_Date"
                    label="EndDate"
                    placeholder="EndDate"
                    value={Value1}
                    type="date"
                    onChange={(e) => {
                      ChangeHandler(index, e);
                    }}
                    className="ActionInput"
                  />
                ) : (
                  moment(item["End_Date"]).format("DD/MM/YYYY")
                )}
              </td>

              <td style={{ backgroundColor: item?.color }}>
                {Math.abs(item?.DueDays)}
              </td>

              <td>
                {index === ActionId ? (
                  <input
                    type="number"
                    name="Reminder"
                    label="Reminder"
                    placeholder="Enter Days"
                    value={Value}
                    onChange={(e) => {
                      ChangeHandler(index, e);
                    }}
                    className="ActionInput"
                  />
                ) : (
                  item["Reminder"]
                )}
              </td>
              {isAction ? (
                <td>
                  <button
                    style={{
                      width: "35px",
                      height: "35px",
                      padding: 0,
                    }}
                    className="btn"
                    onClick={() => {
                      ActionFunc(index);
                    }}
                  >
                    <i
                      className="bi bi-pencil-square"
                      style={{
                        color: ActionId === index ? "dodgerblue" : "#303030",
                      }}
                    ></i>
                  </button>
                </td>
              ) : null}

              {isAction ? (
                <td>
                  <button
                    disabled={ActionId === index ? false : true}
                    style={{
                      width: "35px",
                      height: "35px",
                      border: "none",
                    }}
                    className="btn"
                    onClick={(e) => {
                      SaveChange(
                        {
                          ID: item?.ID,
                          CompanyCode: item?.CompanyCode,
                          LoginCode: item?.LoginCode,
                          Name: item?.Name,
                          Password: item?.Password,
                          Utype: item?.Utype,
                          Active: item?.Active,
                          EndDate: Value1 || item?.EndDate,
                          Reminder: Value || item?.Reminder,
                          OverDue: item?.OverDue,
                          UUid: item?.UUid,
                          password: item?.Pass,
                          Phonenumber: item?.PhoneNumber,
                        },
                        e
                      );
                    }}
                  >
                    <i
                      className="bi bi-floppy"
                      style={{
                        color: ActionId === index ? "green" : "#303030",
                      }}
                    ></i>
                  </button>
                </td>
              ) : null}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
