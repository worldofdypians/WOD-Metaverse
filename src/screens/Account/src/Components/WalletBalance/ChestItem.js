import React, { useEffect, useState } from "react";

import chestLock from "./chestImages/chestLock.svg";
import Web3 from "web3";
import axios from "axios";

const ChestItem = ({
  chestId,
  chestTitle,
  open,
  closedImg,
  rewardTypes,
  chestIndex,
  onLoadingChest,
  isPremium,
  address,
  disableBtn,
  email,
  onClaimRewards,
  handleShowRewards,
  chainId,
  coinbase,
  isActive,
  isActiveIndex,
  premiumChestIndex,
}) => {
  const [chestStatus, setchestStatus] = useState("initial");
  const [openRandom, setOpenRandom] = useState(1);
  const [ischestOpen, setIsChestOpen] = useState(false);

  const getUserRewardsByChest2 = async (
    userEmail,
    txHash,
    chestId,
    chainText
  ) => {
   
    const userData = {
      transactionHash: txHash,
      emailAddress: userEmail,
      chestIndex: chestId,
    };

    const userData_bnb = {
      transactionHash: txHash,
      emailAddress: userEmail,
      chestIndex: chestId,
      chainId: chainText,
    };

    if (chainText) {
      const result = await axios.post(
        "https://worldofdypiansdailybonus.azurewebsites.net/api/CollectChest",
        userData_bnb
      );
      if (result.status === 200) {
        onClaimRewards(result.data);
        setIsChestOpen(true);
        setchestStatus("success");
        onLoadingChest(false);
      }

      else {
        onLoadingChest(false);
        setIsChestOpen(false);
        window.alertify.error(result?.message);
        setchestStatus("initial");
      }
     
    } else {
      const result = await axios.post(
        "https://worldofdypiansdailybonus.azurewebsites.net/api/CollectChest",
        userData
      );
      if (result.status === 200) {
        onClaimRewards(result.data);
        setIsChestOpen(true);
        setchestStatus("success");
        onLoadingChest(false);
      }
      else {
        onLoadingChest(false);
        setIsChestOpen(false);
        window.alertify.error(result?.message);
        setchestStatus("initial");
      }
       
    }
  };

  const getUserRewardsByChest = async (
    userEmail,
    txHash,
    chestId,
    chainText
  ) => {
   
    const userData = {
      transactionHash: txHash,
      emailAddress: userEmail,
      chestIndex: chestId,
    };

    const userData_bnb = {
      transactionHash: txHash,
      emailAddress: userEmail,
      chestIndex: chestId,
      chainId: chainText,
    };

    if (chainText) {
      const result = await axios.post(
        "https://worldofdypiansdailybonus.azurewebsites.net/api/CollectChest",
        userData_bnb
      );
      if (result.status === 200) {
        onClaimRewards(result.data);
        setIsChestOpen(true);
        setchestStatus("success");
        onLoadingChest(false);
      }
      else if (result.status === 400) {
        getUserRewardsByChest2(userEmail, txHash, chestId, chainText);
      }
    } else {
      const result = await axios.post(
        "https://worldofdypiansdailybonus.azurewebsites.net/api/CollectChest",
        userData
      );
      if (result.status === 200) {
        onClaimRewards(result.data);
        setIsChestOpen(true);
        setchestStatus("success");
        onLoadingChest(false);
      }
      else if (result.status === 400) {
        getUserRewardsByChest2(userEmail, txHash, chestId, chainText);
      }
    }
  };

  const handleOpenChest = async () => {
    setchestStatus("loading");
    onLoadingChest(true);
    window.web3 = new Web3(window.ethereum);
    // console.log(window.config.daily_bonus_address, address);
    const daily_bonus_contract = new window.web3.eth.Contract(
      window.DAILY_BONUS_ABI,
      window.config.daily_bonus_address
    );

    const daily_bonus_contract_bnb = new window.web3.eth.Contract(
      window.DAILY_BONUS_BNB_ABI,
      window.config.daily_bonus_bnb_address
    );

    // console.log(daily_bonus_contract);
    if (chainId === 204) {
      if (rewardTypes === "premium" && isPremium) {
     
        await daily_bonus_contract.methods
          .openPremiumChest()
          .send({
            from: address
          })
          // .then(() => {
          //   setTimeout(() => {
          //     // onOpenChest();
          //     setchestStatus("success");
          //     // setIsChestOpen(true);
          //     onLoadingChest(false);
          //   }, 3000);
          // })
          .then((data) => {
            setOpenRandom(Math.floor(Math.random() * 2) + 1);
            getUserRewardsByChest(email, data.transactionHash, chestIndex + 9);
          })
          .catch((e) => {
            window.alertify.error(e?.message);
            setchestStatus("initial");
            onLoadingChest(false);

            console.error(e);
          });
      } else if (rewardTypes === "standard") {
   
        await daily_bonus_contract.methods
          .openChest()
          .send({
            from: address
          })
          .then((data) => {
            getUserRewardsByChest(email, data.transactionHash, chestIndex - 1);
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);
            setchestStatus("initial");
            onLoadingChest(false);
          });
      }
    } else if (chainId === 56) {
      if (rewardTypes === "premium" && isPremium) {

        const web3 = new Web3(window.ethereum);
        const gasPrice = await web3.eth.getGasPrice();
        console.log("gasPrice", gasPrice);
        const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
        const increasedGwei = parseInt(currentGwei) + 1;
        console.log("increasedGwei", increasedGwei);
    
        const transactionParameters = {
          gasPrice: web3.utils.toWei(increasedGwei.toString(), "gwei"),
        };
    
        await daily_bonus_contract_bnb.methods
        .openPremiumChest()
          .estimateGas({ from: address })
          .then((gas) => {
            transactionParameters.gas = web3.utils.toHex(gas);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(transactionParameters);

        await daily_bonus_contract_bnb.methods
          .openPremiumChest()
          .send({
            from: address, ...transactionParameters
          })
          // .then(() => {
          //
          //   setTimeout(() => {
          //     onOpenChest();
          //     setchestStatus("success");
          //     // setIsChestOpen(true);
          //     onLoadingChest(false);
          //   }, 3000);
          // })
          .then((data) => {
            setOpenRandom(Math.floor(Math.random() * 2) + 1);

            getUserRewardsByChest(
              email,
              data.transactionHash,
              chestIndex + 9,
              "bnb"
            );
          })
          .catch((e) => {
            window.alertify.error(e?.message);
            setchestStatus("initial");
            onLoadingChest(false);

            console.error(e);
          });
      } else if (rewardTypes === "standard") {
        // console.log("standard");

        const web3 = new Web3(window.ethereum);
        const gasPrice = await web3.eth.getGasPrice();
        console.log("gasPrice", gasPrice);
        const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
        const increasedGwei = parseInt(currentGwei) + 1;
        console.log("increasedGwei", increasedGwei);
    
        const transactionParameters = {
          gasPrice: web3.utils.toWei(increasedGwei.toString(), "gwei"),
        };
    
        await daily_bonus_contract_bnb.methods
        .openChest()
          .estimateGas({ from: address })
          .then((gas) => {
            transactionParameters.gas = web3.utils.toHex(gas);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(transactionParameters);

        await daily_bonus_contract_bnb.methods
          .openChest()
          .send({
            from: address, ...transactionParameters
          })
          .then((data) => {
            setOpenRandom(Math.floor(Math.random() * 2) + 1);

            getUserRewardsByChest(
              email,
              data.transactionHash,
              chestIndex - 1,
              "bnb"
            );
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);
            setchestStatus("initial");
            onLoadingChest(false);
          });
      }
    }
  };

  const handleChestClick = () => {
    if (!disableBtn || open) {
      if (!open && !ischestOpen) {
        handleOpenChest();
        handleShowRewards(100, 100);
      } else {
        handleShowRewards(
          chestId,
          rewardTypes === "standard" ? chestIndex - 1 : chestIndex + 9
        );
        console.log();
      }
    }
  };

  useEffect(() => {
    if (!isPremium && rewardTypes === "premium") {
      setIsChestOpen(false);
    }
  }, [isPremium, rewardTypes]);

  useEffect(() => {
    setIsChestOpen(false);
  }, [isPremium, rewardTypes]);

  return (
    <div
      className={` reward-chest ${
        (open || ischestOpen) &&
        (isActive !== chestId || isActiveIndex !== chestIndex)
          ? "reward-chest-open"
          : (open || ischestOpen) &&
            isActive === chestId &&
            isActiveIndex === chestIndex
          ? "reward-chest-open-active"
          : !open && !ischestOpen && chestStatus === "loading"
          ? "reward-chest-closed-loading"
          : "reward-chest-closed"
      } position-relative d-flex flex-column align-items-center justify-content-center gap-2`}
      style={{
        pointerEvents:
          (rewardTypes === "premium" && !isPremium) ||
          (disableBtn && !open && !ischestOpen) ||
          (chainId !== 204 && chainId !== 56 && !open && !ischestOpen) ||
          !coinbase
            ? "none"
            : "auto",
      }}
      onClick={handleChestClick}
    >
      <div
        className={`chest-number ${
          open || ischestOpen ? "number-open" : "number-closed"
        } d-flex align-items-center justify-content-center`}
      >
        <span className="chest-number-text mb-0">{chestIndex}</span>
      </div>
      <div className="position-relative">
        {rewardTypes === "premium" && !isPremium && (
          <img src={chestLock} alt="" className="chest-lock" />
        )}
        {rewardTypes === "premium" ? (
          <img
            src={
              (open || ischestOpen) && premiumChestIndex <= 5
                ? require(`./chestImages/premium/${closedImg}OpenCoins.png`)
                : (open || ischestOpen) && premiumChestIndex > 5
                ? require(`./chestImages/premium/${closedImg}OpenGems.png`)
                : require(`./chestImages/premium/${closedImg}.png`)
            }
            className={`chest-image ${
              chestStatus === "loading" && "shake-bottom-animation"
            } ${chestStatus === "success" && "fade-in-animation"} ${
              rewardTypes === "premium" && !isPremium && "chest-blur"
            }`}
            alt=""
          />
        ) : (
          <img
            src={
              (open || ischestOpen) && closedImg
                ? require(`./chestImages/${closedImg}open.png`)
                : require(`./chestImages/${closedImg}.png`)
            }
            className={`chest-image ${
              chestStatus === "loading" && "shake-bottom-animation"
            } ${chestStatus === "success" && "fade-in-animation"} ${
              rewardTypes === "premium" && !isPremium && "chest-blur"
            }`}
            alt=""
          />
        )}
      </div>
      <div className="d-flex flex-column">
        <h6
          className="chest-title mb-0"
          style={{ opacity: rewardTypes === "premium" && !isPremium && "0.1" }}
        >
          {chestTitle?.split(" ")[0]}
        </h6>
        <h6
          className="chest-title mb-0"
          style={{ opacity: rewardTypes === "premium" && !isPremium && "0.1" }}
        >
          {chestTitle?.split(" ")[1]}
        </h6>
        <div
          className="d-flex w-100 justify-content-center position-absolute"
          style={{
            cursor:
              (disableBtn && !open && !ischestOpen) ||
              (chainId !== 204 && chainId !== 56 && !open && !ischestOpen) ||
              !coinbase ||
              (rewardTypes === "premium" && !isPremium)
                ? "not-allowed"
                : "pointer",
            bottom: "-16px",
            left: 0,
          }}
        >
          <button
            className={` ${
              open || ischestOpen ? "claimed-chest-btn" : "claim-chest-btn"
            } btn  d-flex align-items-center justify-content-center position-relative`}
            style={{
              pointerEvents:
                disableBtn ||
                (chainId !== 204 && chainId !== 56) ||
                !coinbase ||
                (rewardTypes === "premium" && !isPremium)
                  ? "none"
                  : "auto",
            }}
          >
            <span className="mb-0">
              {open || ischestOpen ? (
                "Claimed"
              ) : !open && !ischestOpen && chestStatus === "loading" ? (
                <div
                  className="spinner-border "
                  role="status"
                  style={{ height: "14px", width: "14px" }}
                ></div>
              ) : (
                "Claim"
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChestItem;
