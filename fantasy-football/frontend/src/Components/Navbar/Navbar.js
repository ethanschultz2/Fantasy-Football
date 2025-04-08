import React from 'react';
import { Link } from "react-router-dom"
import { IoIosSearch } from "react-icons/io";
import logo from "../../Logos/nfl-seeklogo.png";
import home from "../../Logos/home.png";
import team from "../../Logos/team.png";
import position from "../../Logos/position.png";
import './Navbar.scss';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="unordered">
                <img src={logo} className="logo" alt="logo" />
                <li className={"navbar-item"}>
                    <Link to={"/"} className={"navbar-link"}>
                        <img src={home} className={"navbar-icon"} />
                        <span className={"navbar-text"}>Home</span>
                    </Link>
                </li>
                <li className={"navbar-item"}>
                    <Link to={"/team"} className={"navbar-link"}>
                        <img src={team} className={"navbar-icon"} />
                        <span className={"navbar-text"}>Team</span>
                    </Link>
                </li>
                <li className={"navbar-item"}>
                    <Link to={"/position"} className={"navbar-link"}>
                        <img src={position} className={"navbar-icon"} />
                        <span className={"navbar-text"}> Position</span>
                    </Link>
                </li>
                <li className={"navbar-item"}>
                <Link to={"/search"} className={"navbar-link"}>
                    <IoIosSearch  className={"navbar-icon"} />
                    <span className={"navbar-text"}> Search</span>
                </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;