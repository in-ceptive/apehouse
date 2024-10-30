import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ethers, utils } from "ethers";
import Web3Modal from "web3modal";
import axios from "axios";
import Account from "./Account";
import { updateUserData, disconnect } from "../../features/userData";
import networks from "../../utils/networksMap.json";
import useComponentVisible from "../../hooks/visible";
import artistsContract from "../../ABI/ApeHouseArtists.json";
import { IPFS_GATEWAY } from "../../utils/ipfsStorage";
import {
  artistsContractAddress,
  networkDeployedTo,
} from "../../utils/contracts-config";
import { defaultProfileImg } from "../../utils/helpers";
import auth from "../../core/auth";
const eth = window.ethereum;
let web3Modal = new Web3Modal();

function Connect() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.userData.value);

  const [injectedProvider, setInjectedProvider] = useState();
  const [profile, setProfile] = useState(false);
  const [isRequestingPermissions, setIsRequestingPermissions] = useState(false);

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true, setProfile);

  const onClick = () => {
    setProfile(!profile);
    setIsComponentVisible(true);
  };

  async function fetchAccountData() {
    if (isRequestingPermissions) return; // Prevent multiple requests
    setIsRequestingPermissions(true); // Set the flag to true

    let username = "Jane Doe",
      profileImg = defaultProfileImg,
      registred = false;

    try {
      if (typeof eth !== "undefined") {
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        setInjectedProvider(provider);

        const signer = provider.getSigner();
        const chainId = (await provider.getNetwork()).chainId;
        const account = await signer.getAddress();
        const balance = await signer.getBalance();

        if (!balance) {
          console.warn("Balance could not be retrieved.");
          return;
        }

        const formattedBalance = utils.formatUnits(balance, "ether");

        if (networks[String(chainId)] === networks[networkDeployedTo]) {
          const artists_contract = new ethers.Contract(
            artistsContractAddress,
            artistsContract.abi,
            provider
          );
          const hasProfile = await artists_contract.hasProfile(account);

          if (hasProfile) {
            const userProfile = await artists_contract.getUserProfile(account);
            const _metadata = await axios.get(
              userProfile[1].replace("ipfs://", IPFS_GATEWAY)
            );

            registred = true;
            username = _metadata.data.username;
            profileImg = _metadata.data.imageUri.replace(
              "ipfs://",
              IPFS_GATEWAY
            );
          }
        }
        auth.setUserInfo(account);

        dispatch(
          updateUserData({
            account,
            balance: formattedBalance,
            network: networks[String(chainId)],
            registred,
            username,
            profileImg,
          })
        );
      } else {
        console.log("Please install Metamask");
        alert("Please Install Metamask");
      }
    } catch (error) {
      console.error("Error fetching account data:", error);
      if (error.message.includes("User Rejected")) {
        alert("Connection request was rejected. Please try again.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    } finally {
      setIsRequestingPermissions(false); // Reset the flag
    }
  }

  async function Disconnect() {
    web3Modal.clearCachedProvider();
    if (injectedProvider?.provider?.disconnect) {
      await injectedProvider.provider.disconnect();
      setInjectedProvider(null);
    }
    dispatch(disconnect());
    navigate("/");
  }

  useEffect(() => {
    if (eth) {
      web3Modal.clearCachedProvider();
      eth.on("chainChanged", fetchAccountData);
      eth.on("accountsChanged", fetchAccountData);
    }
    return () => {
      if (eth) {
        eth.removeListener("chainChanged", fetchAccountData);
        eth.removeListener("accountsChanged", fetchAccountData);
      }
    };
  }, []);

  const isConnected = wallet.account !== "";

  return (
    <div className="mainside">
      <div className="connect-wal">
        {isConnected ? (
          <div
            className="login"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NavLink to="/createOptions" id="create">
              Create
            </NavLink>
            <div
              id="de-click-menu-profile"
              className="de-menu-profile"
              onClick={onClick}
              ref={ref}
            >
              <img
                src={
                  wallet.profileImg ||
                  "../../img/author_single/author_thumbnail.jpg"
                }
                alt="Profile"
                width="40px"
                height="40px"
              />
              {profile && isComponentVisible && (
                <Account
                  currentAccount={wallet.account}
                  disconnect={Disconnect}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="connect-wal">
            <input
              type="button"
              id="connectWallet"
              className="btn-main"
              value="Connect Wallet"
              onClick={fetchAccountData}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Connect;
