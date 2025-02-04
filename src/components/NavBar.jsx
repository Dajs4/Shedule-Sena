import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css"

//iconos
import { FaHome, FaChartBar, FaRegCalendarCheck } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";

function NavBar() {
    return (
      <header>
        <nav>
            <Link to="/home" >
                <FaHome className="icon" />
            </Link>

            <Link to="/schedule" >
                <FaRegCalendarCheck className="icon" />
            </Link>

            <Link to="/add" >
                <IoMdAddCircleOutline className="icon" />
            </Link>

            <Link to="/information" >
                <FaChartBar className="icon" />
            </Link>
        </nav>
      </header>
    );
}
  
export default NavBar;