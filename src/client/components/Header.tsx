import "../css/Header.css";

import { Fragment, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import useAuthData from "../contexts/AuthContext";
import { useLogout } from "../hooks/useLogout";

const Header = () => {

  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const { userInfo, setUserInfo } = useAuthData();

  const navigate = useNavigate();

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

  const { mutate: logout } = useLogout(setUserInfo, toggleDropDown, navigate);

  const logOut = async () => {
    logout()
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
