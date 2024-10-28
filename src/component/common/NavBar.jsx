import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
      <div className="container-fluid">

        <Link className="navbar-brand" to={"/"}>
          Home Management
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to={"/login"}
              >
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={"/signup"}>
                Signup
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={"/transactionsView"}>
                TransactionView
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
};

export default NavBar;
