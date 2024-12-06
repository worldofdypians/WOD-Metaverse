import React, { useEffect, useState } from "react";
import skaleActive from "../../Components/LeaderBoard/assets/skaleActive.svg";
import bnbActive from "../../Components/LeaderBoard/assets/bnbActive.svg";
import coreActive from "../../Components/LeaderBoard/assets/coreActive.svg";
import victionActive from "../../Components/LeaderBoard/assets/victionActive.svg";
import mantaActive from "../../Components/LeaderBoard/assets/mantaActive.png";
import matActive from "../../../../../components/Header/assets/matchain.svg";
import seiIcon from "../../../../../components/Header/assets/sei.svg";
import tooltipIcon from "./assets/tooltipIconYellow.svg";
import baseLogo from "../../Components/LeaderBoard/assets/baseActive.svg";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import star from "./assets/star.svg";
import OutsideClickHandler from "react-outside-click-handler";
import taikoLogo from "../../Components/LeaderBoard/assets/taikoActive.svg";
import x4 from "./assets/4x.svg";
import arrowCircle from "./assets/arrowCircle.svg";
import popupXmark from "../../../../Marketplace/assets/popupXmark.svg";
import goldenPopup from "./assets/rankBanner.webp";
import premiumBadge from "./assets/premiumBadge.png";
import { NavLink } from "react-router-dom";
import { styled, Tooltip, tooltipClasses } from "@mui/material";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#252743 !important",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "200px !important",
    minWidth: "90px !important",
    fontSize: theme.typography.pxToRem(12),
  },
}));

const RankSmallPopup = ({
  onClose,
  userRank,
  userRankSkale,
  userBnbScore,
  userSkaleScore,
  userRankCore,
  userCoreScore,
  userRankViction,
  userVictionScore,
  rankData,
  userDataStar,
  userRankManta,
  userMantaScore,
  userRankBase,
  userBaseScore,
  userRankTaiko,
  userTaikoScore,
  userMatScore,
  userRankName,
  onRankPopupClick,
  primeStars,
  globalMonthly,
  globalWeekly,
  isPremium,
  userRankMat,
  userRankSei,
  userSeiScore,
}) => {
  return (
    <div className="package-popup-wrapper">
      <div className="package-popup my-progress-popup p-4">
        <div className=" package-popup-title-wrapper d-flex align-items-center position-relative justify-content-between mb-2">
          <div className="package-popup-title mb-0">My Progress</div>{" "}
          <img
            src={popupXmark}
            className="popup-closer"
            onClick={onClose}
            alt=""
          />
        </div>
        <div className="position-relative mb-3 d-flex align-items-center justify-content-center">
          <img
            src={goldenPopup}
            alt=""
            style={{ width: "100%" }}
            className="d-none d-lg-flex"
          />
          <div className="d-flex w-100 justify-content-center gap-2 gap-lg-4 align-items-center rank-chain-stats">
            <div className="rank-chain-status-grid w-100 px-0 px-lg-3">
              <div className="stats-container-4 d-flex flex-column align-items-center justify-content-center">
                <span className="stats-value">#{globalMonthly}</span>
                <span className="stats-desc">Global Monthly</span>
              </div>
              <div className="stats-container-4 d-flex flex-column align-items-center justify-content-center">
                <span className="stats-value">#{globalWeekly}</span>
                <span className="stats-desc">Global Weekly</span>
              </div>
              <div className="stats-container-4 d-flex flex-column align-items-center justify-content-center">
                <span className="stats-value d-flex align-items-center gap-2">
                  {/* <img
                    src={star}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  /> */}
                  {getFormattedNumber(userDataStar.statValue, 0)}
                </span>
                <span className="stats-desc">Total Stars</span>
              </div>
            </div>
          </div>
        </div>

        <div className="package-popup-content-rank p-1">
          <div className="d-flex flex-column gap-1 align-items-center">
            <div className="d-flex align-items-center justify-content-between w-100">
              <span className="chainstatustxt">Daily Status</span>
            </div>
            {/* <div className="d-flex w-100 flex-column gap-1">
              <div className="rank-dropdown-item ms-2 gap-3 p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={bnbActive}
                    width={25}
                    className="rankChain"
                    height={25}
                    alt=""
                  />
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Rank</span>
                  <span className="rank-dropdown-text-yellow">
                    #{getFormattedNumber(userRank + 1, 0)}
                  </span>
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Stars</span>
                  <span className="rank-dropdown-text-yellow">
                    {getFormattedNumber(userBnbScore, 0)}
                  </span>
                </div>
              </div>
              <div className="rank-dropdown-item ms-2 gap-3 p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={matActive}
                    width={25}
                    className="rankChain"
                    height={25}
                    alt=""
                  />
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Rank</span>
                  <span className="rank-dropdown-text-yellow">
                    #{getFormattedNumber(userRankMat + 1, 0)}
                  </span>
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Score</span>
                  <span className="rank-dropdown-text-yellow">
                    {getFormattedNumber(userMatScore, 0)}
                  </span>
                </div>
              </div>
              <div className="rank-dropdown-item ms-2 gap-3 p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={seiIcon}
                    width={25}
                    className="rankChain"
                    height={25}
                    alt=""
                  />
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Rank</span>
                  <span className="rank-dropdown-text-yellow">
                    #{getFormattedNumber(userRankSei + 1, 0)}
                  </span>
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Score</span>
                  <span className="rank-dropdown-text-yellow">
                    {getFormattedNumber(userSeiScore, 0)}
                  </span>
                </div>
              </div>
              <div className="rank-dropdown-item ms-2 gap-3 p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={mantaActive}
                    width={25}
                    className="rankChain"
                    height={25}
                    alt=""
                  />
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Rank</span>
                  <span className="rank-dropdown-text-yellow">
                    #{getFormattedNumber(userRankManta + 1, 0)}
                  </span>
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Score</span>
                  <span className="rank-dropdown-text-yellow">
                    {getFormattedNumber(userMantaScore, 0)}
                  </span>
                </div>
              </div>
              <div className="rank-dropdown-item ms-2 gap-3 p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={baseLogo}
                    width={25}
                    className="rankChain"
                    height={25}
                    alt=""
                  />
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Rank</span>
                  <span className="rank-dropdown-text-yellow">
                    #{getFormattedNumber(userRankBase + 1, 0)}
                  </span>
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Score</span>
                  <span className="rank-dropdown-text-yellow">
                    {getFormattedNumber(userBaseScore, 0)}
                  </span>
                </div>
              </div>
              <div className="rank-dropdown-item ms-2 gap-3 p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={taikoLogo}
                    width={25}
                    className="rankChain"
                    height={25}
                    alt=""
                  />
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Rank</span>
                  <span className="rank-dropdown-text-yellow">
                    #{getFormattedNumber(userRankTaiko + 1, 0)}
                  </span>
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Score</span>
                  <span className="rank-dropdown-text-yellow">
                    {getFormattedNumber(userTaikoScore, 0)}
                  </span>
                </div>
              </div>
    
              <div className="rank-dropdown-item ms-2 gap-3 p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={skaleActive}
                    width={25}
                    className="rankChain"
                    height={25}
                    alt=""
                  />
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Rank</span>
                  <span className="rank-dropdown-text-yellow">
                    #{getFormattedNumber(userRankSkale + 1, 0)}
                  </span>
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Score</span>
                  <span className="rank-dropdown-text-yellow">
                    {getFormattedNumber(userSkaleScore, 0)}
                  </span>
                </div>
              </div>
              <div className="rank-dropdown-item ms-2 gap-3 p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={coreActive}
                    width={25}
                    className="rankChain"
                    height={25}
                    alt=""
                  />
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Rank</span>
                  <span className="rank-dropdown-text-yellow">
                    #{getFormattedNumber(userRankCore + 1, 0)}
                  </span>
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Score</span>
                  <span className="rank-dropdown-text-yellow">
                    {getFormattedNumber(userCoreScore, 0)}
                  </span>
                </div>
              </div>
              <div className="rank-dropdown-item ms-2 gap-3 p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={victionActive}
                    width={25}
                    className="rankChain"
                    height={25}
                    alt=""
                  />
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Rank</span>
                  <span className="rank-dropdown-text-yellow">
                    #{getFormattedNumber(userRankViction + 1, 0)}
                  </span>
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Score</span>
                  <span className="rank-dropdown-text-yellow">
                    {getFormattedNumber(userVictionScore, 0)}
                  </span>
                </div>
              </div>
            </div> */}
            <div className="rank-chain-status-grid w-100">
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-3">
                <img src={bnbActive} width={30} height={30} alt="" />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      #{getFormattedNumber(userRank + 1, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userBnbScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-3">
                <img src={matActive} width={30} height={30} alt="" />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      #{getFormattedNumber(userRankMat + 1, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userMatScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-3">
                <img src={seiIcon} width={30} height={30} alt="" />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      #{getFormattedNumber(userRankSei + 1, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userSeiScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-3">
                <img src={mantaActive} width={30} height={30} alt="" />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      #{getFormattedNumber(userRankManta + 1, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userMantaScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-3">
                <img src={baseLogo} width={30} height={30} alt="" />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      #{getFormattedNumber(userRankBase + 1, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userBaseScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-3">
                <img src={taikoLogo} width={30} height={30} alt="" />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      #{getFormattedNumber(userRankTaiko + 1, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userTaikoScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-3">
                <img src={skaleActive} width={30} height={30} alt="" />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      #{getFormattedNumber(userRankSkale + 1, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userSkaleScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-3">
                <img src={coreActive} width={30} height={30} alt="" />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      #{getFormattedNumber(userRankCore + 1, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userCoreScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-3">
                <img src={victionActive} width={30} height={30} alt="" />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      #{getFormattedNumber(userRankViction + 1, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userVictionScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavLink to="/account/prime">
          <div className="rank-premium-status-wrapper p-2 mt-2">
            <div className="d-flex align-items-center gap-2 justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <img src={premiumBadge} alt="" />
                <div className="d-flex flex-column">
                  <span className="rank-upgrade-status" style={{color: "#f3bf09"}}> {isPremium ? " Prime Enabled" : "Become Prime"}</span>
                  {/* <span className="rank-upgrade-status-bottom">
                    {isPremium ? " Prime Enabled" : "Prime"}
                  </span> */}
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
              
                <div className="p-2 starscontentwrapper" >
                  <span className="startext" style={{color: primeStars === true ? "#ffd37e" : "gray"}}> 
                    {/* {primeStars === true ? "+ 50 Stars" : "In Progress"} */}
                    +50 Stars
                  </span>
                </div>
                <HtmlTooltip
                  placement="top"
                  title={
                    <span className="card-eth-chain-text">
                      With Prime enabled, earn 50 extra stars if you're in the
                      top 100 of any leaderboard!
                    </span>
                  }
                >
                  <img src={tooltipIcon} alt="" />
                </HtmlTooltip>
              </div>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default RankSmallPopup;
