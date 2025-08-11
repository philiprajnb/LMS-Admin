import React from "react";
import logo from '../../../assets/images/headerlogo.png';
import styles from '../NavBar/NavBar.module.css';

export default function NavBar (props){
    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-white py-1">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="logo" className={styles.headerlogo} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
        <span className="navbar-text text-white ml-auto">{props.username}</span>
          <ul className="navbar-nav ">
            
            <li className="nav-item  mr-3">
            <a className={"nav-link"} href="/manageagents">
            <button className={"btn btn-outline-purple rounded mt-1"}  >Manage Agents</button>
            </a>
            </li>
            <li className="nav-item  mr-3">
            <a className={"nav-link"} href="/manageleads">
            <button className={"btn btn-outline-purple rounded mt-1"}  >Manage Leads</button>
            </a>
            </li>
            <li className="nav-item  mr-3">
            <a className={"nav-link"} href="/reports">
            <button className={"btn btn-outline-purple rounded mt-1"}  >Reports</button>
            </a>
            </li>
            <li className="nav-item  mr-3">
            <a className={"nav-link"} href="/auditlog">
            <button className={"btn btn-outline-purple rounded mt-1"}  >Audit Log</button>
            </a>
            </li>
            {/* <li className="nav-item  mr-3 mt-2">
              <a className={"nav-link"} href="/dashboard">
              <i className={"fa fa-info-circle fa-2x"}></i>
              </a>
            </li> */}
            <li className="nav-item">
              <span
                className="nav-link cursor-pointer mt-2 text-primary"
                onClick={props.handleLogout}
              >
                Logout <i className="fa text-primary fa-sign-out-alt"></i>
              </span>
            </li>
          </ul>
          
        </div>
      </nav>
      
        </>
    )
}