import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SideBar_.css'; // Import the styles
// import profileImg from "../../Resources/profileimg.png"
import profile_img from '../pngs/download.jpeg'

const Sidebar = () => {
    
    useEffect(() => {
        // Dynamically add the stylesheet link to the document head
        const link = document.createElement('link');
        link.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    
        // Cleanup when the component unmounts
        return () => {
            document.head.removeChild(link);
        };
    }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div className="app-container">
        <div class="sidebar">
            <div class="top">
                <div class="logo">
                    <i class="bx bxl-codepen"></i>
                    <span> CodeCommerce </span>
                </div>

                <i class="bx bx-menu" id="btn"></i>

            </div>
        <div class="user">
            <img src={profile_img} alt="me" class="user-img" />
            <div>
                <p class="bold"> Coach Wilson </p>
                <p> Admin </p>
            </div>
        </div>
        <ul>
            <li>
                <a href="#">
                    <i class="bx bxs-grid-alt"></i>
                    <span class="nav-item"> Dashboard </span>
                </a>
                <span class="tooltip"> Dashboard </span>
            </li>

            <li>
                <a href="#">
                    <i class="bx bxs-grid-alt"></i>
                    <span class="nav-item"> Products </span>
                </a>
                <span class="tooltip"> Products </span>
            </li>

            <li>
                <a href="#">
                    <i class="bx bxs-grid-alt"></i>
                    <span class="nav-item"> Categories </span>
                </a>
                <span class="tooltip"> Categories </span>
            </li>

            <li>
                <a href="#">
                    <i class="bx bxs-grid-alt"></i>
                    <span class="nav-item"> Orders </span>
                </a>
                <span class="tooltip"> Orders </span>
            </li>

        </ul>
        </div>
    </div>
  );
}

export default Sidebar;