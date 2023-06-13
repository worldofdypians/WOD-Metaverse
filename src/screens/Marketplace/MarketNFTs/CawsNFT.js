import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import ItemCard from "../../../components/ItemCard/ItemCard";
import useWindowSize from "../../../hooks/useWindowSize";
import MobileNav from "../../../components/MobileNav/MobileNav";
import searchIcon from "../assets/search.svg";
import dropdownIcon from "../assets/dropdownIcon.svg";
import { NavLink } from "react-router-dom";
import convertListedNFTsToUSD from "../../../actions/convertUsd";
import { getCawsNfts } from "../../../actions/convertUsd";

const CawsNFT = ({ isConnected, handleConnect, listedNFTS, coinbase }) => {
  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };
  const windowSize = useWindowSize();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterTitle, setFilterTitle] = useState("Sort");

  const [cawsNFTS, setCawsNFTS] = useState([]);

  const sortNfts = (sortValue) => {
 
    if (sortValue === "htl") {
      let htl = cawsNFTS.sort((a, b) => {
        return b.priceUSD - a.priceUSD;
      });
      setCawsNFTS(htl);
    } else if (sortValue === "lth") {
      let lth = cawsNFTS.sort((a, b) => {
        return a.priceUSD - b.priceUSD;
      });
      setCawsNFTS(lth);
    } else if (sortValue === "lto") {
      let lto = cawsNFTS.sort((a, b) => {
        return b.date - a.date;
      });
      setCawsNFTS(lto);
    } else if (sortValue === "otl") {
      let otl = cawsNFTS.sort((a, b) => {
        return a.date - b.date;
      });
      setCawsNFTS(otl);
    } else if (sortValue === "dyp") {
      let dyp = cawsNFTS.filter((nft) => {
        return nft.payment_priceType !== 0;
      });
      setCawsNFTS(dyp);
    } else if (sortValue === "eth") {
      let eth = cawsNFTS.filter((nft) => {
        return nft.payment_priceType !== 1;
      });
      setCawsNFTS(eth);
    }

    console.log(cawsNFTS);
  };

  useEffect(() => {
    getCawsNfts().then((nfts) => {
      let datedNfts = nfts.map((nft) => {
        let date = new Date(nft.blockTimestamp * 1000);
        return { ...nft, date: date };
      });
      setCawsNFTS(datedNfts);
    });
  }, []);

  useEffect(() => {
    if (cawsNFTS && cawsNFTS.length === 0) {
      setLoading(true);
    }
    if (cawsNFTS && cawsNFTS.length > 0) {
      setLoading(false);
    }
    window.scrollTo(0, 0);
  }, [cawsNFTS]);

  return (
    <div
      className="container-fluid d-flex justify-content-end p-0"
      style={{ minHeight: "72vh" }}
    >
      {windowSize.width < 786 ? <MobileNav /> : <MarketSidebar />}

      <div
        className="container-nft d-flex  align-items-center pe-0 pe-lg-5 position-relative"
        style={{ backgroundSize: "cover" }}
      >
        <div className="main-wrapper mx-4 mx-lg-0 py-4 w-100">
          <h6 className="nft-page-title font-raleway mt-5 mt-lg-4">
            Cats And Watches <span style={{ color: "#8c56ff" }}>Society</span>
          </h6>
          <div className="d-flex mt-5 mb-3 flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between">
            <div className="position-relative">
              <img src={searchIcon} className="nft-search-icon" alt="" />
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search here"
                className="nft-search-bar"
              />
            </div>
            <div class="dropdown" style={{ width: "200px" }}>
              <button
                class="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {filterTitle}
                <img src={dropdownIcon} alt="" />
              </button>
              <ul class="dropdown-menu nft-dropdown-menu  p-2 w-100">
                <li
                  className="nft-dropdown-item"
                  onClick={() => {
                    setFilterTitle("Price low to high");
                    sortNfts("lth");
                  }}
                >
                  <span>Price low to high</span>
                </li>
                <li
                  className="nft-dropdown-item"
                  onClick={() => {
                    setFilterTitle("Price high to low");
                    sortNfts("htl");
                  }}
                >
                  <span>Price high to low</span>
                </li>
                <li
                  className="nft-dropdown-item"
                  onClick={() => {
                    setFilterTitle("Oldest to newest");
                    sortNfts("otl");
                  }}
                >
                  <span>Oldest to newest</span>
                </li>
                <li
                  className="nft-dropdown-item"
                  onClick={() => {
                    setFilterTitle("Newest To Oldest");
                    sortNfts("lto");
                  }}
                >
                  <span>Newest To Oldest</span>
                </li>
                <li
                  className="nft-dropdown-item"
                  onClick={() => {
                    setFilterTitle("Price: ETH");
                    sortNfts("eth");
                  }}
                >
                  <span>Price: ETH</span>
                </li>
                <li
                  className="nft-dropdown-item"
                  onClick={() => {
                    setFilterTitle("Price: DYP");
                    sortNfts("dyp");
                  }}
                >
                  <span>Price: DYP</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex align-items-center nft-page-wrapper p-4 gap-4 my-4">
            <div
              className={
                loading === false ? "item-cards-wrapper" : "loader-wrapper"
              }
            >
              {cawsNFTS && cawsNFTS.length > 0 ? (
                cawsNFTS.slice(0, 5).map((nft, index) => (
                  <NavLink
                    to={`/marketplace/nft/${nft.blockTimestamp}`}
                    style={{ textDecoration: "none" }}
                    key={index}
                    state={{
                      nft: nft,
                      type:
                        nft.nftAddress === window.config.nft_caws_address
                          ? "caws"
                          : nft.nftAddress === window.config.nft_cawsold_address
                          ? "cawsold"
                          : nft.nftAddress ===
                            window.config.nft_timepiece_address
                          ? "timepiece"
                          : "land",
                      isOwner:
                        nft.seller?.toLowerCase() === coinbase?.toLowerCase() ||
                        nft.buyer?.toLowerCase() === coinbase?.toLowerCase(),
                    }}
                  >
                    <ItemCard
                      key={nft.id}
                      nft={nft}
                      isConnected={isConnected}
                      showConnectWallet={handleConnect}
                      isCaws={true}
                      isTimepiece={false}
                      isWod={false}
                    />
                  </NavLink>
                ))
              ) : (
                <HashLoader
                  color={"#554fd8"}
                  loading={loading}
                  cssOverride={override}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CawsNFT;
