import React, { useEffect, useRef, useState } from "react";
import "./_videowrapper.scss";
import sysReq from "../../../assets/sysReq.svg";
import xMark from "../../../assets/navbarAssets/xMark.svg";
import OutsideClickHandler from "react-outside-click-handler";
import downloadIcon from "../../../assets/downloadIcon.svg";
import downloadIconWhite from "../../../assets/downloadIconWhite.svg";
import windowsIcon from "../../../assets/windowsIcon.svg";
import windowsIconWhite from "../../../assets/windowsIconWhite.svg";
import epicblack from "../../../assets/epicblack.svg";
import epicgreen2 from "../../../assets/epicgreen2.svg";
import epicwhite2 from "../../../assets/epicwhite2.svg";

import epicwhite from "../../../assets/epicwhite.svg";

import { NavLink } from "react-router-dom";
import LeaderBoard from "../../../components/LeaderBoard/LeaderBoard";
import coingecko from "../../Marketplace/MarketNFTs/assets/coingecko.svg";
import conflux from "../../Marketplace/MarketNFTs/assets/conflux.svg";
import gateWhite from "../../Marketplace/MarketNFTs/wallets/gateWallet.png";
import coinbaseimg from "../../Marketplace/MarketNFTs/assets/base.svg";
import doge from "../../Marketplace/MarketNFTs/assets/dogeLogo.svg";

import BetaEventCardHome from "../../Marketplace/components/BetaEventCardHome";
import dypius from "../../Account/src/Components/WalletBalance/assets/dypIcon.svg";
import Slider from "react-slick";
import useWindowSize from "../../../hooks/useWindowSize";

const VideoWrapper = ({ handleRegister, handleDownload }) => {
  const [modal, setModal] = useState(false);
  const [icons, setIcons] = useState(false);
  const betaSlider = useRef(null);
  const [activeSlide, setActiveSlide] = useState();
  const [showFirstNext, setShowFirstNext] = useState();
  const downloader = useRef();
  const windowSize = useWindowSize();
  // downloader?.current?.addEventListener("mouseenter", () => {
  //   setIcons(true);
  // });
  // downloader?.current?.addEventListener("mouseleave", () => {
  //   setIcons(false);
  // });

  const reqmodal = document.querySelector("#reqmodal");
  const html = document.querySelector("html");

  const gotoDownload = () => {
    window.location.href =
      "https://store.epicgames.com/p/world-of-dypians-2e0694";
  };

  const dummyBetaPassData2 = [
    {
      title: "CoinGecko",
      logo: coingecko,
      eventStatus: "Live",
      totalRewards: "$10,000 in BNB Rewards",
      rewardsAmount: "$10,000",
      rewardsCurrency: "BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "September 25, 2023",
      popupInfo: {
        title: "CoinGecko",
        chain: "BNB Chain",
        linkState: "coingecko",
        rewards: "BNB",
        status: "Live",
        id: "event3",
        eventType: "Explore & Mine",
        totalRewards: "$10,000 in BNB Rewards",
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore:
          "/news/6511853f7531f3d1a8fbba67/CoinGecko-Treasure-Hunt-Event",
      },
    },
    {
      title: "Base",
      logo: coinbaseimg,
      eventStatus: "Live",
      totalRewards: "$10,000 in ETH Rewards",
      rewardsAmount: "$10,000",
      rewardsCurrency: "ETH Rewards",
      myEarnings: 126.45,
      eventType: "Explore & Mine",
      eventDate: "November 01, 2023",
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Base",
        chain: "Base Chain",
        linkState: "base",
        rewards: "ETH",
        status: "Live",
        id: "event4",
        date: "November 01, 2023",
        totalRewards: "$5,000 in ETH Rewards",
        eventDate: "November 01, 2023",
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "30,000",
        learnMore: "/news/65422043b3f3545e95018290/Base-Treasure-Hunt-Event",
      },
    },

    {
      title: "Dypius",
      logo: dypius,
      eventStatus: "Live",
      totalRewards: "300,000 in DYPv2 Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "September xx, 2023",
      rewardsAmount: "300,000",
      rewardsCurrency: "DYP Rewards",
      // backgroundImage: upcomingDyp,
      popupInfo: {
        title: "Dypius",
        chain: "BNB Chain",
        linkState: "dypius",
        rewards: "DYP",
        status: "Live",
        id: "event5",
        eventType: "Explore & Find",
        totalRewards: "300,000 in DYPv2 Rewards",
        // eventDuration: coingeckoLastDay,
        minRewards: "25",
        maxRewards: "50",
        learnMore: "/news/655b40db87aee535424a5915/Dypius-Treasure-Hunt-Event",
        eventDate: "Ended",
      },
    },
    {
      title: "Dogecoin",
      chain: "BNB Chain",
      linkState: "doge",
      rewards: "DOGE",
      status: "Coming Soon",
      eventStatus: "Coming Soon",
      id: "event7",
      eventType: "Explore & Mine",
      date: "December 22, 2023",
      logo: doge,
      totalRewards: "$10,000 in DOGE Rewards",
      rewardsAmount: "$10,000",
      rewardsCurrency: "DOGE Rewards",
      minRewards: "1",
      maxRewards: "100",
      minPoints: "5,000",
      maxPoints: "50,000",
      learnMore: "/news/6511853f7531f3d1a8fbba67/CoinGecko-Treasure-Hunt-Event",
      popupInfo: {
        title: "Dogecoin",
        chain: "BNB Chain",
        linkState: "doge",
        rewards: "DOGE",
        status: "Coming Soon",
        id: "event7",
        eventStatus: "Coming Soon",
        eventType: "Explore & Mine",
        totalRewards: "$10,000 in DOGE Rewards",
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "/news/655b40db87aee535424a5915/Dypius-Treasure-Hunt-Event",
        eventDate: "December 22, 2023",
      },
    },
    {
      title: "Gate.io",
      logo: gateWhite,
      eventStatus: "Expired",
      totalRewards: "$2,000 in BNB Rewards",
      rewardsAmount: "$2,000",
      rewardsCurrency: "BNB Rewards",
      myEarnings: 0,
      eventType: "Explore & Mine",
      eventDate: "Ended",
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Gate.io",
        chain: "BNB Chain",
        linkState: "gate",
        rewards: "GT",
        status: "Expired",
        id: "event6",
        totalRewards: "$2,000 in BNB Rewards",
        eventDate: "Ended",
        date: "Ended",
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "20,000",
      },
    },
    // {
    //   title: "Conflux",
    //   logo: conflux,
    //   eventStatus: "Expired",
    //   totalRewards: "$2,000 in CFX Rewards",
    //   rewardsAmount: "$2,000",
    //   rewardsCurrency: "CFX Rewards",
    //   myEarnings: 0,
    //   eventType: "Explore & Mine",
    //   eventDate: "Ended",
    //   popupInfo: {
    //     eventType: "Explore & Mine",
    //     title: "Conflux",
    //     chain: "Conflux Network",
    //     linkState: "conflux",
    //     rewards: "CFX",
    //     status: "Expired",
    //     id: "event1",
    //     totalRewards: "$2,000 in CFX Rewards",
    //     eventDate: "Ended",
    //     minRewards: "1",
    //     maxRewards: "20",
    //     minPoints: "5,000",
    //     maxPoints: "20,000",
    //     learnMore: "/news/65200e247531f3d1a8fce737/Conflux-Treasure-Hunt-Event",
    //   },
    // },
  ];

  var settings = {
    dots: true,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: (current, next) => {
      setActiveSlide(next);
      setShowFirstNext(current);
    },
    afterChange: (current) => setActiveSlide(current),
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  useEffect(() => {
    if (modal === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [modal]);

  return (
    <>
      <div className="video-wrapper position-relative">
        <div
          className="row leaderboard-bg gap-4 gap-lg-0"
          style={{ minHeight: "90vh" }}
        >
          <div className="col-12 col-lg-8 video-diagonal">
            <div className="d-flex download-buttons-wrapper flex-column gap-4 align-items-center">
              <div className="row m-0 gap-5 align-items-center justify-content-center">
                <div className="d-flex flex-column px-0 align-items-center gap-1 flex-lg-row flex-md-row justify-content-center">
                  <a
                    href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                    target="_blank"
                    style={{ zIndex: 5 }}
                    onMouseEnter={() => {
                      setIcons(true);
                    }}
                    onMouseLeave={() => {
                      setIcons(false);
                    }}
                  >
                    <img
                      src={icons ? epicgreen2 : epicwhite2}
                      alt=""
                      style={{ width: 107 }}
                    />
                  </a>
                  <div
                    className="opacitywrapper2 position-relative"
                    style={{ width: "90%" }}
                  >
                    <div className="d-flex flex-column h-100 gap-3 justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <span className="font-organetto bigtitle">
                          Beta Program
                        </span>
                        <NavLink to="join-beta">
                          <button className="btn small-green-btn">Join</button>
                        </NavLink>
                      </div>
                      <div className="d-flex flex-column">
                        <div className="d-flex align-items-center gap-2">
                          <span className="font-organetto bigtitle">
                            Build in world of dypians
                          </span>
                          <a
                            href="https://docs.google.com/forms/d/1s565QWMoCvkKwAWzkXzVPdixN_fLFlnEstya_k7caqs/viewform?edit_requested=true"
                            target="_blank"
                          >
                            <button className="btn small-green-btn">
                              Apply
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div
                  className="linear-border-download"
                  style={{
                    width: "fit-content",
                    zIndex: 5,
                    position: "relative",
                    textDecoration: "none",
                  }}
                >
                  <button
                    ref={downloader}
                    onClick={gotoDownload}
                    className="btn filled-btn-download px-5 d-flex align-items-center gap-2"
                  >
                    <img
                      src={icons ? windowsIconWhite : windowsIcon}
                      width={16}
                      height={16}
                      alt="windows icon"
                    />
                    Download
                    
                  </button>
                </div> */}
              </div>
              {/* <div className="d-flex align-items-center gap-2">
                <img src={sysReq} alt="system requirements" />
                <span className="sys-req" onClick={() => setModal(true)}>
                  System requirements
                </span>
              </div> */}
            </div>
            {windowSize.width < 992 && (
              <NavLink
                to={`/marketplace/events/treasure-hunt`}
                className="d-flex justify-content-center"
              >
                <div
                  className="opacitywrapper position-relative"
                  style={{ width: "90%" }}
                >
                  <span
                    class="popup-rewards d-flex text-white mb-2"
                    style={{
                      fontSize: windowSize.width < 992 ? "18px" : "24px",
                    }}
                  >
                    Treasure Hunt
                  </span>

                  <Slider {...settings} ref={betaSlider}>
                    {dummyBetaPassData2.map((item, index) => (
                      <NavLink to={`/marketplace/events/treasure-hunt`}>
                        <BetaEventCardHome
                          data={item}
                          key={index}
                          isFrontPage={true}
                        />
                      </NavLink>
                    ))}
                  </Slider>
                </div>
              </NavLink>
            )}
            <video
              preload="auto"
              className="d-none d-lg-flex d-xl-flex elementor-video"
              src="https://dypmeta.s3.us-east-2.amazonaws.com/dypius.mov"
              autoPlay={true}
              loop={true}
              muted="muted"
              playsInline={true}
              controlsList="nodownload"
              style={{
                maxWidth: "2400px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            ></video>
          </div>
          <div className="col-12 col-lg-4  d-flex align-items-center justify-content-center justify-content-lg-start">
            <LeaderBoard />
          </div>
        </div>
        {windowSize.width > 992 && (
          <NavLink to={`/marketplace/events/treasure-hunt`}>
            <div className="opacitywrapper">
              <span
                class="popup-rewards d-flex text-white mb-2"
                style={{ fontSize: "24px" }}
              >
                Treasure Hunt
              </span>

              <Slider {...settings} ref={betaSlider}>
                {dummyBetaPassData2.map((item, index) => (
                  <NavLink to={`/marketplace/events/treasure-hunt`}>
                    <BetaEventCardHome
                      data={item}
                      key={index}
                      isFrontPage={true}
                    />
                  </NavLink>
                ))}
              </Slider>
            </div>{" "}
          </NavLink>
        )}
        {/* <img src={buttonBorder} alt="button-border" className="video-button-border" /> */}
      </div>
      {modal === true ? (
        <OutsideClickHandler onOutsideClick={() => setModal(false)}>
          <div className="system-requirements-modal p-3" id="reqmodal">
            <div className="d-flex align-items-start justify-content-between">
              <div className="d-flex flex-column gap-2">
                <h6 className="sys-req-title font-organetto">System</h6>
                <h6
                  className="sys-req-title font-organetto mb-3"
                  style={{ color: "#8c56ff" }}
                >
                  Requirements
                </h6>
              </div>
              <img
                src={xMark}
                alt="x mark"
                style={{ cursor: "pointer" }}
                onClick={() => setModal(false)}
              />
            </div>

            <hr className="requirements-divider" />
            <div className="overall-requirements">
              <h6 className="requirements-title">World of Dypians</h6>
              <p className="requirements-content">
                A unique digital world where players can explore through endless
                maps hunting for rewards, special items and digital currency.
                The game features the main character and a cat (NFT) which will
                begin the journey to explore different lands together. World of
                Dypians is a game where players continuously shape the game and
                capture value from their achievements.
              </p>
              <h6 className="requirements-title">
                World of Dypians Minimum System Requirements
              </h6>
              <ul>
                <li className="requirements-content">
                  Requires a 64-bit processor and operating system
                </li>
                <li className="requirements-content">OS: Windows 10</li>
                <li className="requirements-content">
                  Processor: INTEL CORE I5-8400 or AMD RYZEN 3 3300X
                </li>
                <li className="requirements-content">Memory: 8 GB RAM</li>
                <li className="requirements-content">
                  Graphics: NVIDIA GEFORCE GTX 1060 3 GB or AMD RADEON RX 580 4
                  GB
                </li>
                <li className="requirements-content">DirectX: Version 12</li>
                <li className="requirements-content">
                  Storage: 12 GB available space
                </li>
                <li className="requirements-content">
                  Sound Card: Windows Compatible Audio Device
                </li>
              </ul>
              <hr className="requirements-divider" />
              <h6 className="requirements-title">
                World of Dypians Recommended Requirements
              </h6>
              <ul>
                <li className="requirements-content">
                  Requires a 64-bit processor and operating system
                </li>
                <li className="requirements-content">OS: Windows 10/11</li>
                <li className="requirements-content">
                  Processor: INTEL CORE I7-8700K or AMD RYZEN 5 3600X
                </li>
                <li className="requirements-content">Memory: 12 GB RAM</li>
                <li className="requirements-content">
                  Graphics: NVIDIA GEFORCE GTX 1070 8 GB or AMD RADEON RX VEGA
                  56 8 GB
                </li>
                <li className="requirements-content">DirectX: Version 12</li>
                <li className="requirements-content">
                  Storage: 20 GB available space
                </li>
                <li className="requirements-content">
                  Sound Card: Windows Compatible Audio Device
                </li>
              </ul>
            </div>
            <div className="d-flex align-items-center justify-content-center py-3">
              <h6 className="close-modal" onClick={() => setModal(false)}>
                Close
              </h6>
            </div>
          </div>
        </OutsideClickHandler>
      ) : (
        <></>
      )}
    </>
  );
};

export default VideoWrapper;
