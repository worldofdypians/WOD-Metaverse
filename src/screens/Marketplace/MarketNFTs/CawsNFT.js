import React, { useState, useEffect, useRef } from "react";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import ItemCard from "../../../components/ItemCard/ItemCard";
import useWindowSize from "../../../hooks/useWindowSize";
import MobileNav from "../../../components/MobileNav/MobileNav";

import { NavLink } from "react-router-dom";
import "./_filters.scss";
import { Skeleton } from "@mui/material";
import OutsideClickHandler from "react-outside-click-handler";

import FilterCard from "./FilterCard";
import { searchNFTsByTraits } from "../../../actions/filterTraits";
import cawsmetadata from "../../../actions/cawsmetadatas2.json";
import cawstraits from "../../../actions/cawstraits.json";

const CawsNFT = ({
  isConnected,
  handleConnect,
  listedNFTS,
  coinbase,
  ethTokenData,
  dypTokenData,
  dypTokenData_old,
  cawsBought,
  handleRefreshListing,
  nftCount,
  binanceW3WProvider,
  chainId,
  caws,
}) => {
  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };

  const dummyData = [
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "0",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x38735bE0B0E44BF0B8Da1dD5aA96B787879F1c72",
      tokenId: "1",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x9058FF24462B6fe98a73781c6EEdad9D4e550c7a",
      tokenId: "2",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x76E60102AE09386eE0c848F2Ee36ede6d03ad4B3",
      tokenId: "3",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0xf6180221a94aCA479f71e2A3a48e9A65E0dF179c",
      tokenId: "4",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0xd577E2b4C4B85Cc28B35DA6bC8475729b7197a50",
      tokenId: "5",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x65C3d0F9438644945dF5BF321c9F0fCf333302b8",
      tokenId: "6",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "7",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "8",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0xb8CAC1C259bA3a73e26744fB8D09B5Bd77c2207B",
      tokenId: "9",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0xEe425BbbEC5e9Bf4a59a1c19eFff522AD8b7A47A",
      tokenId: "10",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0xcE8Bb137Ed6204a8259e9bD44197D4BD1184344B",
      tokenId: "11",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "12",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x86aBfF52425D7159C1220BA7532eD69674DCef45",
      tokenId: "13",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x65C3d0F9438644945dF5BF321c9F0fCf333302b8",
      tokenId: "14",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x105704a52DEB48895226f2C6C47Fb4cc353A4560",
      tokenId: "15",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "16",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "17",
      type: "caws",
      chain: 1,
    },
  ];

  const windowSize = useWindowSize();
  const nftsPerRow = 18;
  const nftsPerRow2 = 18;

  const allCaws = 10000;

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterTitle, setFilterTitle] = useState("Filter");
  const [initialNfts, setInitialNfts] = useState([]);
  const [cawsNFTS, setCawsNFTS] = useState([]);
  const [cawsNFTS2, setCawsNFTS2] = useState([]);

  const [next, setNext] = useState(0);
  const [next2, setNext2] = useState(0);

  const [filters, setFilters] = useState([]);
  const [paginatedData, setpaginatedData] = useState([]);

  const [finalData, setfinalData] = useState([]);

  const [allCawsNfts, setAllcaws] = useState([]);
  const listInnerRef = useRef();
  const [openTraits, setOpenTraits] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [background, setBackground] = useState({
    trait_type: "Background",
    value: [],
  });
  const [tail, setTail] = useState({ trait_type: "Tail", value: [] });
  const [ears, setEars] = useState({ trait_type: "Ears", value: [] });
  const [body, setBody] = useState({ trait_type: "Body", value: [] });
  const [clothes, setClothes] = useState({ trait_type: "Clothes", value: [] });
  const [watch, setWatch] = useState({ trait_type: "Watch", value: [] });
  const [eyes, setEyes] = useState({ trait_type: "Eyes", value: [] });
  const [mouth, setMouth] = useState({ trait_type: "Mouth", value: [] });
  const [hat, setHat] = useState({ trait_type: "Hat", value: [] });
  const [eyewear, setEyewear] = useState({ trait_type: "Eyewear", value: [] });
  const [count, setCount] = useState(0);
  const [priceCount, setPriceCount] = useState(0);
  const [displayFilters, setDisplayFilters] = useState([]);
  const [pricePoint, setPricePoint] = useState("lth");
  const [selectedFilters, setSelectedFilters] = useState([
    background,
    tail,
    ears,
    body,
    clothes,
    watch,
    eyes,
    mouth,
    hat,
    eyewear,
  ]);
  const [filterIds, setFilterIds] = useState(
    searchNFTsByTraits(selectedFilters, cawsmetadata)
  );
  let emptyFilters = [
    { trait_type: "Tail", value: [] },
    { trait_type: "Ears", value: [] },
    { trait_type: "Body", value: [] },
    { trait_type: "Clothes", value: [] },
    { trait_type: "Watch", value: [] },
    { trait_type: "Eyes", value: [] },
    { trait_type: "Mouth", value: [] },
    { trait_type: "Hat", value: [] },
    { trait_type: "Eyewear", value: [] },
  ];

  const clearAll = () => {
    setBackground({ trait_type: "Background", value: [] });
    setTail({ trait_type: "Tail", value: [] });
    setEars({ trait_type: "Ears", value: [] });
    setBody({ trait_type: "Body", value: [] });
    setClothes({ trait_type: "Clothes", value: [] });
    setWatch({ trait_type: "Watch", value: [] });
    setEyes({ trait_type: "Eyes", value: [] });
    setMouth({ trait_type: "Mouth", value: [] });
    setHat({ trait_type: "Hat", value: [] });
    setEyewear({ trait_type: "Eyewear", value: [] });
    setSelectedFilters(emptyFilters);
    setDisplayFilters([]);
    setCount(0);
    setFilterIds(searchNFTsByTraits(emptyFilters, cawsmetadata));
  };
  const addProducts = (product, category) => {
    if (category === 0) {
      let testarr = background;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setBackground(testarr);
      } else {
        testarr.value.push(product);
        setBackground(testarr);
      }

      setCount(count + 1);
    } else if (category === 1) {
      let testarr = tail;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setTail(testarr);
      } else {
        testarr.value.push(product);
        setTail(testarr);
      }

      setCount(count + 1);
    } else if (category === 2) {
      let testarr = ears;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setEars(testarr);
      } else {
        testarr.value.push(product);
        setEars(testarr);
      }

      setCount(count + 1);
    } else if (category === 3) {
      let testarr = body;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setBody(testarr);
      } else {
        testarr.value.push(product);
        setBody(testarr);
      }

      setCount(count + 1);
    } else if (category === 4) {
      let testarr = clothes;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setClothes(testarr);
      } else {
        testarr.value.push(product);
        setClothes(testarr);
      }

      setCount(count + 1);
    } else if (category === 5) {
      let testarr = watch;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setWatch(testarr);
      } else {
        testarr.value.push(product);
        setWatch(testarr);
      }

      setCount(count + 1);
    } else if (category === 6) {
      let testarr = eyes;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setEyes(testarr);
      } else {
        testarr.value.push(product);
        setEyes(testarr);
      }

      setCount(count + 1);
    } else if (category === 7) {
      let testarr = mouth;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setMouth(testarr);
      } else {
        testarr.value.push(product);
        setMouth(testarr);
      }

      setCount(count + 1);
    } else if (category === 8) {
      let testarr = hat;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setHat(testarr);
      } else {
        testarr.value.push(product);
        setHat(testarr);
      }

      setCount(count + 1);
    } else if (category === 9) {
      let testarr = eyewear;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setEyewear(testarr);
      } else {
        testarr.value.push(product);
        setEyewear(testarr);
      }

      setCount(count + 1);
    }

    let primarySelected = [
      background,
      tail,
      ears,
      body,
      clothes,
      watch,
      eyes,
      mouth,
      hat,
      eyewear,
    ];

    primarySelected = primarySelected.filter((item) => item.value.length !== 0);

    setSelectedFilters([
      background,
      tail,
      ears,
      body,
      clothes,
      watch,
      eyes,
      mouth,
      hat,
      eyewear,
    ]);

    let testDisplay = [];
    selectedFilters.map((item, index) => {
      item.value.map((item2) => {
        testDisplay.push({
          trait_type: item.trait_type,
          value: item2,
          id: index,
        });
      });
    });
    setDisplayFilters(testDisplay);

    // console.log(searchNFTsByTraits(primarySelected, cawsmetadata), "PLEASE WORK OMFG");
    setFilterIds(searchNFTsByTraits(primarySelected, cawsmetadata));
  };

  // const fetchFilters = async () => {
  //   await axios
  //     .get(
  //       "https://api.opensea.io/api/v1/collection/catsandwatchessocietycaws",
  //       {
  //         headers: {
  //           "X-API-KEY": "b132fcc52ab540f0b13a319bf57b34f0",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       setFilters(res.data.collection.traits);
  //     });
  // };

  const sortNfts = (sortValue) => {
    if (sortValue === "all") {
      setCawsNFTS(initialNfts);
    } else if (sortValue === "price") {
      if (priceCount % 2 == 0) {
        let lth = initialNfts.sort((a, b) => {
          return a.priceUSD - b.priceUSD;
        });
        setCawsNFTS(lth);
      } else {
        let htl = initialNfts.sort((a, b) => {
          return b.priceUSD - a.priceUSD;
        });
        setCawsNFTS(htl);
      }
      setPriceCount(priceCount + 1);
    } else if (sortValue === "lso") {
      let lsoDate = initialNfts.sort((a, b) => {
        return b.isLatestSale - a.isLatestSale;
      });
      let lso = lsoDate.sort((a, b) => {
        return new Date(b.lastSoldTimeStamp) - new Date(a.lastSoldTimeStamp);
      });
      setCawsNFTS(lso);
    } else if (sortValue === "lto") {
      let otl = allCawsNfts.sort((a, b) => {
        return b.date - a.date;
      });
      setCawsNFTS(otl);
    }
  };

  const getListedCaws = async () => {
    const cawsArray = [...caws, ...cawsBought];
    const cawsArray2 = [...caws];

    let uniquecaws = cawsArray.filter(
      (v, i, a) => a.findIndex((v2) => v2.tokenId === v.tokenId) === i
    );

    if (uniquecaws && uniquecaws.length > 0) {
      let datedNfts = uniquecaws.map((nft, index) => {
        if (
          nft.tokenId == cawsArray2[index]?.tokenId &&
          !cawsBought.find((obj) => obj.tokenId === nft.tokenId)
        ) {
          let date = new Date(nft?.blockTimestamp * 1000);

          return {
            ...nft,
            date: date,
            isListed: true,
            isLatestSale: false,
            type: "caws",

            LastSold: cawsArray2[index]?.price,
            soldPriceType: cawsArray2[index]?.payment_priceType,
          };
        } else if (
          nft.tokenId == cawsArray2[index]?.tokenId &&
          cawsBought.find((obj) => obj.tokenId === nft.tokenId) !== undefined
        ) {
          const result = cawsBought.find((obj) => obj.tokenId === nft.tokenId);

          let date = new Date(nft?.blockTimestamp * 1000);

          return {
            ...nft,
            date: date,
            isListed: true,
            isLatestSale: true,
            type: "caws",

            LastSold: result?.price,
            lastSoldTimeStamp: result?.blockTimestamp,
            soldPriceType: result?.payment_priceType,
          };
        } else if (nft.tokenId != cawsArray2[index]?.tokenId && nft?.buyer) {
          let date = new Date(nft?.blockTimestamp * 1000);

          return {
            ...nft,
            date: date,
            isListed: false,
            type: "caws",

            isLatestSale: true,
            lastSoldTimeStamp: nft?.blockTimestamp,
            LastSold: nft?.price,
            soldPriceType: nft.payment_priceType,
          };
        }
      });

      setAllcaws(datedNfts);
    }
  };

  const getCawsCollection = async () => {
    let finalArray = [];
    let paginatedArray = paginatedData;

    for (
      let i = next;
      i < nftsPerRow + next && next + nftsPerRow < allCaws;
      i++
    ) {
      const owner = await window.nft.ownerOf(i).catch((e) => {
        console.log(e);
      });
      // const attributes = await window.getNft(i);

      finalArray.push({
        nftAddress: window.config.nft_address,
        buyer: owner,
        tokenId: i.toString(),
        type: "caws",
        chain: 1,
        // attributes: attributes.attributes,
      });
    }

    const finaldata = [...paginatedArray, ...finalArray];

    setpaginatedData(finaldata);

    setfinalData(finaldata);
    return finaldata;
  };

  const testFunc = async () => {
    if (count > 0) {
      setLoading(true);
      const objArr = await Promise.all(
        filterIds.map(async (i) => {
          const owner = await window.nft.ownerOf(i).catch((e) => {
            console.log(e);
          });
          // const attributes = await window.getNft(i);

          return {
            nftAddress: window.config.nft_address,
            buyer: owner,
            tokenId: i.toString(),
            type: "caws",
            chain: 1,
            // attributes: attributes.attributes,
          };
        })
      );

      const objArrFiltered = objArr.filter(
        ({ tokenId: id1 }) =>
          !allCawsNfts.some(({ tokenId: id2 }) => id2 == id1)
      );

      const finalUnique = [...objArrFiltered];

      setLoading(false);

      setCawsNFTS2(finalUnique);
    }
  };

  const fetchInitialCaws = async () => {
    const collectionItems = finalData;
    const uniqueArray = collectionItems.filter(
      ({ tokenId: id1 }) => !allCawsNfts.some(({ tokenId: id2 }) => id2 === id1)
    );
    const finalUnique = [...allCawsNfts, ...uniqueArray];
    setCawsNFTS(finalUnique);
    setInitialNfts(finalUnique);
    setLoading(false);
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

  const loadMore = () => {
    setNext(next + nftsPerRow);
    setLoading(true);
  };

  const loadMore2 = () => {
    setNext2(next2 + nftsPerRow2);
    setLoading(true);
  };

  const onScroll = () => {
    const wrappedElement = document.getElementById("header");

    if (wrappedElement) {
      const isBottom =
        parseInt(wrappedElement.getBoundingClientRect()?.bottom) <=
        window.innerHeight;
      if (isBottom) {
        if (count === 0) {
          if (next < allCaws) {
            loadMore();
          }
        } else {
          if (next2 < filterIds.length) {
            loadMore2();
          }
        }
        document.removeEventListener("scroll", onScroll);
      }
    }
  };

  useEffect(() => {
    loadMore2();
  }, [count]);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getCawsCollection();
    // getAllCawsCollection();
    // fetchFilters();
    setFilters(cawstraits.collection.traits);
    document.title = "CAWS NFT";
  }, []);

  useEffect(() => {
    if (count > 0) {
      testFunc();
    } else if (count === 0) {
      fetchInitialCaws();
    }
  }, [count]);

  useEffect(() => {
    if (cawsBought && caws && caws.length > 0) {
      getListedCaws();
    }
  }, [cawsBought, nftCount, allCawsNfts.length, caws]);

  useEffect(() => {
    getCawsCollection();
  }, [next]);

  useEffect(() => {
    if (cawsBought && allCawsNfts.length > 0 && finalData.length > 0) {
      fetchInitialCaws();
    }
  }, [allCawsNfts.length, finalData.length, cawsBought]);

  useEffect(() => {
    if (cawsNFTS && cawsNFTS.length === 0) {
      setLoading(true);
    }
    if (cawsNFTS && cawsNFTS.length > 0) {
      setLoading(false);
    }
    sortNfts("lth");
  }, [cawsNFTS]);

  return (
    <div
      id="header"
      onScroll={onScroll}
      ref={listInnerRef}
      style={{ overflow: "auto" }}
    >
      <div
        className="container-fluid d-flex justify-content-end p-0 mt-lg-5 pt-lg-5 "
        style={{ minHeight: "72vh", maxWidth: "2400px" }}
      >
        {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

        <div
          className="container-nft2 d-flex align-items-start px-3 px-lg-5 position-relative"
          style={{ backgroundSize: "cover" }}
        >
          <div className="custom-container mx-0 position-relative">
            <div className="row align-items-center justify-content-between mt-4 gap-4 gap-lg-0">
              <div className="col-12 col-lg-6">
                <div className="d-flex flex-column gap-3">
                  <h6 className="nft-page-title pt-4 pt-lg-0 mt-5 mt-lg-4">
                    Cats And Watches Society
                  </h6>
                  <p className="collection-desc">
                    The CAWS NFTs offer different benefits in Metaverse like:{" "}
                    <b>Exclusive Access</b> to new and exciting events,{" "}
                    <b>Enhanced Interactions</b> with available activities,{" "}
                    <b>Expanded Functionality</b> on performing new actions, and
                    earn multiple <b>Rewards</b>.
                  </p>
                  <NavLink to="/caws" style={{ width: "fit-content" }}>
                    <button className="pill-btn2 px-3 py-2">Explore</button>
                  </NavLink>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <img
                  src={`https://cdn.worldofdypians.com/wod/cawsCollectionBanner.webp`}
                  className="w-100"
                  alt=""
                />
              </div>
            </div>
            <div
              className="filters-container d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between my-4 p-3 position-relative gap-3"
              style={{ zIndex: 2 }}
            >
              <div className="dropdown filters-dropdown">
                <button
                  className="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={"https://cdn.worldofdypians.com/wod/filterIcon.svg"}
                      alt=""
                    />
                    <h6 className="filter-nav-title mb-0">{filterTitle}</h6>
                  </div>
                  <img
                    src={"https://cdn.worldofdypians.com/wod/dropdownIcon.svg"}
                    alt=""
                  />
                </button>
                <ul className="dropdown-menu nft-dropdown-menu  p-2 w-100">
                  <li
                    className="nft-dropdown-item"
                    onClick={() => {
                      setFilterTitle("Filter");
                      sortNfts("all");
                    }}
                  >
                    <span>All</span>
                  </li>
                  <li
                    className="nft-dropdown-item"
                    onClick={() => {
                      setFilterTitle("Recently listed");
                      sortNfts("lto");
                    }}
                  >
                    <span>Recently listed</span>
                  </li>
                  <li
                    className="nft-dropdown-item"
                    onClick={() => {
                      setFilterTitle("Recently sold");
                      sortNfts("lso");
                    }}
                  >
                    <span>Recently sold</span>
                  </li>
                </ul>
              </div>
              <div className="d-flex align-items-center justify-content-between justify-cotent-lg-center gap-3 gap-lg-5 price-traits-wrapper">
                <div
                  className="filter-nav d-flex align-items-center gap-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    sortNfts("price");
                  }}
                >
                  <img
                    src={
                      priceCount === 0
                        ? "https://cdn.worldofdypians.com/wod/priceIconNeutral.svg"
                        : priceCount % 2 == 0
                        ? "https://cdn.worldofdypians.com/wod/priceIconDown.svg"
                        : "https://cdn.worldofdypians.com/wod/priceIconUp.svg"
                    }
                    alt=""
                  />
                  <h6
                    className="filter-nav-title mb-0"
                    style={{
                      color:
                        priceCount === 0
                          ? "#EEEDFF"
                          : priceCount % 2 == 0
                          ? "#FF6232"
                          : "#09F3D2",
                    }}
                  >
                    Price
                  </h6>
                </div>
                <div
                  className="filter-nav d-flex align-items-center gap-2"
                  onClick={() => setOpenTraits(true)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={"https://cdn.worldofdypians.com/wod/traitIcon.svg"}
                    alt=""
                  />
                  <h6 className="filter-nav-title mb-0">Traits</h6>
                </div>
              </div>
            </div>
            <div className="selected-traits-wrapper d-flex align-items-center my-4 gap-2">
              {displayFilters.map((item, index) => (
                <div
                  className="selected-trait-item d-flex align-items-center p-2 gap-4"
                  key={index}
                >
                  <div className="d-flex align-items-center gap-1">
                    <span className="selected-trait-key">
                      {item.trait_type} :
                    </span>
                    <span className="selected-trait-value">{item.value}</span>
                  </div>
                  <img
                    src={"https://cdn.worldofdypians.com/wod/traitXmark.svg"}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      displayFilters.length === 1
                        ? clearAll()
                        : addProducts(item.value, item.id)
                    }
                    alt=""
                  />
                </div>
              ))}
              {displayFilters.length > 0 && (
                <button
                  className="btn clear-all-btn p-2"
                  onClick={() => {
                    clearAll();
                    setCawsNFTS2([]);
                  }}
                >
                  Clear all
                </button>
              )}
            </div>
            <div className=" nft-page-wrapper d-flex flex-column gap-3 pb-3">
              <div className="d-flex align-items-center p-4 gap-4 justify-content-center">
                <div className={"item-cards-wrapper w-100"}>
                  {cawsNFTS && cawsNFTS.length > 0 && count === 0 ? (
                    <>
                      {cawsNFTS.map((nft, index) => (
                        <NavLink
                          to={`/shop/nft/${nft.tokenId}/${nft.nftAddress}`}
                          style={{ textDecoration: "none" }}
                          key={index}
                          state={{
                            nft: nft,
                            type: nft.type,
                            isOwner:
                              nft.seller?.toLowerCase() ===
                                coinbase?.toLowerCase() ||
                              nft.buyer?.toLowerCase() ===
                                coinbase?.toLowerCase(),
                            chain: nft.chain,
                          }}
                          onClick={() => {
                            updateViewCount(nft.tokenId, nft.nftAddress);
                          }}
                        >
                          <ItemCard
                            ethTokenData={ethTokenData}
                            dypTokenData={dypTokenData}
                            dypTokenData_old={dypTokenData_old}
                            key={nft.id}
                            nft={nft}
                            isConnected={isConnected}
                            showConnectWallet={handleConnect}
                            isCaws={true}
                            isTimepiece={false}
                            isWod={false}
                            coinbase={coinbase}
                            lastSale={nft.buyer ? true : false}
                            lastSold={nft.LastSold}
                            isLatestSale={nft.isLatestSale}
                            isListed={nft.isListed}
                            soldPriceType={nft.soldPriceType}
                            handleRefreshListing={handleRefreshListing}
                            binanceW3WProvider={binanceW3WProvider}
                            chainId={chainId}
                          />
                        </NavLink>
                      ))}
                      {count === 0 && !loading && next < allCaws ? (
                        <button
                          className="btn py-2 px-3 nft-load-more-btn"
                          onClick={() => {
                            loadMore();
                          }}
                        >
                          Load more
                        </button>
                      ) : count === 0 && loading && next < allCaws ? (
                        <>
                          {[...Array(20)].map((obj, indx) => {
                            return (
                              <Skeleton
                                animation="wave"
                                height={230}
                                variant="rounded"
                                sx={{ bgcolor: "black.700" }}
                                key={indx}
                              />
                            );
                          })}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : cawsNFTS && cawsNFTS.length === 0 && count === 0 ? (
                    dummyData.map((nft, index) => {
                      return (
                        <NavLink
                          to={`/shop/nft/${nft.tokenId}/${nft.nftAddress}`}
                          style={{ textDecoration: "none" }}
                          key={index}
                          state={{
                            nft: nft,
                            type: "caws",
                            isOwner:
                              nft.seller?.toLowerCase() ===
                                coinbase?.toLowerCase() ||
                              nft.buyer?.toLowerCase() ===
                                coinbase?.toLowerCase(),
                            chain: nft.chain,
                          }}
                          onClick={() => {
                            updateViewCount(
                              nft.tokenId,
                              window.config.nft_address
                            );
                          }}
                        >
                          <ItemCard
                            ethTokenData={ethTokenData}
                            dypTokenData={dypTokenData}
                            dypTokenData_old={dypTokenData_old}
                            key={nft.id}
                            nft={nft}
                            isConnected={isConnected}
                            showConnectWallet={handleConnect}
                            isCaws={true}
                            isTimepiece={false}
                            isWod={false}
                            coinbase={coinbase}
                            lastSold={nft.LastSold}
                            isLatestSale={nft.isLatestSale}
                            isListed={nft.isListed}
                            soldPriceType={nft.soldPriceType}
                            binanceW3WProvider={binanceW3WProvider}
                            chainId={chainId}
                          />
                        </NavLink>
                      );
                    })
                  ) : (
                    <></>
                  )}

                  {count > 0 && cawsNFTS2 && cawsNFTS2.length > 0 ? (
                    <>
                      {cawsNFTS2.slice(0, next2).map((nft, index) => (
                        <NavLink
                          to={`/shop/nft/${nft.tokenId}/${nft.nftAddress}`}
                          style={{ textDecoration: "none" }}
                          key={index}
                          state={{
                            nft: nft,
                            type: "caws",
                            isOwner:
                              nft.seller?.toLowerCase() ===
                                coinbase?.toLowerCase() ||
                              nft.buyer?.toLowerCase() ===
                                coinbase?.toLowerCase(),
                            chain: nft.chain,
                          }}
                          onClick={() => {
                            updateViewCount(
                              nft.tokenId,
                              window.config.nft_address
                            );
                          }}
                        >
                          <ItemCard
                            ethTokenData={ethTokenData}
                            dypTokenData={dypTokenData}
                            dypTokenData_old={dypTokenData_old}
                            key={nft.id}
                            nft={nft}
                            isConnected={isConnected}
                            showConnectWallet={handleConnect}
                            isCaws={true}
                            isTimepiece={false}
                            isWod={false}
                            coinbase={coinbase}
                            lastSold={nft.LastSold}
                            isLatestSale={nft.isLatestSale}
                            isListed={nft.isListed}
                            soldPriceType={nft.soldPriceType}
                            binanceW3WProvider={binanceW3WProvider}
                            chainId={chainId}
                          />
                        </NavLink>
                      ))}
                      {count > 0 && !loading && next2 < filterIds.length ? (
                        <button
                          className="btn py-2 px-3 nft-load-more-btn"
                          onClick={() => {
                            loadMore2();
                          }}
                        >
                          Load more
                        </button>
                      ) : count > 0 &&
                        loading &&
                        next2 < filterIds.length &&
                        filterIds.length > 0 ? (
                        <>
                          {[...Array(20)].map((obj, indx) => {
                            return (
                              <Skeleton
                                animation="wave"
                                height={230}
                                variant="rounded"
                                sx={{ bgcolor: "black.700" }}
                                key={indx}
                              />
                            );
                          })}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : count > 0 && cawsNFTS2 && cawsNFTS2.length === 0 ? (
                    <>
                      {[...Array(20)].map((obj, indx) => {
                        return (
                          <Skeleton
                            animation="wave"
                            height={230}
                            variant="rounded"
                            sx={{ bgcolor: "black.700" }}
                            key={indx}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-center w-100"></div>
            </div>{" "}
          </div>
        </div>
      </div>

      <OutsideClickHandler onOutsideClick={() => setOpenTraits(false)}>
        <div
          className={`filters-wrapper col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6 ${
            openTraits && "filters-active"
          } p-4`}
        >
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="filters-title mb-0">Filters</h6>
            <img
              src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
              style={{ cursor: "pointer" }}
              onClick={() => setOpenTraits(false)}
              alt=""
            />
          </div>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <span className="select-category mb-0">Select Category</span>
            <span
              className="clear-all mb-0"
              style={{ cursor: "pointer" }}
              onClick={() => {
                clearAll();
              }}
            >
              Clear all
            </span>
          </div>
          <div className="filter-tabs d-flex align-items-center justify-content-start gap-4">
            {filters &&
              Object.entries(filters).map(([key, value], i) => (
                <div
                  className={`filter-tab px-2 py-1 d-flex align-items-center ${
                    categoryIndex === i && "filter-tab-active"
                  }`}
                  onClick={() => setCategoryIndex(i)}
                  key={i}
                >
                  <h6 className="filter-tab-title mb-0">
                    {key} ({Object.keys(value)?.length})
                  </h6>
                </div>
              ))}
          </div>
          <span className="filters-divider my-4"></span>
          {categoryIndex === 0 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[0] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[0]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      filtersLength={displayFilters.length}
                      clearAll={clearAll}
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 1 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[1] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[1]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      filtersLength={displayFilters.length}
                      clearAll={clearAll}
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 2 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[2] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[2]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      filtersLength={displayFilters.length}
                      clearAll={clearAll}
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 3 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[3] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[3]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      filtersLength={displayFilters.length}
                      clearAll={clearAll}
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 4 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[4] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[4]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      filtersLength={displayFilters.length}
                      clearAll={clearAll}
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 5 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[5] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[5]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      filtersLength={displayFilters.length}
                      clearAll={clearAll}
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 6 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[6] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[6]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      filtersLength={displayFilters.length}
                      clearAll={clearAll}
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 7 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[7] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[7]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      filtersLength={displayFilters.length}
                      clearAll={clearAll}
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 8 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[8] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[8]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      filtersLength={displayFilters.length}
                      clearAll={clearAll}
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 9 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[9] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[9]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      filtersLength={displayFilters.length}
                      clearAll={clearAll}
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default CawsNFT;
