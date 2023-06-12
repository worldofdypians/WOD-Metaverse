/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ethers } from "ethers";
import { dashboardBackground } from "../../Themes/Images";
import { GENERATE_NONCE, GET_PLAYER, VERIFY_WALLET } from "./Dashboard.schema";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import { useWeb3 } from "../../Utils.js/Web3/Web3Provider";
import { getWalletTokens } from "../../web3/tmp";
import { CircularProgress, Grid } from "@mui/material";
import { Cart, LoginWrapper, ErrorAlert, Button } from "../../Components";
import LandCart from "../../Components/Cart/LandCart";
import EmptyCard from "../../Components/Cart/EmptyCard";
import classes from "./Dashboard.module.css";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import BundleCard from "../../Components/BundleCard/BundleCard";
import LeaderBoard from "../../Components/LeaderBoard/LeaderBoard";
import WalletBalance from "../../Components/WalletBalance/WalletBalance";
import ethereum from "../../Images/eth.svg";
import useWindowSize from "../../Utils.js/hooks/useWindowSize";
import ChecklistModal from "../../Components/ChecklistModal/ChecklistModal";
import ChecklistLandNftModal from "../../Components/ChecklistModal/ChecklistLandNftModal";
import EmptyGenesisCard from "../../Components/EmptyGenesisCard/EmptyGenesisCard";
import Web3 from "web3";
import { ERC20_ABI } from "../../web3/abis";
import _ from "lodash";
import WalletModal from "../../Components/WalletModal/WalletModal";
import { cawsStakeContract, landNftStake_contract } from "../../web3";
import dragonIcon from "../../Images/userProfile/dragonIcon.svg";
import idyp from "../../Images/userProfile/idyp.svg";
import fistIcon from "../../Images/userProfile/Icon.png";
import goldenPass from "../../Components/BundleCard/assets/goldenPass.webp";

import dypius from "../../Images/userProfile/dypius.svg";

function Dashboard({
  MyNFTSCaws,
  MyNFTSTimepiece,
  MyNFTSLand,
  account,
  isConnected,
  chainId,
}) {
  const { email, logout } = useAuth();

  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });
  const [tokensState, setTokensState] = useState({});
  const [showChecklistModal, setshowChecklistModal] = useState(false);
  const [showChecklistLandNftModal, setshowChecklistLandNftModal] =
    useState(false);

  const [dypBalance, setDypBalance] = useState();
  const [dypBalancebnb, setDypBalanceBnb] = useState();
  const [dypBalanceavax, setDypBalanceAvax] = useState();

  const [idypBalance, setiDypBalance] = useState();
  const [idypBalancebnb, setiDypBalanceBnb] = useState();
  const [idypBalanceavax, setiDypBalanceAvax] = useState();

  const [showWalletModal, setshowWalletModal] = useState(false);
  const [stakes, setStakes] = useState([]);
  const [landstakes, setLandStakes] = useState([]);
  const [optionText, setOptionText] = useState("daily");
  const [selectedPackage, setSelectedPackage] = useState("dyp");
  const [availableTime, setAvailableTime] = useState();

  const dragonData = {
    title: "Dragon Ruins",
    benefits: [
      "Ability to fight a special creature",
      "A chance to win an unique CAWS NFT",
      "Score multiplier",
    ],
    price: "50 DYP",
    link: "https://www.worldofdypians.com/news/644a3089aa4deb26fe4dac90/Dragon-Ruins-Event",
  };

  const iDypPackageData = {
    title: "Puzzle Madness",
    benefits: [
      "Enhance your puzzle-solving skills",
      "Ability to earn high value rewards",
      "Compete against other players on the leaderboard",
    ],
    price: "3,500 iDYP",
    link: "https://www.worldofdypians.com/news/644ce83e7f931ac9706b515e/Puzzle-Madness-Event",
  };
  const dypPackageData = {
    title: "Golden Pass",
    benefits: [
      "Double your rewards",
      "Compete and climb higher in the rankings",
      "Unlock unique rewards during the event",
    ],
    price: "700 DYP",
    link: "https://www.worldofdypians.com/news/644e343627cca74b2d4a60b1/Golden-Pass-Event",
  };

  const criticalHitPackageData = {
    title: "Critical Hit",
    benefits: [
      "Exclusive access for Genesis Land NFT owners",
      "Opportunity to win rewards",
      "Regular and ongoing events",
    ],
    price: "700 DYP",
    link: "https://www.worldofdypians.com/news/6426dc2bb15f9e51ad8bd4e6/Critical-Hit-Event",
  };

  const getStakes = async () => {
    const stakeArray = await cawsStakeContract.methods
      .depositsOf(data?.getPlayer?.wallet?.publicAddress)
      .call();
    setStakes(stakeArray);
  };

  const getLandStakes = async () => {
    const stakeArray = await landNftStake_contract.methods
      .depositsOf(data?.getPlayer?.wallet?.publicAddress)
      .call();
    setLandStakes(stakeArray);
  };

  const [generateNonce, { loading: loadingGenerateNonce, data: dataNonce }] =
    useMutation(GENERATE_NONCE);
  const [verifyWallet, { loading: loadingVerify, data: dataVerify }] =
    useMutation(VERIFY_WALLET);

  const getTokens = async () => {
    try {
      //data?.getPlayer?.wallet?.publicAddress
      const res = await getWalletTokens(data?.getPlayer?.wallet?.publicAddress);
      setTokensState(res);
    } catch (error) {
      console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
    }
  };
  console.log(MyNFTSCaws, MyNFTSTimepiece, MyNFTSLand);

  // const connectWallet = async () => {
  //   try {
  //     await generateNonce({
  //       variables: {
  //         publicAddress: account,
  //       },
  //     });
  //   } catch (error) {
  //     console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
  //   }
  // };

  async function connectWallet() {
    // function onConnect() {
    //   if (!isConnectedOneTime) {
    //     window.isConnectedOneTime = true;
    //     window.oneTimeConnectionEvents.forEach((fn) => fn());
    //   }
    // }
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum?.enable();
        console.log("Connected!");
        if (window.ethereum.isCoin98) {
          window.WALLET_TYPE = "coin98";
        }
        if (window.ethereum.isMetaMask) {
          window.WALLET_TYPE = "metamask";
        }
        let coinbase_address;
        await window.ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then((data) => {
            coinbase_address = data[0];
          });
        // window.coinbase_address = coinbase_address.pop();
        await generateNonce({
          variables: {
            publicAddress: coinbase_address,
          },
        }).then(() => {
          setshowWalletModal(false);
        });
        return true;
      } catch (e) {
        console.error(e);
        console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", e);
        throw new Error("User denied wallet connection!");
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      console.log("connected to old web3");
      // onConnect();
      return true;
    } else {
      throw new Error("No web3 detected!");
    }
  }

  const signWalletPublicAddress = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(account);
      const signature = await signer.signMessage(
        `Signing one-time nonce: ${dataNonce?.generateWalletNonce?.nonce}`
      );
      verifyWallet({
        variables: {
          publicAddress: account,
          signature: signature,
        },
      });
    } catch (error) {
      console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
    }
  };

  useEffect(() => {
    if (dataVerify?.verifyWallet) {
      refetchPlayer();
    }
  }, [dataVerify]);

  useEffect(() => {
    if (dataNonce?.generateWalletNonce) {
      signWalletPublicAddress();
    }
  }, [dataNonce]);

  useEffect(() => {
    if (data?.getPlayer?.wallet?.publicAddress) {
      getTokens();
      getStakes();
      getLandStakes();
    }
  }, [data?.getPlayer?.wallet?.publicAddress]);

  const windowSize = useWindowSize();

  let buttonProps = {
    title: "Connect Wallet",
    onPress: connectWallet,
    loading: loadingVerify || loadingGenerateNonce,
  };

  const renderItems = () => {
    if (
      (tokensState?.items && tokensState?.items?.length === 0) ||
      _.isEmpty(tokensState)
    ) {
      return (
        <>
          {windowSize.width < 701 ? (
            <>
              <div className="nftGridItem">
                <EmptyCard />
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="nftGridItem">
                <EmptyCard />
              </div>
              <div className="nftGridItem">
                <EmptyCard />
              </div>
            </>
          )}
        </>
      );
    }
    if (tokensState?.items && tokensState?.items?.length > 0) {
      return tokensState.items
        .slice(0, windowSize.width < 701 ? 1 : 2)
        .map((item, index) => (
          <Grid key={index} item xs={3} md={2.4} className="nftGridItem">
            <Cart {...item} stakes={stakes} />
          </Grid>
        ));
    }
  };

  const renderGenesisItems = () => {
    if (
      (tokensState?.landItems && tokensState?.landItems?.length === 0) ||
      _.isEmpty(tokensState)
    ) {
      return (
        <>
          {windowSize.width < 701 ? (
            <>
              <div className="nftGridItem">
                <EmptyGenesisCard />
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="nftGridItem">
                <EmptyGenesisCard />
              </div>
              <div className="nftGridItem">
                <EmptyGenesisCard />
              </div>
            </>
          )}
        </>
      );
    }
    if (tokensState?.landItems && tokensState?.landItems?.length > 0) {
      return tokensState.landItems
        .slice(0, windowSize.width < 701 ? 1 : 2)
        .map((item, index) => (
          <Grid key={index} item xs={3} md={2.4} className="nftGridItem">
            <LandCart {...item} stakes={landstakes} />
          </Grid>
        ));
    }
  };

  const getDypBalance = async () => {
    const web3eth = new Web3(
      "https://mainnet.infura.io/v3/94608dc6ddba490697ec4f9b723b586e"
    );

    const web3bsc = new Web3("https://bsc-dataseed.binance.org/");

    const web3avax = new Web3("https://api.avax.network/ext/bc/C/rpc");

    if (account !== undefined) {
      const token_address = "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17";
      const token_addressIDYP = "0xbd100d061e120b2c67a24453cf6368e63f1be056";

      const contract1 = new web3eth.eth.Contract(ERC20_ABI, token_address);
      const contract2 = new web3bsc.eth.Contract(ERC20_ABI, token_address);
      const contract3 = new web3avax.eth.Contract(ERC20_ABI, token_address);

      const contract1_idyp = new web3eth.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );
      const contract2_idyp = new web3bsc.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );
      const contract3_idyp = new web3avax.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );

      const bal1 = await contract1.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3eth.utils.fromWei(data, "ether");
        });
      setDypBalance(bal1);

      const bal2 = await contract2.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3bsc.utils.fromWei(data, "ether");
        });
      setDypBalanceBnb(bal2);

      const bal3 = await contract3.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3avax.utils.fromWei(data, "ether");
        });
      setDypBalanceAvax(bal3);

      const bal1_idyp = await contract1_idyp.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3eth.utils.fromWei(data, "ether");
        });
      setiDypBalance(bal1_idyp);

      const bal2_idyp = await contract2_idyp.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3bsc.utils.fromWei(data, "ether");
        });
      setiDypBalanceBnb(bal2_idyp);

      const bal3_idyp = await contract3_idyp.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3avax.utils.fromWei(data, "ether");
        });
      setiDypBalanceAvax(bal3_idyp);
    }
  };

  useEffect(() => {
    getDypBalance();
  }, [account]);

  // console.log(showWalletModal);

  return (
    <LoginWrapper
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        justifyContent: "normal",
        alignItems: "normal",
        flexDirection: "column",
        gap: "30px",
        height: "auto",
        minHeight: "100%",
      }}
      img={dashboardBackground}
    >
      {/* <div
        className="linear-border"
        style={{
          marginTop: 32,
          alignSelf: "flex-end",
          marginRight: 32,
          width: "fit-content",
        }}
      >
        <button className="btn filled-btn px-5" onClick={logout}>
          Log Out
        </button>
      </div> */}
      {loadingPlayer ? (
        <>
          <CircularProgress
            size={80}
            style={{ alignSelf: "center", margin: "auto" }}
          />
        </>
      ) : (
        <div className="container-fluid">
          <div className={"home-main-wrapper"}>
            <div
              className={
                "d-flex flex-column gap-4 justify-content-center align-items-center"
              }
              style={{
                marginTop: 80,
              }}
            >
              <div
                className={`col-12 d-flex flex-column gap-3  mt-5 mt-lg-0 ${classes.containerPlayer}`}
              >
                <ProfileCard
                  email={email}
                  username={data?.getPlayer?.displayName}
                  address={data?.getPlayer?.wallet?.publicAddress}
                  userId={data?.getPlayer?.playerId}
                  balance={dypBalancebnb}
                  availableTime={availableTime}
                  isVerified={data?.getPlayer?.wallet}
                  coinbase={account}
                  handleShowWalletPopup={() => {
                    setshowWalletModal(true);
                  }}
                />
                <WalletBalance
                  address={data?.getPlayer?.wallet?.publicAddress}
                  coinbase={account}
                  isVerified={data?.getPlayer?.wallet}
                  // handleConnectWallet={connectWallet}
                  dypBalance={dypBalance}
                  dypBalancebnb={dypBalancebnb}
                  dypBalanceavax={dypBalanceavax}
                  idypBalance={idypBalance}
                  idypBalancebnb={idypBalancebnb}
                  idypBalanceavax={idypBalanceavax}
                  handleShowWalletPopup={() => {
                    setshowWalletModal(true);
                  }}
                />
              </div>

              {/* <div className="d-flex flex-column align-items-center w-100">
                <div className="d-flex flex-column gap-2 w-100 mb-4">
                  <h2
                    className={`font-organetto d-flex flex-column flex-xl-row gap-1 align-items-center m-0 bundleTitle`}
                  >
                    Premium
                    <mark className={`font-organetto bundletag`}>events</mark>
                  </h2>
              
                </div>
                <div className="d-flex align-items-start align-items-lg-center gap-2 gap-lg-2 w-100 justify-content-start">
                  <div className="d-flex flex-column align-items-center gap-2">
                    <div
                      className={`premium-package dyp-package ${
                        selectedPackage === "dyp" && "selected-premium"
                      } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                      onClick={() => setSelectedPackage("dyp")}
                    >
                      <img
                        src={dypius}
                        width={40}
                        height={40}
                        alt="premium package icon"
                        className="premium-package-icon"
                      />
                    </div>
                    <h6
                      className="bundleTitle mb-0 fw-normal text-center"
                      style={{ fontSize: "14px", fontFamily: "Poppins" }}
                    >
                      Golden Pass
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-2">
                    <div
                      className={`premium-package ${classes.idypicon} ${
                        selectedPackage === "idyp" && "selected-premium"
                      } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                      onClick={() => setSelectedPackage("idyp")}
                    ></div>
                    <h6
                      className="bundleTitle mb-0 fw-normal text-center"
                      style={{ fontSize: "14px", fontFamily: "Poppins" }}
                    >
                      Puzzle Madness
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-2">
                    <div
                      className={`premium-package dragon-package ${
                        selectedPackage === "dragon" && "selected-premium"
                      } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                      onClick={() => setSelectedPackage("dragon")}
                    >
                      <img
                        src={dragonIcon}
                        width={40}
                        height={40}
                        alt="premium package icon"
                        className="premium-package-icon"
                      />
                    </div>
                    <h6
                      className="bundleTitle mb-0 fw-normal text-center"
                      style={{ fontSize: "14px", fontFamily: "Poppins" }}
                    >
                      Dragon Ruins
                    </h6>
                  </div>

                  <div className="d-flex flex-column align-items-center gap-2">
                    <div
                      className={`premium-package criticalhit-package ${
                        selectedPackage === "criticalHit" && "selected-premium"
                      } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                      onClick={() => setSelectedPackage("criticalHit")}
                    >
                      <img
                        src={dypius}
                        width={40}
                        height={40}
                        alt="premium package icon"
                        className="premium-package-icon"
                      />
                    </div>
                    <h6
                      className="bundleTitle mb-0 fw-normal text-center"
                      style={{ fontSize: "14px", fontFamily: "Poppins" }}
                    >
                      Critical Hit
                    </h6>
                  </div>
                </div>
                <BundleCard
                  coinbase={account}
                  wallet={data?.getPlayer?.wallet?.publicAddress}
                  chainId={chainId}
                  username={data?.getPlayer?.displayName}
                  email={email}
                  getDypBalance={getDypBalance}
                  getiDypBalance={getDypBalance}
                  packageData={
                    selectedPackage === "dragon"
                      ? dragonData
                      : selectedPackage === "dyp"
                      ? dypPackageData
                      : selectedPackage === "criticalHit"
                      ? criticalHitPackageData
                      : iDypPackageData
                  }
                  handleSetAvailableTime={(value) => {
                    setAvailableTime(value);
                  }}
                  availableTime={availableTime}
                />
              </div> */}

              <LeaderBoard
                username={data?.getPlayer?.displayName}
                userId={data?.getPlayer?.playerId}
                dypBalancebnb={dypBalancebnb}
                address={data?.getPlayer?.wallet?.publicAddress}
                availableTime={availableTime}
              />
            </div>
            <div className="d-flex flex-column flex-xxl-row gap-3 justify-content-between">
              <div className={"home-main-wrapper nftBigWrapper"}>
                <h2
                  className={`font-organetto d-flex gap-1 align-items-center m-0 bundleTitle`}
                >
                  Caws
                  <mark className={`font-organetto bundletag`}>Nft</mark>
                </h2>
                <div className="nftcontainer d-flex m-0 flex-column flex-xxl-row flex-lg-row flex-md-row align-items-center position-relative">
                  <div className="ethwrapper position-absolute d-none d-lg-flex">
                    <span className="ethText">
                      <img src={ethereum} alt="" className="ethlogo" /> Ethereum
                    </span>
                  </div>
                  <div className="d-flex gap-5 align-items-end flex-column flex-xxl-row flex-lg-row flex-md-row contentwrapper">
                    {renderItems()}
                    {tokensState?.items?.length > 0 ? (
                      <div
                        className={"linear-border nftGridItem"}
                        style={{ width: "fit-content" }}
                      >
                        <button
                          className={"btn filled-btn px-5"}
                          onClick={() => {
                            setshowChecklistModal(true);
                          }}
                        >
                          View all
                        </button>
                      </div>
                    ) : (
                      <div
                        className={"linear-border nftGridItem"}
                        style={{ width: "fit-content" }}
                      >
                        <a
                          href="https://opensea.io/collection/catsandwatchessocietycaws"
                          target="_blank"
                          rel="noreferrer"
                          className={"btn filled-btn px-5"}
                        >
                          Buy CAWS
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={
                  "home-main-wrapper d-flex justify-content-end nftBigWrapper"
                }
              >
                <h2
                  className={`font-organetto -flex flex-column flex-xxl-row flex-lg-row flex-md-row flex-sm-row gap-1 align-items-center m-0 bundleTitle`}
                >
                  Genesis Land
                  <mark className={`font-organetto bundletag`}>Nft</mark>
                </h2>
                <div className="nftcontainer d-flex m-0 flex-column flex-xxl-row flex-lg-row flex-md-row align-items-center position-relative">
                  <div className="ethwrapper position-absolute d-none d-lg-flex">
                    <span className="ethText">
                      <img src={ethereum} alt="" className="ethlogo" /> Ethereum
                    </span>
                  </div>
                  <div className="d-flex gap-5 align-items-end flex-column flex-xxl-row flex-lg-row flex-md-row contentwrapper">
                    {renderGenesisItems()}

                    {/* <a
                      href="https://www.worldofdypians.com/land"
                      target={"_blank"}
                    > */}
                    {tokensState?.landItems?.length > 0 ? (
                      <div
                        className={"linear-border nftGridItem"}
                        style={{ width: "fit-content" }}
                      >
                        <button
                          className={"btn filled-btn px-5"}
                          onClick={() => {
                            setshowChecklistLandNftModal(true);
                          }}
                        >
                          View all
                        </button>
                      </div>
                    ) : (
                      <div
                        className={"linear-border nftGridItem"}
                        style={{ width: "fit-content" }}
                      >
                        <a
                          href="https://opensea.io/collection/worldofdypians"
                          target="_blank"
                          rel="noreferrer"
                          className={"btn filled-btn px-5"}
                        >
                          Buy WoD Land
                        </a>
                      </div>
                    )}
                    {/* </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showChecklistModal === true && (
        <ChecklistModal
          show={showChecklistModal}
          handleClose={() => {
            setshowChecklistModal(false);
          }}
          cawsitem={tokensState?.items?.length > 0 && tokensState.items}
          stakes={stakes}
        />
      )}

      {showWalletModal === true && (
        <WalletModal
          show={showWalletModal}
          handleClose={() => {
            setshowWalletModal(false);
          }}
          handleConnection={connectWallet}
        />
      )}

      {showChecklistLandNftModal === true && (
        <ChecklistLandNftModal
          show={showChecklistLandNftModal}
          handleClose={() => {
            setshowChecklistLandNftModal(false);
          }}
          cawsitem={tokensState?.landItems?.length > 0 && tokensState.landItems}
          stakes={landstakes}
        />
      )}
      {/* <ErrorAlert error={connectedState?.error} /> */}
    </LoginWrapper>
  );
}

export default Dashboard;
