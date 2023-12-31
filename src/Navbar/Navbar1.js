import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo2 from '../Header/img/logo2.png';
export default function Navbar1(props){
    return(
<>
    <nav className="navbar navbar-expand-lg bg-light " style={{borderRadius:"10px"}}>
        <div className="container-fluid">
            <img  src={logo2} alt="logo1" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-10 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " style={{color:"black"}}href="#">About</a>
                    </li>
                      <li className="nav-item">
                        <a className="nav-link"  style={{color:"black"}} href="#">Contact Us</a>
                    </li>

                    {/*<li className="nav-item dropdown">*/}
                    {/*    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"*/}
                    {/*       aria-expanded="false">*/}
                    {/*        Dropdown*/}
                    {/*    </a>*/}
                    {/*    <ul className="dropdown-menu">*/}
                    {/*        <li><a className="dropdown-item" href="#">Action</a></li>*/}
                    {/*        <li><a className="dropdown-item" href="#">Another action</a></li>*/}
                    {/*        <li>*/}
                    {/*            <hr className="dropdown-divider"/>*/}
                    {/*        </li>*/}
                    {/*        <li><a className="dropdown-item" href="#">Something else here</a></li>*/}
                    {/*    </ul>*/}
                    {/*</li>*/}

                </ul>
                <form className="d-flex" role="search">
                        <button className="btn btn-outline-success " type="sign-Up">Signup</button>
                        <button className="btn btn-outline-success  " type="sign-In">SignIn</button>
                </form>
            </div>
        </div>
    </nav>

</>
    )
}