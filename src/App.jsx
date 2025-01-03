import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import PageNotFound from "./Pages/PageNotFound";
import UserReg from "./Pages/UserRegistrationPage";
import AdminPanel from "./Pages/AdminPanel";
import LoginPage from "./Pages/LoginPage";
import ResetPage from "./Pages/Resetpass";
import AuthNavigator from "./Layout/AuthNavigator";
import AuthLayout from "./Layout/AuthLayout";
import PrivateLayout from "./Layout/PrivateLayout";

import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./App.css";
import CustomerPage from "./Pages/CustomerPage/index";
import UserRegistrationPage from "./Pages/UserRegistrationPage";
function App() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
      </Route>
      <Route path="/resetpass" element={<AuthLayout />}>
        <Route index element={<ResetPage />} />
      </Route>

      <Route
        path="/auth"
        element={<AuthNavigator authenticated={userInfo?.token} />}
      >
        <Route
          index
          element={
            <PrivateLayout>
              <AdminPanel />
            </PrivateLayout>
          }
        />
        <Route
          path="customer"
          element={
            <PrivateLayout>
              <CustomerPage />
            </PrivateLayout>
          }
        />
        <Route
          path="user-registration"
          element={
            <PrivateLayout>
              <UserRegistrationPage />
            </PrivateLayout>
          }
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
