import "../css/Header.css";

import { Fragment, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const Header = () => {

  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleMobileMenu();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  const handleMobileMenu = () => {
    setIsMobileMenu(width <= 768);
  }

  const toggleDropDown = () => {
    setIsDropDown(!isDropDown);
  }
  
  return (
    <div className='organization-header_wrapper'>
      <div className="container organization-header_container">
        <Link to="/">
          <div className='organization-header_logo-wrapper'>
            <img/>
            <span>inkling habitat</span>
          </div>
        </Link>
        <div className='organization-header_menu-wrapper'>
          <ul className="organization-header_menu-list">
            <li>projects</li>
            <li>courses</li>
            <Link to="/asset-library" className="organization-header_menu-link">
              <li>asset library</li>
            </Link>
            <li>insights</li>
            <li>modules</li>
            <li>featured content</li>
            <li>people</li>
          </ul>
          <GiHamburgerMenu
            className="organization-header_hamburger-menu"
            onClick={toggleDropDown}
          />
          {
            isDropDown &&
            <div className="organization-header_dropdown-menu">
              <ul className="organization-header-dropdown_menu-list">
                <li className="organization-header_user-info">ahmed raza</li>
                <li className="organization-header_user-info">ahmed</li>
                {
                  isMobileMenu &&
                  <Fragment>
                    <li>projects</li>
                    <li>courses</li>
                    <Link to="/asset-library" onClick={toggleDropDown}>
                      <li>asset library</li>
                    </Link>
                    <li>insights</li>
                    <li>modules</li>
                    <li>featured content</li>
                    <li>people</li>
                  </Fragment>
                }
                <li>log out</li>
              </ul>
            </div>
          }
        </div>
      </div>
      {
        isDropDown && 
        <div className="organization-screen_wrapper" onClick={toggleDropDown}/>
      }
    </div>
  )
}

export default Header
