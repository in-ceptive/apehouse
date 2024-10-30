import { NavLink } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";
const Account = ({ disconnect }) => {
  const wallet = useSelector((state) => state.userData.value);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(wallet.account);
    alert("Address copied to clipboard!");
  };

  return (
    <div className="popshow">
      <div className="d-name">
        <h6>{wallet.username || "Monica Lucas"}</h6>
      </div>
      <div className="d-balance">
        <h6>Balance</h6>
        <span>{wallet.balance || "0.00"} ETH</span>
      </div>
      <div className="d-wallet">
        <h6>My Wallet</h6>
        <span id="wallet" className="d-wallet-address">
          {wallet.account ? wallet.account.slice(0, 15) + "..." : "address"}
        </span>
        <button id="btn_copy" title="Copy Text" onClick={copyToClipboard}>
          Copy
        </button>
      </div>
      <div className="d-line"></div>
      <ul className="de-submenu-profile">
        <li>
          <span>
            <i className="fa fa-user"></i>
            <NavLink to={"/dashboard"} className="custom-navlink">
              Dashboard
            </NavLink>
          </span>
        </li>
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
        <li onClick={disconnect}>
          <span>
            <i className="fa fa-sign-out"></i> Sign out
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Account;
