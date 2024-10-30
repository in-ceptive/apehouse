import React, { useEffect, useState } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import {
  Link,
  useNavigate,
  useMatch,
  useResolvedPath
} from "react-router-dom";
import useOnclickOutside from "react-cool-onclickoutside";
import auth from '../../core/auth';
import Connect from "./Connect";
;
setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const NavLink = (props) => {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      {...props}
      className={match ? 'active' : 'non-active'}
    />
  )
};



const Header = function () {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };
  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };

  const closeMenu2 = () => {
    setOpenMenu2(false);
  };
  const closeMenu3 = () => {
    setOpenMenu3(false);
  };
  const ref = useOnclickOutside(() => {
    closeMenu();
  });

  const ref2 = useOnclickOutside(() => {
    closeMenu2();
  });
  const ref3 = useOnclickOutside(() => {
    closeMenu3();
  });

  const [showmenu, btn_icon] = useState(false);
  const [showpop, btn_icon_pop] = useState(false);
  const closePop = () => {
    btn_icon_pop(false);
  };
  const refpop = useOnclickOutside(() => {
    closePop();
  });


  const handleLogout = () => {
    auth.clearAppStorage();
  }

  useEffect(() => {
    const headers = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = headers.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        headers.classList.add("sticky");
        totop.classList.add("show");

      } else {
        headers.classList.remove("sticky");
        totop.classList.remove("show");
      } if (window.pageYOffset > sticky) {
        closeMenu();
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  return (
    <header id="myHeader" className='navbar white'>
      <div className='container'>

        <div className='row w-100-nav'>
          <div className='logo px-0'>
            <div className='navbar-title navbar-item'>
              <NavLink to="/">
                <img
                  src="/img/logo-retro.png"
                  className="img-fluid d-block"
                  alt="#"
                />
                <img
                  src="/img/logo-retro.png"
                  className="img-fluid d-3"
                  alt="#"
                />
                <img
                  src="/img/logo-retro.png"
                  className="img-fluid d-none"
                  alt="#"
                />
              </NavLink>
            </div>
          </div>

          <div className='search'>
            <input id="quick_search" className="xs-hide" name="quick_search" placeholder="search item here..." type="text" />
          </div>

          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu &&
                <div className='menu'>
                  <div className='navbar-item'>
                    <div ref={ref}>
                      <div className="dropdown-custom dropdown-toggle btn"
                        onClick={handleBtnClick}
                      >
                        Home
                      </div>
                      {openMenu && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeMenu}>
                            <NavLink to="/" onClick={() => btn_icon(!showmenu)}>Homepage</NavLink>
                            <NavLink to="/home1" onClick={() => btn_icon(!showmenu)}>Homepage 1</NavLink>
                            <NavLink to="/home2" onClick={() => btn_icon(!showmenu)}>Homepage 1</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='navbar-item'>
                    <NavLink to="/activity" onClick={() => btn_icon(!showmenu)}>
                      Activity
                    </NavLink>
                  </div>
                  <div className='navbar-item'>
                    <div ref={ref3}>
                      <div className="dropdown-custom dropdown-toggle btn"
                        onClick={handleBtnClick3}
                      >
                        Element
                      </div>
                      {openMenu3 && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeMenu3}>
                            <NavLink to="/elegantIcons" onClick={() => btn_icon(!showmenu)}>Elegant Icon</NavLink>
                            <NavLink to="/etlineIcons" onClick={() => btn_icon(!showmenu)}>Etline Icon</NavLink>
                            <NavLink to="/fontAwesomeIcons" onClick={() => btn_icon(!showmenu)}>Font Awesome Icon</NavLink>
                            <NavLink to="/accordion" onClick={() => btn_icon(!showmenu)}>Accordion</NavLink>
                            <NavLink to="/alerts" onClick={() => btn_icon(!showmenu)}>Alerts</NavLink>
                            <NavLink to="/price" onClick={() => btn_icon(!showmenu)}>Pricing Table</NavLink>
                            <NavLink to="/progressbar" onClick={() => btn_icon(!showmenu)}>Progress bar</NavLink>
                            <NavLink to="/tabs" onClick={() => btn_icon(!showmenu)}>Tabs</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              }
            </Breakpoint>

            <Breakpoint xl>
              <div className='menu'>
                <div className='navbar-item'>
                  <NavLink to="/art">
                    ART
                    <span className='lines'></span>
                  </NavLink>
                </div>
                <div className='navbar-item'>
                  <NavLink to="/feed">
                    FEED
                    <span className='lines'></span>
                  </NavLink>
                </div>
                <div className='navbar-item'>
                  <NavLink to="/releases">
                    RELEASES
                    <span className='lines'></span>
                  </NavLink>
                </div>
                <div className='navbar-item'>
                  <div ref={ref3}>
                    <div className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick3} onMouseLeave={closeMenu3}>
                      CURATION
                      <span className='lines'></span>
                      {openMenu3 && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeMenu3}>
                            <NavLink to="/features">Features</NavLink>
                            <NavLink to="/curated-conversations">Curated Conversations</NavLink>
                            <NavLink to="/privatesales">Private Sales</NavLink>
                            <NavLink to="/helpcenter">Help Center</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Breakpoint>
          </BreakpointProvider>

          {/* <div className='mainside'>
            <div className='connect-wal'>
              <input type="button" id="connectWallet" className="btn-main" value="Connect Wallet" />


            </div>
            <div className="login" style={{ display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
              <NavLink to="/createOptions" id="create">Create</NavLink>

              <div id="de-click-menu-profile" className="de-menu-profile" onClick={() => btn_icon_pop(!showpop)} ref={refpop}>
                <img src="../../img/author_single/author_thumbnail.jpg" alt="" />
                {showpop &&
                  <div className="popshow">
                    <div className="d-name">
                      <h6>Monica Lucas</h6>
                      <span className="name" onClick={() => window.open("", "_self")}>Set display name</span>
                    </div>
                    <div className="d-balance">
                      <h6>Balance</h6>

                    </div>
                    <div className="d-wallet">
                      <h6>My Wallet</h6>
                      <span id="wallet" className="d-wallet-address">address</span>
                      <button id="btn_copy" title="Copy Text">Copy</button>
                    </div>
                    <div className="d-line"></div>
                    <ul className="de-submenu-profile">
                      <li>
                        <span>
                          <i className="fa fa-user"></i> My profile
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="fa fa-pencil"></i> Edit profile
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="fa fa-sign-out"></i> Sign out
                        </span>
                      </li>
                    </ul>
                  </div>
                }
              </div>
            </div>
          </div> */}
          <Connect />

        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>

      </div>
    </header >
  );
}
export default Header;