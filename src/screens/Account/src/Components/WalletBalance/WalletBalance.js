import React, { useState, useEffect, useRef } from "react";
import "./_walletbalance.scss";
import ethIcon from "./assets/ethIcon.svg";
import bnbIcon from "./assets/bnbIcon.svg";
import avaxIcon from "./assets/avaxIcon.svg";
import dypIcon from "./assets/dypIcon.svg";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import idyp from "../../Images/userProfile/idyp.svg";
import globalRank from "./assets/globalRank.svg";
import genesisImg from "./assets/genesisRank.svg";
import axios from "axios";
import viewAllArrow from "./assets/viewAllArrow.svg";
import { NavLink } from "react-router-dom";
import getListedNFTS from "../../../../../actions/Marketplace";
import { getAllNfts } from "../../../../../actions/convertUsd";
import { HashLoader } from "react-spinners";
import nextArrow from "../../../../Marketplace/assets/nextArrow1.svg";
import Slider from "react-slick";
import ItemCard from "../../../../../components/ItemCard/ItemCard";
import CawsWodItem from "../../../../../components/ItemCard/CawsWodItem";
import accountEmptyCaws from "./assets/accountEmptyCaws.svg";
import accountEmptyLand from "./assets/accountEmptyLand.svg";
import filterIcon from "./assets/filterIcon.svg";
import emptyCheck from "./assets/emptyCheck.svg";
import dropdownIcon from "./assets/dropdownIcon.svg";

const WalletBalance = ({
  dypBalance,
  address,
  coinbase,
  dypBalancebnb,
  dypBalanceavax,
  isVerified,
  email,
  // handleConnectWallet,
  handleShowWalletPopup,
  idypBalance,
  idypBalancebnb,
  idypBalanceavax,
  userId,
  username,
  listedNFTS,
  landStaked,
  myCawsWodStakes,
  myWodWodStakes,
  myCawsCollected,
  myCawsOldCollected,
  myLandCollected,
  myTimepieceCollected,
  myBoughtNfts,
  isConnected,
  handleConnect,
  ethTokenData,
  dypTokenData,
  favoritesArray,
  latestBoughtNFTS,
}) => {
  const [userRank, setUserRank] = useState("");
  const [genesisRank, setGenesisRank] = useState("");
  const [dailyrecords, setRecords] = useState([]);
  const [recentListingsFilter, setRecentListingsFilter] = useState("all");
  const [collectedItemsFiltered, setcollectedItemsFiltered] = useState([]);

  const [favItemsFiltered, setfavItemsFiltered] = useState([]);
  const [favoriteItems, setfavoriteItems] = useState([]);

  const [listedItemsFiltered, setlistedItemsFiltered] = useState([]);
  const [listedItems, setlistedItems] = useState([]);

  const [dyptokenData, setDypTokenData] = useState([]);
  const [idyptokenData, setIDypTokenData] = useState([]);
  const [idyptokenDatabnb, setIDypTokenDatabnb] = useState([]);
  const [dyptokenDatabnb, setDypTokenDatabnb] = useState([]);
  const [idyptokenDataAvax, setIDypTokenDataAvax] = useState([]);
  const [dyptokenDataAvax, setDypTokenDataAvax] = useState([]);
  const [filterTitle, setFilterTitle] = useState("Balance");
  const [nftItems, setNftItems] = useState([]);

  const [collectedItems, setcollectedItems] = useState([]);
  const [showNfts, setShowNfts] = useState(false);
  const [activeSlide, setActiveSlide] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingRecentListings, setLoadingRecentListings] = useState(false);
  const [allListed, setAllListed] = useState([]);

  const [filter1, setFilter1] = useState("");
  const [filter2, setFilter2] = useState("");

  const firstSlider = useRef();

  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };

  const getAllnftsListed = async () => {
    const listedNFTS = await getListedNFTS(0, "", "seller", coinbase, "");

    setAllListed(listedNFTS);
  };

  const sortNfts = (sortValue) => {
    if (sortValue === "balance") {
      setFilterTitle("Balance");
    } else if (sortValue === "collected") {
      setFilterTitle("Collected");
    } else if (sortValue === "favorites") {
      setFilterTitle("Favorites");
      getAllFavs();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else if (sortValue === "listed") {
      setFilterTitle("Listed");
      setLoading(true);
      getListed();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else if (sortValue === "staked") {
      setFilterTitle("Staked");
      setLoading(true);
      // getStakes();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else if (sortValue === "eth") {
      setFilterTitle("");
    }
  };

  const filterRecentListings = (filter) => {
    setLoadingRecentListings(true);

    if (filterTitle === "Favorites") {
      if (filter === "caws") {
        setRecentListingsFilter("caws");
        let cawsFilter = favoriteItems.filter(
          (item) => item.nftAddress === window.config.nft_caws_address
        );
        setfavItemsFiltered(cawsFilter);
      } else if (filter === "land") {
        setRecentListingsFilter("land");
        let wodFilter = favoriteItems.filter(
          (item) => item.nftAddress === window.config.nft_land_address
        );
        setfavItemsFiltered(wodFilter);
      } else if (filter === "timepiece") {
        setRecentListingsFilter("timepiece");
        let timepieceFilter = favoriteItems.filter(
          (item) => item.nftAddress === window.config.nft_timepiece_address
        );
        setfavItemsFiltered(timepieceFilter);
      } else if (filter === "all") {
        setRecentListingsFilter("all");
        setfavItemsFiltered(favoriteItems);
      }
    }
    if (filterTitle === "Listed") {
      if (filter === "caws") {
        setRecentListingsFilter("caws");
        let cawsFilter = listedItems.filter(
          (item) =>
            item.nftAddress === window.config.nft_caws_address ||
            item.nftAddress === window.config.nft_cawsold_address
        );
        setlistedItemsFiltered(cawsFilter);
      } else if (filter === "land") {
        setRecentListingsFilter("land");
        let wodFilter = listedItems.filter(
          (item) => item.nftAddress === window.config.nft_land_address
        );
        setlistedItemsFiltered(wodFilter);
      } else if (filter === "timepiece") {
        setRecentListingsFilter("timepiece");
        let timepieceFilter = listedItems.filter(
          (item) => item.nftAddress === window.config.nft_timepiece_address
        );
        setlistedItemsFiltered(timepieceFilter);
      } else if (filter === "all") {
        setRecentListingsFilter("all");
        setcollectedItemsFiltered(listedItems);
      }
    }
    if (filterTitle === "Staked") {
      if (filter === "land") {
        setRecentListingsFilter("land");
      } else if (filter === "cawswod") {
        setRecentListingsFilter("cawswod");
      } else if (filter === "all") {
        setRecentListingsFilter("all");
      }
    }
    setTimeout(() => {
      setLoadingRecentListings(false);
    }, 1000);
  };

  const getListed = async () => {
    let finalItems = [];

    allListed &&
      allListed.length > 0 &&
      allListed.map((nft) => {
        if (nft.nftAddress === window.config.nft_caws_address) {
          nft.type = "caws";
          nft.chain = 1;
          nft.isListed = true;
          nft.isStaked = false;
          finalItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_land_address) {
          nft.type = "land";
          nft.chain = 1;
          nft.isListed = true;
          nft.isStaked = false;
          finalItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_timepiece_address) {
          nft.type = "timepiece";
          nft.chain = 1;
          nft.isListed = true;
          finalItems.push(nft);
          nft.isStaked = false;
        }
      });
    setlistedItems(finalItems);
    setlistedItemsFiltered(finalItems);
  };

  const getCollected = async () => {
    var finalTimepieceArray = [];
    let finalLandArray = [];
    let finalCawsArray = [];
    let finalCollection = [];
    let stakeArray = [];
    // console.log(allListed, "allListed");

    //bought [latestBoughtNFTS]
    //listed [listedItems]
    //staked [myWodWodStakes,myCawsWodStakes,landStaked]
    //final [listed, to list, staked]

    if (myTimepieceCollected && myTimepieceCollected.length > 0) {
      for (let i = 0; i < myTimepieceCollected.length; i++) {
        finalTimepieceArray.push({
          nftAddress: window.config.nft_timepiece_address,
          buyer:
            isVerified &&
            email &&
            coinbase &&
            address?.toLowerCase() === coinbase.toLowerCase()
              ? address
              : coinbase,
          tokenId: myTimepieceCollected[i],
          type: "timepiece",
          chain: 1,
          isStaked: false,
          isListed: allListed.find(
            (obj) =>
              obj.tokenId == myTimepieceCollected[i] &&
              obj.nftAddress === window.config.nft_timepiece_address
          )
            ? true
            : false,
        });
      }
    }

    if (myLandCollected && myLandCollected.length > 0) {
      for (let i = 0; i < myLandCollected.length; i++) {
        finalLandArray.push({
          nftAddress: window.config.nft_land_address,
          buyer:
            isVerified &&
            email &&
            coinbase &&
            address?.toLowerCase() === coinbase.toLowerCase()
              ? address
              : coinbase,
          tokenId: myLandCollected[i],
          type: "land",
          chain: 1,
          isStaked: false,
          isListed: allListed.find(
            (obj) =>
              obj.tokenId == myLandCollected[i] &&
              obj.nftAddress === window.config.nft_land_address
          )
            ? true
            : false,
        });
      }
    }

    if (myCawsCollected && myCawsCollected.length > 0) {
      for (let i = 0; i < myCawsCollected.length; i++) {
        finalCawsArray.push({
          nftAddress: window.config.nft_caws_address,
          buyer:
            isVerified &&
            email &&
            coinbase &&
            address?.toLowerCase() === coinbase.toLowerCase()
              ? address
              : coinbase,
          tokenId: myCawsCollected[i],
          type: "caws",
          chain: 1,
          isStaked: false,
          isListed: allListed.find(
            (obj) =>
              obj.tokenId == myCawsCollected[i] &&
              obj.nftAddress === window.config.nft_caws_address
          )
            ? true
            : false,
        });
      }
    }
    if (myWodWodStakes && myWodWodStakes.length > 0) {
      for (let i = 0; i < myWodWodStakes.length; i++) {
        stakeArray.push({
          nftAddress: window.config.nft_land_address,
          buyer:
            isVerified &&
            email &&
            coinbase &&
            address?.toLowerCase() === coinbase.toLowerCase()
              ? address
              : coinbase,
          tokenId: myWodWodStakes[i].name.slice(
            1,
            myWodWodStakes[i].name.length
          ),
          type: "land",
          chain: 1,
          isStaked: true,
          isListed: false,
        });
      }
    }
    if (myCawsWodStakes && myCawsWodStakes.length > 0) {
      for (let i = 0; i < myCawsWodStakes.length; i++) {
        stakeArray.push({
          nftAddress: window.config.nft_caws_address,
          buyer:
            isVerified &&
            email &&
            coinbase &&
            address?.toLowerCase() === coinbase.toLowerCase()
              ? address
              : coinbase,
          tokenId: myCawsWodStakes[i].name.slice(
            6,
            myCawsWodStakes[i].name.length
          ),
          type: "caws",
          chain: 1,
          isStaked: true,
          isListed: false,
        });
      }
    }
    if (landStaked && landStaked.length > 0) {
      for (let i = 0; i < landStaked.length; i++) {
        stakeArray.push({
          nftAddress: window.config.nft_land_address,
          buyer:
            isVerified &&
            email &&
            coinbase &&
            address?.toLowerCase() === coinbase.toLowerCase()
              ? address
              : coinbase,
          tokenId: landStaked[i].name.slice(1, landStaked[i].name.length),
          type: "land",
          chain: 1,
          isStaked: true,
          isListed: false,
        });
      }
    }

    finalCollection = [
      ...finalTimepieceArray,
      ...finalLandArray,
      ...finalCawsArray,
      ...stakeArray,
    ];

    setcollectedItems(finalCollection);
    setcollectedItemsFiltered(finalCollection);
  };

  async function updateViewCount(tokenId, nftAddress) {
    try {
      const response = await fetch("https://api.worldofdypians.com/nft-view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenId, nftAddress }),
      });
      const data = await response.json();
      console.log(
        `Updated view count for NFT ${tokenId} at address ${nftAddress}: ${data.count}`
      );
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  }

  const getAllFavs = async () => {
    if (favoritesArray && favoritesArray.length > 0) {
      const unique = [...new Set(favoritesArray.map((item) => {}))];
      // console.log(unique, favoritesArray);
      setfavoriteItems(favoritesArray);
      setfavItemsFiltered(favoritesArray);
    } else {
      setfavoriteItems([]);
      setfavItemsFiltered([]);
    }
  };

  const fetchMonthlyRecordsAroundPlayer = async () => {
    const data = {
      StatisticName: "MonthlyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
        data
      );
      setRecords(result.data.data.leaderboard);
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      setUserRank(testArray[0].position);
    }
  };

  const fetchGenesisAroundPlayer = async () => {
    const data = {
      StatisticName: "GenesisLandRewards",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      setGenesisRank(testArray[0].position);
    }
  };

  const getTokenData = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_eth_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );
        setDypTokenData(propertyDyp[0][1].token_price_usd);

        const propertyIDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );
        setIDypTokenData(propertyIDyp[1][1].token_price_usd);
      });
  };

  const getTokenDatabnb = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_bsc_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_bsc_v2.token_data
        );
        setDypTokenDatabnb(propertyDyp[0][1].token_price_usd);

        const propertyIDyp = Object.entries(
          data.data.the_graph_bsc_v2.token_data
        );
        setIDypTokenDatabnb(propertyIDyp[1][1].token_price_usd);
      });
  };

  const getTokenDataavax = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_avax_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_avax_v2.token_data
        );
        setDypTokenDataAvax(propertyDyp[0][1].token_price_usd);

        const propertyIDyp = Object.entries(
          data.data.the_graph_avax_v2.token_data
        );
        setIDypTokenDataAvax(propertyIDyp[1][1].token_price_usd);
      });
  };

  const getTwonfts = () => {
    const allnft = [...myCawsWodStakes, ...landStaked];
    setNftItems(allnft);
  };

  const handleSortCollection = (value1, value2) => {
    if (filter1 === "all" && filter2 === "all") {
      setcollectedItemsFiltered(collectedItems);
    } else if (filter1 === "land" && filter2 === "all") {
      let wodFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_land_address
      );
      setcollectedItemsFiltered(wodFilter);
    } else if (filter1 === "timepiece" && filter2 === "all") {
      let timepieceFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_timepiece_address
      );
      setcollectedItemsFiltered(timepieceFilter);
    } else if (filter1 === "caws" && filter2 === "all") {
      let cawsFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_caws_address
      );
      setcollectedItemsFiltered(cawsFilter);
    } else if (filter1 === "all" && filter2 === "to list") {
      let nftFilter = collectedItems.filter(
        (item) => item.isListed === false && item.isStaked === false
      );

      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "all" && filter2 === "listed") {
      let nftFilter = collectedItems.filter(
        (item) => item.isListed === true && item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "all" && filter2 === "in stake") {
      let nftFilter = collectedItems.filter((item) => item.isStaked === true);
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "land" && filter2 === "to list") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_land_address &&
          item.isListed === false &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "land" && filter2 === "listed") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_land_address &&
          item.isListed === true &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "land" && filter2 === "in stake") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_land_address &&
          item.isListed === false &&
          item.isStaked === true
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "caws" && filter2 === "to list") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_caws_address &&
          item.isListed === false &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "caws" && filter2 === "listed") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_caws_address &&
          item.isListed === true &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "caws" && filter2 === "in stake") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_caws_address &&
          item.isListed === false &&
          item.isStaked === true
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "timepiece" && filter2 === "to list") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_timepiece_address &&
          item.isListed === false &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "timepiece" && filter2 === "listed") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_timepiece_address &&
          item.isListed === true &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "timepiece" && filter2 === "in stake") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_timepiece_address &&
          item.isListed === false &&
          item.isStaked === true
      );
      setcollectedItemsFiltered(nftFilter);
    }
  };

  useEffect(() => {
    fetchMonthlyRecordsAroundPlayer();
    fetchGenesisAroundPlayer();
    getTokenData();
    getTokenDataavax();
    getTokenDatabnb();
    getListed();
  }, []);

  useEffect(() => {
    getCollected();
  }, [allListed]);

  useEffect(() => {
    handleSortCollection();
  }, [filter1, filter2]);

  useEffect(() => {
    getAllFavs();
  }, [favoritesArray, latestBoughtNFTS]);

  // useEffect(() => {
  //   if (myTimepieceCollected || myCawsCollected || myLandCollected) {
  //     getCollected();
  //   }
  // }, [myTimepieceCollected, myCawsCollected, myLandCollected, coinbase]);

  useEffect(() => {
    getAllnftsListed();
  }, [listedNFTS]);

  useEffect(() => {
    getTwonfts();
  }, [landStaked, myCawsWodStakes]);

  return (
    <div className="main-wrapper py-4 w-100 d-flex flex-column gap-4 mt-5 mt-xxl-0 mt-lg-0 justify-content-center align-items-center">
      <div className="row w-100 gap-5 gap-lg-0">
        <div className="col-12 rankings-outer-wrapper px-0 px-lg-3 col-lg-5">
          <div className="nft-outer-wrapper rankings-wrapper p-4  d-flex flex-column gap-2 position-relative custom-height-2">
            <h5 className="bal-txt px-4">My Rankings</h5>
            <div className={`d-flex gap-3 justify-content-evenly `}>
              <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
                <img src={globalRank} alt="" />
                <span className="globaltext" style={{ fontSize: 12 }}>
                  #
                  {isVerified &&
                  email &&
                  address &&
                  coinbase &&
                  address.toLowerCase() === coinbase.toLowerCase()
                    ? userRank + 1
                    : "N/A"}
                </span>
                <span className="globaltext">Global</span>
              </div>
              <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
                <img src={genesisImg} alt="" className="genesisimg" />
                <span className="genesistext" style={{ fontSize: 12 }}>
                  #
                  {isVerified &&
                  email &&
                  address &&
                  coinbase &&
                  address.toLowerCase() === coinbase.toLowerCase()
                    ? genesisRank + 1
                    : "N/A"}
                </span>
                <span className="genesistext">Genesis</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 px-0 px-lg-3 col-lg-7">
          <div className=" nft-outer-wrapper p-4  d-flex flex-column gap-2 position-relative custom-height-2">
            <div className="account-nft-sort-wrapper d-flex align-items-center gap-3 px-3 py-2">
              <h6
                className={`account-nft-sort ${
                  filterTitle === "Balance" && "nft-sort-selected"
                } `}
                onClick={() => {
                  sortNfts("balance");
                  setShowNfts(false);
                }}
              >
                Balance
              </h6>
              <h6
                className={`account-nft-sort ${
                  filterTitle === "Collected" && "nft-sort-selected"
                } `}
                onClick={() => {
                  sortNfts("collected");
                  setShowNfts(false);
                }}
              >
                Collected
              </h6>
              <h6
                className={`account-nft-sort ${
                  filterTitle === "Favorites" && "nft-sort-selected"
                } `}
                onClick={() => {
                  sortNfts("favorites");
                  setShowNfts(false);
                }}
              >
                Favorites
              </h6>
              <h6
                className={`account-nft-sort ${
                  filterTitle === "Listed" && "nft-sort-selected"
                } `}
                onClick={() => {
                  sortNfts("listed");
                  setShowNfts(false);
                }}
              >
                Listed
              </h6>
              <h6
                className={`account-nft-sort ${
                  filterTitle === "Staked" && "nft-sort-selected"
                } `}
                onClick={() => {
                  sortNfts("staked");
                  setShowNfts(false);
                }}
              >
                Staked
              </h6>
            </div>

            {filterTitle === "Favorites" && loading === false && (
              <div
                className="row px-3"
                style={{ margin: favoriteItems.length === 0 ? "auto" : 0 }}
              >
                {favoriteItems.length > 0 &&
                  favoriteItems.slice(0, 6).map((item, index) => (
                    <NavLink
                      key={index}
                      to={`/marketplace/nft/${index}`}
                      style={{ textDecoration: "none" }}
                      className="col-12 col-lg-6 col-xxl-4 mb-3"
                      state={{
                        nft: item,
                        type:
                          item.nftAddress === window.config.nft_caws_address
                            ? "caws"
                            : item.nftAddress === window.config.nft_land_address
                            ? "land"
                            : "timepiece",
                        isOwner:
                          isVerified && email
                            ? item.buyer
                              ? item.buyer?.toLowerCase() ===
                                address?.toLowerCase()
                                ? item.buyer?.toLowerCase() ===
                                  coinbase?.toLowerCase()
                                : item.seller?.toLowerCase() ===
                                  address?.toLowerCase()
                              : item.seller?.toLowerCase() ===
                                coinbase?.toLowerCase()
                            : false,
                        chain: 1,
                      }}
                      onClick={() => {
                        updateViewCount(item.tokenId, item.nftAddress);
                      }}
                    >
                      <div className="">
                        <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                          <img
                            src={
                              item.nftAddress ===
                                window.config.nft_cawsold_address ||
                              item.nftAddress === window.config.nft_caws_address
                                ? `https://mint.dyp.finance/thumbs/${item.tokenId}.png`
                                : item.nftAddress ===
                                  window.config.nft_land_address
                                ? `https://mint.worldofdypians.com/thumbs50/${item.tokenId}.png`
                                : `https://timepiece.worldofdypians.com/thumbs50/${item.tokenId}.png`
                            }
                            alt=""
                            className="account-card-img"
                          />
                          <div className="d-flex flex-column align-items-center justify-content-center">
                            <h6 className="account-nft-title">
                              {item.nftAddress ===
                                window.config.nft_cawsold_address ||
                              item.nftAddress === window.config.nft_caws_address
                                ? "CAWS"
                                : item.nftAddress ===
                                  window.config.nft_land_address
                                ? "Genesis Land"
                                : "CAWS Timepiece"}{" "}
                              #{item.tokenId}
                            </h6>
                            <span className="account-nft-type">
                              {item.nftAddress ===
                                window.config.nft_cawsold_address ||
                              item.nftAddress === window.config.nft_caws_address
                                ? "CAWS"
                                : item.nftAddress ===
                                  window.config.nft_land_address
                                ? "Genesis Land"
                                : "Timepiece"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  ))}
                {favoriteItems.length === 0 && (
                  <span className="seller-addr" style={{ textAlign: "center" }}>
                    You don't have any favorite NFTs
                  </span>
                )}

                {/* {favoriteItems.length < 6 &&
                  emptyArray
                    .slice(0, 6 - favoriteItems.length)
                    .map((item, index) => (
                      <NavLink
                        key={index}
                        to={`/marketplace`}
                        style={{ textDecoration: "none" }}
                        className="col-12 col-lg-6 col-xxl-4 mb-3"
                      >
                        <div className="">
                          <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                            <img
                              src={
                                index % 2 !== 0
                                  ? accountEmptyCaws
                                  : accountEmptyLand
                              }
                              alt=""
                              className="account-card-img"
                            />
                            <div className="d-flex flex-column align-items-start justify-content-center">
                              <span
                                className="account-nft-type"
                                style={{ width: "80%" }}
                              >
                                {index % 2 !== 0
                                  ? "Get your CAWS NFT from the WoD Game Shop"
                                  : "Get your World of Dypians Land NFT from the WoD Game Shop"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    ))} */}
              </div>
            )}

            {filterTitle === "Collected" && loading === false && (
              <div
                className="row px-3"
                style={{ margin: collectedItems.length === 0 ? "auto" : 0 }}
              >
                {collectedItems.length > 0 &&
                  collectedItems.slice(0, 6).map((item, index) => (
                    <NavLink
                      key={index}
                      to={
                        item.isStaked === true
                          ? `/marketplace/stake`
                          : `/marketplace/nft/${index}`
                      }
                      style={{ textDecoration: "none" }}
                      className="col-12 col-lg-6 col-xxl-4 mb-3"
                      state={{
                        nft: item,
                        type: item.type,
                        isOwner:
                          (item.buyer &&
                            item.buyer.toLowerCase() ===
                              coinbase?.toLowerCase()) ||
                          (item.seller &&
                            item.seller.toLowerCase() ===
                              coinbase?.toLowerCase()),
                        chain: item.chain,
                      }}
                      onClick={() => {
                        updateViewCount(item.tokenId, item.nftAddress);
                      }}
                    >
                      <div className="">
                        <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                          <img
                            src={
                              item.type === "caws"
                                ? `https://mint.dyp.finance/thumbs/${item.tokenId}.png`
                                : item.type === "land"
                                ? `https://mint.worldofdypians.com/thumbs50/${item.tokenId}.png`
                                : `https://timepiece.worldofdypians.com/thumbs50/${item.tokenId}.png`
                            }
                            alt=""
                            className="account-card-img"
                          />
                          <div className="d-flex flex-column align-items-center justify-content-center">
                            <h6 className="account-nft-title">
                              {item.type === "caws"
                                ? "CAWS"
                                : item.type === "land"
                                ? "Genesis"
                                : "Timepiece"}{" "}
                              #{item.tokenId}
                            </h6>
                            <span className="account-nft-type">
                              {item.type === "caws"
                                ? "CAWS"
                                : item.type === "land"
                                ? "Land"
                                : "CAWS Timepiece"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  ))}
                {collectedItems.length === 0 && (
                  <span className="seller-addr" style={{ textAlign: "center" }}>
                    You don't have any NFTs in your wallet
                  </span>
                )}
                {/* {collectedItems.length < 6 &&
                  emptyArray
                    .slice(0, 6 - collectedItems.length)
                    .map((item, index) => (
                      <NavLink
                        key={index}
                        to={`/marketplace`}
                        style={{ textDecoration: "none" }}
                        className="col-12 col-lg-6 col-xxl-4 mb-3"
                      >
                        <div className="">
                          <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                            <img
                              src={
                                index % 2 !== 0
                                  ? accountEmptyCaws
                                  : accountEmptyLand
                              }
                              alt=""
                              className="account-card-img"
                            />
                            <div className="d-flex flex-column align-items-start justify-content-center">
                              <span
                                className="account-nft-type"
                                style={{ width: "80%" }}
                              >
                                {index % 2 !== 0
                                  ? "Get your CAWS NFT from the WoD Game Shop"
                                  : "Get your World of Dypians Land NFT from the WoD Game Shop"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    ))} */}
              </div>
            )}

            {filterTitle === "Staked" && loading === false && (
              <div
                className="row px-3"
                style={{
                  margin:
                    myCawsWodStakes.length === 0 && landStaked.length === 0
                      ? "auto"
                      : 0,
                }}
              >
                {landStaked &&
                  landStaked.length > 0 &&
                  landStaked.slice(0, 4).map((item, index) => (
                    <NavLink
                      key={index}
                      to={`/marketplace/stake`}
                      style={{ textDecoration: "none" }}
                      className="col-12 col-lg-6 col-xxl-6 mb-3"
                    >
                      <div className="">
                        <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                          <img
                            src={`https://mint.worldofdypians.com/thumbs50/${item.name?.slice(
                              1,
                              landStaked[index].name?.length
                            )}.png`}
                            alt=""
                            className="account-card-img"
                          />
                          <div className="d-flex flex-column align-items-center justify-content-center">
                            <h6 className="account-nft-title">
                              {"Genesis"} {item.name}
                            </h6>
                            <span className="account-nft-type">{"Land"}</span>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  ))}
                {myCawsWodStakes &&
                  myCawsWodStakes.length > 0 &&
                  myCawsWodStakes.slice(0, 4).map((item, index) => (
                    <NavLink
                      key={index}
                      to={`/marketplace/stake`}
                      style={{ textDecoration: "none" }}
                      className="col-12 col-lg-6 col-xxl-6 mb-3"
                    >
                      <div className="">
                        <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                          <div className="d-flex">
                            <img
                              src={`https://mint.worldofdypians.com/thumbs50/${myWodWodStakes[
                                index
                              ].name?.slice(
                                1,
                                myWodWodStakes[index].name?.length
                              )}.png`}
                              alt=""
                              className="account-card-img"
                            />
                            <img
                              src={`https://mint.dyp.finance/thumbs/${item.name?.slice(
                                6,
                                item.name?.length
                              )}.png`}
                              alt=""
                              className="account-card-img"
                            />
                          </div>
                          <div className="d-flex flex-column align-items-center justify-content-center">
                            <h6 className="account-nft-title">
                              Land {myWodWodStakes[index].name} x {item.name}
                            </h6>
                            <span className="account-nft-type">
                              Land x Caws
                            </span>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  ))}
                {myCawsWodStakes.length === 0 && landStaked.length === 0 && (
                  <span className="seller-addr" style={{ textAlign: "center" }}>
                    You have no nfts staked
                  </span>
                )}

                {/* {myCawsWodStakes.length + landStaked.length < 6 &&
                  emptyArray
                    .slice(0, 4 - myCawsWodStakes.length + landStaked.length)
                    .map((item, index) => (
                      <NavLink
                        key={index}
                        to={`/marketplace`}
                        style={{ textDecoration: "none" }}
                        className="col-12 col-lg-6 col-xxl-6 mb-3"
                      >
                        <div className="">
                          <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                            <div className="d-flex align-items-center">
                              <img
                                src={accountEmptyLand}
                                alt=""
                                className="account-card-img"
                              />
                              <img
                                src={accountEmptyCaws}
                                alt=""
                                className="account-card-img"
                              />
                            </div>
                            <div className="d-flex flex-column align-items-start justify-content-center">
                              <span
                                className="account-nft-type"
                                style={{ width: "80%" }}
                              >
                                Get your CAWS NFT & Land NFT from the WoD Game
                                Shop
                              </span>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    ))} */}
              </div>
            )}

            {filterTitle === "Listed" && loading === false && (
              <div
                className="row px-3"
                style={{ margin: listedItems.length === 0 ? "auto" : 0 }}
              >
                {listedItems.length > 0 &&
                  listedItems.slice(0, 6).map((item, index) => (
                    <NavLink
                      key={index}
                      to={`/marketplace/nft/${item.blockTimestamp}`}
                      style={{ textDecoration: "none" }}
                      className="col-12 col-lg-6 col-xxl-4 mb-3"
                      state={{
                        nft: item,
                        type: item.type,
                        isOwner:
                          item.seller &&
                          item.seller.toLowerCase() === coinbase?.toLowerCase(),
                        chain: item.chain,
                      }}
                      onClick={() => {
                        updateViewCount(item.tokenId, item.nftAddress);
                      }}
                    >
                      <div className="">
                        <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                          <img
                            src={
                              item.type === "caws"
                                ? `https://mint.dyp.finance/thumbs/${item.tokenId}.png`
                                : item.type === "land"
                                ? `https://mint.worldofdypians.com/thumbs50/${item.tokenId}.png`
                                : `https://timepiece.worldofdypians.com/thumbs50/${item.tokenId}.png`
                            }
                            alt=""
                            className="account-card-img"
                          />
                          <div className="d-flex flex-column align-items-center justify-content-center">
                            <h6 className="account-nft-title">
                              {item.type === "caws"
                                ? "CAWS"
                                : item.type === "land"
                                ? "Genesis Land"
                                : "CAWS Timepiece"}{" "}
                              #{item.tokenId}
                            </h6>
                            <span className="account-nft-type">
                              {item.type === "caws"
                                ? "CAWS"
                                : item.type === "land"
                                ? "Genesis Land"
                                : "Timepiece"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  ))}
                {listedItems.length === 0 && (
                  <span className="seller-addr" style={{ textAlign: "center" }}>
                    You don't have any NFTs listed
                  </span>
                )}
                {/* {listedItems.length < 6 &&
                  emptyArray
                    .slice(0, 6 - listedItems.length)
                    .map((item, index) => (
                      <NavLink
                        key={index}
                        to={`/marketplace`}
                        style={{ textDecoration: "none" }}
                        className="col-12 col-lg-6 col-xxl-4 mb-3"
                      >
                        <div className="">
                          <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                            <img
                              src={
                                index % 2 !== 0
                                  ? accountEmptyCaws
                                  : accountEmptyLand
                              }
                              alt=""
                              className="account-card-img"
                            />
                            <div className="d-flex flex-column align-items-start justify-content-center">
                              <span
                                className="account-nft-type"
                                style={{ width: "80%" }}
                              >
                                {index % 2 !== 0
                                  ? "Get your CAWS NFT from the WoD Game Shop"
                                  : "Get your World of Dypians Land NFT from the WoD Game Shop"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    ))} */}
              </div>
            )}

            {filterTitle === "Balance" && loading === false && (
              <div className="d-flex flex-column align-items-center balancewrapper3">
                <div className="d-flex flex-column flex-lg-row w-100 gap-2 col-lg-12 justify-content-between">
                  <div className="d-flex py-2 align-items-center gap-2 position-relative  col-12 col-lg-3">
                    <img src={ethIcon} alt="" className="" />
                    <span className="eth-chain-text">Ethereum</span>
                  </div>
                  <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative col-12 col-lg-4">
                    <div className="d-flex align-items-center gap-2">
                      <img src={dypIcon} alt="dyp" className="dyp-icon" />
                      <h6 className="wallet-amount mb-0">
                        {getFormattedNumber(dypBalance, 2)}
                      </h6>
                    </div>
                    <span
                      className="nft-price-usd"
                      style={{ color: "#7DD9AF" }}
                    >
                      ${getFormattedNumber(dypBalance * dyptokenData, 2)}
                    </span>
                  </div>
                  <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative col-12 col-lg-4">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={idyp}
                        alt="dyp"
                        className="dyp-icon"
                        style={{ height: 16, width: 16 }}
                      />
                      <h6 className="wallet-amount mb-0">
                        {getFormattedNumber(idypBalance, 2)}
                      </h6>
                    </div>
                    <span
                      className="nft-price-usd"
                      style={{ color: "#7DD9AF" }}
                    >
                      ${getFormattedNumber(idypBalance * idyptokenData, 2)}
                    </span>
                  </div>
                </div>
                <div className="balanceseparator"></div>
                <div className="d-flex flex-column flex-lg-row w-100 gap-2 col-lg-12 justify-content-between">
                  <div className="d-flex py-2 align-items-center gap-2 position-relative col-12 col-lg-3">
                    <img src={bnbIcon} alt="" className="" />
                    <span className="bnb-chain-text">BNB Chain</span>
                  </div>
                  <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative col-12 col-lg-4">
                    <div className="d-flex align-items-center gap-2">
                      <img src={dypIcon} alt="dyp" className="dyp-icon" />
                      <h6 className="wallet-amount mb-0">
                        {getFormattedNumber(dypBalancebnb, 2)}
                      </h6>
                    </div>
                    <span
                      className="nft-price-usd"
                      style={{ color: "#7DD9AF" }}
                    >
                      ${getFormattedNumber(dypBalancebnb * dyptokenDatabnb, 2)}
                    </span>
                  </div>
                  <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative col-12 col-lg-4">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={idyp}
                        alt="dyp"
                        className="dyp-icon"
                        style={{ height: 16, width: 16 }}
                      />
                      <h6 className="wallet-amount mb-0">
                        {getFormattedNumber(idypBalancebnb, 2)}
                      </h6>
                    </div>
                    <span
                      className="nft-price-usd"
                      style={{ color: "#7DD9AF" }}
                    >
                      $
                      {getFormattedNumber(idypBalancebnb * idyptokenDatabnb, 2)}
                    </span>
                  </div>
                </div>
                <div className="balanceseparator"></div>
                <div className="d-flex flex-column flex-lg-row w-100 gap-2 col-lg-12 justify-content-between">
                  <div className="d-flex py-2 align-items-center gap-2 position-relative col-12 col-lg-3">
                    <img src={avaxIcon} alt="" className="" />
                    <span className="avax-chain-text">Avalanche</span>
                  </div>
                  <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative col-12 col-lg-4">
                    <div className="d-flex align-items-center gap-2">
                      <img src={dypIcon} alt="dyp" className="dyp-icon" />
                      <h6 className="wallet-amount mb-0">
                        {getFormattedNumber(dypBalanceavax, 2)}
                      </h6>
                    </div>
                    <span
                      className="nft-price-usd"
                      style={{ color: "#7DD9AF" }}
                    >
                      $
                      {getFormattedNumber(dypBalanceavax * dyptokenDataAvax, 2)}
                    </span>
                  </div>
                  <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative col-12 col-lg-4">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={idyp}
                        alt="dyp"
                        className="dyp-icon"
                        style={{ height: 16, width: 16 }}
                      />
                      <h6 className="wallet-amount mb-0">
                        {getFormattedNumber(idypBalanceavax, 2)}
                      </h6>
                    </div>
                    <span
                      className="nft-price-usd"
                      style={{ color: "#7DD9AF" }}
                    >
                      $
                      {getFormattedNumber(
                        idypBalanceavax * idyptokenDataAvax,
                        2
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {filterTitle !== "Balance" &&
              loading === false &&
              ((filterTitle === "Collected" && collectedItems.length > 6) ||
                (filterTitle === "Listed" && listedItems.length > 6) ||
                (filterTitle === "Staked" &&
                  myCawsWodStakes.length + landStaked.length > 0) ||
                (filterTitle === "Favorites" && favoriteItems.length > 6)) && (
                <div
                  className="row w-100 justify-content-center position-relative"
                  style={{ top: "-12px" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center gap-2"
                    onClick={() => {
                      setShowNfts(!showNfts);
                    }}
                    style={{ cursor: "pointer", width: "fit-content" }}
                  >
                    <span className="account-view-all">
                      {showNfts ? "View Less" : "View All"}
                    </span>
                    <img
                      src={viewAllArrow}
                      style={{ rotate: showNfts ? "0deg" : "180deg" }}
                      alt=""
                    />
                  </div>
                </div>
              )}

            {loading === true && (
              <div className="loader-wrapper">
                <HashLoader
                  color={"#554fd8"}
                  loading={loading}
                  cssOverride={override}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {showNfts && (
        <div className="d-flex row mx-1 flex-column align-items-start nft-outer-wrapper position-relative p-3 p-lg-5 gap-2 col-lg-11">
          <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-0 justify-content-end w-100 position-relative">
            {filterTitle !== "Staked" && filterTitle !== "Collected" ? (
              <div className="d-flex align-items-center gap-4">
                <h6
                  className={`filter-title ${
                    recentListingsFilter === "all" && "filter-selected"
                  }`}
                  onClick={() => filterRecentListings("all")}
                >
                  All
                </h6>
                <h6
                  className={`filter-title ${
                    recentListingsFilter === "caws" && "filter-selected"
                  }`}
                  onClick={() => filterRecentListings("caws")}
                >
                  CAWS
                </h6>
                <h6
                  className={`filter-title ${
                    recentListingsFilter === "land" && "filter-selected"
                  }`}
                  onClick={() => filterRecentListings("land")}
                >
                  Land
                </h6>
                <h6
                  className={`filter-title ${
                    recentListingsFilter === "timepiece" && "filter-selected"
                  }`}
                  onClick={() => filterRecentListings("timepiece")}
                >
                  Timepiece
                </h6>
              </div>
            ) : filterTitle === "Staked" ? (
              <div className="d-flex align-items-center gap-4">
                <h6
                  className={`filter-title ${
                    recentListingsFilter === "all" && "filter-selected"
                  }`}
                  onClick={() => filterRecentListings("all")}
                >
                  All
                </h6>
                <h6
                  className={`filter-title ${
                    recentListingsFilter === "cawswod" && "filter-selected"
                  }`}
                  onClick={() => filterRecentListings("cawswod")}
                >
                  Land+CAWS
                </h6>
                <h6
                  className={`filter-title ${
                    recentListingsFilter === "land" && "filter-selected"
                  }`}
                  onClick={() => {
                    filterRecentListings("land");
                  }}
                >
                  Land
                </h6>
              </div>
            ) : (
              <div className="d-flex flex-column mb-3 flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-0 justify-content-between w-100 position-relative">
                <span className="totalcollection">
                  Total NFTs: {collectedItems.length}
                </span>
                <div className="d-flex gap-3 align-items-center">
                  <div class="dropdown" style={{ width: "150px" }}>
                    <button
                      class="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <h6 className="filter-nav-title mb-0">
                          {filter1 === "" ? "Collections" : filter1}
                        </h6>
                      </div>
                      <img src={dropdownIcon} alt="" />
                    </button>
                    <ul class="dropdown-menu nft-dropdown-menu  p-2 w-100">
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilter1("all");
                          handleSortCollection();
                        }}
                      >
                        <span>All</span>
                      </li>
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilter1("land");
                          handleSortCollection();
                        }}
                      >
                        <span>Land</span>
                      </li>

                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilter1("caws");
                          handleSortCollection();
                        }}
                      >
                        <span>CAWS</span>
                      </li>

                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilter1("timepiece");
                          handleSortCollection();
                        }}
                      >
                        <span>Timepiece</span>
                      </li>
                    </ul>
                  </div>

                  <div class="dropdown" style={{ width: "150px" }}>
                    <button
                      class="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <h6 className="filter-nav-title mb-0">
                          {filter2 === "" ? "Status" : filter2}
                        </h6>
                      </div>
                      <img src={dropdownIcon} alt="" />
                    </button>
                    <ul class="dropdown-menu nft-dropdown-menu  p-2 w-100">
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilter2("all");
                          handleSortCollection();
                        }}
                      >
                        <span>All</span>
                      </li>
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilter2("to list");
                          handleSortCollection();
                        }}
                      >
                        <span>To List</span>
                      </li>

                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilter2("listed");
                          handleSortCollection();
                        }}
                      >
                        <span>Listed</span>
                      </li>

                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilter2("in stake");
                          handleSortCollection();
                        }}
                      >
                        <span>In Stake</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          {loadingRecentListings === false && filterTitle === "Collected" ? (
            <div className="row px-3">
              {collectedItemsFiltered &&
                collectedItemsFiltered.length > 0 &&
                collectedItemsFiltered.map((nft, index) => (
                  <NavLink
                    to={
                      nft.isStaked === true
                        ? `/marketplace/stake`
                        : `/marketplace/nft/${index}`
                    }
                    style={{ textDecoration: "none" }}
                    key={index}
                    className="col-12 col-lg-6 col-xxl-3 mb-3"
                    state={{
                      nft: nft,
                      type:
                        nft.type ??
                        nft.nftAddress === window.config.nft_caws_address
                          ? "caws"
                          : nft.nftAddress === window.config.nft_land_address
                          ? "land"
                          : "timepiece",
                      // isOwner:
                      //   isVerified && email
                      //     ? nft.buyer
                      //       ? nft.buyer?.toLowerCase() ===
                      //         address?.toLowerCase()
                      //         ? nft.buyer?.toLowerCase() ===
                      //           coinbase?.toLowerCase()
                      //         : nft.seller?.toLowerCase() ===
                      //           address?.toLowerCase()
                      //       : nft.seller?.toLowerCase() ===
                      //         coinbase?.toLowerCase()
                      //     : false,
                      isOwner:
                        (nft.buyer &&
                          nft.buyer.toLowerCase() ===
                            coinbase?.toLowerCase()) ||
                        (nft.seller &&
                          nft.seller.toLowerCase() === coinbase?.toLowerCase()),
                      chain: nft.chain,
                      chain: 1,
                    }}
                    onClick={() => {
                      updateViewCount(nft.tokenId, nft.nftAddress);
                    }}
                  >
                    <div className="">
                      <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                        <img
                          src={
                            nft.nftAddress ===
                              window.config.nft_cawsold_address ||
                            nft.nftAddress === window.config.nft_caws_address
                              ? `https://mint.dyp.finance/thumbs/${nft.tokenId}.png`
                              : nft.nftAddress ===
                                window.config.nft_land_address
                              ? `https://mint.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                              : `https://timepiece.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                          }
                          alt=""
                          className="account-card-img"
                        />
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <h6 className="account-nft-title">
                            {nft.nftAddress ===
                              window.config.nft_cawsold_address ||
                            nft.nftAddress === window.config.nft_caws_address
                              ? "CAWS"
                              : nft.nftAddress ===
                                window.config.nft_land_address
                              ? "Genesis Land"
                              : "CAWS Timepiece"}{" "}
                            #{nft.tokenId}
                          </h6>
                          <span className="account-nft-type">
                            {nft.nftAddress ===
                              window.config.nft_cawsold_address ||
                            nft.nftAddress === window.config.nft_caws_address
                              ? "CAWS"
                              : nft.nftAddress ===
                                window.config.nft_land_address
                              ? "Genesis Land"
                              : "Timepiece"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))}
            </div>
          ) : loadingRecentListings === false && filterTitle === "Favorites" ? (
            <div className="row px-3">
              {favItemsFiltered &&
                favItemsFiltered.length > 0 &&
                favItemsFiltered.map((nft, index) => (
                  <NavLink
                    to={`/marketplace/nft/${nft.blockTimestamp ?? index}`}
                    style={{ textDecoration: "none" }}
                    key={index}
                    className="col-12 col-lg-6 col-xxl-4 mb-3"
                    state={{
                      nft: nft,
                      type:
                        nft.type ??
                        nft.nftAddress === window.config.nft_caws_address
                          ? "caws"
                          : nft.nftAddress === window.config.nft_land_address
                          ? "land"
                          : "timepiece",
                      // isOwner:
                      //   isVerified && email
                      //     ? nft.buyer
                      //       ? nft.buyer?.toLowerCase() ===
                      //         address?.toLowerCase()
                      //         ? nft.buyer?.toLowerCase() ===
                      //           coinbase?.toLowerCase()
                      //         : nft.seller?.toLowerCase() ===
                      //           address?.toLowerCase()
                      //       : nft.seller?.toLowerCase() ===
                      //         coinbase?.toLowerCase()
                      //     : false,
                      isOwner:
                        (nft.buyer &&
                          nft.buyer.toLowerCase() ===
                            coinbase?.toLowerCase()) ||
                        (nft.seller &&
                          nft.seller.toLowerCase() === coinbase?.toLowerCase()),
                      chain: nft.chain,
                      chain: 1,
                    }}
                    onClick={() => {
                      updateViewCount(nft.tokenId, nft.nftAddress);
                    }}
                  >
                    <div className="">
                      <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                        <img
                          src={
                            nft.nftAddress ===
                              window.config.nft_cawsold_address ||
                            nft.nftAddress === window.config.nft_caws_address
                              ? `https://mint.dyp.finance/thumbs/${nft.tokenId}.png`
                              : nft.nftAddress ===
                                window.config.nft_land_address
                              ? `https://mint.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                              : `https://timepiece.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                          }
                          alt=""
                          className="account-card-img"
                        />
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <h6 className="account-nft-title">
                            {nft.nftAddress ===
                              window.config.nft_cawsold_address ||
                            nft.nftAddress === window.config.nft_caws_address
                              ? "CAWS"
                              : nft.nftAddress ===
                                window.config.nft_land_address
                              ? "Genesis Land"
                              : "CAWS Timepiece"}{" "}
                            #{nft.tokenId}
                          </h6>
                          <span className="account-nft-type">
                            {nft.nftAddress ===
                              window.config.nft_cawsold_address ||
                            nft.nftAddress === window.config.nft_caws_address
                              ? "CAWS"
                              : nft.nftAddress ===
                                window.config.nft_land_address
                              ? "Genesis Land"
                              : "Timepiece"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))}
            </div>
          ) : loadingRecentListings === false && filterTitle === "Listed" ? (
            <div className="row px-3">
              {listedItemsFiltered &&
                listedItemsFiltered.length > 0 &&
                listedItemsFiltered.map((nft, index) => (
                  <NavLink
                    to={`/marketplace/nft/${nft.blockTimestamp ?? index}`}
                    style={{ textDecoration: "none" }}
                    key={index}
                    className="col-12 col-lg-6 col-xxl-4 mb-3"
                    state={{
                      nft: nft,
                      type:
                        nft.type ??
                        nft.nftAddress === window.config.nft_caws_address
                          ? "caws"
                          : nft.nftAddress === window.config.nft_land_address
                          ? "land"
                          : "timepiece",
                      // isOwner:
                      //   isVerified && email
                      //     ? nft.buyer
                      //       ? nft.buyer?.toLowerCase() ===
                      //         address?.toLowerCase()
                      //         ? nft.buyer?.toLowerCase() ===
                      //           coinbase?.toLowerCase()
                      //         : nft.seller?.toLowerCase() ===
                      //           address?.toLowerCase()
                      //       : nft.seller?.toLowerCase() ===
                      //         coinbase?.toLowerCase()
                      //     : false,
                      isOwner:
                        (nft.buyer &&
                          nft.buyer.toLowerCase() ===
                            coinbase?.toLowerCase()) ||
                        (nft.seller &&
                          nft.seller.toLowerCase() === coinbase?.toLowerCase()),
                      chain: nft.chain,
                      chain: 1,
                    }}
                    onClick={() => {
                      updateViewCount(nft.tokenId, nft.nftAddress);
                    }}
                  >
                    <div className="">
                      <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                        <img
                          src={
                            nft.nftAddress ===
                              window.config.nft_cawsold_address ||
                            nft.nftAddress === window.config.nft_caws_address
                              ? `https://mint.dyp.finance/thumbs/${nft.tokenId}.png`
                              : nft.nftAddress ===
                                window.config.nft_land_address
                              ? `https://mint.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                              : `https://timepiece.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                          }
                          alt=""
                          className="account-card-img"
                        />
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <h6 className="account-nft-title">
                            {nft.nftAddress ===
                              window.config.nft_cawsold_address ||
                            nft.nftAddress === window.config.nft_caws_address
                              ? "CAWS"
                              : nft.nftAddress ===
                                window.config.nft_land_address
                              ? "Genesis Land"
                              : "CAWS Timepiece"}{" "}
                            #{nft.tokenId}
                          </h6>
                          <span className="account-nft-type">
                            {nft.nftAddress ===
                              window.config.nft_cawsold_address ||
                            nft.nftAddress === window.config.nft_caws_address
                              ? "CAWS"
                              : nft.nftAddress ===
                                window.config.nft_land_address
                              ? "Genesis Land"
                              : "Timepiece"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))}
            </div>
          ) : loadingRecentListings === false && filterTitle === "Staked" ? (
            <div className="row px-3">
              {recentListingsFilter === "cawswod"
                ? myCawsWodStakes &&
                  myCawsWodStakes.length > 0 &&
                  myCawsWodStakes.map((nft, index) => (
                    <NavLink
                      to={`/marketplace/stake`}
                      style={{ textDecoration: "none" }}
                      key={index}
                      className="col-12 col-lg-6 col-xxl-4 mb-3"
                    >
                      <div className="">
                        <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                          <div className="d-flex">
                            <img
                              src={nft.image}
                              alt=""
                              className="account-card-img"
                            />
                            <img
                              src={myWodWodStakes[index].image}
                              alt=""
                              className="account-card-img"
                            />
                          </div>
                          <div className="d-flex flex-column align-items-center justify-content-center">
                            <h6 className="account-nft-title">
                              Land {myWodWodStakes[index].name} x {nft.name}
                            </h6>
                            <span className="account-nft-type">
                              Land x Caws
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* <CawsWodItem
                        cawsImg={nft.image}
                        wodImg={myWodWodStakes[index].image}
                        cawsName={nft.name}
                        wodName={myWodWodStakes[index].name}
                      /> */}
                    </NavLink>
                  ))
                : recentListingsFilter === "land"
                ? landStaked &&
                  landStaked.length > 0 &&
                  landStaked.map((nft, index) => (
                    <NavLink
                      to={`/marketplace/stake`}
                      style={{ textDecoration: "none" }}
                      key={index}
                      className="col-12 col-lg-6 col-xxl-4 mb-3"
                    >
                      <div className="">
                        <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                          <div className="d-flex">
                            <img
                              src={nft.image}
                              alt=""
                              className="account-card-img"
                            />
                          </div>
                          <div className="d-flex flex-column align-items-center justify-content-center">
                            <h6 className="account-nft-title">
                              Land {nft.name}
                            </h6>
                            <span className="account-nft-type">
                              Genesis Land
                            </span>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  ))
                : nftItems &&
                  nftItems.length > 0 &&
                  nftItems.map((nft, index) => (
                    <NavLink
                      to={`/marketplace/stake`}
                      style={{ textDecoration: "none" }}
                      className="col-12 col-lg-6 col-xxl-4 mb-3"
                      key={index}
                    >
                      <CawsWodItem
                        cawsImg={nft?.name.includes("CAWS") && nft?.image}
                        wodImg={myWodWodStakes[index]?.image ?? nft?.image}
                        cawsName={nft?.name.includes("CAWS") && nft?.name}
                        wodName={myWodWodStakes[index]?.name ?? nft?.name}
                      />
                    </NavLink>
                  ))}
            </div>
          ) : (
            <div className="loader-wrapper">
              <HashLoader
                color={"#554fd8"}
                loading={loadingRecentListings}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletBalance;
