import React, { useState, useEffect, useRef } from "react";
import price1 from "../../Images/userProfile/price1.svg";
import price2 from "../../Images/userProfile/price2.svg";
import price3 from "../../Images/userProfile/price3.svg";
import { CircularProgress } from "@mui/material";
import playerAvatar from "../../Images/userProfile/userAvatar2.png";
import premiumAvatar from "../../Images/userProfile/premiumAvatar.png";
import premiumStar from "../../Images/userProfile/premiumStar.png";
import axios from "axios";
import Switch from "@mui/material/Switch";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import "./_leaderboard.scss";
import ComingSoon from "./ComingSoon";
import tooltipIcon from "./tooltipIcon.svg";
import OutsideClickHandler from "react-outside-click-handler";
import { dyp700_abi } from "../../web3";
import Countdown from "react-countdown";
import useWindowSize from "../../Utils.js/hooks/useWindowSize";
import skaleIcon from "./assets/skaleIcon.png";
import skaleIconGray from "./assets/skaleIconGray.svg";
import wodIcon from "./assets/wodIcon.png";
import bnbIcon from "./assets/bnbIcon.svg";
import coreActive from "./assets/coreActive.svg";
import coreInactive from "./assets/coreInactive.svg";
import victionActive from "./assets/victionActive.svg";
import victionInactive from "./assets/victionInactive.svg";
import Slider from "react-slick";
import bnbActive from "./assets/bnbActive.svg";
import bnbInactive from "./assets/bnbInactive.svg";
import skaleActive from "./assets/skaleActive.svg";
import skaleInactive from "./assets/skaleInactive.svg";
import wodActive from "./assets/wodActive.svg";
import wodInactive from "./assets/wodInactive.svg";
import leftArrow from "./assets/leftArrow.svg";
import rightArrow from "./assets/rightArrow.svg";
import premiumIcon from "./assets/premiumIcon.png";
import premiumInactive from "./assets/premiumInactive.svg";
import upgradeIcon from "./assets/upgradeIcon.svg";
import starIcon from "./assets/starIcon.svg";
import basicPlayer from "./assets/basicPlayer.png";
import premiumPlayer from "./assets/premiumPlayer.png";
import goldenPlayer from "./assets/goldenPlayer.png";
import goldenPremiumPlayer from "./assets/goldenPremiumPlayer.png";

const renderer = ({ hours, minutes, seconds }) => {
  return (
    <div className="timer-wrapper d-none align-items-start gap-3 justify-content-center">
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{hours < 10 ? "0" + hours : hours}</h6>
        <span className="days">Hours</span>
      </div>
      <h6 className="mint-time">:</h6>
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{minutes < 10 ? "0" + minutes : minutes}</h6>
        <span className="days">minutes</span>
      </div>
      <h6 className="mint-time">:</h6>
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{seconds < 10 ? "0" + seconds : seconds}</h6>
        <span className="days">seconds</span>
      </div>
    </div>
  );
};

const NewLeaderBoard = ({
  username,
  userId,
  dypBalancebnb,
  address,
  availableTime,
  email,
  coinbase,
  isPremium,
}) => {
  const playerData = [
    {
      position: "1",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "2",
      displayName: "DarkSliffer",
      reward: "$500",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "3",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "4",
      displayName: "DarkSliffer",
      reward: "500",
      statValue: "7757920",
      premium: false,
    },

    {
      position: "5",
      displayName: "DarkSliffer",
      reward: "50",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "6",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "7",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "8",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "9",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "10",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
  ];
  const [tooltip, setTooltip] = useState(false);

  const placeholderplayerData = [
    {
      position: "0",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "1",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "2",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "3",
      displayName: "...",
      reward: "---",
      statValue: "---",
      premium: false,
    },

    {
      position: "4",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "5",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "6",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "7",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "8",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "9",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
  ];

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
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
          slidesToShow: 1,
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

  const bnbStars = ["50", "40", "30", "20", "20", "20", "20", "20", "20", "20"];
  const bnbStarsPremium = [
    "50",
    "40",
    "30",
    "20",
    "20",
    "20",
    "20",
    "20",
    "20",
    "20",
  ];
  const weeklyPrizesBnb = ["30", "20", "10", "5", "5", "5", "5", "5", "5", "5"];
  const weeklyPrizesGolden = [
    "40",
    "30",
    "20",
    "15",
    "15",
    "15",
    "15",
    "15",
    "15",
    "15",
    "15",
  ];

  const monthlyPrizesBnb = [
    "200",
    "100",
    "60",
    "30",
    "30",
    "10",
    "10",
    "10",
    "10",
    "10",
  ];

  const monthlyPrizesGolden = [
    "300",
    "200",
    "140",
    "70",
    "70",
    "30",
    "30",
    "30",
    "30",
    "30",
  ];

  const skaleStars = [
    "70",
    "60",
    "50",
    "30",
    "30",
    "30",
    "30",
    "30",
    "30",
    "30",
  ];
  const skaleStarsPremium = [
    "70",
    "60",
    "50",
    "30",
    "30",
    "30",
    "30",
    "30",
    "30",
    "30",
  ];

  const skalePrizesWeekly = [
    "15",
    "10",
    "5",
    "4",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
  ];
  const skalePrizesWeeklyGolden = [
    "25",
    "20",
    "15",
    "12",
    "8",
    "8",
    "8",
    "8",
    "8",
    "8",
  ];
  const skalePrizesMonthly = [
    "60",
    "30",
    "20",
    "10",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
  ];
  const skalePrizesMonthlyGolden = [
    "140",
    "70",
    "30",
    "20",
    "15",
    "15",
    "15",
    "15",
    "15",
    "15",
  ];

  const genesisPrizes = [
    "100",
    "100",
    "80",
    "80",
    "80",
    "60",
    "50",
    "40",
    "20",
    "20",
  ];

  const [optionText, setOptionText] = useState("daily");
  const [optionText2, setOptionText2] = useState("bnb");
  const [dailyrecords, setRecords] = useState([]);

  const [dailyrecordsAroundPlayer, setRecordsAroundPlayer] = useState([]);
  const [activePlayer, setActivePlayer] = useState(false);
  const [activePlayerWeekly, setActivePlayerWeekly] = useState(false);
  const [activePlayerMonthly, setActivePlayerMonthly] = useState(false);
  const [activePlayerGenesis, setActivePlayerGenesis] = useState(false);

  const [activeSkalePlayer, setActiveSkalePlayer] = useState(false);

  const [userData, setUserData] = useState({});
  const [userDataWeekly, setUserDataWeekly] = useState({});
  const [userDataMonthly, setUserDataMonthly] = useState({});
  const [userDataSkale, setUserDataSkale] = useState({});
  const [userDataSkaleMonthly, setUserDataSkaleMonthly] = useState({});
  const [userDataGenesis, setUserDataGenesis] = useState({});
  const [inactiveBoard, setInactiveBoard] = useState(false);
  const [dailyplayerData, setdailyplayerData] = useState([]);
  const [weeklyplayerData, setweeklyplayerData] = useState([]);
  const [monthlyplayerData, setmonthlyplayerData] = useState([]);
  const [skaleRecords, setskaleRecords] = useState([]);
  const [skalePreviousRecords, setskalePreviousRecords] = useState([]);
  const [skalepreviousVersion, setskalepreviousVersion] = useState(0);
  const [previousVersion, setpreviousVersion] = useState(0);
  const [previousWeeklyVersion, setpreviousWeeklyVersion] = useState(0);
  const [previousMonthlyVersion, setpreviousMonthlyVersion] = useState(0);
  const [previousGenesisVersion, setpreviousGenesisVersion] = useState(0);
  const [weeklyrecords, setWeeklyRecords] = useState([]);
  const [monthlyrecords, setMonthlyRecords] = useState([]);
  const [genesisData, setgenesisData] = useState([]);
  const [previousgenesisData, setpreviousgenesisData] = useState([]);
  const [skaleMonthlyData, setSkaleMonthlyData] = useState([]);
  const [skalePreviousMonthlyData, setSkalePreviousMonthlyData] = useState([]);
  const [isactive, setisActive] = useState(false);
  const [countdown, setcountdown] = useState();
  const [bundlesBought, setbundlesBought] = useState(0);
  const [allBnbData, setAllBnbData] = useState([
    {
      title: "DAILY",
      reset: "Daily (00:00 UTC)",
      type: "stars",
      rewards: bnbStars,
      premium_rewards: bnbStarsPremium,
      activeData: [],
      previousData: [],
      player_data: [],
    },
    {
      title: "WEEKLY",
      reset: "Monday (00:00 UTC)",
      type: "cash",
      rewards: weeklyPrizesBnb,
      premium_rewards: weeklyPrizesGolden,
      activeData: [],
      previousData: [],
      player_data: [],
    },
    {
      title: "MONTHLY",
      reset: "Monthly (00:00 UTC)",
      type: "stars",
      rewards: monthlyPrizesBnb,
      premium_rewards: monthlyPrizesGolden,
      activeData: [],
      previousData: [],
      player_data: [],
    },
  ]);
  const sliderRef = useRef(null);
  const windowSize = useWindowSize();

  const getBundles = async () => {
    if (address) {
      const result = await axios.get(
        `https://api3.dyp.finance/api/bundles/count/${address}`
      );
      const result_formatted = result.data.count;
      setbundlesBought(result_formatted);
    }
  };

  const backendApi =
    "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod";

  const fetchGenesisRecords = async () => {
    const data2 = {
      StatisticName: "GenesisLandRewards",
      StartPosition: 0,
      MaxResultsCount: 10,
    };

    const result2 = await axios
      .post(`${backendApi}/auth/GetLeaderboard`, data2)
      .catch((err) => {
        console.log(err);
      });
    if (result2) {
      setpreviousGenesisVersion(result2.data.data.version);

      setgenesisData(result2.data.data.leaderboard);
      fillRecordsGenesis(result2.data.data.leaderboard);
    }

    fetchMonthlyGenesisRecordsAroundPlayer(result2.data.data.leaderboard);
  };

  const fetchDailyRecordsAroundPlayer = async (itemData) => {
    let dummyData = [...allBnbData];
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
      setRecordsAroundPlayer(result.data.data.leaderboard);
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      if (itemData.length > 0) {
        var testArray2 = itemData.filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayer(true);
        }
        if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayer(false);
          setUserData(...testArray);
          dummyData[0] = { ...dummyData[0], player_data: testArray };
          setAllBnbData(dummyData);
        }
      }
      if (testArray.length > 0) {
        setActivePlayer(false);
        setUserData(...testArray);
        dummyData[0] = { ...dummyData[0], player_data: testArray };
        setAllBnbData(dummyData);
      }
    }
  };

  const fetchDailyRecords = async () => {
    const data = {
      StatisticName: "DailyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setpreviousVersion(parseInt(result.data.data.version));
    setRecords(result.data.data.leaderboard);
    fillRecords(result.data.data.leaderboard);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    if (testArray.length > 0) {
      setActivePlayer(true);
    } else if (testArray.length === 0) {
      setActivePlayer(false);
      fetchDailyRecordsAroundPlayer(result.data.data.leaderboard);
    }
  };

  const fetchWeeklyRecordsAroundPlayer = async (itemData) => {
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
      setRecordsAroundPlayer(result.data.data.leaderboard);
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      if (itemData.length > 0) {
        var testArray2 = itemData.filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerWeekly(true);
        }
        if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerWeekly(false);
          setUserDataWeekly(...testArray);
        }
      }
      if (testArray.length > 0) {
        setActivePlayerWeekly(false);
        setUserDataWeekly(...testArray);
      }
    }
  };

  const fetchWeeklyRecords = async () => {
    const data = {
      StatisticName: "WeeklyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setWeeklyRecords(result.data.data.leaderboard);
    setpreviousWeeklyVersion(result.data.data.version);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    fillRecordsWeekly(result.data.data.leaderboard);

    if (testArray.length > 0) {
      setActivePlayerWeekly(true);
    }
    if (testArray.length === 0) {
      setActivePlayerWeekly(false);
      fetchWeeklyRecordsAroundPlayer(result.data.data.leaderboard);
    }
  };

  const fetchMonthlyRecordsAroundPlayer = async (itemData) => {
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
      setRecordsAroundPlayer(result.data.data.leaderboard);

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      if (itemData.length > 0) {
        var testArray2 = itemData.filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerMonthly(true);
        }

        if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerMonthly(false);
          setUserDataMonthly(...testArray);
        }
      }
      if (testArray.length > 0) {
        setActivePlayerMonthly(false);
        setUserDataMonthly(...testArray);
      }
    }
  };
  const fetchSkaleRecondsAroundPlayer = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardSkaleWeekly",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      setRecordsAroundPlayer(result.data.data.leaderboard);

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      if (itemData.length > 0) {
        var testArray2 = itemData.filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActiveSkalePlayer(true);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActiveSkalePlayer(false);
          setUserDataSkale(...testArray);
        }
      } else if (testArray.length > 0) {
        setActiveSkalePlayer(false);
        setUserDataSkale(...testArray);
      }
    }
  };
  const fetchSkaleRecondsMonthlyAroundPlayer = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardSkaleMonthly",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      setRecordsAroundPlayer(result.data.data.leaderboard);

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      if (itemData.length > 0) {
        var testArray2 = itemData.filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActiveSkalePlayer(true);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActiveSkalePlayer(false);
          setUserDataSkaleMonthly(...testArray);
        }
      } else if (testArray.length > 0) {
        setActiveSkalePlayer(false);
        setUserDataSkaleMonthly(...testArray);
      }
    }
  };
  const fetchMonthlyGenesisRecordsAroundPlayer = async (itemData) => {
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

      if (itemData.length > 0) {
        var testArray2 = itemData.filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerGenesis(true);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerGenesis(false);
          // setUserDataMonthly(...testArray);
          setUserDataGenesis(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerGenesis(false);
        // setUserDataMonthly(...testArray);
        setUserDataGenesis(...testArray);
      }
    }
  };

  const fetchSkaleRecordsMonthly = async () => {
    const data = {
      StatisticName: "LeaderboardSkaleMonthly",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setskalepreviousVersion(result.data.data.version);

    setSkaleMonthlyData(result.data.data.leaderboard);
    fillRecordsSkaleMonthly(result.data.data.leaderboard);
  };

  const fetchPreviousSkaleRecordsMonthly = async () => {
    if (skalepreviousVersion != 0) {
      const data = {
        StatisticName: "LeaderboardSkaleMonthly",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: skalepreviousVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      // setpreviousVersion(parseInt(result.data.data.version));
      setSkalePreviousMonthlyData(result.data.data.leaderboard);
      fillPreviousRecordsSkaleMonthly(result.data.data.leaderboard);
    }
  };

  const fetchMonthlyRecords = async () => {
    const data = {
      StatisticName: "MonthlyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setMonthlyRecords(result.data.data.leaderboard);
    setpreviousMonthlyVersion(result.data.data.version);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    if (testArray.length > 0) {
      setActivePlayerMonthly(true);
    }
    fillRecordsMonthly(result.data.data.leaderboard);

    if (testArray.length === 0) {
      setActivePlayerMonthly(false);
      fetchMonthlyRecordsAroundPlayer(result.data.data.leaderboard);
    }
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleOption = (item) => {
    setOptionText2(item);
  };

  const fillRecords = (itemData) => {
    let dummyData = [...allBnbData];
    if (itemData.length === 0) {
      setRecords(placeholderplayerData);
      dummyData[0] = { ...dummyData[0], activeData: placeholderplayerData };
      setAllBnbData(dummyData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setRecords(finalData);
      dummyData[0] = { ...dummyData[0], activeData: finalData };
      setAllBnbData(dummyData);
    }
  };
  const fillRecordsWeekly = (itemData) => {
    let dummyData = [...allBnbData];
    if (itemData.length === 0) {
      setWeeklyRecords(placeholderplayerData);
      dummyData[1] = { ...dummyData[1], activeData: placeholderplayerData };
      setAllBnbData(dummyData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setWeeklyRecords(finalData);
      dummyData[1] = { ...dummyData[1], activeData: finalData };
      setAllBnbData(dummyData);
    }
  };
  const fillRecordsMonthly = (itemData) => {
    if (itemData.length === 0) {
      setMonthlyRecords(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setMonthlyRecords(finalData);
    }
  };

  const fillRecordsDaily = (itemData) => {
    let dummyData = [...allBnbData];
    if (itemData.length === 0) {
      setdailyplayerData(placeholderplayerData);
      dummyData[0] = { ...dummyData[0], previousData: placeholderplayerData };
      setAllBnbData(dummyData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setdailyplayerData(finalData);
      dummyData[0] = { ...dummyData[0], previousData: finalData };
      setAllBnbData(dummyData);
    }
  };

  const fillRecordsGenesis = (itemData) => {
    if (itemData.length === 0) {
      setgenesisData(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setgenesisData(finalData);
    }
  };

  const fillRecordsSkaleMonthly = (itemData) => {
    if (itemData.length === 0) {
      setSkaleMonthlyData(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setSkaleMonthlyData(finalData);
    }
  };

  const fillPreviousRecordsSkaleMonthly = (itemData) => {
    if (itemData.length === 0) {
      setSkalePreviousMonthlyData(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setSkalePreviousMonthlyData(finalData);
    }
  };

  const fetchPreviousWinners = async () => {
    if (previousVersion != 0) {
      const data = {
        StatisticName: "DailyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: previousVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      fillRecordsDaily(result.data.data.leaderboard);
    }

    // setdailyplayerData(result.data.data.leaderboard);
  };
  const fillRecordsSkale = (itemData) => {
    if (itemData.length === 0) {
      setskaleRecords(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setskaleRecords(finalData);
    }
  };

  const fillPreviousRecordsSkale = (itemData) => {
    if (itemData.length === 0) {
      setskalePreviousRecords(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setskalePreviousRecords(finalData);
    }
  };

  const fetchSkaleRecords = async () => {
    const data = {
      StatisticName: "LeaderboardSkaleWeekly",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    setskalepreviousVersion(result.data.data.version);

    setskaleRecords(result.data.data.leaderboard);
    fillRecordsSkale(result.data.data.leaderboard);
    fetchSkaleRecondsAroundPlayer(result.data.data.leaderboard);
  };

  const fetchPreviousSkaleRecords = async () => {
    if (skalepreviousVersion != 0) {
      const data = {
        StatisticName: "LeaderboardSkaleWeekly",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: skalepreviousVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      // setpreviousVersion(parseInt(result.data.data.version));
      // console.log(result.data.data.leaderboard)
      setskalePreviousRecords(result.data.data.leaderboard);
      fillPreviousRecordsSkale(result.data.data.leaderboard);
      fetchSkaleRecondsMonthlyAroundPlayer(result.data.data.leaderboard);
    }
  };

  const fetchGenesisPreviousWinners = async () => {
    if (previousGenesisVersion != 0) {
      const data = {
        StatisticName: "GenesisLandRewards",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: previousGenesisVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      fillRecordsGenesis(result.data.data.leaderboard);

      setpreviousgenesisData(result.data.data.leaderboard);
    }
  };

  const fetchPreviousWeeklyWinners = async () => {
    if (previousWeeklyVersion != 0) {
      const data = {
        StatisticName: "WeeklyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: previousWeeklyVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );

      setweeklyplayerData(result.data.data.leaderboard);
    }
  };

  const fetchPreviousMonthlyWinners = async () => {
    if (previousMonthlyVersion != 0) {
      const data = {
        StatisticName: "MonthlyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: previousMonthlyVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );

      setmonthlyplayerData(result.data.data.leaderboard);
    }
  };

  useEffect(() => {
    fetchDailyRecords();
    fetchWeeklyRecords();
    fetchMonthlyRecords();
    fetchGenesisRecords();
    fetchSkaleRecords();
    fetchSkaleRecordsMonthly();
  }, [username, userId]);

  useEffect(() => {
    fetchGenesisPreviousWinners();
    fetchPreviousWinners();
    fetchPreviousWeeklyWinners();
    fetchPreviousMonthlyWinners();
    fetchPreviousSkaleRecords();
    fetchPreviousSkaleRecordsMonthly();
  }, [
    previousGenesisVersion,
    previousMonthlyVersion,
    previousVersion,
    previousWeeklyVersion,
    skalepreviousVersion,
  ]);

  useEffect(() => {
    if (inactiveBoard === true && optionText === "daily") {
      fetchPreviousWinners();
    }
    if (inactiveBoard === true && optionText === "weekly") {
      fetchPreviousWeeklyWinners();
    }
    if (inactiveBoard === true && optionText === "genesis") {
      fetchGenesisPreviousWinners();
    }
    if (inactiveBoard === false && optionText === "genesis") {
      fetchGenesisRecords();
    }
    if (inactiveBoard === true && optionText === "monthly") {
      fetchPreviousMonthlyWinners();
    }
  }, [
    optionText,
    inactiveBoard,
    previousVersion,
    previousWeeklyVersion,
    previousMonthlyVersion,
  ]);

  useEffect(() => {
    handleOption(optionText2);
  }, [inactiveBoard]);

  useEffect(() => {
    if (
      availableTime === null ||
      availableTime === undefined ||
      availableTime === "0"
    ) {
      setisActive(false);
    } else setisActive(true);
  }, [availableTime]);

  useEffect(() => {
    getBundles();
  }, [address]);

  useEffect(() => {
    setOptionText2("bnb");
  }, []);

  useEffect(() => {
    if (countdown === null || countdown === undefined || countdown === "0") {
      setisActive(false);
    } else setisActive(true);
  }, [countdown]);

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };
  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const today1 = new Date();

  useEffect(() => {
    setAllBnbData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: bnbStars,
        premium_rewards: bnbStarsPremium,
        activeData: dailyrecords,
        previousData: dailyplayerData,
        player_data: userData,
      },
      {
        title: "WEEKLY",
        reset: "Monday (00:00 UTC)",
        type: "cash",
        rewards: weeklyPrizesBnb,
        premium_rewards: weeklyPrizesGolden,
        activeData: weeklyrecords,
        previousData: weeklyplayerData,
        player_data: userDataWeekly,
      },
      {
        title: "MONTHLY",
        reset: "Monthly (00:00 UTC)",
        type: "stars",
        rewards: monthlyPrizesBnb,
        premium_rewards: monthlyPrizesGolden,
        activeData: monthlyrecords,
        previousData: monthlyplayerData,
        player_data: userDataMonthly,
      }
    ]
    
    );
  }, [
    dailyrecords,
    dailyplayerData,
    userData,
    weeklyrecords,
    weeklyplayerData,
    userDataWeekly,
    monthlyrecords,
    monthlyplayerData,
    userDataMonthly,
  ]);

  console.log(allBnbData);

  return (
    <>
      <div className="row w-100 justify-content-start">
   
      </div>
      <div
        className="main-wrapper py-4 w-100 d-flex gap-4 mt-xxl-0 mt-lg-0 justify-content-center align-items-start"
        style={{ minHeight: "560px" }}
      >
        <div className="row w-100 align-items-start gap-4 gap-lg-0">
          <div className="d-flex flex-column gap-3 col-12  px-0 px-lg-3 leaderboard-wrapper">
            <div className="d-none">
              {availableTime !== "0" && availableTime && (
                <Countdown
                  date={availableTime}
                  renderer={renderer}
                  onComplete={() => {
                    setcountdown();
                    setisActive(false);
                  }}
                />
              )}
            </div>
            <div className="d-flex align-items-center gap-1">
              <div className="optionsWrapper position-relative col-12">
                <div
                  className={`optionswrapper-bg ${
                    optionText2 === "skale"
                      ? "move-1"
                      : optionText2 === "core"
                      ? "move-2"
                      : optionText2 === "viction"
                      ? "move-3"
                      : ""
                  }`}
                ></div>
                <div
                  className="d-flex gap-1 align-items-center justify-content-between position-relative"
                  style={{ height: 38 }}
                >
                  <span
                    className={`
                    d-flex align-items-center gap-2
                    ${
                      optionText2 === "bnb" && "otheroptionsActive"
                    } optionText col-3`}
                    onClick={() => {
                      handleOption("bnb");
                      fetchGenesisRecords();
                    }}
                    style={{ width: "25%" }}
                  >
                    <img
                      src={optionText2 === "bnb" ? bnbActive : bnbInactive}
                      className={`${
                        optionText2 === "bnb"
                          ? "leaderboard-icon leaderboard-icon-active"
                          : "leaderboard-icon"
                      }`}
                      width={20}
                      height={20}
                      alt=""
                    />
                    {windowSize.width > 768
                      ? "BNB Chain"
                      : windowSize.width < 786 && optionText2 === "bnb"
                      ? "BNB Chain"
                      : ""}
                  </span>
                  <span
                    className={` 
                    d-flex align-items-center gap-2
                    ${
                      optionText2 === "skale" && "otheroptionsActive"
                    } optionText col-3`}
                    style={{ width: "25%" }}
                    onClick={() => {
                      handleOption("skale");
                      fetchWeeklyRecords();
                    }}
                  >
                    <img
                      src={
                        optionText2 === "skale" ? skaleActive : skaleInactive
                      }
                      className={`${
                        optionText2 === "skale"
                          ? "leaderboard-icon leaderboard-icon-active"
                          : "leaderboard-icon"
                      }`}
                      width={20}
                      height={20}
                      alt=""
                    />
                    {windowSize.width > 768
                      ? "SKALE"
                      : windowSize.width < 786 && optionText2 === "skale"
                      ? "SKALE"
                      : ""}
                  </span>
                  <span
                    className={` 
                   d-flex align-items-center gap-2
                   ${
                     optionText2 === "core" && "otheroptionsActive"
                   } optionText col-3`}
                    style={{ width: "25%" }}
                    onClick={() => {
                      handleOption("core");
                      fetchDailyRecords();
                    }}
                  >
                    <img
                      src={optionText2 === "core" ? coreActive : coreInactive}
                      className={`${
                        optionText2 === "core"
                          ? "leaderboard-icon leaderboard-icon-active"
                          : "leaderboard-icon"
                      }`}
                      width={20}
                      height={20}
                      alt=""
                    />
                    {windowSize.width > 768
                      ? "CORE"
                      : windowSize.width < 786 && optionText2 === "core"
                      ? "CORE"
                      : ""}
                  </span>
                  <span
                    className={`
                    d-flex align-items-center gap-2
                    
                    ${
                      optionText2 === "viction" && "otheroptionsActive"
                    } optionText col-3`}
                    style={{ width: "25%" }}
                    onClick={() => {
                      handleOption("viction");
                      fetchGenesisRecords();
                    }}
                  >
                    <img
                      src={
                        optionText2 === "viction"
                          ? victionActive
                          : victionInactive
                      }
                      className={`${
                        optionText2 === "viction"
                          ? "leaderboard-icon leaderboard-icon-active"
                          : "leaderboard-icon"
                      }`}
                      width={20}
                      height={20}
                      style={{ borderRadius: "50%" }}
                      alt=""
                    />
                    {windowSize.width > 768
                      ? "Viction"
                      : windowSize.width < 786 && optionText2 === "viction"
                      ? "Viction"
                      : ""}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="d-flex flex-column gap-2 tablewrapper"
              style={{ height: optionText === "genesis" ? "345px" : "384px" }}
            >
              {optionText !== "genesis" ? (
                windowSize.width > 786 ? (
                  <div className="d-flex align-items-start justify-content-between">
                    {optionText2 === "skale" ? (
                      <div
                        className={`leaderboard-item daily-skale ${
                          optionText2 === "wod" ? "blur-leaderboard" : ""
                        } d-flex flex-column gap-2 p-0`}
                      >
                        <div className="d-flex w-100 justify-content-center leaderboard-title-wrapper position-relative p-2">
                          <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                            DAILY
                          </h6>
                          <div className="d-flex flex-column px-2 reset-time-wrapper">
                            <span className="reset-time-lb">Reset time</span>
                            <span className="reset-time-lb-value">
                              Daily (00:00 UTC)
                            </span>
                          </div>
                        </div>
                        <div className="p-2">
                          <table className="playerTable w-100">
                            <tbody>
                              <tr className="playerRow">
                                <th className="playerHeader font-montserrat">
                                  Rank
                                </th>
                                <th className="playerHeader font-montserrat">
                                  Player
                                </th>
                                {optionText !== "genesis" && (
                                  <th className="playerHeader text-center font-montserrat">
                                    Score
                                  </th>
                                )}
                                {optionText !== "genesis" && (
                                  <th className="playerHeader text-center font-montserrat">
                                    Standard
                                  </th>
                                )}
                                <th className="playerHeader text-center font-montserrat">
                                  Premium
                                </th>
                              </tr>
                              {dailyrecords &&
                                inactiveBoard === false &&
                                dailyrecords.length > 0 &&
                                dailyrecords.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {playerData[index].position}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "goldenscore-inactive2"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                          <img src={starIcon} alt="" />
                                          <span className="leaderboard-text">
                                            {getFormattedNumber(
                                              skaleStars[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#F3C009" }}
                                          >
                                            {getFormattedNumber(
                                              skaleStarsPremium[index],
                                              0
                                            )}
                                          </span>
                                          <img src={premiumInactive} alt="" />
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}

                              {dailyplayerData &&
                                inactiveBoard === true &&
                                dailyplayerData.length > 0 &&
                                dailyplayerData.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {playerData[index].position}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "goldenscore-inactive2"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                          <img src={starIcon} alt="" />
                                          <span className="leaderboard-text">
                                            {getFormattedNumber(
                                              skaleStars[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#F3C009" }}
                                          >
                                            {getFormattedNumber(
                                              skaleStarsPremium[index],
                                              0
                                            )}
                                          </span>
                                          <img src={premiumInactive} alt="" />
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}

                              {inactiveBoard === true &&
                                dailyplayerData.length === 0 && (
                                  <CircularProgress
                                    size={20}
                                    style={{
                                      alignSelf: "center",
                                      margin: "auto",
                                    }}
                                  />
                                )}
                            </tbody>
                          </table>
                          {activePlayer === false &&
                            email &&
                            inactiveBoard === false &&
                            optionText !== "genesis" && (
                              <table
                                className="playerTable w-100"
                              >
                                <tbody>
                                  <tr className={`playerInnerRow-inactive`}>
                                    <td
                                      className={`playerData font-montserrat ${
                                        optionText === "genesis"
                                          ? "col-2"
                                          : "col-1"
                                      }`}
                                    >
                                      {parseInt(userData.position) + 1}
                                    </td>
                                    <td className="playerName col-3 font-montserrat">
                                      <div className="position-relative  d-flex align-items-center">
                                        {availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <img
                                              src={premiumStar}
                                              alt=""
                                              className="premium-star"
                                            />
                                            <span>
                                              {" "}
                                              {userData.displayName?.slice(
                                                0,
                                                13
                                              )}
                                              {userData.displayName?.length >
                                                13 && "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <>
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            {userData.displayName?.slice(0, 13)}
                                            {userData.displayName?.length >
                                              13 && "..."}
                                          </>
                                        )}
                                      </div>
                                    </td>
                                    <td className="playerScore col-2 text-center font-montserrat">
                                      {getFormattedNumber(
                                        userData.statValue,
                                        0
                                      )}
                                    </td>
                                    <td
                                      className={`playerReward text-center font-montserrat ${
                                        availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined &&
                                        username === userData.displayName
                                          ? "goldenscore"
                                          : "playerReward"
                                      } col-2 ${
                                        optionText !== "genesis" &&
                                        "text-center"
                                      } `}
                                    >
                                      <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                        <img src={starIcon} alt="" />

                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "gray" }}
                                        >
                                          {getFormattedNumber(
                                            skaleStars[userData.position]
                                              ? skaleStars[userData.position]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                      </div>
                                    </td>
                                    <td
                                      className={`playerReward text-center font-montserrat ${
                                        availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined &&
                                        username === userData.displayName
                                          ? "goldenscore"
                                          : "playerReward"
                                      } col-2 ${
                                        optionText !== "genesis" &&
                                        "text-center"
                                      } `}
                                    >
                                      <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "gray" }}
                                        >
                                          {getFormattedNumber(
                                            skaleStarsPremium[userData.position]
                                              ? skaleStarsPremium[
                                                  userData.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                        <img
                                          src={
                                            isPremium
                                              ? premiumIcon
                                              : premiumInactive
                                          }
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            )}
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`leaderboard-item daily-bnb ${
                          optionText2 === "wod" ? "blur-leaderboard" : ""
                        } d-flex flex-column gap-2 p-0`}
                      >
                        <div className="d-flex w-100 justify-content-center leaderboard-title-wrapper position-relative p-2">
                          <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                            DAILY
                          </h6>
                          <div className="d-flex flex-column px-2 reset-time-wrapper">
                            <span className="reset-time-lb">Reset time</span>
                            <span className="reset-time-lb-value">
                              Daily (00:00 UTC)
                            </span>
                          </div>
                        </div>
                        <div className="p-2">
                          <table className="playerTable w-100">
                            <tbody>
                              <tr className="playerRow">
                                <th className="playerHeader font-montserrat">
                                  Rank
                                </th>
                                <th className="playerHeader font-montserrat">
                                  Player
                                </th>
                                {optionText !== "genesis" && (
                                  <th className="playerHeader text-center font-montserrat">
                                    Score
                                  </th>
                                )}
                                {optionText !== "genesis" && (
                                  <th className="playerHeader text-center font-montserrat">
                                    Standard
                                  </th>
                                )}
                                <th className="playerHeader text-center font-montserrat">
                                  Premium
                                </th>
                              </tr>
                              {dailyrecords &&
                                inactiveBoard === false &&
                                dailyrecords.length > 0 &&
                                dailyrecords.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {playerData[index].position}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "goldenscore-inactive2"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                          <img src={starIcon} alt="" />
                                          <span className="leaderboard-text">
                                            {getFormattedNumber(
                                              bnbStars[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#F3C009" }}
                                          >
                                            {getFormattedNumber(
                                              bnbStarsPremium[index],
                                              0
                                            )}
                                          </span>
                                          <img src={premiumInactive} alt="" />
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}

                              {dailyplayerData &&
                                inactiveBoard === true &&
                                dailyplayerData.length > 0 &&
                                dailyplayerData.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {playerData[index].position}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "goldenscore-inactive2"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                          <img src={starIcon} alt="" />
                                          <span className="leaderboard-text">
                                            {getFormattedNumber(
                                              bnbStars[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#F3C009" }}
                                          >
                                            {getFormattedNumber(
                                              bnbStarsPremium[index],
                                              0
                                            )}
                                          </span>
                                          <img src={premiumInactive} alt="" />
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}

                              {inactiveBoard === true &&
                                dailyplayerData.length === 0 && (
                                  <CircularProgress
                                    size={20}
                                    style={{
                                      alignSelf: "center",
                                      margin: "auto",
                                    }}
                                  />
                                )}
                            </tbody>
                          </table>
                          {activePlayer === false &&
                            email &&
                            inactiveBoard === false &&
                            optionText !== "genesis" && (
                              <table
                                className="playerTable w-100"
                                // style={{ marginTop: windowSize > 600 ? "-33px" : "-20px" }}
                              >
                                <tbody>
                                  <tr className={`playerInnerRow-inactive`}>
                                    <td
                                      className={`playerData font-montserrat ${
                                        optionText === "genesis"
                                          ? "col-2"
                                          : "col-1"
                                      }`}
                                    >
                                      {parseInt(userData.position) + 1}
                                    </td>
                                    <td className="playerName col-3 font-montserrat">
                                      <div className="position-relative  d-flex align-items-center">
                                        {availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <img
                                              src={premiumStar}
                                              alt=""
                                              className="premium-star"
                                            />
                                            <span>
                                              {" "}
                                              {userData.displayName?.slice(
                                                0,
                                                13
                                              )}
                                              {userData.displayName?.length >
                                                13 && "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <>
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            {userData.displayName?.slice(0, 13)}
                                            {userData.displayName?.length >
                                              13 && "..."}
                                          </>
                                        )}
                                      </div>
                                    </td>
                                    <td className="playerScore col-2 text-center font-montserrat">
                                      {getFormattedNumber(
                                        userData.statValue,
                                        0
                                      )}
                                    </td>
                                    <td
                                      className={`playerReward text-center font-montserrat ${
                                        availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined &&
                                        username === userData.displayName
                                          ? "goldenscore"
                                          : "playerReward"
                                      } col-2 ${
                                        optionText !== "genesis" &&
                                        "text-center"
                                      } `}
                                    >
                                      <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                        <img src={starIcon} alt="" />

                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "gray" }}
                                        >
                                          {getFormattedNumber(
                                            bnbStars[userData.position]
                                              ? bnbStars[userData.position]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                      </div>
                                    </td>
                                    <td
                                      className={`playerReward text-center font-montserrat ${
                                        availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined &&
                                        username === userData.displayName
                                          ? "goldenscore"
                                          : "playerReward"
                                      } col-2 ${
                                        optionText !== "genesis" &&
                                        "text-center"
                                      } `}
                                    >
                                      <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "gray" }}
                                        >
                                          {getFormattedNumber(
                                            bnbStarsPremium[userData.position]
                                              ? bnbStarsPremium[
                                                  userData.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                        <img
                                          src={
                                            isPremium
                                              ? premiumIcon
                                              : premiumInactive
                                          }
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            )}
                        </div>
                      </div>
                    )}
                    {optionText2 === "skale" ? (
                      <div
                        className={`leaderboard-item weekly-skale ${
                          optionText2 === "wod" ? "blur-leaderboard" : ""
                        } d-flex flex-column gap-2 p-0`}
                      >
                        <div className="d-flex w-100 justify-content-center position-relative leaderboard-title-wrapper p-2">
                          <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                            WEEKLY
                          </h6>
                          <div className="d-flex flex-column px-2 reset-time-wrapper">
                            <span className="reset-time-lb">Reset time</span>
                            <span className="reset-time-lb-value">
                              Monday (00:00 UTC)
                            </span>
                          </div>
                        </div>
                        <div className="p-2">
                          <table className="playerTable w-100">
                            <tbody>
                              <tr className="playerRow">
                                <th className="playerHeader font-montserrat">
                                  Rank
                                </th>
                                <th className="playerHeader font-montserrat">
                                  Player
                                </th>
                                <th className="playerHeader text-center font-montserrat">
                                  Score
                                </th>
                                <th className="playerHeader text-center font-montserrat">
                                  Reward
                                </th>
                                <th className="playerHeader text-center font-montserrat">
                                  Golden Pass
                                </th>
                              </tr>
                              {skaleRecords &&
                                skaleRecords.length > 0 &&
                                inactiveBoard === false &&
                                skaleRecords.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "goldenscore-inactive2"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                          <span className="leaderboard-text">
                                            $
                                            {getFormattedNumber(
                                              skalePrizesWeekly[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#F3C009" }}
                                          >
                                            $
                                            {getFormattedNumber(
                                              skalePrizesWeeklyGolden[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}

                              {skalePreviousRecords &&
                                inactiveBoard === true &&
                                skalePreviousRecords.length > 0 &&
                                skalePreviousRecords.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-5 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "goldenscore-inactive2"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                          <span className="leaderboard-text">
                                            $
                                            {getFormattedNumber(
                                              skalePrizesWeekly[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#F3C009" }}
                                          >
                                            $
                                            {getFormattedNumber(
                                              skalePrizesWeeklyGolden[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                          {activeSkalePlayer === false &&
                            email &&
                            inactiveBoard === false &&
                            optionText !== "genesis" && (
                              <table
                                className="playerTable w-100"
                              >
                                <tbody>
                                  <tr className={`playerInnerRow-inactive`}>
                                    <td
                                      className={`playerData font-montserrat ${
                                        optionText === "genesis"
                                          ? "col-2"
                                          : "col-1"
                                      }`}
                                    >
                                      {parseInt(userDataSkale.position) + 1}
                                    </td>
                                    <td className="playerName col-3 font-montserrat">
                                      <div className="position-relative  d-flex align-items-center">
                                        {availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <img
                                              src={premiumStar}
                                              alt=""
                                              className="premium-star"
                                            />
                                            <span>
                                              {" "}
                                              {userDataSkale.displayName?.slice(
                                                0,
                                                13
                                              )}
                                              {userDataSkale.displayName
                                                ?.length > 13 && "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <>
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            {userDataSkale.displayName?.slice(
                                              0,
                                              13
                                            )}
                                            {userDataSkale.displayName?.length >
                                              13 && "..."}
                                          </>
                                        )}
                                      </div>
                                    </td>
                                    <td className="playerScore col-2 text-center font-montserrat">
                                      {getFormattedNumber(
                                        userDataSkale.statValue,
                                        0
                                      )}
                                    </td>
                                    <td
                                      className={`playerReward col-2 font-montserrat ${
                                        username === userData.displayName
                                          ? "goldenscore-inactive2"
                                          : "goldenscore-inactive2"
                                      }`}
                                    >
                                      <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                        <span className="leaderboard-text">
                                          $
                                          {getFormattedNumber(
                                            skalePrizesWeekly[
                                              userDataSkale.position
                                            ]
                                              ? skalePrizesWeekly[
                                                  userDataSkale.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                      </div>
                                    </td>
                                    <td
                                      className={`playerReward text-center col-2 font-montserrat ${
                                        username === userData.displayName
                                          ? "playerReward"
                                          : "playerReward"
                                      }`}
                                    >
                                      <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "#F3C009" }}
                                        >
                                          $
                                          {getFormattedNumber(
                                            skalePrizesWeeklyGolden[
                                              userDataSkale.position
                                            ]
                                              ? skalePrizesWeeklyGolden[
                                                  userDataSkale.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            )}
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`leaderboard-item weekly-bnb ${
                          optionText2 === "wod" ? "blur-leaderboard" : ""
                        } d-flex flex-column gap-2 p-0`}
                      >
                        <div className="d-flex w-100 justify-content-center position-relative leaderboard-title-wrapper p-2">
                          <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                            WEEKLY
                          </h6>
                          <div className="d-flex flex-column px-2 reset-time-wrapper">
                            <span className="reset-time-lb">Reset time</span>
                            <span className="reset-time-lb-value">
                              Monday (00:00 UTC)
                            </span>
                          </div>
                        </div>
                        <div className="p-2">
                          <table className="playerTable w-100">
                            <tbody>
                              <tr className="playerRow">
                                <th className="playerHeader font-montserrat">
                                  Rank
                                </th>
                                <th className="playerHeader font-montserrat">
                                  Player
                                </th>
                                {optionText !== "genesis" && (
                                  <th className="playerHeader text-center font-montserrat">
                                    Reward
                                  </th>
                                )}
                                {optionText === "genesis" && (
                                  <th className="playerHeader text-center font-montserrat">
                                    Stars
                                  </th>
                                )}
                                <th className="playerHeader text-center font-montserrat">
                                  Standard
                                </th>
                                <th className="playerHeader text-center font-montserrat">
                                  Golden Pass
                                </th>
                              </tr>
                              {weeklyrecords &&
                                inactiveBoard === false &&
                                weeklyrecords.length > 0 &&
                                weeklyrecords.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#fff" }}
                                          >
                                            $
                                            {getFormattedNumber(
                                              weeklyPrizesBnb[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{
                                              color: "rgb(243, 192, 9)",
                                            }}
                                          >
                                            $
                                            {getFormattedNumber(
                                              weeklyPrizesGolden[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              {weeklyplayerData &&
                                inactiveBoard === true &&
                                weeklyplayerData.length > 0 &&
                                weeklyplayerData.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#fff" }}
                                          >
                                            $
                                            {getFormattedNumber(
                                              weeklyPrizesBnb[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-3 gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{
                                              color: "rgb(243, 192, 9)",
                                            }}
                                          >
                                            $
                                            {getFormattedNumber(
                                              weeklyPrizesGolden[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              {inactiveBoard === true &&
                                ((dailyplayerData.length === 0 &&
                                  optionText === "daily") ||
                                  (weeklyplayerData.length === 0 &&
                                    optionText === "weekly") ||
                                  (monthlyplayerData.length === 0 &&
                                    optionText === "monthly")) &&
                                optionText !== "genesis" && (
                                  <CircularProgress
                                    size={20}
                                    style={{
                                      alignSelf: "center",
                                      margin: "auto",
                                    }}
                                  />
                                )}
                            </tbody>
                          </table>
                          {activePlayerWeekly === false &&
                            email &&
                            inactiveBoard === false &&
                            optionText !== "genesis" && (
                              <table
                                className="playerTable w-100"
                              >
                                <tbody>
                                  <tr className={`playerInnerRow-inactive`}>
                                    <td
                                      className={`playerData font-montserrat ${
                                        optionText === "genesis"
                                          ? "col-2"
                                          : "col-1"
                                      }`}
                                    >
                                      {parseInt(userDataWeekly.position) + 1}
                                    </td>
                                    <td className="playerName col-3 font-montserrat">
                                      <div className="position-relative  d-flex align-items-center">
                                        {availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <img
                                              src={premiumStar}
                                              alt=""
                                              className="premium-star"
                                            />
                                            <span>
                                              {" "}
                                              {userDataWeekly.displayName?.slice(
                                                0,
                                                13
                                              )}
                                              {userDataWeekly.displayName
                                                ?.length > 13 && "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <>
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            {userDataWeekly.displayName?.slice(
                                              0,
                                              13
                                            )}
                                            {userDataWeekly.displayName
                                              ?.length > 13 && "..."}
                                          </>
                                        )}
                                      </div>
                                    </td>
                                    <td className="playerScore col-2 text-center font-montserrat">
                                      {getFormattedNumber(
                                        userDataWeekly.statValue,
                                        0
                                      )}
                                    </td>
                                    <td
                                      className={`playerReward text-center col-2 font-montserrat ${
                                        username === userDataWeekly.displayName
                                          ? "playerReward"
                                          : "playerReward"
                                      }`}
                                    >
                                      <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "#fff" }}
                                        >
                                          $
                                          {getFormattedNumber(
                                            weeklyPrizesBnb[
                                              userDataWeekly.position
                                            ]
                                              ? weeklyPrizesBnb[
                                                  userDataWeekly.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                      </div>
                                    </td>
                                    <td
                                      className={`playerReward text-center col-2 font-montserrat ${
                                        username === userDataWeekly.displayName
                                          ? "playerReward"
                                          : "playerReward"
                                      }`}
                                    >
                                      <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "gray" }}
                                        >
                                          $
                                          {getFormattedNumber(
                                            weeklyPrizesGolden[
                                              userDataWeekly.position
                                            ]
                                              ? weeklyPrizesGolden[
                                                  userDataWeekly.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            )}
                        </div>
                      </div>
                    )}
                    {optionText2 === "wod" ? (
                      <div
                        className={`leaderboard-item monthly-wod d-flex flex-column gap-2 p-0`}
                      >
                        <div className="d-flex w-100 justify-content-center position-relative leaderboard-title-wrapper p-2">
                          <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                            MONTHLY
                          </h6>
                          <div className="d-flex flex-column px-2 reset-time-wrapper">
                            <span className="reset-time-lb">Reset time</span>
                            <span className="reset-time-lb-value">
                              Monthly (00:00 UTC)
                            </span>
                          </div>
                        </div>
                        <div className="p-2">
                          <table className="playerTable w-100">
                            <tbody>
                              <tr className="playerRow">
                                <th className="playerHeader font-montserrat">
                                  Rank
                                </th>
                                <th className="playerHeader font-montserrat">
                                  Player
                                </th>
                                <th className="playerHeader text-center font-montserrat">
                                  Reward
                                </th>
                              </tr>
                              {genesisData &&
                                genesisData.length > 0 &&
                                inactiveBoard === false &&
                                genesisData.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-5 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        ${getFormattedNumber(item.statValue, 0)}
                                      </td>
                                    </tr>
                                  );
                                })}

                              {previousgenesisData &&
                                inactiveBoard === true &&
                                previousgenesisData.length > 0 &&
                                previousgenesisData.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-5 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        ${getFormattedNumber(item.statValue, 0)}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                          {activePlayerGenesis === false &&
                            email &&
                            inactiveBoard === false &&
                            optionText !== "genesis" && (
                              <table
                                className="playerTable w-100"
                              >
                                <tbody>
                                  <tr className={`playerInnerRow-inactive`}>
                                    <td
                                      className={`playerData font-montserrat ${
                                        optionText === "genesis"
                                          ? "col-2"
                                          : "col-1"
                                      }`}
                                    >
                                      {parseInt(userDataGenesis.position) + 1}
                                    </td>
                                    <td className="playerName col-5 font-montserrat">
                                      <div className="position-relative  d-flex align-items-center">
                                        {availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <img
                                              src={premiumStar}
                                              alt=""
                                              className="premium-star"
                                            />
                                            <span>
                                              {" "}
                                              {userDataGenesis.displayName?.slice(
                                                0,
                                                13
                                              )}
                                              {userDataGenesis.displayName
                                                ?.length > 13 && "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <>
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            {userDataGenesis.displayName?.slice(
                                              0,
                                              13
                                            )}
                                            {userDataGenesis.displayName
                                              ?.length > 13 && "..."}
                                          </>
                                        )}
                                      </div>
                                    </td>
                                    {optionText !== "genesis" && (
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        $
                                        {getFormattedNumber(
                                          userDataGenesis.statValue,
                                          0
                                        )}
                                      </td>
                                    )}
                                  </tr>
                                </tbody>
                              </table>
                            )}
                        </div>
                      </div>
                    ) : optionText2 === "skale" ? (
                      <div
                        className={`leaderboard-item monthly-skale d-flex flex-column gap-2 p-0`}
                      >
                        <div className="d-flex w-100 justify-content-center position-relative leaderboard-title-wrapper p-2">
                          <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                            MONTHLY
                          </h6>
                          <div className="d-flex flex-column px-2 reset-time-wrapper">
                            <span className="reset-time-lb">Reset time</span>
                            <span className="reset-time-lb-value">
                              Monthly (00:00 UTC)
                            </span>
                          </div>
                        </div>
                        <div className="p-2">
                          <table className="playerTable w-100">
                            <tbody>
                              <tr className="playerRow">
                                <th className="playerHeader font-montserrat">
                                  Rank
                                </th>
                                <th className="playerHeader font-montserrat">
                                  Player
                                </th>
                                <th className="playerHeader text-center font-montserrat">
                                  Score
                                </th>

                                <th className="playerHeader text-center font-montserrat">
                                  Standard
                                </th>
                                <th className="playerHeader text-center font-montserrat">
                                  Golden Pass
                                </th>
                              </tr>
                              {skaleMonthlyData &&
                                skaleMonthlyData.length > 0 &&
                                inactiveBoard === false &&
                                skaleMonthlyData.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#fff" }}
                                          >
                                            $
                                            {getFormattedNumber(
                                              skalePrizesMonthly[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{
                                              color: "rgb(243, 192, 9)",
                                            }}
                                          >
                                            $
                                            {getFormattedNumber(
                                              skalePrizesMonthlyGolden[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}

                              {monthlyplayerData &&
                                inactiveBoard === true &&
                                monthlyplayerData.length > 0 &&
                                monthlyplayerData.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#fff" }}
                                          >
                                            $
                                            {getFormattedNumber(
                                              skalePrizesMonthly[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{
                                              color: "rgb(243, 192, 9)",
                                            }}
                                          >
                                            $
                                            {getFormattedNumber(
                                              skalePrizesMonthlyGolden[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}

                              {inactiveBoard === true &&
                                ((dailyplayerData.length === 0 &&
                                  optionText === "daily") ||
                                  (weeklyplayerData.length === 0 &&
                                    optionText === "weekly") ||
                                  (monthlyplayerData.length === 0 &&
                                    optionText === "monthly")) &&
                                optionText !== "genesis" && (
                                  <CircularProgress
                                    size={20}
                                    style={{
                                      alignSelf: "center",
                                      margin: "auto",
                                    }}
                                  />
                                )}
                            </tbody>
                          </table>
                          {activePlayerMonthly === false &&
                            email &&
                            inactiveBoard === false &&
                            optionText !== "genesis" && (
                              <table
                                className="playerTable w-100"
                              >
                                <tbody>
                                  <tr className={`playerInnerRow-inactive`}>
                                    <td
                                      className={`playerData font-montserrat ${
                                        optionText === "genesis"
                                          ? "col-2"
                                          : "col-1"
                                      }`}
                                    >
                                      {parseInt(userDataMonthly.position) + 1}
                                    </td>
                                    <td className="playerName col-3 font-montserrat">
                                      <div className="position-relative  d-flex align-items-center">
                                        {availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <img
                                              src={premiumStar}
                                              alt=""
                                              className="premium-star"
                                            />
                                            <span>
                                              {" "}
                                              {userDataSkaleMonthly.displayName?.slice(
                                                0,
                                                13
                                              )}
                                              {userDataSkaleMonthly.displayName
                                                ?.length > 13 && "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <>
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            {userDataSkaleMonthly.displayName?.slice(
                                              0,
                                              13
                                            )}
                                            {userDataSkaleMonthly.displayName
                                              ?.length > 13 && "..."}
                                          </>
                                        )}
                                      </div>
                                    </td>
                                    <td className="playerScore col-2 text-center font-montserrat">
                                      {getFormattedNumber(
                                        userDataSkaleMonthly.statValue,
                                        0
                                      )}
                                    </td>
                                    <td
                                      className={`playerReward text-center col-2 font-montserrat ${
                                        username ===
                                        userDataSkaleMonthly.displayName
                                          ? "playerReward"
                                          : "playerReward"
                                      }`}
                                    >
                                      <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "#fff" }}
                                        >
                                          $
                                          {getFormattedNumber(
                                            skalePrizesMonthly[
                                              userDataSkaleMonthly.position
                                            ]
                                              ? skalePrizesMonthly[
                                                  userDataSkaleMonthly.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                      </div>
                                    </td>
                                    <td
                                      className={`playerReward text-center col-2 font-montserrat ${
                                        username ===
                                        userDataSkaleMonthly.displayName
                                          ? "playerReward"
                                          : "playerReward"
                                      }`}
                                    >
                                      <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "gray" }}
                                        >
                                          $
                                          {getFormattedNumber(
                                            skalePrizesMonthlyGolden[
                                              userDataSkaleMonthly.position
                                            ]
                                              ? skalePrizesMonthlyGolden[
                                                  userDataSkaleMonthly.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            )}
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`leaderboard-item monthly-bnb d-flex flex-column gap-2 p-0`}
                      >
                        <div className="d-flex w-100 justify-content-center position-relative leaderboard-title-wrapper p-2">
                          <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                            MONTHLY
                          </h6>
                          <div className="d-flex flex-column px-2 reset-time-wrapper">
                            <span className="reset-time-lb">Reset time</span>
                            <span className="reset-time-lb-value">
                              Monthly (00:00 UTC)
                            </span>
                          </div>
                        </div>
                        <div className="p-2">
                          <table className="playerTable w-100">
                            <tbody>
                              <tr className="playerRow">
                                <th className="playerHeader font-montserrat">
                                  Rank
                                </th>
                                <th className="playerHeader font-montserrat">
                                  Player
                                </th>
                                <th className="playerHeader text-center font-montserrat">
                                  Score
                                </th>
                                <th className="playerHeader text-center font-montserrat">
                                  Standard
                                </th>
                                <th className="playerHeader text-center font-montserrat">
                                  Golden Pass
                                </th>
                              </tr>
                              {monthlyrecords &&
                                monthlyrecords.length > 0 &&
                                inactiveBoard === false &&
                                monthlyrecords.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#fff" }}
                                          >
                                            $
                                            {getFormattedNumber(
                                              monthlyPrizesBnb[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{
                                              color: "rgb(243, 192, 9)",
                                            }}
                                          >
                                            $
                                            {getFormattedNumber(
                                              monthlyPrizesGolden[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}

                              {monthlyplayerData &&
                                inactiveBoard === true &&
                                monthlyplayerData.length > 0 &&
                                monthlyplayerData.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#fff" }}
                                          >
                                            $
                                            {getFormattedNumber(
                                              monthlyPrizesBnb[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{
                                              color: "rgb(243, 192, 9)",
                                            }}
                                          >
                                            $
                                            {getFormattedNumber(
                                              monthlyPrizesGolden[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}

                              {inactiveBoard === true &&
                                ((dailyplayerData.length === 0 &&
                                  optionText === "daily") ||
                                  (weeklyplayerData.length === 0 &&
                                    optionText === "weekly") ||
                                  (monthlyplayerData.length === 0 &&
                                    optionText === "monthly")) &&
                                optionText !== "genesis" && (
                                  <CircularProgress
                                    size={20}
                                    style={{
                                      alignSelf: "center",
                                      margin: "auto",
                                    }}
                                  />
                                )}
                            </tbody>
                          </table>
                          {activePlayerMonthly === false &&
                            email &&
                            inactiveBoard === false &&
                            optionText !== "genesis" && (
                              <table
                                className="playerTable w-100"
                              >
                                <tbody>
                                  <tr className={`playerInnerRow-inactive`}>
                                    <td
                                      className={`playerData font-montserrat ${
                                        optionText === "genesis"
                                          ? "col-2"
                                          : "col-1"
                                      }`}
                                    >
                                      {parseInt(userDataMonthly.position) + 1}
                                    </td>
                                    <td className="playerName col-3 font-montserrat">
                                      <div className="position-relative  d-flex align-items-center">
                                        {availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <img
                                              src={premiumStar}
                                              alt=""
                                              className="premium-star"
                                            />
                                            <span>
                                              {" "}
                                              {userDataMonthly.displayName?.slice(
                                                0,
                                                13
                                              )}
                                              {userDataMonthly.displayName
                                                ?.length > 13 && "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <>
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            {userDataMonthly.displayName?.slice(
                                              0,
                                              13
                                            )}
                                            {userDataMonthly.displayName
                                              ?.length > 13 && "..."}
                                          </>
                                        )}
                                      </div>
                                    </td>
                                    <td className="playerScore col-2 text-center font-montserrat">
                                      {getFormattedNumber(
                                        userDataMonthly.statValue,
                                        0
                                      )}
                                    </td>
                                    <td
                                      className={`playerReward text-center col-2 font-montserrat ${
                                        username === userDataMonthly.displayName
                                          ? "playerReward"
                                          : "playerReward"
                                      }`}
                                    >
                                      <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "#fff" }}
                                        >
                                          $
                                          {getFormattedNumber(
                                            monthlyPrizesBnb[
                                              userDataMonthly.position
                                            ]
                                              ? monthlyPrizesBnb[
                                                  userDataMonthly.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                      </div>
                                    </td>
                                    <td
                                      className={`playerReward text-center col-2 font-montserrat ${
                                        username === userDataMonthly.displayName
                                          ? "playerReward"
                                          : "playerReward"
                                      }`}
                                    >
                                      <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "rgb(243, 192, 9)" }}
                                        >
                                          $
                                          {getFormattedNumber(
                                            monthlyPrizesGolden[
                                              userDataMonthly.position
                                            ]
                                              ? monthlyPrizesGolden[
                                                  userDataMonthly.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Slider {...settings} ref={sliderRef}>
                    {optionText2 !== "skale" && optionText2 !== "wod" && (
                      <div
                        className={`leaderboard-item daily-bnb-mobile ${
                          optionText2 === "wod" ? "blur-leaderboard" : ""
                        } d-flex flex-column gap-2 p-0`}
                      >
                        <div className="d-flex w-100 justify-content-between position-relative leaderboard-title-wrapper p-2">
                          <img
                            src={leftArrow}
                            alt=""
                            style={{ cursor: "pointer" }}
                            onClick={prevSlide}
                          />
                          <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                            DAILY
                          </h6>
                          <img
                            src={rightArrow}
                            alt=""
                            style={{ cursor: "pointer" }}
                            onClick={nextSlide}
                          />
                          <div
                            className="d-flex flex-column px-2 reset-time-wrapper"
                            style={{ right: "8%" }}
                          >
                            <span className="reset-time-lb">Reset time</span>
                            <span className="reset-time-lb-value">
                              Daily (00:00 UTC)
                            </span>
                          </div>
                        </div>
                        <div className="p-2">
                          <table className="playerTable w-100">
                            <tbody>
                              <tr className="playerRow">
                                <th className="playerHeader font-montserrat">
                                  Rank
                                </th>
                                <th className="playerHeader font-montserrat">
                                  Player
                                </th>
                                {optionText !== "genesis" && (
                                  <th className="playerHeader text-center font-montserrat">
                                    Score
                                  </th>
                                )}
                                {optionText !== "genesis" && (
                                  <th className="playerHeader text-center font-montserrat">
                                    Standard
                                  </th>
                                )}
                                <th className="playerHeader text-center font-montserrat">
                                  Premium
                                </th>
                              </tr>
                              {dailyrecords &&
                                inactiveBoard === false &&
                                dailyrecords.length > 0 &&
                                dailyrecords.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {playerData[index].position}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "goldenscore-inactive2"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                          <img src={starIcon} alt="" />
                                          <span className="leaderboard-text">
                                            {getFormattedNumber(
                                              bnbStars[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#F3C009" }}
                                          >
                                            {getFormattedNumber(
                                              bnbStarsPremium[index],
                                              0
                                            )}
                                          </span>
                                          <img src={premiumInactive} alt="" />
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}

                              {dailyplayerData &&
                                inactiveBoard === true &&
                                dailyplayerData.length > 0 &&
                                dailyplayerData.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {playerData[index].position}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "goldenscore-inactive2"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                          <img src={starIcon} alt="" />
                                          <span className="leaderboard-text">
                                            {getFormattedNumber(
                                              bnbStars[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#F3C009" }}
                                          >
                                            {getFormattedNumber(
                                              bnbStarsPremium[index],
                                              0
                                            )}
                                          </span>
                                          <img src={premiumInactive} alt="" />
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}

                              {inactiveBoard === true &&
                                dailyplayerData.length === 0 && (
                                  <CircularProgress
                                    size={20}
                                    style={{
                                      alignSelf: "center",
                                      margin: "auto",
                                    }}
                                  />
                                )}
                            </tbody>
                          </table>
                          {activePlayer === false &&
                            email &&
                            inactiveBoard === false &&
                            optionText !== "genesis" && (
                              <table
                                className="playerTable w-100"
                              >
                                <tbody>
                                  <tr className={`playerInnerRow-inactive`}>
                                    <td
                                      className={`playerData font-montserrat ${
                                        optionText === "genesis"
                                          ? "col-2"
                                          : "col-1"
                                      }`}
                                    >
                                      {parseInt(userData.position) + 1}
                                    </td>
                                    <td className="playerName col-3 font-montserrat">
                                      <div className="position-relative  d-flex align-items-center">
                                        {availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <img
                                              src={premiumStar}
                                              alt=""
                                              className="premium-star"
                                            />
                                            <span>
                                              {" "}
                                              {userData.displayName?.slice(
                                                0,
                                                13
                                              )}
                                              {userData.displayName?.length >
                                                13 && "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <>
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            {userData.displayName?.slice(0, 13)}
                                            {userData.displayName?.length >
                                              13 && "..."}
                                          </>
                                        )}
                                      </div>
                                    </td>
                                    <td className="playerScore col-2 text-center font-montserrat">
                                      {getFormattedNumber(
                                        userData.statValue,
                                        0
                                      )}
                                    </td>
                                    <td
                                      className={`playerReward text-center font-montserrat ${
                                        availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined &&
                                        username === userData.displayName
                                          ? "goldenscore"
                                          : "playerReward"
                                      } col-2 ${
                                        optionText !== "genesis" &&
                                        "text-center"
                                      } `}
                                    >
                                      <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                        <img src={starIcon} alt="" />

                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "gray" }}
                                        >
                                          {getFormattedNumber(
                                            bnbStars[userData.position]
                                              ? bnbStars[userData.position]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                      </div>
                                    </td>
                                    <td
                                      className={`playerReward text-center font-montserrat ${
                                        availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined &&
                                        username === userData.displayName
                                          ? "goldenscore"
                                          : "playerReward"
                                      } col-2 ${
                                        optionText !== "genesis" &&
                                        "text-center"
                                      } `}
                                    >
                                      <div className="d-flex align-items-center justify-content-start ms-4 gap-1">
                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "gray" }}
                                        >
                                          {getFormattedNumber(
                                            bnbStarsPremium[userData.position]
                                              ? bnbStarsPremium[
                                                  userData.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                        <img
                                          src={
                                            isPremium
                                              ? premiumIcon
                                              : premiumInactive
                                          }
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            )}
                        </div>
                      </div>
                    )}
                    {optionText2 !== "wod" &&
                      (optionText2 === "skale" ? (
                        <div className="leaderboard-item d-flex flex-column gap-2 p-2">
                          <div
                            className={`d-flex w-100 position-relative ${
                              optionText2 !== "skale"
                                ? "justify-content-between"
                                : "justify-content-center p-2"
                            } leaderboard-title-wrapper p-2`}
                          >
                            {optionText2 !== "skale" && (
                              <img
                                src={leftArrow}
                                alt=""
                                style={{ cursor: "pointer" }}
                                onClick={prevSlide}
                              />
                            )}

                            <h6
                              className="leaderboard-title  text-white font-oxanium mb-0"
                              style={{ width: "fit-content" }}
                            >
                              WEEKLY
                            </h6>
                            {optionText2 !== "skale" && (
                              <img
                                src={rightArrow}
                                alt=""
                                style={{ cursor: "pointer" }}
                                onClick={nextSlide}
                              />
                            )}
                            <div
                              className="d-flex flex-column px-2 reset-time-wrapper"
                              style={{
                                right: optionText2 !== "skale" ? "8%" : "0%",
                              }}
                            >
                              <span className="reset-time-lb">Reset time</span>
                              <span className="reset-time-lb-value">
                                Monday (00:00 UTC)
                              </span>
                            </div>
                          </div>
                          <table className="playerTable w-100">
                            <tbody>
                              <tr className="playerRow">
                                <th className="playerHeader font-montserrat">
                                  Rank
                                </th>
                                <th className="playerHeader font-montserrat">
                                  Player
                                </th>
                                {optionText !== "genesis" && (
                                  <th className="playerHeader text-center font-montserrat">
                                    Reward
                                  </th>
                                )}
                                {optionText !== "genesis" && (
                                  <th className="playerHeader text-center font-montserrat">
                                    Stars
                                  </th>
                                )}
                                <th className="playerHeader text-center font-montserrat">
                                  Score
                                </th>
                              </tr>
                              {skaleRecords &&
                                skaleRecords.length > 0 &&
                                inactiveBoard === false &&
                                skaleRecords.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "goldenscore-inactive2"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start gap-1">
                                          <img src={upgradeIcon} alt="" />
                                          <span className="leaderboard-text">
                                            $
                                            {getFormattedNumber(
                                              skalePrizesWeekly[index],
                                              0
                                            )}
                                          </span>
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "gray" }}
                                          >
                                            | $
                                            {getFormattedNumber(
                                              skalePrizesWeeklyGolden[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start gap-1">
                                          <img src={starIcon} alt="" />
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#F3C009" }}
                                          >
                                            {getFormattedNumber(
                                              skalePrizesWeekly[index],
                                              0
                                            )}
                                          </span>
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "gray" }}
                                          >
                                            |{" "}
                                            {getFormattedNumber(
                                              skalePrizesWeeklyGolden[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}

                              {skalePreviousRecords &&
                                inactiveBoard === true &&
                                skalePreviousRecords.length > 0 &&
                                skalePreviousRecords.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-5 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "goldenscore-inactive2"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start gap-1">
                                          <img src={upgradeIcon} alt="" />
                                          <span className="leaderboard-text">
                                            $
                                            {getFormattedNumber(
                                              skalePrizesWeekly[index],
                                              0
                                            )}
                                          </span>
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "gray" }}
                                          >
                                            | $
                                            {getFormattedNumber(
                                              skalePrizesWeeklyGolden[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start gap-1">
                                          <img src={starIcon} alt="" />
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#F3C009" }}
                                          >
                                            {getFormattedNumber(
                                              skalePrizesWeekly[index],
                                              0
                                            )}
                                          </span>
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "gray" }}
                                          >
                                            |{" "}
                                            {getFormattedNumber(
                                              skalePrizesWeeklyGolden[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                          {activeSkalePlayer === false &&
                            email &&
                            inactiveBoard === false &&
                            optionText !== "genesis" && (
                              <table
                                className="playerTable w-100"
                              >
                                <tbody>
                                  <tr className={`playerInnerRow-inactive`}>
                                    <td
                                      className={`playerData font-montserrat ${
                                        optionText === "genesis"
                                          ? "col-2"
                                          : "col-1"
                                      }`}
                                    >
                                      {parseInt(userDataSkale.position) + 1}
                                    </td>
                                    <td className="playerName col-5 font-montserrat">
                                      <div className="position-relative  d-flex align-items-center">
                                        {availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <img
                                              src={premiumStar}
                                              alt=""
                                              className="premium-star"
                                            />
                                            <span>
                                              {" "}
                                              {userDataSkale.displayName?.slice(
                                                0,
                                                13
                                              )}
                                              {userDataSkale.displayName
                                                ?.length > 13 && "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <>
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            {userDataSkale.displayName?.slice(
                                              0,
                                              13
                                            )}
                                            {userDataSkale.displayName?.length >
                                              13 && "..."}
                                          </>
                                        )}
                                      </div>
                                    </td>
                                    <td className="playerScore col-2 text-center font-montserrat">
                                      {getFormattedNumber(
                                        userDataSkale.statValue,
                                        0
                                      )}
                                    </td>
                                    <td
                                      className={`playerReward col-2 font-montserrat ${
                                        username === userDataSkale.displayName
                                          ? "goldenscore"
                                          : "goldenscore-inactive2"
                                      }`}
                                    >
                                      <div className="d-flex align-items-center justify-content-start gap-1">
                                        <img src={upgradeIcon} alt="" />
                                        <span className="leaderboard-text">
                                          $
                                          {getFormattedNumber(
                                            skalePrizesWeekly[
                                              userDataSkale.position
                                            ]
                                              ? skalePrizesWeekly[
                                                  userDataSkale.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "gray" }}
                                        >
                                          | $
                                          {getFormattedNumber(
                                            skalePrizesWeeklyGolden[
                                              userDataSkale.position
                                            ]
                                              ? skalePrizesWeeklyGolden[
                                                  userDataSkale.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                      </div>
                                    </td>
                                    <td
                                      className={`playerReward text-center col-2 font-montserrat ${
                                        username === userDataSkale.displayName
                                          ? "goldenscore"
                                          : "playerReward"
                                      }`}
                                    >
                                      <div className="d-flex align-items-center justify-content-start gap-1">
                                        <img src={starIcon} alt="" />
                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "#F3C009" }}
                                        >
                                          {getFormattedNumber(
                                            skalePrizesWeekly[
                                              userDataSkale.position
                                            ]
                                              ? skalePrizesWeekly[
                                                  userDataSkale.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "gray" }}
                                        >
                                          |{" "}
                                          {getFormattedNumber(
                                            skalePrizesWeeklyGolden[
                                              userDataSkale.position
                                            ]
                                              ? skalePrizesWeeklyGolden[
                                                  userDataSkale.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            )}
                        </div>
                      ) : (
                        <div className="leaderboard-item d-flex flex-column gap-2 p-2">
                          <div
                            className={`d-flex w-100 position-relative ${
                              optionText2 !== "skale"
                                ? "justify-content-between"
                                : "justify-content-center p-2"
                            } leaderboard-title-wrapper p-2`}
                          >
                            {optionText2 !== "skale" && (
                              <img
                                src={leftArrow}
                                alt=""
                                style={{ cursor: "pointer" }}
                                onClick={prevSlide}
                              />
                            )}
                            <h6
                              className="leaderboard-title  text-white font-oxanium mb-0"
                              style={{ width: "fit-content" }}
                            >
                              WEEKLY
                            </h6>
                            {optionText2 !== "skale" && (
                              <img
                                src={rightArrow}
                                alt=""
                                style={{ cursor: "pointer" }}
                                onClick={nextSlide}
                              />
                            )}
                            <div
                              className="d-flex flex-column px-2 reset-time-wrapper"
                              style={{
                                right: optionText2 !== "skale" ? "8%" : "0%",
                              }}
                            >
                              <span className="reset-time-lb">Reset time</span>
                              <span className="reset-time-lb-value">
                                Monday (00:00 UTC)
                              </span>
                            </div>
                          </div>
                          <table className="playerTable w-100">
                            <tbody>
                              <tr className="playerRow">
                                <th className="playerHeader font-montserrat">
                                  Rank
                                </th>
                                <th className="playerHeader font-montserrat">
                                  Player
                                </th>
                                {optionText !== "genesis" && (
                                  <th className="playerHeader text-center font-montserrat">
                                    Reward
                                  </th>
                                )}

                                <th className="playerHeader text-center font-montserrat">
                                  Score
                                </th>
                              </tr>
                              {weeklyrecords &&
                                inactiveBoard === false &&
                                weeklyrecords.length > 0 &&
                                weeklyrecords.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "goldenscore-inactive2"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start gap-1">
                                          <img src={upgradeIcon} alt="" />
                                          <span className="leaderboard-text">
                                            $
                                            {getFormattedNumber(
                                              weeklyPrizesBnb[index],
                                              0
                                            )}
                                          </span>
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "gray" }}
                                          >
                                            | $
                                            {getFormattedNumber(
                                              weeklyPrizesGolden[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              {weeklyplayerData &&
                                inactiveBoard === true &&
                                weeklyplayerData.length > 0 &&
                                weeklyplayerData.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-5 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>

                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "goldenscore-inactive2"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start gap-1">
                                          <img src={upgradeIcon} alt="" />
                                          <span className="leaderboard-text">
                                            $
                                            {getFormattedNumber(
                                              weeklyPrizesBnb[index],
                                              0
                                            )}
                                          </span>
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "gray" }}
                                          >
                                            | $
                                            {getFormattedNumber(
                                              weeklyPrizesGolden[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              {inactiveBoard === true &&
                                ((dailyplayerData.length === 0 &&
                                  optionText === "daily") ||
                                  (weeklyplayerData.length === 0 &&
                                    optionText === "weekly") ||
                                  (monthlyplayerData.length === 0 &&
                                    optionText === "monthly")) &&
                                optionText !== "genesis" && (
                                  <CircularProgress
                                    size={20}
                                    style={{
                                      alignSelf: "center",
                                      margin: "auto",
                                    }}
                                  />
                                )}
                            </tbody>
                          </table>
                          {activePlayerWeekly === false &&
                            email &&
                            inactiveBoard === false &&
                            optionText !== "genesis" && (
                              <table
                                className="playerTable w-100"
                                // style={{ marginTop: windowSize > 600 ? "-33px" : "-20px" }}
                              >
                                <tbody>
                                  <tr className={`playerInnerRow-inactive`}>
                                    <td
                                      className={`playerData font-montserrat ${
                                        optionText === "genesis"
                                          ? "col-2"
                                          : "col-1"
                                      }`}
                                    >
                                      {parseInt(userDataWeekly.position) + 1}
                                    </td>
                                    <td className="playerName col-3 font-montserrat">
                                      <div className="position-relative  d-flex align-items-center">
                                        {availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <img
                                              src={premiumStar}
                                              alt=""
                                              className="premium-star"
                                            />
                                            <span>
                                              {" "}
                                              {userDataWeekly.displayName?.slice(
                                                0,
                                                13
                                              )}
                                              {userDataWeekly.displayName
                                                ?.length > 13 && "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <>
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            {userDataWeekly.displayName?.slice(
                                              0,
                                              13
                                            )}
                                            {userDataWeekly.displayName
                                              ?.length > 13 && "..."}
                                          </>
                                        )}
                                      </div>
                                    </td>
                                    <td className="playerScore col-2 text-center font-montserrat">
                                      {getFormattedNumber(
                                        userDataWeekly.statValue,
                                        0
                                      )}
                                    </td>
                                    <td
                                      className={`playerReward col-2 font-montserrat ${
                                        username === userDataWeekly.displayName
                                          ? "goldenscore-inactive2"
                                          : "goldenscore-inactive2"
                                      }`}
                                    >
                                      <div className="d-flex align-items-center justify-content-start gap-1">
                                        <img src={upgradeIcon} alt="" />
                                        <span className="leaderboard-text">
                                          $
                                          {getFormattedNumber(
                                            weeklyPrizesBnb[
                                              userDataWeekly.position
                                            ]
                                              ? weeklyPrizesBnb[
                                                  userDataWeekly.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "gray" }}
                                        >
                                          | $
                                          {getFormattedNumber(
                                            weeklyPrizesGolden[
                                              userDataWeekly.position
                                            ]
                                              ? weeklyPrizesGolden[
                                                  userDataWeekly.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            )}
                        </div>
                      ))}
                    {optionText2 !== "skale" &&
                      (optionText2 === "wod" ? (
                        <div className="leaderboard-item d-flex flex-column gap-2 p-2">
                          <div
                            className={`d-flex w-100 position-relative ${
                              optionText2 !== "wod"
                                ? "justify-content-between"
                                : "justify-content-center p-2"
                            } leaderboard-title-wrapper p-2`}
                          >
                            {optionText2 !== "wod" && (
                              <img
                                src={leftArrow}
                                alt=""
                                style={{ cursor: "pointer" }}
                                onClick={prevSlide}
                              />
                            )}
                            <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                              MONTHLY
                            </h6>
                            {optionText2 !== "wod" && (
                              <img
                                src={rightArrow}
                                alt=""
                                style={{ cursor: "pointer" }}
                                onClick={nextSlide}
                              />
                            )}
                            <div
                              className="d-flex flex-column px-2 reset-time-wrapper"
                              style={{
                                right: optionText2 !== "wod" ? "5%" : "0%",
                              }}
                            >
                              <span className="reset-time-lb">Reset time</span>
                              <span className="reset-time-lb-value">
                                Monthly (00:00 UTC)
                              </span>
                            </div>
                          </div>
                          <table className="playerTable w-100">
                            <tbody>
                              <tr className="playerRow">
                                <th className="playerHeader font-montserrat">
                                  Rank
                                </th>
                                <th className="playerHeader font-montserrat">
                                  Player
                                </th>
                                {optionText !== "genesis" && (
                                  <th className="playerHeader text-center font-montserrat">
                                    Reward
                                  </th>
                                )}
                              </tr>
                              {genesisData &&
                                genesisData.length > 0 &&
                                inactiveBoard === false &&
                                genesisData.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-5 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        ${getFormattedNumber(item.statValue, 0)}
                                      </td>
                                    </tr>
                                  );
                                })}

                              {previousgenesisData &&
                                inactiveBoard === true &&
                                previousgenesisData.length > 0 &&
                                previousgenesisData.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-5 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        ${getFormattedNumber(item.statValue, 0)}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                          {activePlayerGenesis === false &&
                            email &&
                            inactiveBoard === false &&
                            optionText !== "genesis" && (
                              <table
                                className="playerTable w-100"
                              >
                                <tbody>
                                  <tr className={`playerInnerRow-inactive`}>
                                    <td
                                      className={`playerData font-montserrat ${
                                        optionText === "genesis"
                                          ? "col-2"
                                          : "col-1"
                                      }`}
                                    >
                                      {parseInt(userDataGenesis.position) + 1}
                                    </td>
                                    <td className="playerName col-5 font-montserrat">
                                      <div className="position-relative  d-flex align-items-center">
                                        {availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <img
                                              src={premiumStar}
                                              alt=""
                                              className="premium-star"
                                            />
                                            <span>
                                              {" "}
                                              {userDataGenesis.displayName?.slice(
                                                0,
                                                13
                                              )}
                                              {userDataGenesis.displayName
                                                ?.length > 13 && "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <>
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            {userDataGenesis.displayName?.slice(
                                              0,
                                              13
                                            )}
                                            {userDataGenesis.displayName
                                              ?.length > 13 && "..."}
                                          </>
                                        )}
                                      </div>
                                    </td>
                                    {optionText !== "genesis" && (
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        $
                                        {getFormattedNumber(
                                          userDataGenesis.statValue,
                                          0
                                        )}
                                      </td>
                                    )}
                                  </tr>
                                </tbody>
                              </table>
                            )}
                        </div>
                      ) : (
                        <div className="leaderboard-item d-flex flex-column gap-2 p-2">
                          <div
                            className={`d-flex w-100 position-relative ${
                              optionText2 !== "wod"
                                ? "justify-content-between"
                                : "justify-content-center p-2"
                            } leaderboard-title-wrapper p-2`}
                          >
                            {optionText2 !== "wod" && (
                              <img
                                src={leftArrow}
                                alt=""
                                style={{ cursor: "pointer" }}
                                onClick={prevSlide}
                              />
                            )}
                            <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                              MONTHLY
                            </h6>
                            {optionText2 !== "wod" && (
                              <img
                                src={rightArrow}
                                alt=""
                                style={{ cursor: "pointer" }}
                                onClick={nextSlide}
                              />
                            )}
                            <div
                              className="d-flex flex-column px-2 reset-time-wrapper"
                              style={{
                                right: optionText2 !== "wod" ? "5%" : "0%",
                              }}
                            >
                              <span className="reset-time-lb">Reset time</span>
                              <span className="reset-time-lb-value">
                                Monthly (00:00 UTC)
                              </span>
                            </div>
                          </div>
                          <table className="playerTable w-100">
                            <tbody>
                              <tr className="playerRow">
                                <th className="playerHeader font-montserrat">
                                  Rank
                                </th>
                                <th className="playerHeader font-montserrat">
                                  Player
                                </th>
                                {optionText !== "genesis" && (
                                  <th className="playerHeader text-center font-montserrat">
                                    Reward
                                  </th>
                                )}
                                {optionText !== "genesis" && (
                                  <th className="playerHeader text-center font-montserrat">
                                    Score
                                  </th>
                                )}
                              </tr>
                              {monthlyrecords &&
                                monthlyrecords.length > 0 &&
                                inactiveBoard === false &&
                                monthlyrecords.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "goldenscore-inactive2"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start gap-1">
                                          <img src={upgradeIcon} alt="" />
                                          <span className="leaderboard-text">
                                            $
                                            {getFormattedNumber(
                                              monthlyPrizesBnb[index],
                                              0
                                            )}
                                          </span>
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "gray" }}
                                          >
                                            | $
                                            {getFormattedNumber(
                                              monthlyPrizesGolden[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}

                              {monthlyplayerData &&
                                inactiveBoard === true &&
                                monthlyplayerData.length > 0 &&
                                monthlyplayerData.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-5 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {" "}
                                              {item.displayName?.slice(0, 10)}
                                              {item.displayName?.length > 10 &&
                                                "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />{" "}
                                            {item.displayName?.slice(0, 10)}
                                            {item.displayName?.length > 10 &&
                                              "..."}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {getFormattedNumber(item.statValue, 0)}
                                      </td>
                                      <td
                                        className={`playerReward col-2 font-montserrat ${
                                          username === item.displayName
                                            ? "goldenscore"
                                            : "goldenscore-inactive2"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start gap-1">
                                          <img src={upgradeIcon} alt="" />
                                          <span className="leaderboard-text">
                                            $
                                            {getFormattedNumber(
                                              monthlyPrizesBnb[index],
                                              0
                                            )}
                                          </span>
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "gray" }}
                                          >
                                            | $
                                            {getFormattedNumber(
                                              monthlyPrizesGolden[index],
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}

                              {inactiveBoard === true &&
                                ((dailyplayerData.length === 0 &&
                                  optionText === "daily") ||
                                  (weeklyplayerData.length === 0 &&
                                    optionText === "weekly") ||
                                  (monthlyplayerData.length === 0 &&
                                    optionText === "monthly")) &&
                                optionText !== "genesis" && (
                                  <CircularProgress
                                    size={20}
                                    style={{
                                      alignSelf: "center",
                                      margin: "auto",
                                    }}
                                  />
                                )}
                            </tbody>
                          </table>
                          {activePlayerMonthly === false &&
                            email &&
                            inactiveBoard === false &&
                            optionText !== "genesis" && (
                              <table
                                className="playerTable w-100"
                              >
                                <tbody>
                                  <tr className={`playerInnerRow-inactive`}>
                                    <td
                                      className={`playerData font-montserrat ${
                                        optionText === "genesis"
                                          ? "col-2"
                                          : "col-1"
                                      }`}
                                    >
                                      {parseInt(userDataMonthly.position) + 1}
                                    </td>
                                    <td className="playerName col-3 font-montserrat">
                                      <div className="position-relative  d-flex align-items-center">
                                        {availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <img
                                              src={premiumStar}
                                              alt=""
                                              className="premium-star"
                                            />
                                            <span>
                                              {" "}
                                              {userDataMonthly.displayName?.slice(
                                                0,
                                                13
                                              )}
                                              {userDataMonthly.displayName
                                                ?.length > 13 && "..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <>
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            {userDataMonthly.displayName?.slice(
                                              0,
                                              13
                                            )}
                                            {userDataMonthly.displayName
                                              ?.length > 13 && "..."}
                                          </>
                                        )}
                                      </div>
                                    </td>
                                    <td className="playerScore col-2 text-center font-montserrat">
                                      {getFormattedNumber(
                                        userDataMonthly.statValue,
                                        0
                                      )}
                                    </td>
                                    <td
                                      className={`playerReward col-2 font-montserrat ${
                                        username === userDataMonthly.displayName
                                          ? "goldenscore-inactive2"
                                          : "goldenscore-inactive2"
                                      }`}
                                    >
                                      <div className="d-flex align-items-center justify-content-start gap-1">
                                        <img src={upgradeIcon} alt="" />
                                        <span className="leaderboard-text">
                                          $
                                          {getFormattedNumber(
                                            monthlyPrizesBnb[
                                              userDataMonthly.position
                                            ]
                                              ? monthlyPrizesBnb[
                                                  userDataMonthly.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                        <span
                                          className="leaderboard-text"
                                          style={{ color: "gray" }}
                                        >
                                          | $
                                          {getFormattedNumber(
                                            monthlyPrizesGolden[
                                              userDataMonthly.position
                                            ]
                                              ? monthlyPrizesGolden[
                                                  userDataMonthly.position
                                                ]
                                              : 0,
                                            0
                                          )}
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            )}
                        </div>
                      ))}
                  </Slider>
                )
              ) : (
                <ComingSoon
                  optionText={optionText}
                  data={genesisData}
                  username={username}
                  inactiveBoard={inactiveBoard}
                />
              )}
            </div>
            <div className="optionsWrapper2 p-2">
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between gap-2 align-items-center">
                  <span className="viewWinners">View previous winners</span>
                  <Switch
                    {...label}
                    onChange={() => {
                      setInactiveBoard(!inactiveBoard);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewLeaderBoard;
