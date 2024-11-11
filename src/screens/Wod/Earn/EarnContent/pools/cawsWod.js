import React, { useState, useEffect } from "react";
import axios from "axios";
import getFormattedNumber from "../../../../Caws/functions/get-formatted-number";
import "../top-pools.css";
import "./_stakingWod.scss";
import arrowup from "../../assets/arrow-up.svg";
import moreinfo from "../../assets/more-info.svg";
import wallet from "../../assets/wallet.svg";
import { Tooltip } from "@mui/material";
import OutsideClickHandler from "react-outside-click-handler";
import weth from "../../assets/tokens/weth.svg";
import RewardsModal from "../../../../../components/StakeModal/RewardsModal";
import { handleSwitchNetworkhook } from "../../../../../hooks/hooks";
import { shortAddress } from "../../../../Caws/functions/shortAddress";
import { ethers } from "ethers";

const CawsWodDetails = ({
  coinbase,
  isConnected,
  listType,
  handleSwitchNetwork,
  chainId,
  handleConnection,
  renderedPage,
  expired,
  binanceW3WProvider,
}) => {
  const [myNFTs, setMyNFTs] = useState([]);
  const [myLandNFTs, setMyLandNFTs] = useState([]);

  const [mystakes, setMystakes] = useState([]);
  const [myLandstakes, setMyLandstakes] = useState([]);

  const [color, setColor] = useState("#F13227");
  const [status, setStatus] = useState("");
  const [showApprove, setshowApprove] = useState(true);
  const [showChecklistModal, setshowChecklistModal] = useState(false);
  const [EthRewards, setEthRewards] = useState(0);
  const [ethToUSD, setethToUSD] = useState(0);
  const [openStakeChecklist, setOpenStakeChecklist] = useState(false);
  const [showUnstakeModal, setShowUnstakeModal] = useState(false);
  const [countDownLeft, setCountDownLeft] = useState(59000);

  const [approvedNfts, setApprovedNfts] = useState([]);
  const [approvedLandNfts, setApprovedLandNfts] = useState([]);

  const [newStakes, setnewStakes] = useState(0);
  const [hide, setHide] = useState("");
  const [screenName, setScreenName] = useState("land");
  const [cawspopup, setCawspopup] = useState(false);
  const [landpopup, setLandpopup] = useState(false);

  const checkApproval = async () => {
    const address = coinbase;
    const stakeApr50 = await window.config.nftstaking_address50;

    if (address !== null) {
      const result = await window.nft
        .checkapproveStake(address, stakeApr50)
        .then((data) => {
          return data;
        });

      if (result === true) {
        setshowApprove(false);
        setStatus("");
        setColor("#939393");
      } else if (result === false) {
        setStatus(" *Please approve before deposit");
        setshowApprove(true);
      }
    }
  };

  const myNft = async () => {
    let myNft = await window.myNftListContract(coinbase);
    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getNft(nft));

      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyNFTs(nfts);
    } else setMyNFTs([]);
  };

  const getStakesIds = async () => {
    const address = coinbase;
    let stakenft = [];
    const allCawsStakes = await window.wod_caws
      .depositsOf(address)
      .then((result) => {
        if (result.length > 0) {
          for (let i = 0; i < result.length; i++)
            stakenft.push(parseInt(result[i]));
          return stakenft;
        }
      });

    return allCawsStakes;
  };

  const myStakes = async () => {
    let myStakes = await getStakesIds();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getNft(stake));

      stakes = await Promise.all(stakes);
      stakes.reverse();
      setMystakes(stakes);
    } else setMystakes([]);
  };

  const myLandNft = async () => {
    let myNft = await window.myNftLandListContract(coinbase);

    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getLandNft(nft));
      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyLandNFTs(nfts);
    } else setMyLandNFTs([]);
  };

  const getLandStakesIds = async () => {
    const address = coinbase;
    let stakenft = [];
    const allLandStakes = await window.wod_caws
      .depositsOfWod(address)
      .then((result) => {
        if (result.length > 0) {
          for (let i = 0; i < result.length; i++)
            stakenft.push(parseInt(result[i]));
          return stakenft;
        }
      });

    return allLandStakes;
  };

  const myLandStakes = async () => {
    let myStakes = await getLandStakesIds();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getLandNft(stake));
      stakes = await Promise.all(stakes);
      stakes.reverse();
      setMyLandstakes(stakes);
    } else setMyLandstakes([]);
  };

  const setUSDPrice = async () => {
    const ethprice = await convertEthToUsd();
    setethToUSD(Number(ethprice) * Number(EthRewards));
  };

  const calculateAllRewards = async () => {
    let myStakes = await getStakesIds();
    let result = 0;

    if (coinbase !== null) {
      if (myStakes && myStakes.length > 0) {
        let rewards = await window.wod_caws
          .calculateRewardsWodCaws(coinbase, myStakes)
          .then((data) => {
            return data;
          })
          .catch((err) => {
            console.log(err);
          });
        let finalReward = 0;
        for (let i = 0; i < rewards.length; i++) {
          finalReward = rewards[i] / 1e18;
          result = result + Number(finalReward);
        }
      }
    }
    setEthRewards(result);
  };

  const claimRewards = async () => {
    if (window.WALLET_TYPE !== "binance") {
      let myStakes = await getStakesIds();
      await window.wod_caws
        .claimRewardsWodCaws(myStakes)
        .then(() => {
          setEthRewards(0);
        })
        .catch((err) => {
          window.alertify.error(err?.message);
        });
    } else if (window.WALLET_TYPE === "binance") {
      let myStakes = await getStakesIds();

      let staking_contract = new ethers.Contract(
        window.config.wod_caws_address,
        window.WOD_CAWS_ABI,
        binanceW3WProvider.getSigner()
      );

      const txResponse =   await staking_contract
        .claimRewards(myStakes)
        .catch((err) => {
          window.alertify.error(err?.message);
        });

        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setEthRewards(0);
          window.alertify.message("Claimed All Rewards!");
        }

    }
  };

  const convertEthToUsd = async () => {
    const res = axios
      .get("https://api.coinbase.com/v2/prices/ETH-USD/spot")
      .then((data) => {
        return data.data.data.amount;
      });
    return res;
  };

  const refreshStakes = () => {
    setnewStakes(newStakes + 1);
  };

  const calculateCountdown = async () => {
    const address = coinbase;
    let finalDay = await window.wod_caws
      .checkStakingTimeWodCaws(address)
      .then((data) => {
        return data;
      });

    let lockup_time = await window.wod_caws
      .checkLockupTimeWodCaws()
      .then((data) => {
        return data;
      });

    finalDay = parseInt(finalDay) + parseInt(lockup_time);
    setCountDownLeft(parseInt(finalDay * 1000) - Date.now());
  };

  const handleEthPool = async () => {
    await handleSwitchNetworkhook("0x1")
      .then(() => {
        handleSwitchNetwork("1");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (coinbase && chainId === "1") {
      getStakesIds();
      getLandStakesIds();
      myNft();
      myStakes();
      myLandNft();
      myLandStakes();
      checkApproval();
      calculateAllRewards();
      calculateCountdown();
    }
  }, [isConnected, coinbase, screenName, newStakes, chainId]);

  const getApprovedNfts = (data) => {
    setApprovedNfts(data);
    return data;
  };

  const getApprovedLandNfts = (data) => {
    setApprovedLandNfts(data);
    return data;
  };

  const showCawsPopup = () => {
    setCawspopup(true);
  };

  const showLandPopup = () => {
    setLandpopup(true);
  };

  useEffect(() => {
    if (isConnected) {
      setUSDPrice();
    }
  }, [isConnected, EthRewards]);

  return (
    <div className={`p-0 ${listType === "list" && "pt-4"} `}>
      <div className={`allwrappercaws allwrapper-active mb-2 `}>
        <div className="leftside2 mb-2 w-100">
          <div
            className={
              listType === "list"
                ? "activewrapper d-flex gap-4 justify-content-between position-relative flex-row flex-lg-row align-items-end align-items-lg-center"
                : "activewrapper position-relative flex-row-reverse flex-lg-row align-items-end align-items-lg-center"
            }
          >
            <div
              className={` ${
                listType === "list"
                  ? "d-flex flex-column flex-lg-row align-items-lg-center gap-3"
                  : "first-block-wrapper gap-2"
              } `}
            >
              <h6 className="m-0 expiredtxt caws-active-txt">Expired Pool</h6>
              {/* <div className="d-flex align-items-center justify-content-between gap-2">
                    <h6 className="earnrewards-text">Earn rewards in:</h6>
                    <h6 className="earnrewards-token d-flex align-items-center gap-1">
                      DYP
                    </h6>
                  </div> */}

              <div className="d-flex align-items-center justify-content-between gap-2">
                <h6 className="m-0 earnrewards-text">APR:</h6>
                <h6 className="m-0 earnrewards-token d-flex align-items-center gap-1">
                  50%
                  <Tooltip
                    placement="top"
                    title={
                      <div className="tooltip-text">
                        {
                          "APR reflects the interest rate of earnings on an account over the course of one year. "
                        }
                      </div>
                    }
                  >
                    <img src={moreinfo} alt="" />
                  </Tooltip>
                </h6>
              </div>
              <div className="d-flex align-items-center justify-content-between gap-2">
                <h6 className="m-0 earnrewards-text">Lock time:</h6>
                <h6 className="m-0 earnrewards-token d-flex align-items-center gap-1">
                  No Lock
                  <Tooltip
                    placement="top"
                    title={
                      <div className="tooltip-text">
                        {
                          "The amount of time your deposited assets will be locked."
                        }
                      </div>
                    }
                  >
                    <img src={moreinfo} alt="" />
                  </Tooltip>
                </h6>
              </div>
              {/* <div className="d-flex align-items-center justify-content-between gap-2">
                <h6 className="earnrewards-text">Total NFTs staked</h6>
                <h6 className="earnrewards-token d-flex align-items-center gap-1">
                  {totalStakes}/10000
                </h6>
              </div> */}
            </div>
            <div
              className={`d-flex ${
                listType === "table" && "mt-2"
              } align-items-center justify-content-between gap-3 position-relative`}
            >
              <div
                className="d-flex align-items-center justify-content-between gap-3 cursor-pointer"
                onClick={showCawsPopup}
              >
                <h6 className="m-0 bottomitems">Get CAWS</h6>
              </div>
              {cawspopup === true && (
                <div className="position-absolute">
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setCawspopup(false);
                    }}
                  >
                    <div
                      className="tooltip d-flex justify-content-center"
                      style={{ opacity: 1, width: 145 }}
                    >
                      <div className="d-flex flex-column gap-2 align-items-start">
                        <a
                          href="https://www.worldofdypians.com/marketplace/caws"
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => {
                            setCawspopup(false);
                          }}
                        >
                          <h6 className="m-0 bottomitems">
                            <img src={arrowup} alt="" />
                            WoD Marketplace
                          </h6>
                        </a>
                        <a
                          href="https://nft.coinbase.com/collection/catsandwatches"
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => {
                            setCawspopup(false);
                          }}
                        >
                          <h6 className="m-0 bottomitems">
                            <img src={arrowup} alt="" />
                            Coinbase
                          </h6>
                        </a>

                        <a
                          href="https://opensea.io/collection/catsandwatchessocietycaws"
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => {
                            setCawspopup(false);
                          }}
                        >
                          <h6 className="m-0 bottomitems">
                            <img src={arrowup} alt="" />
                            OpenSea
                          </h6>
                        </a>
                      </div>
                    </div>
                  </OutsideClickHandler>
                </div>
              )}
              <div
                className="d-flex align-items-center justify-content-between gap-3 cursor-pointer"
                onClick={showLandPopup}
              >
                <h6 className="m-0 bottomitems">Get WOD</h6>
              </div>
              {landpopup === true && (
                <div className="position-absolute">
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setLandpopup(false);
                    }}
                  >
                    <div
                      className="tooltip d-flex justify-content-center"
                      style={{ opacity: 1, width: 145, left: 90 }}
                    >
                      <div className="d-flex flex-column gap-2 align-items-start">
                        <a
                          href="https://www.worldofdypians.com/marketplace/land"
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => {
                            setLandpopup(false);
                          }}
                        >
                          <h6 className="m-0 bottomitems">
                            <img src={arrowup} alt="" />
                            WoD Marketplace
                          </h6>
                        </a>
                        <a
                          href="https://nft.coinbase.com/collection/worldofdypians"
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => {
                            setLandpopup(false);
                          }}
                        >
                          <h6 className="m-0 bottomitems">
                            <img src={arrowup} alt="" />
                            Coinbase
                          </h6>
                        </a>

                        <a
                          href="https://opensea.io/collection/worldofdypians"
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => {
                            setLandpopup(false);
                          }}
                        >
                          <h6 className="m-0 bottomitems">
                            <img src={arrowup} alt="" />
                            OpenSea
                          </h6>
                        </a>
                      </div>
                    </div>
                  </OutsideClickHandler>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pools-details-wrapper d-flex m-0 border-0 ">
          <div
            className={` ${
              listType === "list" ? "row" : "d-flex flex-column"
            } w-100 justify-content-between gap-4 gap-lg-0`}
          >
            <div
              className={`firstblockwrapper ${
                listType === "list" && "col-12 col-md-6 col-lg-2 py-2"
              }`}
            >
              <div
                className={`d-flex ${
                  listType === "table"
                    ? "flex-row align-items-center"
                    : "flex-column"
                } justify-content-between gap-4 h-100`}
              >
                <h6 className="m-0 start-title">Start Staking</h6>

                {coinbase === null ||
                coinbase === undefined ||
                isConnected === false ? (
                  <button
                    className="connectbtn btn"
                    onClick={() => {
                      handleConnection();
                    }}
                  >
                    <img src={wallet} alt="" /> Connect wallet
                  </button>
                ) : chainId === "1" ? (
                  <div className="addressbtn btn">{shortAddress(coinbase)}</div>
                ) : (
                  <button
                    className="connectbtn btn"
                    onClick={() => {
                      handleEthPool();
                    }}
                  >
                    Change Network
                  </button>
                )}
              </div>
            </div>
            <div
              className={`otherside-border  ${
                listType === "list" ? "col-12 col-md-6 col-lg-4" : "px-0"
              }  ${chainId !== "1" && "blurrypool"} ${
                expired === true && "blurrypool"
              } `}
            >
              <div className="d-flex justify-content-between align-items-center gap-2">
                <h6 className="m-0 deposit-txt">Stake</h6>

                <h6 className="m-0 mybalance-text">
                  Avaliable NFTs:{" "}
                  <b>
                    {isConnected === false ? 0 : myNFTs.length} CAWS &{" "}
                    {isConnected === false ? 0 : myLandNFTs.length} WOD
                  </b>
                </h6>
                {/* <Tooltip
                  placement="top"
                  title={
                    <div className="tooltip-text">
                      {"Deposit your CAWS NFTs to the staking smart contract."}
                    </div>
                  }
                >
                  <img src={moreinfo} alt="" />
                </Tooltip> */}
              </div>
              <div className="d-flex flex-column gap-2 justify-content-between">
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <button
                    className="btn disabled-btn"
                    onClick={() => {
                      setshowChecklistModal(true);
                      setOpenStakeChecklist(true);
                      setApprovedNfts([]);
                      setHide("staked");
                    }}
                  >
                    Select NFTs
                  </button>
                  <div className="available-nfts">
                    Selected NFTs:{" "}
                    <b>{isConnected === false ? 0 : approvedNfts.length}</b>
                  </div>
                </div>
                {/* {this.state.errorMsg && (
                  <h6 className="errormsg">{this.state.errorMsg}</h6>
                )} */}
              </div>
            </div>
            <div
              className={`otherside-border ${
                listType === "list" ? "col-12 col-md-6 col-lg-4" : "px-0"
              }  ${chainId !== "1" && "blurrypool"}`}
            >
              <div className="d-flex justify-content-between gap-2 flex-column flex-lg-row">
                <h6
                  className={
                    listType === "list"
                      ? "m-0 withdraw-txt align-items-center d-flex gap-2"
                      : "m-0 withdraw-txt d-flex flex-column gap-2"
                  }
                >
                  REWARDS
                  <h6
                    className="m-0 mybalance-text"
                    style={{ textTransform: "capitalize" }}
                  >
                    Staked:{""}
                    <b>
                      {isConnected === false ? 0 : mystakes.length} CAWS &{" "}
                      {isConnected === false ? 0 : myLandstakes.length} WOD
                    </b>
                  </h6>
                </h6>
                <h6 className="m-0 withdraw-littletxt d-flex align-items-center gap-2">
                  <Tooltip
                    placement="top"
                    title={
                      <div className="tooltip-text">
                        {
                          "Rewards earned by your CAWS NFTs deposit to the staking smart contract are displayed in real-time."
                        }
                      </div>
                    }
                  >
                    <img src={moreinfo} alt="" />
                  </Tooltip>
                </h6>
              </div>
              <div className="d-flex flex-column gap-2 justify-content-between">
                <div className="form-row d-flex gap-2 align-items-end justify-content-between">
                  <h6 className="m-0 rewardstxtCaws d-flex align-items-center gap-2">
                    <img src={weth} alt="" style={{ width: 18, height: 18 }} />{" "}
                    {getFormattedNumber(EthRewards, 6)} WETH ($
                    {getFormattedNumber(ethToUSD, 6)})
                  </h6>
                  <button
                    className={`btn ${
                      EthRewards === 0 ? "disabled-btn" : "filledbtn"
                    } d-flex justify-content-center align-items-center`}
                    style={{ height: "fit-content" }}
                    onClick={claimRewards}
                    disabled={EthRewards === 0 ? true : false}
                  >
                    <>Claim</>
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`otherside-border  ${
                listType === "list" ? "col-12 col-md-6 col-lg-2" : "px-0"
              } ${chainId !== "1" && "blurrypool"}`}
            >
              <h6 className="m-0 deposit-txt d-flex align-items-center gap-2 justify-content-between">
                Unstake
                <Tooltip
                  placement="top"
                  title={
                    <div className="tooltip-text">
                      {
                        "Withdraw your deposited NFTs from the staking smart contract."
                      }
                    </div>
                  }
                >
                  <img src={moreinfo} alt="" />
                </Tooltip>
              </h6>

              <button
                className="btn outline-btn-stake"
                onClick={() => {
                  setshowChecklistModal(true);
                  setOpenStakeChecklist(true);
                  setHide("tostake");
                }}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
      {showChecklistModal === true && (
        <RewardsModal
          onModalClose={() => {
            setshowChecklistModal(false);
          }}
          getApprovedNfts={getApprovedNfts}
          getApprovedLandNfts={getApprovedLandNfts}
          landStakes={myLandstakes}
          cawsStakes={mystakes}
          nftItem={mystakes}
          isConnected={isConnected}
          coinbase={coinbase}
          onDepositComplete={() => refreshStakes()}
          ETHrewards={EthRewards}
          finalUsd={ethToUSD}
          handleConnect={handleConnection}
          onClaimAll={() => {
            claimRewards();
          }}
          binanceW3WProvider={binanceW3WProvider}
        />
      )}
    </div>
  );
};

export default CawsWodDetails;
