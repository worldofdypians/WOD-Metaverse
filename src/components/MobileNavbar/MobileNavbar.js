import React, { useEffect, useState } from "react";
import "./_mobilenavbar.scss";
import { NavLink } from "react-router-dom";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import { handleSwitchNetworkhook } from "../../hooks/hooks";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import OutsideClickHandler from "react-outside-click-handler";


const MobileNavbar = ({
  handleSignUp,
  handleRedirect,
  coinbase,
  avatar,
  handleDisconnect,
  myOffers,
  handleRefreshList,
  nftCount,
  chainId,
  handleSwitchNetwork,
  handleSwitchChainGateWallet,
  domainName,
  handleOpenDomains,
  handleSwitchChainBinanceWallet,
  binanceWallet,
  email,
  username,
  isConnected,
}) => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [unreadNotifications, setunreadNotifications] = useState(0);
  const [ethState, setEthState] = useState(true);
  const [bnbState, setBnbState] = useState(false);
  const [opbnbState, setopBnbState] = useState(false);
  const [avaxState, setAvaxState] = useState(false);
  const [baseState, setBaseState] = useState(false);
  const [confluxState, setConfluxState] = useState(false);
  const [skaleState, setSkaleState] = useState(false);
  const [coreState, setCoreState] = useState(false);
  const [mantaState, setMantaState] = useState(false);
  const [victionState, setVictionState] = useState(false);
  const [seiState, setSeiState] = useState(false);
  const [immutableState, setImmutableState] = useState(false);
  const [taikoState, setTaikoState] = useState(false);
  const [matState, setMatState] = useState(false);

  const bgmenu = document.querySelector("#bgmenu");
  const hamburger = document.querySelector("#mobileNavbar");
  const html = document.querySelector("html");
  let id = Math.random().toString(36);

  const checkRead = () => {
    if (myOffers.length > 0) {
      let count = myOffers.filter(({ read }) => read === false).length;
      setunreadNotifications(count);
    }
  };

  const setActiveChain = () => {
    if (chainId) {
      if (chainId === 1) {
        setMatState(false);
        setAvaxState(false);
        setBnbState(false);
        setEthState(true);
        setCoreState(false);
        setBaseState(false);
        setopBnbState(false);
        setSkaleState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setMantaState(false);
        setTaikoState(false);
      } else if (chainId === 43114) {
        setMatState(false);
        setAvaxState(true);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setMantaState(false);
        setTaikoState(false);
      } else if (chainId === 8453) {
        setMatState(false);
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(true);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setMantaState(false);
        setTaikoState(false);
      } else if (chainId === 56) {
        setMatState(false);
        setAvaxState(false);
        setBnbState(true);
        setEthState(false);
        setBaseState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setMantaState(false);
        setTaikoState(false);
      } else if (chainId === 698) {
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setMantaState(false);
        setTaikoState(false);
        setMatState(true);
      } else if (chainId === 204) {
        setMatState(false);
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
        setopBnbState(true);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setMantaState(false);
        setTaikoState(false);
      } else if (chainId === 1030) {
        setMatState(false);
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
        setConfluxState(true);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setMantaState(false);
        setImmutableState(false);
        setTaikoState(false);
      } else if (chainId === 1482601649) {
        setMatState(false);
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
        setConfluxState(false);
        setopBnbState(false);
        setSkaleState(true);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setMantaState(false);
        setImmutableState(false);
        setTaikoState(false);
      } else if (chainId === 1116) {
        setMatState(false);
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
        setConfluxState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(true);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setMantaState(false);
        setTaikoState(false);
      } else if (chainId === 88) {
        setMatState(false);
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
        setConfluxState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(true);
        setSeiState(false);
        setImmutableState(false);
        setMantaState(false);
        setTaikoState(false);
      } else if (chainId === 13371) {
        setMatState(false);
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
        setConfluxState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(true);
        setMantaState(false);
        setTaikoState(false);
      } else if (chainId === 169) {
        setMatState(false);
        setAvaxState(false);
        setBnbState(false);
        setMantaState(true);
        setEthState(false);
        setBaseState(false);
        setConfluxState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setTaikoState(false);
      } else if (chainId === 167000) {
        setMatState(false);
        setAvaxState(false);
        setBnbState(false);
        setMantaState(false);
        setEthState(false);
        setBaseState(false);
        setConfluxState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setTaikoState(true);
      } else if (chainId === 1329) {
        setMatState(false);
        setAvaxState(false);
        setBnbState(false);
        setMantaState(false);
        setEthState(false);
        setBaseState(false);
        setConfluxState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(true);
        setImmutableState(false);
        setTaikoState(false);
      } else {
        setMatState(false);
        setAvaxState(false);
        setBnbState(false);
        setBaseState(false);
        setEthState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setTaikoState(false);
      }
    }
  };

  const switchNetwork = async (hexChainId, chain) => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook(hexChainId)
          .then(() => {
            handleSwitchNetwork(chain);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (
        window.gatewallet &&
        window.WALLET_TYPE !== "binance" &&
        !window.ethereum?.isBinance
      ) {
        handleSwitchChainGateWallet(chain);
      } else if (
        window.ethereum?.isBinance ||
        window.WALLET_TYPE === "binance"
      ) {
        window.alertify.error(
          "This network is not available on Binance Web3 Wallet"
        );
      }
    } else if (window.ethereum?.isBinance || window.WALLET_TYPE === "binance") {
      window.alertify.error(
        "This network is not available on Binance Web3 Wallet"
      );
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  useEffect(() => {
    setActiveChain();
  }, [chainId, ethState]);

  useEffect(() => {
    checkRead();
  }, [myOffers, coinbase, nftCount]);

  useEffect(() => {
    if (openNavbar === true) {
      html.classList.add("hidescroll");
      bgmenu.style.pointerEvents = "auto";
      hamburger.style.pointerEvents = "auto";
    } else {
      // Enable scroll
      html.classList.remove("hidescroll");
    }
  }, [openNavbar]);

  const handleState = () => {
    if (!isConnected) {
      handleSignUp();
      setOpenNavbar(false);
    } else {
      setOpenNavbar(false);
    }
  };

  return (
    <>
      <div
        className="mobile-navbar d-flex d-lg-none p-3 align-items-center justify-content-between"
        id="mobileNavbar"
      >
        <NavLink
          to="/"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={"https://cdn.worldofdypians.com/wod/metaverse.svg"}
            alt="metaverse"
            width={126}
          />
        </NavLink>
        <div className="d-flex align-items-center gap-3 justify-content-between">
          {coinbase && (
            <>
              {" "}
              <NavLink to="/notifications">
                <div className="position-relative">
                  <img
                    src={"https://cdn.worldofdypians.com/wod/bellIcon.svg"}
                    width={30}
                    style={{ cursor: "pointer" }}
                    height={30}
                    alt=""
                  />

                  {unreadNotifications > 0 && (
                    <div className="bell-amount">
                      <span className="mb-0">
                        {unreadNotifications > 99 ? "99+" : unreadNotifications}
                      </span>
                    </div>
                  )}
                </div>
              </NavLink>
              <DropdownButton
                id="dropdown-basic-button"
                className="d-flex align-items-center justify-content-center"
                title={
                  <span className="dropdown-title">
                    <img
                      src={
                        ethState === true
                          ? "https://cdn.worldofdypians.com/wod/eth.svg"
                          : bnbState === true
                          ? "https://cdn.worldofdypians.com/wod/bnbIcon.svg"
                          : opbnbState === true
                          ? "https://cdn.worldofdypians.com/wod/bnbIcon.svg"
                          : avaxState === true
                          ? "https://cdn.worldofdypians.com/wod/avaxIcon.svg"
                          : baseState === true
                          ? "https://cdn.worldofdypians.com/wod/base.svg"
                          : confluxState === true
                          ? "https://cdn.worldofdypians.com/wod/confluxIcon.svg"
                          : skaleState === true
                          ? "https://cdn.worldofdypians.com/wod/skaleIcon.svg"
                          : coreState === true
                          ? "https://cdn.worldofdypians.com/wod/core.svg"
                          : victionState === true
                          ? "https://cdn.worldofdypians.com/wod/viction.svg"
                          : immutableState === true
                          ? "https://cdn.worldofdypians.com/wod/immutable.svg"
                          : mantaState === true
                          ? "https://cdn.worldofdypians.com/wod/manta.png"
                          : taikoState === true
                          ? "https://cdn.worldofdypians.com/wod/taiko.svg"
                          : matState === true
                          ? "https://cdn.worldofdypians.com/wod/matchainIcon.svg"
                          : seiState === true
                          ? "https://cdn.worldofdypians.com/wod/seiLogo.svg"
                          : "https://cdn.worldofdypians.com/wod/error.svg"
                      }
                      height={16}
                      width={16}
                      alt=""
                    />
                    <span className="change-chain-text d-none d-lg-flex">
                      {ethState === true
                        ? "Ethereum"
                        : bnbState === true
                        ? "BNB Chain"
                        : opbnbState === true
                        ? "opBNB Chain"
                        : avaxState === true
                        ? "Avalanche"
                        : baseState === true
                        ? "Base"
                        : confluxState === true
                        ? "Conflux"
                        : skaleState === true
                        ? "SKALE"
                        : coreState === true
                        ? "CORE"
                        : victionState === true
                        ? "Viction"
                        : immutableState === true
                        ? "Immutable"
                        : mantaState === true
                        ? "Manta"
                        : taikoState === true
                        ? "Taiko"
                        : matState === true
                        ? "Matchain"
                        : seiState === true
                        ? "Sei"
                        : "Unsupported"}
                    </span>

                    <img
                      src={"https://cdn.worldofdypians.com/wod/dropdown.svg"}
                      alt=""
                    />
                  </span>
                }
              >
                <Dropdown.Item onClick={() => switchNetwork("0x1", 1)}>
                  <img
                    src={"https://cdn.worldofdypians.com/wod/eth.svg"}
                    alt=""
                  />
                  Ethereum
                </Dropdown.Item>
                <Dropdown.Item onClick={() => switchNetwork("0x38", 56)}>
                  <img
                    src={"https://cdn.worldofdypians.com/wod/bnbIcon.svg"}
                    alt=""
                  />
                  BNB Chain
                </Dropdown.Item>
                {window.WALLET_TYPE !== "binance" &&
                  !window.ethereum?.isBinance && (
                    <Dropdown.Item onClick={() => switchNetwork("0x2ba", 698)}>
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/matchainIcon.svg"
                        }
                        width={20}
                        height={20}
                        alt=""
                      />
                      Matchain
                    </Dropdown.Item>
                  )}
                {window.WALLET_TYPE !== "binance" &&
                  !window.ethereum?.isBinance && (
                    <Dropdown.Item onClick={() => switchNetwork("0x531", 1329)}>
                      <img
                        src={"https://cdn.worldofdypians.com/wod/seiLogo.svg"}
                        width={20}
                        height={20}
                        alt=""
                      />
                      SEI
                    </Dropdown.Item>
                  )}
                <Dropdown.Item onClick={() => switchNetwork("0xa9", 169)}>
                  <img
                    src={"https://cdn.worldofdypians.com/wod/manta.png"}
                    alt=""
                  />
                  Manta
                </Dropdown.Item>
                <Dropdown.Item onClick={() => switchNetwork("0xcc", 204)}>
                  <img
                    src={"https://cdn.worldofdypians.com/wod/bnbIcon.svg"}
                    alt=""
                  />
                  opBNB Chain
                </Dropdown.Item>
                {window.WALLET_TYPE !== "binance" &&
                  !window.ethereum?.isBinance && (
                    <Dropdown.Item
                      onClick={() => switchNetwork("0x28c58", 167000)}
                    >
                      <img
                        src={"https://cdn.worldofdypians.com/wod/taiko.svg"}
                        width={20}
                        height={20}
                        alt=""
                      />
                      Taiko
                    </Dropdown.Item>
                  )}

                {window.WALLET_TYPE !== "binance" &&
                  !window.ethereum?.isBinance && (
                    <Dropdown.Item onClick={() => switchNetwork("0x45c", 1116)}>
                      <img
                        src={"https://cdn.worldofdypians.com/wod/core.svg"}
                        width={20}
                        height={20}
                        alt=""
                      />
                      CORE
                    </Dropdown.Item>
                  )}
                {window.WALLET_TYPE !== "binance" &&
                  !window.ethereum?.isBinance && (
                    <Dropdown.Item
                      onClick={() => switchNetwork("0x585eb4b1", 1482601649)}
                    >
                      <img src={'https://cdn.worldofdypians.com/wod/skaleIcon.svg'} alt="" />
                      SKALE
                    </Dropdown.Item>
                  )}
                <Dropdown.Item onClick={() => switchNetwork("0x406", 1030)}>
                  <img src={'https://cdn.worldofdypians.com/wod/confluxIcon.svg'} alt="" />
                  Conflux
                </Dropdown.Item>
                {window.WALLET_TYPE !== "binance" &&
                  !window.ethereum?.isBinance && (
                    <Dropdown.Item
                      onClick={() => switchNetwork("0x343b", 13371)}
                    >
                      <img src={'https://cdn.worldofdypians.com/wod/immutable.svg'} width={20} height={20} alt="" />
                      Immutable
                    </Dropdown.Item>
                  )}
                <Dropdown.Item onClick={() => switchNetwork("0x2105", 8453)}>
                  <img
                    src={"https://cdn.worldofdypians.com/wod/base.svg"}
                    alt=""
                  />
                  Base
                </Dropdown.Item>
                {/* <Dropdown.Item onClick={() => handleSeiPool()}>
                    <img src={sei} width={20} height={20} alt="" />
                    Sei
                  </Dropdown.Item>*/}
                {window.WALLET_TYPE !== "binance" &&
                  !window.ethereum?.isBinance && (
                    <Dropdown.Item onClick={() => switchNetwork("0x58", 88)}>
                      <img src={'https://cdn.worldofdypians.com/wod/viction.svg'} width={20} height={20} alt="" />
                      Viction
                    </Dropdown.Item>
                  )}

                <Dropdown.Item onClick={() => switchNetwork("0xa86a", 43114)}>
                  <img src={'https://cdn.worldofdypians.com/wod/avaxIcon.svg'} alt="" />
                  Avalanche
                </Dropdown.Item>
              </DropdownButton>
            </>
          )}

          {openNavbar === false ? (
            <div
              className="position-relative hb-wrapper linear-border"
              onClick={() => setOpenNavbar(true)}
            >
              <button
                className="px-4 bg-transparent"
                style={{ clipPath: "none", border: "none" }}
                id="hamburgermenu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          ) : (
            <img
              src={"https://cdn.worldofdypians.com/wod/xMark.svg"}
              alt="x mark"
              style={{ position: "relative", right: "18px", marginLeft: 10 }}
              onClick={() => setOpenNavbar(false)}
            />
          )}
        </div>
      </div>
      <OutsideClickHandler onOutsideClick={() => setOpenNavbar(false)}>
        <div
          className={`mobile-menu ${
            openNavbar && "mobile-menu-open"
          } d-flex d-lg-none p-3 flex-column gap-3`}
          id="bgmenu"
        >
          <div className="accordion" id="accordionExample4">
            <div className="">
              <h2
                className={` ${
                  (window.location.pathname.includes("/account") ||
                    window.location.pathname.includes("/auth") ||
                    window.location.pathname.includes("/join-beta") ||
                    window.location.pathname.includes("/contact-us")) &&
                  "mobile-nav-item-active"
                } mobile-nav-item d-flex align-items-center justify-content-between p-2 mb-0`}
                id="headingOne"
              >
                <div
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="true"
                  aria-controls="collapseFour"
                  className="w-100"
                >
                  <div className="d-flex align-items-center w-100 justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="sidebar-title mb-0 d-flex align-items-center gap-2">
                        {" "}
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/personIcon.svg"
                          }
                          alt=""
                        />
                        Account
                      </h6>
                    </div>
                    <img
                      src={"https://cdn.worldofdypians.com/wod/sidebarArrow.svg"}
                      style={{ position: "relative", right: "5px" }}
                      alt=""
                    />
                  </div>
                </div>
              </h2>
              <div
                id="collapseFour"
                className={`accordion-collapse collapse
              
                
                `}
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body mt-2 p-0">
                  <div className="d-flex flex-column gap-2">
                    {!email ? (
                      <NavLink
                        to={"/auth"}
                        className="header-log-btn py-2"
                        style={{ minHeight: 30 }}
                        onClick={() => setOpenNavbar(false)}
                      >
                        Log In
                      </NavLink>
                    ) : (
                      <NavLink
                        to="/account"
                        end
                        className={({ isActive }) =>
                          "d-flex px-2 py-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                        }
                        onClick={() => setOpenNavbar(false)}
                      >
                        <span className="header-wallet-span d-flex align-items-center gap-2">
                          <img
                            width={20}
                            height={20}
                            src={
                              "https://cdn.worldofdypians.com/wod/walletIcon.svg"
                            }
                            alt=""
                          />
                          {username}
                          <span className="header-wallet">
                            {shortAddress(coinbase)}
                          </span>
                        </span>
                      </NavLink>
                    )}

                    {!email && (
                      <NavLink
                        to="/account"
                        end
                        className={({ isActive }) =>
                          isActive
                            ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                            : "d-flex px-2 align-items-center gap-2 sidebar-item text-white"
                        }
                        onClick={() => setOpenNavbar(false)}
                      >
                        {/* <span className={`sidebar-title`}> */}
                        <img
                          width={20}
                          height={20}
                          src={
                            "https://cdn.worldofdypians.com/wod/guestIcon.svg"
                          }
                          alt=""
                        />
                        Continue as Guest
                        {/* </span> */}
                      </NavLink>
                    )}
                    <hr className="header-divider my-0" />

                    <NavLink
                      to="/account/prime"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <img
                        width={20}
                        height={20}
                        src={
                          "https://cdn.worldofdypians.com/wod/premiumIcon.svg"
                        }
                        alt=""
                      />

                      <span className={`sidebar-title`}>Prime</span>
                    </NavLink>
                    <NavLink
                      to="/join-beta"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <img
                        width={20}
                        height={20}
                        src={
                          "https://cdn.worldofdypians.com/wod/joinBetaIcon.svg"
                        }
                        alt=""
                      />

                      <span className={`sidebar-title mb-0`}>
                        Become Beta Tester
                      </span>
                    </NavLink>

                    <NavLink
                      to="/contact-us"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : `d-flex px-2 align-items-center gap-2 sidebar-item`
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          width={20}
                          height={20}
                          src={
                            "https://cdn.worldofdypians.com/wod/supportIcon.svg"
                          }
                          alt=""
                        />
                        <span className={`sidebar-title`}>Contact Us</span>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion" id="accordionExample">
            <div className="">
              <h2
                className={`${
                  (window.location.pathname.includes("/token") ||
                    window.location.pathname.includes("/staking") ||
                    window.location.pathname.includes("/launchpool") ||
                    window.location.pathname.includes("/bridge")) &&
                  "mobile-nav-item-active"
                }
                mobile-nav-item d-flex align-items-center justify-content-between p-2 mb-0`}
                id="headingOne"
              >
                <div
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  className="w-100"
                >
                  <div className="d-flex align-items-center w-100 justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="sidebar-title mb-0">WOD</h6>
                    </div>
                    <img
                      src={"https://cdn.worldofdypians.com/wod/sidebarArrow.svg"}
                      style={{ position: "relative", right: "5px" }}
                      alt=""
                    />
                  </div>
                </div>
              </h2>
              <div
                id="collapseOne"
                className={`accordion-collapse collapse
              
                
                `}
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body mt-2 p-0">
                  <div className="d-flex flex-column gap-2">
                    <NavLink
                      to="/token"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : `d-flex px-2 align-items-center gap-2 sidebar-item`
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <div className="d-flex align-items-center gap-5">
                        <span className={`sidebar-title`}>Token</span>
                      </div>
                    </NavLink>
                    <NavLink
                      to="/staking"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Staking</span>
                    </NavLink>
                    <NavLink
                      to="/launchpool"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Launchpool</span>
                    </NavLink>
                    <NavLink
                      to="/bridge"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Bridge</span>
                    </NavLink>
                    <NavLink
                      to="/token-claim"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Claim</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mobile-nav-item d-flex align-items-center justify-content-between p-2">
            <NavLink
              to="/tokenomics"
              className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
              style={{ textDecoration: "none" }}
              onClick={() => setOpenNavbar(false)}
            >
              <h6 className="mobile-nav-link font-poppins mb-0">WOD</h6>
              <img src={"https://cdn.worldofdypians.com/wod/mobileArrow.svg"} alt="arrow" />{" "}
            </NavLink>
          </div> */}

          <div
            className={`${
              window.location.pathname.includes("/game") &&
              "mobile-nav-item-active"
            } mobile-nav-item d-flex align-items-center justify-content-between p-2`}
          >
            <NavLink
              to="/game"
              className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
              style={{ textDecoration: "none" }}
              onClick={() => setOpenNavbar(false)}
            >
              <h6 className="mobile-nav-link font-poppins mb-0">Game</h6>
              <img src={"https://cdn.worldofdypians.com/wod/mobileArrow.svg"} alt="arrow" />{" "}
            </NavLink>
          </div>

          <div
            className={`${
              window.location.pathname.includes("/shop") &&
              "mobile-nav-item-active"
            } mobile-nav-item d-flex align-items-center justify-content-between p-2`}
          >
            <NavLink
              to="/shop"
              className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
              style={{ textDecoration: "none" }}
              onClick={() => setOpenNavbar(false)}
            >
              <h6 className="mobile-nav-link font-poppins mb-0">Shop</h6>
              <img src={"https://cdn.worldofdypians.com/wod/mobileArrow.svg"} alt="arrow" />{" "}
            </NavLink>
          </div>
          <div className="accordion" id="accordionExample2">
            <div className="">
              <h2
                className={`${
                  (window.location.pathname.includes("/governance") ||
                    window.location.pathname.includes("/campaigns") ||
                    window.location.pathname.includes("/game-updates")) &&
                  "mobile-nav-item-active"
                } mobile-nav-item d-flex align-items-center justify-content-between p-2 mb-0`}
                id="headingOne"
              >
                <div
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
                  className="w-100"
                >
                  <div className="d-flex align-items-center w-100 justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="sidebar-title mb-0">Community</h6>
                    </div>
                    <img
                      src={"https://cdn.worldofdypians.com/wod/sidebarArrow.svg"}
                      style={{ position: "relative", right: "5px" }}
                      alt=""
                    />
                  </div>
                </div>
              </h2>
              <div
                id="collapseTwo"
                className={`accordion-collapse collapse
              
                
                `}
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body mt-2 p-0">
                  <div className="d-flex flex-column gap-2">
                    <NavLink
                      to="/governance"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : `d-flex px-2 align-items-center gap-2 sidebar-item`
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <div className="d-flex align-items-center gap-5">
                        <span className={`sidebar-title`}>Governance</span>
                      </div>
                    </NavLink>
                    <NavLink
                      to="/campaigns"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title mb-0`}>
                        Game Campaigns
                      </span>
                    </NavLink>
                    <NavLink
                      to="/game-updates"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Game Updates</span>
                    </NavLink>
                    <NavLink
                      to={"https://t.me/WorldOfDypians_bot"}
                      target="_blank"
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item text-white"
                      }
                    >
                      Telegram Mini App
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/tgVerified.svg"
                        }
                        height={20}
                        width={20}
                        alt=""
                      />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion" id="accordionExample3">
            <div className="">
              <h2
                className={`${
                  window.location.pathname.includes("/about") &&
                  "mobile-nav-item-active"
                } mobile-nav-item d-flex align-items-center justify-content-between p-2 mb-0`}
                id="headingOne"
              >
                <div
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="true"
                  aria-controls="collapseThree"
                  className="w-100"
                >
                  <div className="d-flex align-items-center w-100 justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="sidebar-title mb-0">About</h6>
                    </div>
                    <img
                      src={"https://cdn.worldofdypians.com/wod/sidebarArrow.svg"}
                      style={{ position: "relative", right: "5px" }}
                      alt=""
                    />
                  </div>
                </div>
              </h2>
              <div
                id="collapseThree"
                className={`accordion-collapse collapse
              
                
                `}
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body mt-2 p-0">
                  <div className="d-flex flex-column gap-2">
                    <NavLink
                      to="/about#tokenomics"
                      end
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#tokenomics"
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Tokenomics</span>
                    </NavLink>
                    <NavLink
                      to="/about#security"
                      end
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#security"
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Security</span>
                    </NavLink>
                    <NavLink
                      to="/about#roadmap"
                      end
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#roadmap"
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title mb-0`}>Roadmap</span>
                    </NavLink>
                    <NavLink
                      to="/about#ourteam"
                      end
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#ourteam"
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Team</span>
                    </NavLink>
                    <NavLink
                      to="/about#partners"
                      end
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#partners"
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : `d-flex px-2 align-items-center gap-2 sidebar-item`
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <div className="d-flex align-items-center gap-5">
                        <span className={`sidebar-title`}>Partners</span>
                      </div>
                    </NavLink>

                    <NavLink
                      to="/about#brand"
                      end
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#brand"
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Brand</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${
              window.location.pathname.includes("/map") &&
              "mobile-nav-item-active"
            } mobile-nav-item d-flex align-items-center justify-content-between p-2`}
          >
            <NavLink
              to="/map"
              className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
              style={{ textDecoration: "none" }}
              onClick={() => setOpenNavbar(false)}
            >
              <h6 className="mobile-nav-link font-poppins mb-0">Map</h6>
              <img src={"https://cdn.worldofdypians.com/wod/mobileArrow.svg"} alt="arrow" />{" "}
            </NavLink>
          </div>

          <div className="w-100 d-flex align-items-center justify-content-center gap-3">
            <div className="w-100">
              <button
                className="new-connect-btn p-2 w-100"
                style={{ minHeight: 30 }}
                onClick={() => {
                  handleState();
                }}
              >
                {!coinbase ? "Connect Wallet" : shortAddress(coinbase)}
              </button>{" "}
            </div>

            {/* 
            {!coinbase ? (
              <NavLink
                to={"/account"}
                onClick={() => {
                  setOpenNavbar(false);
                }}
              >
                <img src={person} className="account-icon" alt="" />
              </NavLink>
            ) : (
              <NavLink
                to={"/account"}
                onClick={() => {
                  setOpenNavbar(false);
                }}
              >
                <img
                  src={avatar === null ? person : avatar}
                  className="account-icon"
                  alt=""
                  // onClick={handleRedirect}
                  onClick={() => {
                    setOpenNavbar(false);
                  }}
                />
              </NavLink>
            )} */}
          </div>
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default MobileNavbar;
