import React, { useEffect, useState } from "react";
import criticalHit from "./myrewardsAssets/criticalHit.png";
import dailyBonus from "./myrewardsAssets/dailyBonus.png";
import leaderboard from "./myrewardsAssets/leaderboard.png";
import nftStake from "./myrewardsAssets/nftStake.png";
import treasureHunt from "./myrewardsAssets/treasureHunt.png";
import specialRewards from "./myrewardsAssets/specialRewards.png";

import Switch from "@mui/material/Switch";
import axios from "axios";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import greenInfo from "./assets/greenInfo.svg";
import OutsideClickHandler from "react-outside-click-handler";
import { async } from "q";

const MyRewardsPopup = ({
  username,
  userId,
  address,
  email,
  bnbPrice,
  cfxPrice,
  ethTokenData,
  openedChests,
  allChests,
  hasNft,
  availableTime
}) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [previousRewards, setPreviousRewards] = useState(false);
  const backendApi =
    "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod";

  const [dailyplayerData, setdailyplayerData] = useState(0);
  const [weeklyplayerData, setweeklyplayerData] = useState(0);
  const [monthlyplayerData, setmonthlyplayerData] = useState(0);
  const [leaderboardTotalData, setleaderboardTotalData] = useState(0);

  const [genesisData, setgenesisData] = useState(0);
  const [bundlesBought, setbundlesBought] = useState(0);

  const [userEarnUsdPrevious, setuserEarnUsdPrevious] = useState(0);

  const [confluxEarnUSDPrevious, setConfluxEarnUSDPrevious] = useState(0);

  const [gateEarnUSDPrevious, setgateEarnUSDPrevious] = useState(0);

  const [baseEarnUSD, setBaseEarnUSD] = useState(0);
  const [baseEarnETH, setBaseEarnETH] = useState(0);

  const [EthRewards, setEthRewards] = useState(0);
  const [EthRewardsLandPool, setEthRewardsLandPool] = useState(0);
  const [EthRewardsCawsPool, setEthRewardsCawsPool] = useState(0);

  const [cawsRewards, setCawsRewards] = useState(0);
  const [wodCawsRewards, setWodCawsRewards] = useState(0);
  const [wodRewards, setWodRewards] = useState(0);
  const [gemRewards, setGemRewards] = useState(0);

  const [treasureRewardMoney, setTreasureRewardMoney] = useState(0);
  const [treasureRewardNftCaws, setTreasureRewardNftCaws] = useState(0);
  const [treasureRewardNftWod, setTreasureRewardNftWod] = useState(0);
  const [treasureRewardNftBetaPass, setTreasureRewardNftBetaPass] = useState(0);
  const [confluxRewardsUSD, setConfluxRewardsUSD] = useState(0);
  const [gateRewardsUSD, setGateRewardsUSD] = useState(0);

  const dailyPrizes = [10, 8, 5, 5, 0, 0, 0, 0, 0, 0];

  const dailyPrizesGolden = [10, 8, 5, 5, 5, 5, 5, 5, 5, 5];

  const weeklyPrizes = [25, 15, 10, 8, 0, 0, 0, 0, 0, 0];

  const weeklyPrizesGolden = [25, 15, 10, 8, 5, 5, 5, 5, 5, 5, 5];

  const monthlyPrizes = [250, 150, 100, 50, 50, 20, 20, 10, 10, 10];

  const monthlyPrizesGolden = [250, 150, 100, 50, 50, 20, 20, 10, 10, 10];

  const getBundles = async () => {
    if (address) {
      const result = await axios.get(
        `https://api3.dyp.finance/api/bundles/count/${address}`
      );
      const result_formatted = result.data.count;
      setbundlesBought(result_formatted);
    }
  };

  const getStakesIds = async () => {
    let stakenft = [];

    if (address) {
      const contract = new window.infuraWeb3.eth.Contract(
        window.WOD_CAWS_ABI,
        window.config.wod_caws_address
      );
      const allCawsStakes = await contract.methods
        .depositsOf(address)
        .call()
        .then((result) => {
          if (result.length > 0) {
            for (let i = 0; i < result.length; i++)
              stakenft.push(parseInt(result[i]));
            return stakenft;
          }
        });

      return allCawsStakes;
    }
  };

  const getStakesIdsLandPool = async () => {
    if (address) {
      let staking_contract = new window.infuraWeb3.eth.Contract(
        window.LANDSTAKING_ABI,
        window.config.landnftstake_address
      );
      let stakenft = [];
      let myStakes = await staking_contract.methods
        .depositsOf(address)
        .call()
        .then((result) => {
          for (let i = 0; i < result.length; i++)
            stakenft.push(parseInt(result[i]));
          return stakenft;
        });

      return myStakes;
    }
  };

  const getStakesIdsCawsPool = async () => {
    if (address) {
      let staking_contract = new window.infuraWeb3.eth.Contract(
        window.NFTSTAKING_ABI,
        window.config.nftstaking_address
      );
      let stakenft = [];
      let myStakes = await staking_contract.methods
        .depositsOf(address)
        .call()
        .then((result) => {
          for (let i = 0; i < result.length; i++)
            stakenft.push(parseInt(result[i]));
          return stakenft;
        });

      return myStakes;
    }
  };

  const calculateAllRewards = async () => {
    let myStakes = await getStakesIds();
    let result = 0;
    const contract = new window.infuraWeb3.eth.Contract(
      window.WOD_CAWS_ABI,
      window.config.wod_caws_address
    );
    if (address) {
      if (myStakes.length > 0) {
        let rewards = await contract.methods
          .calculateRewards(address, myStakes)
          .call()
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

  const calculateAllRewardsLandPool = async () => {
    let myStakes = await getStakesIdsLandPool();
    let result = 0;
    let calculateRewards = [];
    let staking_contract = new window.infuraWeb3.eth.Contract(
      window.LANDSTAKING_ABI,
      window.config.landnftstake_address
    );
    if (address) {
      if (myStakes.length > 0) {
        calculateRewards = await staking_contract.methods
          .calculateRewards(address, myStakes)
          .call()
          .then((data) => {
            return data;
          });
      }
      let a = 0;

      for (let i = 0; i < calculateRewards.length; i++) {
        a = await window.infuraWeb3.utils.fromWei(calculateRewards[i], "ether");
        result = result + Number(a);
      }
    }
    setEthRewardsLandPool(result);
  };

  const calculateAllRewardsCawsPool = async () => {
    let myStakes = await getStakesIdsCawsPool();
    let result = 0;
    let calculateRewards = [];
    let staking_contract = new window.infuraWeb3.eth.Contract(
      window.NFTSTAKING_ABI,
      window.config.nftstaking_address
    );
    if (address) {
      if (myStakes.length > 0) {
        calculateRewards = await staking_contract.methods
          .calculateRewards(address, myStakes)
          .call()
          .then((data) => {
            return data;
          });
      }
      let a = 0;

      for (let i = 0; i < calculateRewards.length; i++) {
        a = await window.infuraWeb3.utils.fromWei(calculateRewards[i], "ether");
        result = result + Number(a);
      }
    }
    setEthRewardsCawsPool(result);
  };

  const fetchTreasureHuntData = async (email, userAddress) => {
    try {
      const response = await fetch(
        "https://worldofdypiansutilities.azurewebsites.net/api/GetTreasureHuntData",
        {
          body: JSON.stringify({
            email: email,
            publicAddress: userAddress,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          redirect: "follow",
          mode: "cors",
        }
      );
      if (response.status === 200) {
        const responseData = await response.json();
        if (responseData.events) {
          const coingeckoEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "coingecko";
          });
          const confluxEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "conflux";
          });

          const gateEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "gate";
          });

          const baseEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "base";
          });

          const usdValue_previous =
            coingeckoEvent[0].reward.earn.total /
            coingeckoEvent[0].reward.earn.multiplier;
          setuserEarnUsdPrevious(usdValue_previous);

          if (confluxEvent[0].reward.earn.multiplier !== 0) {
            const cfxUsdValue_previous =
              confluxEvent[0].reward.earn.total /
              confluxEvent[0].reward.earn.multiplier;
            setConfluxEarnUSDPrevious(cfxUsdValue_previous);
          }

          if (gateEvent[0].reward.earn.multiplier !== 0) {
            const gateUsdValue_previous =
              gateEvent[0].reward.earn.total /
              gateEvent[0].reward.earn.multiplier;
            setgateEarnUSDPrevious(gateUsdValue_previous);
          }

          if (baseEvent) {
            if (baseEvent[0].reward.earn.multiplier !== 0) {
              const baseUsdValue =
                baseEvent[0].reward.earn.total /
                baseEvent[0].reward.earn.multiplier;
              setBaseEarnUSD(baseUsdValue);
              if (ethTokenData !== 0) {
                setBaseEarnETH(baseUsdValue / ethTokenData);
              }
            }
          }
        }
      } else {
        console.log(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchDailyRecordsAroundPlayer = async () => {
    const data = {
      StatisticName: "DailyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;
      if (availableTime && availableTime !== NaN) {
        if (availableTime > 0) {
          setdailyplayerData(
            userPosition > 10
              ? 0
              : userPosition === 10
              ? dailyPrizes[9] + dailyPrizesGolden[9]
              : dailyPrizes[userPosition] + dailyPrizesGolden[userPosition]
          );
        } else if (availableTime === 0) {
          setdailyplayerData(
            userPosition > 10
              ? 0
              : userPosition === 10
              ? dailyPrizes[9]
              : dailyPrizes[userPosition]
          );
        }
      }
    }
  };

  const fetchWeeklyRecordsAroundPlayer = async () => {
    const data = {
      StatisticName: "WeeklyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position + 1;
      if (availableTime > 0) {
        setweeklyplayerData(
          userPosition > 10
            ? 0
            : userPosition === 10
            ? weeklyPrizes[9] + weeklyPrizesGolden[9]
            : weeklyPrizes[userPosition] + weeklyPrizesGolden[userPosition]
        );
      } else if (availableTime === 0) {
        setweeklyplayerData(
          userPosition > 10
            ? 0
            : userPosition === 10
            ? weeklyPrizes[9]
            : weeklyPrizes[userPosition]
        );
      }
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
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position + 1;
      if (availableTime > 0) {
        setmonthlyplayerData(
          userPosition > 10
            ? 0
            : userPosition === 10
            ? monthlyPrizes[9] + monthlyPrizesGolden[9]
            : monthlyPrizes[userPosition] + monthlyPrizesGolden[userPosition]
        );
      } else if (availableTime === 0) {
        setmonthlyplayerData(
          userPosition > 10
            ? 0
            : userPosition === 10
            ? monthlyPrizes[9]
            : monthlyPrizes[userPosition]
        );
      }
    }
  };

  const fetchMonthlyGenesisRecordsAroundPlayer = async () => {
    const data = {
      StatisticName: "GenesisLandRewards",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].statValue;
      setgenesisData(userPosition);
    }
  };

  const fetchConfluxUSDRewards = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/conflux_rewards/${address}`)
      .then((data) => {
        if (data.data.userRewards) {
          setConfluxRewardsUSD(data.data.userRewards);
        } else {
          setConfluxRewardsUSD(0);
        }
      });
  };
  const fetchGateUSDRewards = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/gate_rewards/${address}`)
      .then((data) => {
        if (data.data.userRewards) {
          setGateRewardsUSD(data.data.userRewards);
        } else {
          setGateRewardsUSD(0);
        }
      });
  };

  const fetchNftRewards = async (userAddr) => {
    if (userAddr) {
      const cawsResult = await axios.get(
        `https://api.worldofdypians.com/api/caws_rewards/${userAddr}`
      );
      const wodcaws_Result = await axios.get(
        `https://api.worldofdypians.com/api/wodcaws_rewards/${userAddr}`
      );
      const wodResult = await axios.get(
        `https://api.worldofdypians.com/api/genesisimple_rewards/${userAddr}`
      );
      if (cawsResult && cawsResult.status === 200) {
        const cawsuserRewards = cawsResult.data.userRewards;
        setCawsRewards(cawsuserRewards);
      }

      if (wodcaws_Result && wodcaws_Result.status === 200) {
        const wodcaws_userRewards = wodcaws_Result.data.userRewards;
        setWodCawsRewards(wodcaws_userRewards);
      }

      if (wodResult && wodResult.status === 200) {
        const wod_userRewards = wodResult.data.userRewards;
        setWodRewards(wod_userRewards);
      }
    }
  };

  const fetchGenesisGem = async (userAddr) => {
    const result = await axios.get(
      `https://api.worldofdypians.com/api/genesis_rewards/${userAddr}`
    );
    if (result && result.status === 200) {
      const gem_Rewards = result.data.userRewards;
      setGemRewards(gem_Rewards);
    }
  };

  const fetchLeaderboardData = async (userAddr) => {
    const result = await axios.get(
      `https://api.worldofdypians.com/api/leaderboard_rewards/${userAddr}`
    );
    if (result && result.status === 200) {
      const leaderboard_earnings = result.data.userRewards;
      setleaderboardTotalData(leaderboard_earnings);
    }
  };

  const getTreasureChestsInfo = async () => {
    var pointsResult = 0;
    var nftCawsResult = 0;
    var nftLandResult = 0;
    var nftBPResult = 0;
    var moneyResult = 0;
   
    if (openedChests && openedChests.length > 0) {
      for (let i = 0; i < openedChests.length; i++) {
        console.log(openedChests[i].rewards)
        if (
          openedChests[i].rewards.find((obj) => obj.rewardType === "Points")
        ) {
          pointsResult += Number(openedChests[i].reward);
        }  if (
          openedChests[i].rewards.find((obj) => obj.rewardType === "Money")
        ) {
          if (!openedChests[i].rewards.find((obj) => obj.rewardType === "Money")?.details) {
            moneyResult += Number(openedChests[i].rewards.find((obj) => obj.rewardType === "Money").reward);
          }
        }  if (
          openedChests[i].rewards.find((obj) => obj.rewardType === "NFT")
        ) {
          if (
            openedChests[i].rewards.find((obj) => obj.rewardType === "NFT")
              .reward === "WoD"
          ) {
            nftLandResult++;
          }  if (
            openedChests[i].rewards.find((obj) => obj.rewardType === "NFT")
              .reward === "CAWS"
          ) {
            nftCawsResult++;
          }  if (
            openedChests[i].rewards.find((obj) => obj.rewardType === "NFT")
              .reward === "BetaPass"
          ) {
            nftBPResult++;
          }
        }
      }
    }

    setTreasureRewardMoney(moneyResult);
    setTreasureRewardNftCaws(nftCawsResult);
    setTreasureRewardNftWod(nftLandResult);
    setTreasureRewardNftBetaPass(nftBPResult);
  };

  useEffect(() => {
    fetchDailyRecordsAroundPlayer();
    fetchWeeklyRecordsAroundPlayer();
    fetchMonthlyRecordsAroundPlayer();
    fetchMonthlyGenesisRecordsAroundPlayer();
  }, [userId, bundlesBought]);

  useEffect(() => {
    getTreasureChestsInfo();
  }, [openedChests, hasNft]);

  useEffect(() => {
    getBundles();
    calculateAllRewards();
    calculateAllRewardsLandPool();
    calculateAllRewardsCawsPool();
    fetchNftRewards(address);
    fetchGenesisGem(address);
    fetchLeaderboardData(address);
    fetchConfluxUSDRewards();
    fetchGateUSDRewards();
  }, [address, email]);

  useEffect(() => {
    if (email && address) {
      fetchTreasureHuntData(email, address);
    }
  }, [email, address]);

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-grid rewardstable-wrapper">
        <table className="myrewards-table table">
          <thead>
            <tr>
              <th className="col-3 myrewards-th border-0">Reward Category</th>
              <th className="col-3 myrewards-th border-0 text-center position-relative">
                Available Rewards
              </th>
              <th className="col-3 myrewards-th border-0 text-center position-relative">
                Reward Type
              </th>
              <th className="col-3 myrewards-th border-0 text-center position-relative">
                Total Earned
              </th>
            </tr>
          </thead>

          <tbody className="position-relative myrewards-tbody">
            <tr>
              <td className="myrewards-td-main border-0">
                <img src={nftStake} alt="" style={{ width: 24, height: 24 }} />{" "}
                NFT Staking
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText"></td>
            </tr>
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Genesis Land
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(
                      EthRewardsLandPool * ethTokenData,
                      2
                    )}`}
              </td>
              <td className="myrewards-td-second border-0 specialCell topborder text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(EthRewardsLandPool, 4)} WETH`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(wodRewards, 2)}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                WoD Land & CAWS{" "}
              </td>

              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(EthRewards * ethTokenData, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(EthRewards, 4)} WETH`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(wodCawsRewards, 2)}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                CAWS{" "}
              </td>

              <td className="myrewards-td-second border-0 text-center">
                {`$${getFormattedNumber(EthRewardsCawsPool * ethTokenData, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 specialCell bottomborder text-center">
                {getFormattedNumber(EthRewardsCawsPool, 4)} WETH
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(cawsRewards, 2)}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-main border-0">
                {" "}
                <img
                  src={treasureHunt}
                  alt=""
                  style={{ width: 24, height: 24 }}
                />
                Treasure Hunt
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText">
                {previousRewards &&
                  `$${getFormattedNumber(
                    userEarnUsdPrevious +
                      confluxEarnUSDPrevious +
                      gateEarnUSDPrevious,
                    2
                  )}`}
              </td>
            </tr>
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                CoinGecko
              </td>
              <td className="myrewards-td-second border-0 specialCell topborder text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(userEarnUsdPrevious, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(
                      userEarnUsdPrevious / bnbPrice,
                      4
                    )} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : `$${getFormattedNumber(0, 2)}`}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Conflux Network
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                {previousRewards ? "-" : `$${getFormattedNumber(0, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(0 / cfxPrice, 4)} CFX`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(confluxRewardsUSD, 2)}`}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Gate.io
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                {previousRewards ? "-" : `$${getFormattedNumber(0, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : `${getFormattedNumber(0, 4)} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(gateRewardsUSD, 2)}`}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Base
              </td>
              <td className="myrewards-td-second border-0 specialCell bottomborder text-center">
                ${getFormattedNumber(baseEarnUSD, 2)}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {getFormattedNumber(baseEarnETH, 4)} WETH
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(0, 2)}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-main border-0">
                {" "}
                <img
                  src={leaderboard}
                  alt=""
                  style={{ width: 24, height: 24 }}
                />
                Leaderboard
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText"></td>
            </tr>
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Daily/Weekly/Monthly
              </td>
              <td className="myrewards-td-second border-0 specialCell topbottom-border text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(
                      dailyplayerData + weeklyplayerData + monthlyplayerData,
                      2
                    )}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(
                      (dailyplayerData + weeklyplayerData + monthlyplayerData) /
                        bnbPrice,
                      4
                    )} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(leaderboardTotalData, 2)}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-main border-0">
                <img
                  src={dailyBonus}
                  alt=""
                  style={{ width: 24, height: 24 }}
                />
                Daily Bonus
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText"></td>
            </tr>
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Treasure Chests
              </td>
              <td className="myrewards-td-second border-0 specialCell topbottom-border text-center">
                {"$" + getFormattedNumber(treasureRewardMoney, 2)}<br/>
                {treasureRewardNftBetaPass + " " + "BetaPass NFT"}<br/>
                {treasureRewardNftCaws + " " + "CAWS NFT"}<br/>
                {treasureRewardNftWod + " " + "WoD NFT"}<br/>
              </td>
              <td className="myrewards-td-second border-0 text-center">
                USD/NFT
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : "0"}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-main border-0">
                <img
                  src={specialRewards}
                  alt=""
                  style={{ width: 24, height: 24 }}
                />
                Special Rewards
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText"></td>
            </tr>
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Social Bonus
              </td>
              <td className="myrewards-td-second border-0 specialCell topbottom-border text-center">
                $0.00
              </td>
              <td className="myrewards-td-second border-0 text-center">
                0.0000 WBNB
              </td>
              <td className="myrewards-td-second border-0 text-center">
                $0.00
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-main border-0">
                {" "}
                <img
                  src={criticalHit}
                  alt=""
                  style={{ width: 24, height: 24 }}
                />
                Critical Hit
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText">
                {previousRewards && "$500.00"}
              </td>
            </tr>
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Genesis Gem
              </td>
              <td className="myrewards-td-second border-0 specialCell topbottom-border text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(genesisData, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(genesisData / bnbPrice, 4)} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(gemRewards, 2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="table-separator"></div>
      <div className="d-flex align-items-center gap-2 justify-content-between">
        <div className="d-flex flex-column gap-2">
          <div className="d-flex align-items-center gap-2 justify-content-start">
            <span className="leftbold-text">Available Rewards:</span>
            <span className="rightlight-text">
              The amount of rewards available to be withdrawn.
            </span>
          </div>
          <div className="d-flex align-items-center gap-2 justify-content-start">
            <span className="leftbold-text">Reward Type:</span>
            <span className="rightlight-text">
              The type of reward distribution.
            </span>
          </div>
          <div className="d-flex align-items-center gap-2 justify-content-start">
            <span className="leftbold-text ">Total Earned:</span>
            <span className="rightlight-text">
              The total rewards already distributed.
            </span>
          </div>
        </div>
        <div className="d-flex flex-column">
          <h4
            className={
              previousRewards ? "all-past-total-earned" : "all-total-earned"
            }
          >
            $
            {getFormattedNumber(
              gemRewards +
                leaderboardTotalData +
                baseEarnUSD +
                gateEarnUSDPrevious +
                confluxEarnUSDPrevious +
                userEarnUsdPrevious +
                cawsRewards +
                wodCawsRewards +
                wodRewards,
              2
            )}
          </h4>
          <span
            className={
              previousRewards
                ? "all-past-total-earned-subtitle"
                : "all-total-earned-subtitle"
            }
          >
            Total Earned
          </span>
        </div>
      </div>
      {/* <div className="optionsWrapper2 p-2">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between gap-2 align-items-center">
            <span className="viewWinners">View past rewards</span>
            <Switch
              {...label}
              onChange={() => {
                setPreviousRewards(!previousRewards);
              }}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MyRewardsPopup;
