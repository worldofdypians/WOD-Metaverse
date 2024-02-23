import React, { useState } from "react";
import "./_newdailybonus.scss";
import bnbChain from "./assets/bnbChain.png";
import skaleChain from "./assets/skaleChain.png";
import comingSoon from "./assets/comingSoon.png";
import percentageFilled from "./assets/percentageFilled.svg";
import percentageEmpty from "./assets/percentageEmpty.svg";
import dypiusIcon from "./assets/dypiusIcon.svg";
import wodIcon from "./assets/wodIcon.png";
import premiumIcon from "./assets/premiumIcon.png";
import xMark from "./assets/xMark2.svg";
import bnbIcon from "./assets/bnbIcon.svg";
import NewChestItem from "./NewChestItem";

const NewDailyBonus = ({ onclose }) => {
  const numberArray = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    opened: false,
  }));
  const cawsArray = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
  }));

  const messages = ["caws", "dyp", "premium", "wod", "switch", "login"];

  const [chain, setChain] = useState("bnb");
  const [dummyArray, setDummyArray] = useState(numberArray);
  const [message, setMessage] = useState("login");
  const [reward, setReward] = useState(null);
  const [selectedChest, setSelectedChest] = useState(null);

  const openChest = (chestId) => {
    const chest = dummyArray.filter((item) => {
      return item.id === chestId;
    });

    if (chest[0].opened === true) {
      setReward(chest[0].reward);
      setSelectedChest(chest[0].id);
    } else {
      const randomNum = Math.floor(Math.random() * 4);
      const randomReward = Math.floor(Math.random() * 10);
      // setMessage(messages[randomNum]);
      setReward(randomReward);
      const updatedArray = dummyArray.map((item) =>
        item.id === chestId
          ? { ...item, opened: true, reward: randomReward }
          : item
      );
      setSelectedChest(chest[0].id);
      setDummyArray(updatedArray);
    }
  };

  const dummyRewards = [
    {
      title: "Points",
      amount: 256786,
      img: "points",
    },
    {
      title: "Reward",
      amount: 2.5,
      img: 2,
    },
    {
      title: "Reward",
      amount: 5,
      img: 5,
    },
    {
      title: "Reward",
      amount: 30,
      img: 30,
    },
    {
      title: "Reward",
      amount: 50,
      img: 50,
    },
    {
      title: "Reward",
      amount: 300,
      img: 300,
    },
    {
      title: "Reward",
      amount: 700,
      img: 700,
    },
    {
      title: "Reward",
      amount: 1500,
      img: 1500,
    },
    {
      title: "Reward",
      amount: 3000,
      img: 3000,
    },
    {
      title: "Reward",
      amount: 5000,
      img: 5000,
    },
  ];

  console.log(dummyArray);

  return (
    <div className="package-popup-wrapper2">
      <div className="new-daily-bonus-popup d-flex flex-column gap-2 custom-container-width">
        <div className="daily-bonus-outer-wrapper custom-container-width position-relative p-0 p-lg-5">
          <img
            src={xMark}
            className="close-new-bonus"
            width={40}
            height={40}
            alt=""
            onClick={onclose}
            style={{ cursor: "pointer" }}
          />
          <h6 className="rewards-upper-title mb-9 font-organetto">Rewards</h6>
          <div className="new-total-points-wrapper d-flex align-items-end gap-2">
            <h6 className="new-total-points  mb-0">256,786 </h6>
            <span className="new-total-points-type d-none d-lg-flex  mb-0">
              POINTS
            </span>
          </div>
          <div className="new-total-rewards-wrapper d-flex align-items-end gap-2">
            <h6 className="new-total-points  mb-0">$26.21 </h6>
            <span className="new-total-points-type d-none d-lg-flex  mb-0">
              REWARDS
            </span>
          </div>
          <div className="daily-bonus-inner-wrapper container p-4 p-lg-5 mt-3 mt-lg-0">
            <div
              className="row daily-bonus-row gap-3 gap-lg-0 mx-4 mx-lg-2 mt-5 mt-lg-3"
              style={{ height: "100%", marginTop: "64px" }}
            >
              <div className="col-12 col-lg-5 chains-wrapper">
                <div
                  className="d-flex flex-row flex-lg-column justify-content-between h-100 chains-container"
                  style={{ gap: "8px" }}
                >
                  <div
                    className={`position-relative chain-item ${
                      chain === "bnb" && "chain-item-active"
                    } w-100`}
                  >
                    <img
                      src={bnbChain}
                      className={`chain-img ${
                        chain === "bnb" && "chain-img-active"
                      }`}
                      onClick={() => setChain("bnb")}
                      alt=""
                    />
                    <div
                      className={`chain-title-wrapper ${
                        chain === "bnb" && "chain-title-wrapper-active"
                      } p-2 d-flex align-items-center justify-content-between`}
                    >
                      <h6 className="chain-title-position mb-0">BNB Chain</h6>
                      <div className="d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center">
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageEmpty} height={8} alt="" />
                          <img src={percentageEmpty} height={8} alt="" />
                        </div>
                        <span className="percentage-span">62%</span>
                      </div>
                    </div>
                    <div
                      className="chain-button-wrapper d-flex align-items-center gap-2 mt-2"
                      style={{ width: "fit-content" }}
                    >
                      <button
                        className={`chain-active-btn d-flex gap-1 align-items-center`}
                      >
                        {" "}
                        <img src={bnbIcon} alt="" /> BNB
                      </button>

                      <button
                        className={`chain-inactive-btn d-flex gap-1 align-items-center`}
                      >
                        <img src={bnbIcon} alt="" /> opBNB
                      </button>
                    </div>
                  </div>
                  <div
                    className={`position-relative chain-item ${
                      chain === "skale" && "chain-item-active"
                    } w-100`}
                  >
                    <img
                      src={skaleChain}
                      className={`chain-img ${
                        chain === "skale" && "chain-img-active"
                      }`}
                      onClick={() => setChain("skale")}
                      alt=""
                    />
                    <div
                      className={`chain-title-wrapper ${
                        chain === "skale" && "chain-title-wrapper-active"
                      } p-2 d-flex align-items-center justify-content-between`}
                    >
                      <h6 className="chain-title-position mb-0">SKALE Network</h6>
                      <div className="d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center">
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageEmpty} height={8} alt="" />
                          <img src={percentageEmpty} height={8} alt="" />
                        </div>
                        <span className="percentage-span">62%</span>
                      </div>
                    </div>
                    <div
                      className="chain-button-wrapper d-flex align-items-center gap-2 mt-2"
                      style={{ width: "fit-content" }}
                    >
                      <button
                        className={`chain-inactive-btn d-flex gap-1 align-items-center`}
                      >
                        {" "}
                        <img src={bnbIcon} alt="" /> SKALE
                      </button>

                      
                    </div>
                  </div>
                  <div className={`position-relative chain-item  w-100`}>
                    <img src={comingSoon} className={`chain-img`} alt="" />
                    <div
                      className={`chain-title-wrapper ${
                        chain === "comingSoon" && "chain-title-wrapper-active"
                      } p-2 d-flex align-items-center justify-content-between`}
                    >
                      <h6 className="chain-title-position mb-0">Coming Soon</h6>
                      <div className="d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center">
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageEmpty} height={8} alt="" />
                          <img src={percentageEmpty} height={8} alt="" />
                        </div>
                        <span className="percentage-span">62%</span>
                      </div>
                    </div>
                    <div className="chain-desc-wrapper d-none d-lg-flex p-2 d-flex flex-column">
                      <h6 className="desc-title mb-0">Magic Battle</h6>
                      <span className="chain-desc mb-0">
                        A world full of possibilities
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-7 px-0 grid-overall-wrapper">
                <div className="grid-scroll">
                  <div className="new-chests-grid">
                    {dummyArray.map((item, index) => (
                      <NewChestItem
                        key={index}
                        item={item}
                        index={index}
                        openChest={openChest}
                        selectedChest={selectedChest}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-12 px-0 mt-0 mt-lg-3">
                {message === "" ? (
                  <div className="d-flex align-items-center flex-column justify-content-center p-2 w-100 chest-progress-wrapper" style={{background: "#1A1C39", border: "1px solid #10C5C5"}}>
                    <div className="loader">
                      <div className="dot" style={{"--i":0}}></div>
                      <div className="dot" style={{"--i":1}}></div>
                      <div className="dot" style={{"--i":2}}></div>
                      <div className="dot" style={{"--i":3}}></div>
                      <div className="dot" style={{"--i":4}}></div>
                      <div className="dot" style={{"--i":5}}></div>
                      <div className="dot" style={{"--i":6}}></div>
                      <div className="dot" style={{"--i":7}}></div>
                      <div className="dot" style={{"--i":8}}></div>
                      <div className="dot" style={{"--i":9}}></div>
                    </div>
                    <h6 className="loader-text mb-0">Ready to Claim</h6>
                    <div className="loader">
                      <div className="dot" style={{"--i":0}}></div>
                      <div className="dot" style={{"--i":1}}></div>
                      <div className="dot" style={{"--i":2}}></div>
                      <div className="dot" style={{"--i":3}}></div>
                      <div className="dot" style={{"--i":4}}></div>
                      <div className="dot" style={{"--i":5}}></div>
                      <div className="dot" style={{"--i":6}}></div>
                      <div className="dot" style={{"--i":7}}></div>
                      <div className="dot" style={{"--i":8}}></div>
                      <div className="dot" style={{"--i":9}}></div>
                    </div>
                  </div>
                ) : message === "switch" ? (
                  <div className="d-flex align-items-center flex-column justify-content-center p-2 w-100 chest-progress-wrapper" style={{background: "#1A1C39", border: "1px solid #D75853"}}>
                  <div className="loader red-loader">
                    <div className="dot" style={{"--i":0}}></div>
                    <div className="dot" style={{"--i":1}}></div>
                    <div className="dot" style={{"--i":2}}></div>
                    <div className="dot" style={{"--i":3}}></div>
                    <div className="dot" style={{"--i":4}}></div>
                    <div className="dot" style={{"--i":5}}></div>
                    <div className="dot" style={{"--i":6}}></div>
                    <div className="dot" style={{"--i":7}}></div>
                    <div className="dot" style={{"--i":8}}></div>
                    <div className="dot" style={{"--i":9}}></div>
                  </div>
                  <h6 className="loader-text mb-0" style={{color: "#D75853"}}>Switch to BNB Chain</h6>
                  <div className="loader red-loader">
                    <div className="dot" style={{"--i":0}}></div>
                    <div className="dot" style={{"--i":1}}></div>
                    <div className="dot" style={{"--i":2}}></div>
                    <div className="dot" style={{"--i":3}}></div>
                    <div className="dot" style={{"--i":4}}></div>
                    <div className="dot" style={{"--i":5}}></div>
                    <div className="dot" style={{"--i":6}}></div>
                    <div className="dot" style={{"--i":7}}></div>
                    <div className="dot" style={{"--i":8}}></div>
                    <div className="dot" style={{"--i":9}}></div>
                  </div>
                </div>
                ) : message === "caws" ? (
                  <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-2 w-100 chest-progress-wrapper">
                    <div
                      className="chain-desc-wrapper p-2 d-flex flex-column"
                      style={{ filter: "brightness(1)", position: "relative" }}
                    >
                      <h6 className="desc-title mb-0">
                        Unable to claim reward
                      </h6>
                      <span className="chain-desc mb-0">
                        This reward can only be claimed by CAWS NFT owners. You
                        can purchase a CAWS NFT in 24 hours to claim this
                        reward. Please select a CAWS NFT to purchase:
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      {cawsArray.map((item, index) => (
                        <div className="nft-reward-container">
                          <img
                            key={index}
                            className="nft-reward-img"
                            src={require(`./assets/caws${item.id}.png`)}
                            alt=""
                            width={60}
                            height={60}
                          />
                          <div className="buy-nft-reward-btn">Buy</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : message === "premium" ? (
                  <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-2 w-100 chest-progress-wrapper" style={{border: "1px solid #8262D0", background: "linear-gradient(180deg, #8262D0 0%, #482293 100%)"}}>
                    <div
                      className="chain-desc-wrapper p-2 d-flex flex-column"
                      style={{ filter: "brightness(1)", position: "relative" }}
                    >
                      <h6 className="desc-title mb-0" style={{color: "#fff"}}>
                        Unable to claim reward
                      </h6>
                      <span className="chain-desc mb-0">
                      Enjoy extra benefits and unlock more chests for extra rewards by upgrading to premium.
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between get-premium-wrapper">
                      <img
                        src={premiumIcon}
                        style={{ width: 60, height: 60 }}
                        alt=""
                      />
                      <button className="get-premium-btn px-2 py-1">
                        Get Premium
                      </button>
                    </div>
                  </div>
                ) : message === "login" ? (
                  <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-2 w-100 chest-progress-wrapper" style={{border: "1px solid #8262D0", background: "linear-gradient(180deg, #8262D0 0%, #482293 100%)"}}>
                    <div
                      className="chain-desc-wrapper p-2 d-flex flex-column"
                      style={{ filter: "brightness(1)", position: "relative" }}
                    >
                      <h6 className="desc-title mb-0" style={{color: "#fff"}}>
                      Sign in with Your Game Account
                      </h6>
                      <span className="chain-desc mb-0">
                      Sign in with your Game Account to unlock chests and earn rewards tailored to your gameplay. 
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-end get-premium-wrapper">
                     
                    <button className="sign-in-btn px-4 py-1">
                        Sign In
                      </button>
                    </div>
                  </div>
                )
                 : message === "dyp" ? (
                  <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-2 w-100 chest-progress-wrapper">
                    <div
                      className="chain-desc-wrapper p-2 d-flex flex-column"
                      style={{ filter: "brightness(1)", position: "relative" }}
                    >
                      <h6 className="desc-title mb-0">
                        Unable to claim reward
                      </h6>
                      <span className="chain-desc mb-0">
                        This reward can only be claimed by holders of more than
                        $1,000 in DYP v2. You can purchase more DYP within the
                        next 24 hours to claim this reward.{" "}
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between get-premium-wrapper">
                      <img
                        src={dypiusIcon}
                        style={{ width: 40, height: 40 }}
                        alt=""
                      />
                      <button className="get-premium-btn px-2 py-1">
                        Get DYP
                      </button>
                    </div>
                  </div>
                ) : message === "wod" ? (
                  <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-2 w-100 chest-progress-wrapper">
                    <div
                      className="chain-desc-wrapper p-2 d-flex flex-column"
                      style={{ filter: "brightness(1)", position: "relative" }}
                    >
                      <h6 className="desc-title mb-0">
                        Unable to claim reward
                      </h6>
                      <span className="chain-desc mb-0">
                        This reward can only be claimed by Genesis Land NFT
                        owners. You can purchase a Genesis Land NFT within the
                        next 24 hours to claim this reward. Please select an NFT
                        to purchase:
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      {cawsArray.map((item, index) => (
                        <div className="nft-reward-container">
                          <img
                            key={index}
                            className="nft-reward-img"
                            src={require(`./assets/wodIcon.png`)}
                            alt=""
                            width={60}
                            height={60}
                          />
                          <div className="buy-nft-reward-btn">Buy</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="rewards-container-outer custom-container-width d-flex align-items-center justify-content-center p-4">
          <div className="new-rewards-grid">
            {dummyRewards.map((item, index) => (
              <div
                key={index}
                className="new-rewards-item p-2 d-flex align-items-center gap-2"
                style={{
                  filter:
                    reward === index ? "brightness(1)" : "brightness(0.5)",
                }}
              >
                <img
                  src={require(`./assets/${item.img}Icon.png`)}
                  width={60}
                  height={60}
                  alt=""
                />
                <div className="d-flex align-items-bottom gap-1">
                  <h6 className="mb-0  new-reward-amount">{item.amount}</h6>
                  <span className="mb-0  new-reward-type">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDailyBonus;
