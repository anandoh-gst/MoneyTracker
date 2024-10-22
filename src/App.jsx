import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./component/common/Login";
import Logout from "./component/common/Logout";
import Signin from "./component/common/Signin";
import TransactionView from "./component/transaction/TransactionView";
import "./css/App.css";
import Home from "./Home";

function App() {
  return (
    <>
      <main className="container mt-5">
        <Router>
          {/* <NavBar /> */}
          <Routes>
            <Route exact  path="/"                  element={<Home />}            ></Route>
            <Route exact  path="/signin"            element={<Signin />}          ></Route>
            <Route exact  path="/login"             element={<Login />}           ></Route>
            <Route exact  path="/logout"            element={<Logout />}          ></Route>
            <Route exact  path="/transactionsView"  element={<TransactionView />} ></Route>
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;
