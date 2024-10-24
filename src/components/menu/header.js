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
import {
  ConnectEmbed,
  useActiveWalletConnectionStatus,
  useActiveWallet,
  useDisconnect,
  useWalletBalance,
  useActiveAccount,
} from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { createWallet, walletConnect } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";
import WalletConnectModal from "./WalletConnectModal";
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
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null)
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  let wallet = useActiveWallet();
  let account = useActiveAccount();
  const connectionStatus = useActiveWalletConnectionStatus();
  const { disconnect } = useDisconnect();
  const client = createThirdwebClient({
    clientId: 'f9404352bbf246a74ccbfb7cba4ca0e4',
  });

  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    walletConnect(),
  ];
  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: sepolia,
    address: account?.address || null, // Pass null if account.address is undefined
  });
  useEffect(() => {
    if (connectionStatus === "connected") {
      setShowModal(false);
      const updatedUser = {
        ...account, // Include existing account information
        balance: balance?.amount || 0, // Add balance (default to 0 if not available)
        symbol: balance?.symbol || "N/A" // Add symbol (default to "N/A" if not available)
      };

      setUser(updatedUser);
      console.log("user information =>", updatedUser);
    }

  }, [connectionStatus]);
  const handleWalletDisconnect = () => {

    if (wallet) disconnect(wallet);
    setUser(null)


  };
  const handleWalletConnect = () => {
    setShowModal(true)
    walletConnect()
    console.log('wallet connect', account);

  };

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
  };
  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const closeMenu1 = () => {
    setOpenMenu1(false);
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
  const ref1 = useOnclickOutside(() => {
    closeMenu1();
  });
  const ref2 = useOnclickOutside(() => {
    closeMenu2();
  });
  const ref3 = useOnclickOutside(() => {
    closeMenu3();
  });

  const [showmenu, btn_icon] = useState(false);
  const [showpop, btn_icon_pop] = useState(false);
  const [shownot, btn_icon_not] = useState(false);
  const closePop = () => {
    btn_icon_pop(false);
  };
  const closeNot = () => {
    btn_icon_not(false);
  };
  const refpop = useOnclickOutside(() => {
    closePop();
  });
  const refpopnot = useOnclickOutside(() => {
    closeNot();
  });

  const handleLogout = () => {
    auth.clearAppStorage();
    handleWalletDisconnect();
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
        <WalletConnectModal show={showModal} handleClose={() => setShowModal(false)}>
          <div style={{ height: "30vh" }}>

            <ConnectEmbed theme='dark' modalSize="compact" client={client} wallets={wallets} />
          </div>

        </WalletConnectModal>

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
                    <div ref={ref1}>
                      <div className="dropdown-custom dropdown-toggle btn"
                        onClick={handleBtnClick1}
                      >
                        Explore
                      </div>
                      {openMenu1 && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeMenu1}>
                            <NavLink to="/explore" onClick={() => btn_icon(!showmenu)}>Explore</NavLink>
                            <NavLink to="/explore2" onClick={() => btn_icon(!showmenu)}>Explore 2</NavLink>
                            <NavLink to="/exploreOpensea" onClick={() => btn_icon(!showmenu)}>Explore OpenSea</NavLink>
                            <NavLink to="/rangking" onClick={() => btn_icon(!showmenu)}>Rangking</NavLink>
                            <NavLink to="/colection/1" onClick={() => btn_icon(!showmenu)}>Collection</NavLink>
                            <NavLink to="/ItemDetail/1" onClick={() => btn_icon(!showmenu)}>Items Details</NavLink>
                            <NavLink to="/Auction" onClick={() => btn_icon(!showmenu)}>Live Auction</NavLink>
                            <NavLink to="/helpcenter" onClick={() => btn_icon(!showmenu)}>Help Center</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='navbar-item'>
                    <div ref={ref2}>
                      <div className="dropdown-custom dropdown-toggle btn"
                        onClick={handleBtnClick2}
                      >
                        Pages
                      </div>
                      {openMenu2 && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeMenu2}>
                            <NavLink to="/Author/1" onClick={() => btn_icon(!showmenu)}>Author</NavLink>
                            <NavLink to="/Profile/1" onClick={() => btn_icon(!showmenu)}>Profile</NavLink>
                            <NavLink to="/AuthorOpensea" onClick={() => btn_icon(!showmenu)}>Author OpenSea</NavLink>
                            <NavLink to="/wallet" onClick={() => btn_icon(!showmenu)}>Wallet</NavLink>
                            <NavLink to="/create" onClick={() => btn_icon(!showmenu)}>Create</NavLink>
                            <NavLink to="/createOption" onClick={() => btn_icon(!showmenu)}>Create Options</NavLink>
                            <NavLink to="/mint" onClick={() => btn_icon(!showmenu)}>Nft Minting</NavLink>
                            <NavLink to="/news" onClick={() => btn_icon(!showmenu)}>News</NavLink>
                            <NavLink to="/works" onClick={() => btn_icon(!showmenu)}>Gallery</NavLink>
                            <NavLink to="/login" onClick={() => btn_icon(!showmenu)}>login</NavLink>
                            <NavLink to="/loginTwo" onClick={() => btn_icon(!showmenu)}>login 2</NavLink>
                            <NavLink to="/register" onClick={() => btn_icon(!showmenu)}>Register</NavLink>
                            <NavLink to="/contact" onClick={() => btn_icon(!showmenu)}>Contact Us</NavLink>
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
                {/* <div className='navbar-item'>
                  <div ref={ref}>
                    <div className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick} onMouseLeave={closeMenu}>
                      Home
                      <span className='lines'></span>
                      {openMenu && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeMenu}>
                            <NavLink to="/">Homepage</NavLink>
                            <NavLink to="/home1">Homepage 1</NavLink>
                            <NavLink to="/home2">Homepage 2</NavLink>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div> */}
                {/* <div className='navbar-item'>
                  <div ref={ref1}>
                    <div className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick1} onMouseLeave={closeMenu1}>
                      Explore
                      <span className='lines'></span>
                      {openMenu1 && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeMenu1}>
                            <NavLink to="/explore">Explore</NavLink>
                            <NavLink to="/explore2">Explore 2</NavLink>
                            <NavLink to="/exploreOpensea">Explore OpenSea</NavLink>
                            <NavLink to="/rangking">Rangking</NavLink>
                            <NavLink to="/colection/1">Collection</NavLink>
                            <NavLink to="/ItemDetail/1">Items Details</NavLink>
                            <NavLink to="/Auction">Live Auction</NavLink>
                            <NavLink to="/helpcenter">Help Center</NavLink>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div> */}
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
                {/* <div className='navbar-item'>
                  <div ref={ref2}>
                    <div className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick2} onMouseLeave={closeMenu2}>
                      Pages
                      <span className='lines'></span>
                      {openMenu2 && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeMenu2}>
                            <NavLink to="/Author/1">Author</NavLink>
                            <NavLink to="/Profile/1">Profile</NavLink>
                            <NavLink to="/AuthorOpensea">Author OpenSea</NavLink>
                            <NavLink to="/wallet">Wallet</NavLink>
                            <NavLink to="/create">Create</NavLink>
                            <NavLink to="/createOption">Create Option</NavLink>
                            <NavLink to="/mint">Nft Minting</NavLink>
                            <NavLink to="/news">News</NavLink>
                            <NavLink to="/works">Gallery</NavLink>
                            <NavLink to="/login">login</NavLink>
                            <NavLink to="/loginTwo">login 2</NavLink>
                            <NavLink to="/register">Register</NavLink>
                            <NavLink to="/contact">Contact Us</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div> */}
                {/* <div className='navbar-item'>
                  <NavLink to="/activity">
                    Activity
                    <span className='lines'></span>
                  </NavLink>
                </div> */}
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

          <div className='mainside'>
            <div className='connect-wal'>
              {user == null && <input type="button" id="connectWallet" className="btn-main" value="Connect Wallet" onClick={() => {
                handleWalletConnect();
              }} />}


            </div>
            {user && user.address && <div className="login" style={{ display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
              <NavLink to="/createOptions" id="create">Create</NavLink>
              <div id="de-click-menu-notification" className="de-menu-notification" onClick={() => btn_icon_not(!shownot)} ref={refpopnot}>
                <div className="d-count">8</div>
                <i className="fa fa-bell"></i>
                {shownot &&
                  <div className="popshow">
                    <div className="de-flex">
                      <h4>Notifications</h4>
                      <span className="viewaall">Show all</span>
                    </div>
                    <ul>
                      <li>
                        <div className="mainnot">
                          <img className="lazy" src="../../img/author/author-2.jpg" alt="" />
                          <div className="d-desc">
                            <span className="d-name"><b>Mamie Barnett</b> started following you</span>
                            <span className="d-time">1 hour ago</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mainnot">
                          <img className="lazy" src="../../img/author/author-3.jpg" alt="" />
                          <div className="d-desc">
                            <span className="d-name"><b>Nicholas Daniels</b> liked your item</span>
                            <span className="d-time">2 hours ago</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mainnot">
                          <img className="lazy" src="../../img/author/author-4.jpg" alt="" />
                          <div className="d-desc">
                            <span className="d-name"><b>Apehouse.art</b> started following you</span>
                            <span className="d-time">18 hours ago</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mainnot">
                          <img className="lazy" src="../../img/author/author-5.jpg" alt="" />
                          <div className="d-desc">
                            <span className="d-name"><b>Jimmy Wright</b> liked your item</span>
                            <span className="d-time">1 day ago</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mainnot">
                          <img className="lazy" src="../../img/author/author-6.jpg" alt="" />
                          <div className="d-desc">
                            <span className="d-name"><b>Karla Sharp</b> started following you</span>
                            <span className="d-time">3 days ago</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                }
              </div>
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
                      {user.balance}{user.symbol}
                    </div>
                    <div className="d-wallet">
                      <h6>My Wallet</h6>
                      <span id="wallet" className="d-wallet-address">{user.address}</span>
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
                      <li onClick={handleLogout}>
                        <span>
                          <i className="fa fa-sign-out"></i> Sign out
                        </span>
                      </li>
                    </ul>
                  </div>
                }
              </div>
            </div>}
          </div>

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