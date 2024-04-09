import "../css/Header.css";

import { Fragment, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import Logout from "../utils/logout";
import useAuthData from "../contexts/authContext";
import { STATUS_TEXT } from "../types/types";

const Header = () => {

  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const { userInfo, setUserInfo } = useAuthData();

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

  const logOut = async () => {
    try {
      const response = await Logout();
      if (response.statusText === STATUS_TEXT){
        setUserInfo(undefined);
        toggleDropDown();
      }
    } catch(err: any){
      console.log("errror at logout", err);
    }
  }
  
  return (
    <>
    {
      userInfo?.email && 
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
                  <li className="organization-header_user-info">{userInfo?.userName || "no user"}</li>
                  <li className="organization-header_user-info">{userInfo?.email || "no email"}</li>
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
                  <Link to="/" onClick={logOut}>
                    <li>log out</li>
                  </Link>
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
    }
    </>
  )
}

export default Header
