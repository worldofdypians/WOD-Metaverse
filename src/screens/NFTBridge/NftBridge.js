import React, { useState, useEffect } from "react";
import "./_nftbridge.scss";
import useWindowSize from "../../hooks/useWindowSize";
import MobileNav from "../../components/MobileNav/MobileNav";
import MarketSidebar from "../../components/MarketSidebar/MarketSidebar";
 
import NftPopup from "./NftPopup";
 
import { handleSwitchNetworkhook } from "../../hooks/hooks";
import Web3 from "web3";
import { ethers } from "ethers";

const NFTBridge = ({
  coinbase,
  showWalletConnect,
  chainId,
  isConnected,
  myNFTSLand,
  myNFTSCaws,
  handleSwitchNetwork,
  onSuccessTransfer,
  handleSwitchChainBinanceWallet,
  handleSwitchChainGateWallet,
  binanceWallet,
  binanceW3WProvider,
}) => {
  const windowSize = useWindowSize();
  const [filterTitle, setFilterTitle] = useState("");
  const [destinationFilterTitle, setDestinationFilterTitle] =
    useState("Select");
  const [destinationFilterArray, setDestinationFilterArray] = useState([]);
  const [selectNftId, setSelectedNftId] = useState(0);

  const [showPopup, setshowPopup] = useState(false);
  const [nftType, setnftType] = useState("land");
  const [finalNftType, setfinalNftType] = useState("");
  const [buttonText, setbuttonText] = useState("Approve");
  const [isApproved, setisApproved] = useState(false);
  const [buttonStatus, setbuttonStatus] = useState("initial");

  const showNftSelectionPopup = () => {
    setshowPopup(true);
  };

  const handleEthPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet && window.WALLET_TYPE !== "binance") {
        await handleSwitchNetworkhook("0x1")
          .then(() => {
            handleSwitchNetwork(1);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (window.gatewallet && window.WALLET_TYPE !== "binance") {
        handleSwitchChainGateWallet(1);
      } else if (binanceWallet && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(1);
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(1);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };
  // console.log(avatar);
  const handleBnbPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet && window.WALLET_TYPE !== "binance") {
        await handleSwitchNetworkhook("0x38")
          .then(() => {
            handleSwitchNetwork(56);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (window.gatewallet && window.WALLET_TYPE !== "binance") {
        handleSwitchChainGateWallet(56);
      } else if (binanceWallet && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(56);
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(56);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleAvaxPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet && window.WALLET_TYPE !== "binance") {
        await handleSwitchNetworkhook("0xa86a")
          .then(() => {
            handleSwitchNetwork(43114);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (window.gatewallet && window.WALLET_TYPE !== "binance") {
        handleSwitchChainGateWallet(43114);
      } else if (binanceWallet && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(43114);
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(43114);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleBasePool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet && window.WALLET_TYPE !== "binance") {
        await handleSwitchNetworkhook("0x2105")
          .then(() => {
            handleSwitchNetwork(8453);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (window.gatewallet && window.WALLET_TYPE !== "binance") {
        handleSwitchChainGateWallet(8453);
      } else if (binanceWallet && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(8453);
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(8453);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const updateDestinationFilterTitle = (filterText) => {
    const allChainArray = [
      { title: "Ethereum", logo: "eth" },
      { title: "BNB Chain", logo: "bnb" },
      { title: "Avalanche", logo: "avax" },
      { title: "Base Network", logo: "base" },
    ];
    if (filterText === "Ethereum") {
      setDestinationFilterArray(allChainArray.slice(1, 4));
      setDestinationFilterTitle("Select");
    } else {
      setDestinationFilterArray(allChainArray.slice(0, 1));
      setDestinationFilterTitle("Ethereum");
    }
  };

  const getMessageState = (status) => {
    const messageExecutionState = {
      0: "UNTOUCHED",
      1: "IN_PROGRESS",
      2: "SUCCESS",
      3: "FAILURE",
    };

    if (status in messageExecutionState) {
      return messageExecutionState[status];
    }
    return "unknown";
  };

  const checkNFTApproval = async () => {
    if (destinationFilterTitle !== "Select") {
      if (filterTitle === "Ethereum") {
        if (destinationFilterTitle === "BNB Chain") {
          if (finalNftType === "land") {
            // const web3 = new Web3(window.ethereum);
            const sourceBridge_address = window.config.ccip_eth_wod_address;

            const landContract = new window.infuraWeb3.eth.Contract(
              window.WOD_ABI,
              window.config.nft_land_address
            );

            const isApproved2 = await landContract.methods
              .getApproved(selectNftId)
              .call()
              .catch((e) => {
                console.error(e);
              });
            const isApproved3 =
              isApproved2 === sourceBridge_address ? true : false;
            setbuttonText(isApproved3 ? "Transfer" : "Approve");
            setisApproved(isApproved3);
          } else if (finalNftType === "caws") {
            // const web3 = new Web3(window.ethereum);
            const sourceBridge_address = window.config.ccip_eth_caws_address;

            const cawsContract = new window.infuraWeb3.eth.Contract(
              window.CAWS_ABI,
              window.config.nft_caws_address
            );

            const isApproved2 = await cawsContract.methods
              .getApproved(selectNftId)
              .call()
              .catch((e) => {
                console.error(e);
              });
            const isApproved3 =
              isApproved2 === sourceBridge_address ? true : false;
            setbuttonText(isApproved3 ? "Transfer" : "Approve");

            setisApproved(isApproved3);
          }
        } else if (destinationFilterTitle === "Avalanche") {
          if (finalNftType === "land") {
            const sourceBridge_address = window.config.ccip_eth_wod_address;

            // const web3 = new Web3(window.ethereum);

            const landContract = new window.infuraWeb3.eth.Contract(
              window.WOD_ABI,
              window.config.nft_land_address
            );
            const isApproved2 = await landContract.methods
              .getApproved(selectNftId)
              .call()
              .catch((e) => {
                console.error(e);
              });
            const isApproved3 =
              isApproved2 === sourceBridge_address ? true : false;
            setbuttonText(isApproved3 ? "Transfer" : "Approve");

            setisApproved(isApproved3);
          } else if (finalNftType === "caws") {
            // const web3 = new Web3(window.ethereum);
            const sourceBridge_address = window.config.ccip_eth_caws_address;

            const cawsContract = new window.infuraWeb3.eth.Contract(
              window.CAWS_ABI,
              window.config.nft_caws_address
            );
            const isApproved2 = await cawsContract.methods
              .getApproved(selectNftId)
              .call()
              .catch((e) => {
                console.error(e);
              });
            const isApproved3 =
              isApproved2 === sourceBridge_address ? true : false;
            setbuttonText(isApproved3 ? "Transfer" : "Approve");

            setisApproved(isApproved3);
          }
        } else if (destinationFilterTitle === "Base Network") {
          if (finalNftType === "land") {
            const sourceBridge_address = window.config.ccip_eth_wod_address;

            // const web3 = new Web3(window.ethereum);

            const landContract = new window.infuraWeb3.eth.Contract(
              window.WOD_ABI,
              window.config.nft_land_address
            );
            const isApproved2 = await landContract.methods
              .getApproved(selectNftId)
              .call()
              .catch((e) => {
                console.error(e);
              });
            const isApproved3 =
              isApproved2 === sourceBridge_address ? true : false;
            setbuttonText(isApproved3 ? "Transfer" : "Approve");

            setisApproved(isApproved3);
          } else if (finalNftType === "caws") {
            // const web3 = new Web3(window.ethereum);
            const sourceBridge_address = window.config.ccip_eth_caws_address;

            const cawsContract = new window.infuraWeb3.eth.Contract(
              window.CAWS_ABI,
              window.config.nft_caws_address
            );
            const isApproved2 = await cawsContract.methods
              .getApproved(selectNftId)
              .call()
              .catch((e) => {
                console.error(e);
              });
            const isApproved3 =
              isApproved2 === sourceBridge_address ? true : false;
            setbuttonText(isApproved3 ? "Transfer" : "Approve");

            setisApproved(isApproved3);
          }
        }
      } else if (filterTitle === "BNB Chain") {
        if (finalNftType === "land") {
          const sourceBridge_address = window.config.ccip_bnb_wod_address;
          // const web3 = new Web3(window.ethereum);

          const landContract = new window.bscWeb3.eth.Contract(
            window.LAND_CCIP_ABI,
            window.config.nft_land_bnb_address
          );

          const isApproved2 = await landContract.methods
            .getApproved(selectNftId)
            .call()
            .catch((e) => {
              console.error(e);
            });
          const isApproved3 =
            isApproved2 === sourceBridge_address ? true : false;

          setbuttonText(isApproved3 ? "Transfer" : "Approve");

          setisApproved(isApproved3);
        } else if (finalNftType === "caws") {
          // const web3 = new Web3(window.ethereum);
          const sourceBridge_address = window.config.ccip_bnb_caws_address;

          const cawsContract = new window.bscWeb3.eth.Contract(
            window.CAWS_CCIP_ABI,
            window.config.nft_caws_bnb_address
          );

          const isApproved2 = await cawsContract.methods
            .getApproved(selectNftId)
            .call()
            .catch((e) => {
              console.error(e);
            });
          const isApproved3 =
            isApproved2 === sourceBridge_address ? true : false;
          setbuttonText(isApproved3 ? "Transfer" : "Approve");

          setisApproved(isApproved3);
        }
      } else if (filterTitle === "Avalanche") {
        if (finalNftType === "land") {
          const sourceBridge_address = window.config.ccip_avax_wod_address;

          // const web3 = new Web3(window.ethereum);

          const landContract = new window.avaxWeb3.eth.Contract(
            window.LAND_CCIP_ABI,
            window.config.nft_land_avax_address
          );
          const isApproved2 = await landContract.methods
            .getApproved(selectNftId)
            .call()
            .catch((e) => {
              console.error(e);
            });
          const isApproved3 =
            isApproved2 === sourceBridge_address ? true : false;
          setisApproved(isApproved3);
        } else if (finalNftType === "caws") {
          // const web3 = new Web3(window.ethereum);
          const sourceBridge_address = window.config.ccip_avax_caws_address;

          const cawsContract = new window.avaxWeb3.eth.Contract(
            window.CAWS_CCIP_ABI,
            window.config.nft_caws_avax_address
          );
          const isApproved2 = await cawsContract.methods
            .getApproved(selectNftId)
            .call()
            .catch((e) => {
              console.error(e);
            });
          const isApproved3 =
            isApproved2 === sourceBridge_address ? true : false;
          setbuttonText(isApproved3 ? "Transfer" : "Approve");

          setisApproved(isApproved3);
        }
      } else if (filterTitle === "Base Network") {
        if (finalNftType === "land") {
          const sourceBridge_address = window.config.ccip_base_wod_address;

          // const web3 = new Web3(window.ethereum);

          const landContract = new window.baseWeb3.eth.Contract(
            window.LAND_CCIP_ABI,
            window.config.nft_land_base_address
          );
          const isApproved2 = await landContract.methods
            .getApproved(selectNftId)
            .call()
            .catch((e) => {
              console.error(e);
            });
          const isApproved3 =
            isApproved2 === sourceBridge_address ? true : false;
          setbuttonText(isApproved3 ? "Transfer" : "Approve");

          setisApproved(isApproved3);
        } else if (finalNftType === "caws") {
          // const web3 = new Web3(window.ethereum);
          const sourceBridge_address = window.config.ccip_base_caws_address;

          const cawsContract = new window.baseWeb3.eth.Contract(
            window.CAWS_CCIP_ABI,
            window.config.nft_caws_base_address
          );
          const isApproved2 = await cawsContract.methods
            .getApproved(selectNftId)
            .call()
            .catch((e) => {
              console.error(e);
            });
          const isApproved3 =
            isApproved2 === sourceBridge_address ? true : false;
          setbuttonText(isApproved3 ? "Transfer" : "Approve");

          setisApproved(isApproved3);
        }
      }
    }
  };

  const handleTransferNft = async () => {
    if (destinationFilterTitle === "Select") {
      window.alertify.error("Please choose destination chain!");
      return;
    } else if (destinationFilterTitle !== "Select") {
      if (filterTitle === "Ethereum") {
        if (window.WALLET_TYPE !== "binance") {
          if (destinationFilterTitle === "BNB Chain") {
            if (finalNftType === "land") {
              const web3 = new Web3(window.ethereum);
              const sourceBridge_address = window.config.ccip_eth_wod_address;
              const destinationBridge_address =
                window.config.ccip_bnb_wod_address;
              const destinationChainSelector =
                window.config.destination_chain_selector_bnb;
              const landContract = new web3.eth.Contract(
                window.WOD_ABI,
                window.config.nft_land_address
              );

              if (!isApproved) {
                setbuttonStatus("loadingApprove");
                setbuttonText("Approving");
                await landContract.methods
                  .approve(sourceBridge_address, selectNftId)
                  .send({ from: coinbase })
                  .then(() => {
                    setbuttonText("Transfer");
                    setisApproved(true);
                    setbuttonStatus("successApprove");
                  })
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    setbuttonText("Approve");
                    setisApproved(false);
                    setbuttonStatus("errorapprove");
                  });
              } else if (isApproved) {
                const contract = new web3.eth.Contract(
                  window.CCIP_ABI,
                  sourceBridge_address
                );
                setbuttonStatus("loadingDeposit");
                setbuttonText("Transferring");

                await contract.methods
                  .BridgeNFT(
                    destinationChainSelector,
                    destinationBridge_address,
                    0,
                    selectNftId
                  )
                  .send({ from: coinbase })
                  .then(() => {
                    setbuttonStatus("successDeposit");
                    setbuttonText("Successfully Transferred");
                    onSuccessTransfer();
                    setTimeout(() => {
                      setSelectedNftId(0);
                      setisApproved(false);
                      setbuttonStatus("initial");
                    }, 4000);
                  })
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    console.error(e);
                    setbuttonText("Transfer");
                    setbuttonStatus("errorDeposit");
                  });
              }
            } else if (finalNftType === "caws") {
              const web3 = new Web3(window.ethereum);
              const sourceBridge_address = window.config.ccip_eth_caws_address;
              const destinationBridge_address =
                window.config.ccip_bnb_caws_address;
              const destinationChainSelector =
                window.config.destination_chain_selector_bnb;
              const cawsContract = new web3.eth.Contract(
                window.CAWS_ABI,
                window.config.nft_caws_address
              );

              if (!isApproved) {
                setbuttonText("Approving");
                setbuttonStatus("loadingApprove");
                await cawsContract.methods
                  .approve(sourceBridge_address, selectNftId)
                  .send({ from: coinbase })
                  .then(() => {
                    setbuttonText("Transfer");
                    setisApproved(true);
                  })
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    setbuttonText("Approve");
                    setisApproved(false);
                    setbuttonStatus("errorApprove");
                  });
              } else if (isApproved) {
                const contract = new web3.eth.Contract(
                  window.CCIP_ABI,
                  sourceBridge_address
                );
                setbuttonText("Transferring");
                setbuttonStatus("loadingDeposit");

                await contract.methods
                  .BridgeNFT(
                    destinationChainSelector,
                    destinationBridge_address,
                    0,
                    selectNftId
                  )
                  .send({ from: coinbase })
                  .then(() => {
                    setbuttonStatus("successDeposit");
                    setbuttonText("Successfully Transferred");
                    onSuccessTransfer();
                    setTimeout(() => {
                      setSelectedNftId(0);
                      setisApproved(false);
                      setbuttonStatus("initial");
                    }, 4000);
                  })
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    console.error(e);
                    setbuttonText("Transfer");
                    setbuttonStatus("errorDeposit");
                  });
              }
            }
          } else if (destinationFilterTitle === "Avalanche") {
            if (finalNftType === "land") {
              const sourceBridge_address = window.config.ccip_eth_wod_address;
              const destinationBridge_address =
                window.config.ccip_avax_wod_address;
              const destinationChainSelector =
                window.config.destination_chain_selector_avax;
              const web3 = new Web3(window.ethereum);
              const contract = new web3.eth.Contract(
                window.CCIP_ABI,
                sourceBridge_address
              );

              const landContract = new web3.eth.Contract(
                window.WOD_ABI,
                window.config.nft_land_address
              );

              if (!isApproved) {
                setbuttonText("Approving");
                setbuttonStatus("loadingApprove");
                await landContract.methods
                  .approve(sourceBridge_address, selectNftId)
                  .send({ from: coinbase })
                  .then(() => {
                    setbuttonText("Transfer");
                    setisApproved(true);
                    setbuttonStatus("successApprove");
                  })
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    setbuttonText("Approve");
                    setisApproved(false);
                    setbuttonStatus("errorApprove");
                  });
              } else if (isApproved) {
                setbuttonText("Transferring");
                setbuttonStatus("loadingDeposit");
                await contract.methods
                  .BridgeNFT(
                    destinationChainSelector,
                    destinationBridge_address,
                    0,
                    selectNftId
                  )
                  .send({ from: coinbase })
                  .then(() => {
                    setbuttonText("Successfully Transferred");
                    setbuttonStatus("successDeposit");
                    onSuccessTransfer();
                    setTimeout(() => {
                      setSelectedNftId(0);
                      setisApproved(false);
                      setbuttonStatus("initial");
                    }, 4000);
                  })
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    console.error(e);
                    setbuttonText("Transfer");
                    setbuttonStatus("errorDeposit");
                  });
              }
            } else if (finalNftType === "caws") {
              const web3 = new Web3(window.ethereum);
              const sourceBridge_address = window.config.ccip_eth_caws_address;
              const destinationBridge_address =
                window.config.ccip_avax_caws_address;
              const destinationChainSelector =
                window.config.destination_chain_selector_avax;
              const cawsContract = new web3.eth.Contract(
                window.CAWS_ABI,
                window.config.nft_caws_address
              );

              if (!isApproved) {
                setbuttonText("Approving");
                setbuttonStatus("loadingApprove");
                await cawsContract.methods
                  .approve(sourceBridge_address, selectNftId)
                  .send({ from: coinbase })
                  .then(() => {
                    setbuttonText("Transfer");
                    setisApproved(true);
                    setbuttonStatus("successApprove");
                  })
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    setbuttonText("Approve");
                    setbuttonStatus("errorApprove");

                    setisApproved(false);
                  });
              } else if (isApproved) {
                const contract = new web3.eth.Contract(
                  window.CCIP_ABI,
                  sourceBridge_address
                );
                setbuttonText("Transferring");
                setbuttonStatus("loadingDeposit");

                await contract.methods
                  .BridgeNFT(
                    destinationChainSelector,
                    destinationBridge_address,
                    0,
                    selectNftId
                  )
                  .send({ from: coinbase })
                  .then(() => {
                    setbuttonStatus("successDeposit");
                    setbuttonText("Successfully Transferred");
                    onSuccessTransfer();
                    setTimeout(() => {
                      setSelectedNftId(0);
                      setisApproved(false);
                      setbuttonStatus("initial");
                    }, 4000);
                  })
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    console.error(e);
                    setbuttonText("Transfer");
                    setbuttonStatus("errorDeposit");
                  });
              }
            }
          } else if (destinationFilterTitle === "Base Network") {
            if (finalNftType === "land") {
              const sourceBridge_address = window.config.ccip_eth_wod_address;
              const destinationBridge_address =
                window.config.ccip_base_wod_address;
              const destinationChainSelector =
                window.config.destination_chain_selector_base;
              const web3 = new Web3(window.ethereum);
              const contract = new web3.eth.Contract(
                window.CCIP_ABI,
                sourceBridge_address
              );

              const landContract = new web3.eth.Contract(
                window.WOD_ABI,
                window.config.nft_land_address
              );

              if (!isApproved) {
                setbuttonText("Approving");
                setbuttonStatus("loadingApprove");
                await landContract.methods
                  .approve(sourceBridge_address, selectNftId)
                  .send({ from: coinbase })
                  .then(() => {
                    setbuttonText("Transfer");
                    setisApproved(true);
                    setbuttonStatus("successApprove");
                  })
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    setbuttonText("Approve");
                    setbuttonStatus("errorApprove");

                    setisApproved(false);
                  });
              } else if (isApproved) {
                setbuttonText("Transferring");
                setbuttonStatus("loadingDeposit");
                await contract.methods
                  .BridgeNFT(
                    destinationChainSelector,
                    destinationBridge_address,
                    0,
                    selectNftId
                  )
                  .send({ from: coinbase })
                  .then(() => {
                    setbuttonStatus("successDeposit");
                    setbuttonText("Successfully Transferred");
                    onSuccessTransfer();
                    setTimeout(() => {
                      setSelectedNftId(0);
                      setisApproved(false);
                      setbuttonStatus("initial");
                    }, 4000);
                  })
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    console.error(e);
                    setbuttonText("Transfer");
                    setbuttonStatus("errorDeposit");
                  });
              }
            } else if (finalNftType === "caws") {
              const web3 = new Web3(window.ethereum);
              const sourceBridge_address = window.config.ccip_eth_caws_address;
              const destinationBridge_address =
                window.config.ccip_base_caws_address;
              const destinationChainSelector =
                window.config.destination_chain_selector_base;
              const cawsContract = new web3.eth.Contract(
                window.CAWS_ABI,
                window.config.nft_caws_address
              );

              if (!isApproved) {
                setbuttonText("Approving");
                setbuttonStatus("loadingApprove");
                await cawsContract.methods
                  .approve(sourceBridge_address, selectNftId)
                  .send({ from: coinbase })
                  .then(() => {
                    setbuttonText("Transfer");
                    setisApproved(true);
                    setbuttonStatus("successApprove");
                  })
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    setbuttonText("Approve");
                    setisApproved(false);
                    setbuttonStatus("errorApprove");
                  });
              } else if (isApproved) {
                const contract = new web3.eth.Contract(
                  window.CCIP_ABI,
                  sourceBridge_address
                );
                setbuttonText("Transferring");
                setbuttonStatus("loadingDeposit");
                await contract.methods
                  .BridgeNFT(
                    destinationChainSelector,
                    destinationBridge_address,
                    0,
                    selectNftId
                  )
                  .send({ from: coinbase })
                  .then(() => {
                    setbuttonStatus("successDeposit");
                    setbuttonText("Successfully Transferred");
                    onSuccessTransfer();
                    setTimeout(() => {
                      setSelectedNftId(0);
                      setisApproved(false);
                      setbuttonStatus("initial");
                    }, 4000);
                  })
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    console.error(e);
                    setbuttonText("Transfer");
                    setbuttonStatus("errorDeposit");
                  });
              }
            }
          }
        } else if (window.WALLET_TYPE === "binance") {
          if (destinationFilterTitle === "BNB Chain") {
            if (finalNftType === "land") {
              // const web3 = new Web3(window.ethereum);
              const sourceBridge_address = window.config.ccip_eth_wod_address;
              const destinationBridge_address =
                window.config.ccip_bnb_wod_address;
              const destinationChainSelector =
                window.config.destination_chain_selector_bnb;
              const landContract = new ethers.Contract(
                window.config.nft_land_address,
                window.WOD_ABI,
                binanceW3WProvider.getSigner()
              );

              if (!isApproved) {
                setbuttonStatus("loadingApprove");
                setbuttonText("Approving");
                const txResponse = await landContract
                  .approve(sourceBridge_address, selectNftId, {
                    from: coinbase,
                  })

                  .catch((e) => {
                    window.alertify.error(e?.message);
                    setbuttonText("Approve");
                    setisApproved(false);
                    setbuttonStatus("errorapprove");
                  });
                const txReceipt = await txResponse.wait();
                if (txReceipt) {
                  setbuttonText("Transfer");
                  setisApproved(true);
                  setbuttonStatus("successApprove");
                }
              } else if (isApproved) {
                const contract = new ethers.Contract(
                  sourceBridge_address,
                  window.CCIP_ABI,
                  binanceW3WProvider.getSigner()
                );
                setbuttonStatus("loadingDeposit");
                setbuttonText("Transferring");

                const txResponse = await contract
                  .BridgeNFT(
                    destinationChainSelector,
                    destinationBridge_address,
                    0,
                    selectNftId,
                    { from: coinbase }
                  )
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    console.error(e);
                    setbuttonText("Transfer");
                    setbuttonStatus("errorDeposit");
                  });

                const txReceipt = await txResponse.wait();
                if (txReceipt) {
                  setbuttonStatus("successDeposit");
                  setbuttonText("Successfully Transferred");
                  onSuccessTransfer();
                  setTimeout(() => {
                    setSelectedNftId(0);
                    setisApproved(false);
                    setbuttonStatus("initial");
                  }, 4000);
                }
              }
            } else if (finalNftType === "caws") {
              // const web3 = new Web3(window.ethereum);
              const sourceBridge_address = window.config.ccip_eth_caws_address;
              const destinationBridge_address =
                window.config.ccip_bnb_caws_address;
              const destinationChainSelector =
                window.config.destination_chain_selector_bnb;
              const cawsContract = new ethers.Contract(
                window.config.nft_caws_address,
                window.CAWS_ABI,
                binanceW3WProvider.getSigner()
              );

              if (!isApproved) {
                setbuttonText("Approving");
                setbuttonStatus("loadingApprove");
                const txResponse = await cawsContract
                  .approve(sourceBridge_address, selectNftId, {
                    from: coinbase,
                  })
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    setbuttonText("Approve");
                    setisApproved(false);
                    setbuttonStatus("errorApprove");
                  });
                const txReceipt = await txResponse.wait();
                if (txReceipt) {
                  setbuttonText("Transfer");
                  setisApproved(true);
                }
              } else if (isApproved) {
                const contract = new ethers.Contract(
                  sourceBridge_address,
                  window.CCIP_ABI,
                  binanceW3WProvider.getSigner()
                );
                setbuttonText("Transferring");
                setbuttonStatus("loadingDeposit");

                const txResponse = await contract
                  .BridgeNFT(
                    destinationChainSelector,
                    destinationBridge_address,
                    0,
                    selectNftId,
                    { from: coinbase }
                  )
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    console.error(e);
                    setbuttonText("Transfer");
                    setbuttonStatus("errorDeposit");
                  });

                const txReceipt = await txResponse.wait();
                if (txReceipt) {
                  setbuttonStatus("successDeposit");
                  setbuttonText("Successfully Transferred");
                  onSuccessTransfer();
                  setTimeout(() => {
                    setSelectedNftId(0);
                    setisApproved(false);
                    setbuttonStatus("initial");
                  }, 4000);
                }
              }
            }
          } else if (destinationFilterTitle === "Avalanche") {
            if (finalNftType === "land") {
              const sourceBridge_address = window.config.ccip_eth_wod_address;
              const destinationBridge_address =
                window.config.ccip_avax_wod_address;
              const destinationChainSelector =
                window.config.destination_chain_selector_avax;
              // const web3 = new Web3(window.ethereum);
              const contract = new ethers.Contract(
                sourceBridge_address,
                window.CCIP_ABI,
                binanceW3WProvider.getSigner()
              );

              const landContract = new ethers.Contract(
                window.config.nft_land_address,
                window.WOD_ABI,
                binanceW3WProvider.getSigner()
              );

              if (!isApproved) {
                setbuttonText("Approving");
                setbuttonStatus("loadingApprove");
                const txResponse = await landContract
                  .approve(sourceBridge_address, selectNftId, {
                    from: coinbase,
                  })
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    setbuttonText("Approve");
                    setisApproved(false);
                    setbuttonStatus("errorApprove");
                  });

                const txReceipt = await txResponse.wait();
                if (txReceipt) {
                  setbuttonText("Transfer");
                  setisApproved(true);
                  setbuttonStatus("successApprove");
                }
              } else if (isApproved) {
                setbuttonText("Transferring");
                setbuttonStatus("loadingDeposit");
                const txResponse = await contract
                  .BridgeNFT(
                    destinationChainSelector,
                    destinationBridge_address,
                    0,
                    selectNftId,
                    { from: coinbase }
                  )
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    console.error(e);
                    setbuttonText("Transfer");
                    setbuttonStatus("errorDeposit");
                  });

                const txReceipt = await txResponse.wait();
                if (txReceipt) {
                  setbuttonText("Successfully Transferred");
                  setbuttonStatus("successDeposit");
                  onSuccessTransfer();
                  setTimeout(() => {
                    setSelectedNftId(0);
                    setisApproved(false);
                    setbuttonStatus("initial");
                  }, 4000);
                }
              }
            } else if (finalNftType === "caws") {
              // const web3 = new Web3(window.ethereum);
              const sourceBridge_address = window.config.ccip_eth_caws_address;
              const destinationBridge_address =
                window.config.ccip_avax_caws_address;
              const destinationChainSelector =
                window.config.destination_chain_selector_avax;
              const cawsContract = new ethers.Contract(
                window.config.nft_caws_address,
                window.CAWS_ABI,
                binanceW3WProvider.getSigner()
              );

              if (!isApproved) {
                setbuttonText("Approving");
                setbuttonStatus("loadingApprove");
                const txResponse = await cawsContract
                  .approve(sourceBridge_address, selectNftId, {
                    from: coinbase,
                  })
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    setbuttonText("Approve");
                    setbuttonStatus("errorApprove");

                    setisApproved(false);
                  });

                const txReceipt = await txResponse.wait();
                if (txReceipt) {
                  setbuttonText("Transfer");
                  setisApproved(true);
                  setbuttonStatus("successApprove");
                }
              } else if (isApproved) {
                const contract = new ethers.Contract(
                  sourceBridge_address,
                  window.CCIP_ABI,
                  binanceW3WProvider.getSigner()
                );
                setbuttonText("Transferring");
                setbuttonStatus("loadingDeposit");

                const txResponse = await contract
                  .BridgeNFT(
                    destinationChainSelector,
                    destinationBridge_address,
                    0,
                    selectNftId,
                    { from: coinbase }
                  )
                  .send()
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    console.error(e);
                    setbuttonText("Transfer");
                    setbuttonStatus("errorDeposit");
                  });

                const txReceipt = await txResponse.wait();
                if (txReceipt) {
                  setbuttonStatus("successDeposit");
                  setbuttonText("Successfully Transferred");
                  onSuccessTransfer();
                  setTimeout(() => {
                    setSelectedNftId(0);
                    setisApproved(false);
                    setbuttonStatus("initial");
                  }, 4000);
                }
              }
            }
          } else if (destinationFilterTitle === "Base Network") {
            if (finalNftType === "land") {
              const sourceBridge_address = window.config.ccip_eth_wod_address;
              const destinationBridge_address =
                window.config.ccip_base_wod_address;
              const destinationChainSelector =
                window.config.destination_chain_selector_base;
              // const web3 = new Web3(window.ethereum);
              const contract = new ethers.Contract(
                sourceBridge_address,
                window.CCIP_ABI,
                binanceW3WProvider.getSigner()
              );

              const landContract = new ethers.Contract(
                window.config.nft_land_address,
                window.WOD_ABI,
                binanceW3WProvider.getSigner()
              );

              if (!isApproved) {
                setbuttonText("Approving");
                setbuttonStatus("loadingApprove");
                const txResponse = await landContract
                  .approve(sourceBridge_address, selectNftId, {
                    from: coinbase,
                  })
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    setbuttonText("Approve");
                    setbuttonStatus("errorApprove");

                    setisApproved(false);
                  });

                const txReceipt = await txResponse.wait();
                if (txReceipt) {
                  setbuttonText("Transfer");
                  setisApproved(true);
                  setbuttonStatus("successApprove");
                }
              } else if (isApproved) {
                setbuttonText("Transferring");
                setbuttonStatus("loadingDeposit");
                const txResponse = await contract
                  .BridgeNFT(
                    destinationChainSelector,
                    destinationBridge_address,
                    0,
                    selectNftId,
                    { from: coinbase }
                  )
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    console.error(e);
                    setbuttonText("Transfer");
                    setbuttonStatus("errorDeposit");
                  });

                const txReceipt = await txResponse.wait();
                if (txReceipt) {
                  setbuttonStatus("successDeposit");
                  setbuttonText("Successfully Transferred");
                  onSuccessTransfer();
                  setTimeout(() => {
                    setSelectedNftId(0);
                    setisApproved(false);
                    setbuttonStatus("initial");
                  }, 4000);
                }
              }
            } else if (finalNftType === "caws") {
              const web3 = new Web3(window.ethereum);
              const sourceBridge_address = window.config.ccip_eth_caws_address;
              const destinationBridge_address =
                window.config.ccip_base_caws_address;
              const destinationChainSelector =
                window.config.destination_chain_selector_base;
              const cawsContract = new ethers.Contract(
                window.config.nft_caws_address,
                window.CAWS_ABI,
                binanceW3WProvider.getSigner()
              );

              if (!isApproved) {
                setbuttonText("Approving");
                setbuttonStatus("loadingApprove");
                const txResponse = await cawsContract
                  .approve(sourceBridge_address, selectNftId, {
                    from: coinbase,
                  })
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    setbuttonText("Approve");
                    setisApproved(false);
                    setbuttonStatus("errorApprove");
                  });

                const txReceipt = await txResponse.wait();
                if (txReceipt) {
                  setbuttonText("Transfer");
                  setisApproved(true);
                  setbuttonStatus("successApprove");
                }
              } else if (isApproved) {
                const contract = new ethers.Contract(
                  sourceBridge_address,
                  window.CCIP_ABI,
                  binanceW3WProvider.getSigner()
                );
                setbuttonText("Transferring");
                setbuttonStatus("loadingDeposit");
                const txResponse = await contract
                  .BridgeNFT(
                    destinationChainSelector,
                    destinationBridge_address,
                    0,
                    selectNftId,
                    { from: coinbase }
                  )
                  .catch((e) => {
                    window.alertify.error(e?.message);
                    console.error(e);
                    setbuttonText("Transfer");
                    setbuttonStatus("errorDeposit");
                  });

                const txReceipt = await txResponse.wait();
                if (txReceipt) {
                  setbuttonStatus("successDeposit");
                  setbuttonText("Successfully Transferred");
                  onSuccessTransfer();
                  setTimeout(() => {
                    setSelectedNftId(0);
                    setisApproved(false);
                    setbuttonStatus("initial");
                  }, 4000);
                }
              }
            }
          }
        }
      } else if (filterTitle === "BNB Chain") {
        if (finalNftType === "land") {
          if(window.WALLET_TYPE === "binance"){
          const sourceBridge_address = window.config.ccip_bnb_wod_address;
          const destinationBridge_address = window.config.ccip_eth_wod_address;
          const destinationChainSelector =
            window.config.destination_chain_selector_eth;
          // const web3 = new Web3(window.ethereum);
          const contract = new ethers.Contract(
            sourceBridge_address,
            window.CCIP_ABI,
            binanceW3WProvider.getSigner()
          );

          const landContract = new ethers.Contract(
            window.config.nft_land_bnb_address,
            window.LAND_CCIP_ABI,
            binanceW3WProvider.getSigner()
          );

          if (!isApproved) {
            setbuttonText("Approving");
            setbuttonStatus("loadingApprove");
            const txResponse = await landContract
              .approve(sourceBridge_address, selectNftId, { from: coinbase })
              .catch((e) => {
                window.alertify.error(e?.message);
                setbuttonText("Approve");
                setisApproved(false);
                setbuttonStatus("errorApprove");
              });
            const txReceipt = await txResponse.wait();
            if (txReceipt) {
              setbuttonText("Transfer");
              setisApproved(true);
              setbuttonStatus("successApprove");
            }
          } else if (isApproved) {
            setbuttonText("Transferring");
            setbuttonStatus("loadingDeposit");

            const txResponse = await contract
              .BridgeNFT(
                destinationChainSelector,
                destinationBridge_address,
                0,
                selectNftId,
                { from: coinbase }
              )
              .catch((e) => {
                window.alertify.error(e?.message);
                console.error(e);
                setbuttonText("Transfer");
                setbuttonStatus("errorDeposit");
              });

            const txReceipt = await txResponse.wait();
            if (txReceipt) {
              setbuttonStatus("successDeposit");
              setbuttonText("Successfully Transferred");
              onSuccessTransfer();
              setTimeout(() => {
                setSelectedNftId(0);
                setisApproved(false);
                setbuttonStatus("initial");
              }, 4000);
            }
          }} else if(window.WALLET_TYPE !== "binance"){
            const sourceBridge_address = window.config.ccip_bnb_wod_address;
            const destinationBridge_address = window.config.ccip_eth_wod_address;
            const destinationChainSelector =
              window.config.destination_chain_selector_eth;
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(
              window.CCIP_ABI,   sourceBridge_address,
            );
  
            const landContract = new web3.eth.Contract(
             
              window.LAND_CCIP_ABI, window.config.nft_land_bnb_address,
              
            );
  
            if (!isApproved) {
              setbuttonText("Approving");
              setbuttonStatus("loadingApprove");
               await landContract.methods
                .approve(sourceBridge_address, selectNftId).send({ from: coinbase }).then(()=>{
                  setbuttonText("Transfer");
                  setisApproved(true);
                  setbuttonStatus("successApprove");
                })
                .catch((e) => {
                  window.alertify.error(e?.message);
                  setbuttonText("Approve");
                  setisApproved(false);
                  setbuttonStatus("errorApprove");
                });
             
            } else if (isApproved) {
              setbuttonText("Transferring");
              setbuttonStatus("loadingDeposit");
  
               await contract.methods
                .BridgeNFT(
                  destinationChainSelector,
                  destinationBridge_address,
                  0,
                  selectNftId
                  
                ).send({ from: coinbase }).then(()=>{
                  setbuttonStatus("successDeposit");
                  setbuttonText("Successfully Transferred");
                  onSuccessTransfer();
                  setTimeout(() => {
                    setSelectedNftId(0);
                    setisApproved(false);
                    setbuttonStatus("initial");
                  }, 4000);
                })
                .catch((e) => {
                  window.alertify.error(e?.message);
                  console.error(e);
                  setbuttonText("Transfer");
                  setbuttonStatus("errorDeposit");
                }); 
              
            }}
        } else if (finalNftType === "caws") {
          if(window.WALLET_TYPE === "binance"){
          // const web3 = new Web3(window.ethereum);
          const sourceBridge_address = window.config.ccip_bnb_caws_address;
          const destinationBridge_address = window.config.ccip_eth_caws_address;
          const destinationChainSelector =
            window.config.destination_chain_selector_eth;
          const cawsContract = new ethers.Contract(
            window.config.nft_caws_bnb_address,
            window.CAWS_CCIP_ABI,
            binanceW3WProvider.getSigner()
          );

          if (!isApproved) {
            setbuttonText("Approving");
            setbuttonStatus("loadingApprove");
            const txResponse = await cawsContract
              .approve(sourceBridge_address, selectNftId, { from: coinbase })
              .catch((e) => {
                window.alertify.error(e?.message);
                setbuttonText("Approve");
                setisApproved(false);
                setbuttonStatus("errorApprove");
              });

            const txReceipt = await txResponse.wait();
            if (txReceipt) {
              setbuttonText("Transfer");
              setbuttonStatus("successApprove");
              setisApproved(true);
            }
          } else if (isApproved) {
            const contract = new ethers.Contract(
              sourceBridge_address,
              window.CCIP_ABI,
              binanceW3WProvider.getSigner()
            );
            setbuttonText("Transferring");
            setbuttonStatus("loadingDeposit");
            const txResponse = await contract
              .BridgeNFT(
                destinationChainSelector,
                destinationBridge_address,
                0,
                selectNftId,
                { from: coinbase }
              )
              .catch((e) => {
                window.alertify.error(e?.message);
                console.error(e);
                setbuttonText("Transfer");
                setbuttonStatus("errorDeposit");
              });

            const txReceipt = await txResponse.wait();
            if (txReceipt) {
              setbuttonStatus("successDeposit");
              setbuttonText("Successfully Transferred");
              onSuccessTransfer();
              setTimeout(() => {
                setSelectedNftId(0);
                setisApproved(false);
                setbuttonStatus("initial");
              }, 4000);
            }
          }} 
          else if(window.WALLET_TYPE !== "binance"){
            const web3 = new Web3(window.ethereum);
            const sourceBridge_address = window.config.ccip_bnb_caws_address;
            const destinationBridge_address = window.config.ccip_eth_caws_address;
            const destinationChainSelector =
              window.config.destination_chain_selector_eth;
            const cawsContract = new web3.eth.Contract(
            
              window.CAWS_CCIP_ABI,  window.config.nft_caws_bnb_address,
            
            );
  
            if (!isApproved) {
              setbuttonText("Approving");
              setbuttonStatus("loadingApprove");
            await cawsContract.methods
                .approve(sourceBridge_address, selectNftId).send({ from: coinbase }).then(()=>{
                setbuttonText("Transfer");
                setbuttonStatus("successApprove");
                setisApproved(true);
                })
                .catch((e) => {
                  window.alertify.error(e?.message);
                  setbuttonText("Approve");
                  setisApproved(false);
                  setbuttonStatus("errorApprove");
                });
  
              
            } else if (isApproved) {
              const contract = new web3.eth.Contract(
                window.CCIP_ABI, sourceBridge_address,
              );
              setbuttonText("Transferring");
              setbuttonStatus("loadingDeposit");
        await contract.methods
                .BridgeNFT(
                  destinationChainSelector,
                  destinationBridge_address,
                  0,
                  selectNftId
                  
                ).send({ from: coinbase }).then(()=>{
                  setbuttonStatus("successDeposit");
                setbuttonText("Successfully Transferred");
                onSuccessTransfer();
                setTimeout(() => {
                  setSelectedNftId(0);
                  setisApproved(false);
                  setbuttonStatus("initial");
                }, 4000);
                })
                .catch((e) => {
                  window.alertify.error(e?.message);
                  console.error(e);
                  setbuttonText("Transfer");
                  setbuttonStatus("errorDeposit");
                });
  
              
            }}
        }
      } else if (filterTitle === "Avalanche") {
        if (finalNftType === "land") {
          if(window.WALLET_TYPE === "binance"){
          const sourceBridge_address = window.config.ccip_avax_wod_address;
          const destinationBridge_address = window.config.ccip_eth_wod_address;
          const destinationChainSelector =
            window.config.destination_chain_selector_eth;
          // const web3 = new Web3(window.ethereum);
          const contract = new ethers.Contract(
            sourceBridge_address,
            window.CCIP_ABI,
            binanceW3WProvider.getSigner()
          );

          const landContract = new ethers.Contract(
            window.config.nft_land_avax_address,
            window.LAND_CCIP_ABI,
            binanceW3WProvider.getSigner()
          );

          if (!isApproved) {
            setbuttonText("Approving");
            setbuttonStatus("loadingApprove");
            const txResponse = await landContract
              .approve(sourceBridge_address, selectNftId, { from: coinbase })
              .catch((e) => {
                window.alertify.error(e?.message);
                setbuttonText("Approve");
                setisApproved(false);
                setbuttonStatus("errorApprove");
              });

            const txReceipt = await txResponse.wait();
            if (txReceipt) {
              setbuttonText("Transfer");
              setisApproved(true);
              setbuttonStatus("successApprove");
            }
          } else if (isApproved) {
            setbuttonText("Transferring");
            setbuttonStatus("loadingDeposit");
            const txResponse = await contract
              .BridgeNFT(
                destinationChainSelector,
                destinationBridge_address,
                0,
                selectNftId,
                { from: coinbase }
              )
              .catch((e) => {
                window.alertify.error(e?.message);
                console.error(e);
                setbuttonText("Transfer");
                setbuttonStatus("errorDeposit");
              });

            const txReceipt = await txResponse.wait();
            if (txReceipt) {
              setbuttonStatus("successDeposit");
              setbuttonText("Successfully Transferred");
              onSuccessTransfer();
              setTimeout(() => {
                setSelectedNftId(0);
                setisApproved(false);
                setbuttonStatus("initial");
              }, 4000);
            }
          }} else if(window.WALLET_TYPE !== "binance"){
            const sourceBridge_address = window.config.ccip_avax_wod_address;
            const destinationBridge_address = window.config.ccip_eth_wod_address;
            const destinationChainSelector =
              window.config.destination_chain_selector_eth;
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(
              window.CCIP_ABI, sourceBridge_address,
            );
  
            const landContract = new web3.eth.Contract(
              window.LAND_CCIP_ABI,   window.config.nft_land_avax_address,
            );
  
            if (!isApproved) {
              setbuttonText("Approving");
              setbuttonStatus("loadingApprove");
           await landContract.methods
                .approve(sourceBridge_address, selectNftId)
                .send({ from: coinbase })
                .then(()=>{
                  setbuttonText("Transfer");
                  setisApproved(true);
                  setbuttonStatus("successApprove");
                })
                .catch((e) => {
                  window.alertify.error(e?.message);
                  setbuttonText("Approve");
                  setisApproved(false);
                  setbuttonStatus("errorApprove");
                });
  
               
            } else if (isApproved) {
              setbuttonText("Transferring");
              setbuttonStatus("loadingDeposit");
             await contract.methods
                .BridgeNFT(
                  destinationChainSelector,
                  destinationBridge_address,
                  0,
                  selectNftId
                ).send({ from: coinbase })
                .then(()=>{
                  setbuttonStatus("successDeposit");
                  setbuttonText("Successfully Transferred");
                  onSuccessTransfer();
                  setTimeout(() => {
                    setSelectedNftId(0);
                    setisApproved(false);
                    setbuttonStatus("initial");
                  }, 4000);
                })
                .catch((e) => {
                  window.alertify.error(e?.message);
                  console.error(e);
                  setbuttonText("Transfer");
                  setbuttonStatus("errorDeposit");
                });
  
              
            }}
        } else if (finalNftType === "caws") {
          if(window.WALLET_TYPE === "binance"){
          // const web3 = new Web3(window.ethereum);
          const sourceBridge_address = window.config.ccip_avax_caws_address;
          const destinationBridge_address = window.config.ccip_eth_caws_address;
          const destinationChainSelector =
            window.config.destination_chain_selector_eth;
          const cawsContract = new ethers.Contract(
            window.config.nft_caws_avax_address,
            window.CAWS_CCIP_ABI,
            binanceW3WProvider.getSigner()
          );

          if (!isApproved) {
            setbuttonText("Approving");
            setbuttonStatus("loadingApprove");
            const txResponse = await cawsContract
              .approve(sourceBridge_address, selectNftId, { from: coinbase })
              .catch((e) => {
                window.alertify.error(e?.message);
                setbuttonText("Approve");
                setbuttonStatus("errorApprove");
                setisApproved(false);
              });

            const txReceipt = await txResponse.wait();
            if (txReceipt) {
              setbuttonText("Transfer");
              setbuttonStatus("successApprove");
              setisApproved(true);
            }
          } else if (isApproved) {
            const contract = new ethers.Contract(
              sourceBridge_address,
              window.CCIP_ABI,
              binanceW3WProvider.getSigner()
            );
            setbuttonText("Transferring");
            setbuttonStatus("loadingDeposit");
            const txResponse = await contract
              .BridgeNFT(
                destinationChainSelector,
                destinationBridge_address,
                0,
                selectNftId,
                { from: coinbase }
              )
              .catch((e) => {
                window.alertify.error(e?.message);
                console.error(e);
                setbuttonText("Transfer");
                setbuttonStatus("errorDeposit");
              });

            const txReceipt = await txResponse.wait();
            if (txReceipt) {
              setbuttonStatus("successDeposit");
              setbuttonText("Successfully Transferred");
              onSuccessTransfer();
              setTimeout(() => {
                setSelectedNftId(0);
                setisApproved(false);
                setbuttonStatus("initial");
              }, 4000);
            }
          }} else if(window.WALLET_TYPE !== "binance"){
            const web3 = new Web3(window.ethereum);
            const sourceBridge_address = window.config.ccip_avax_caws_address;
            const destinationBridge_address = window.config.ccip_eth_caws_address;
            const destinationChainSelector =
              window.config.destination_chain_selector_eth;
            const cawsContract = new web3.eth.Contract(
              window.CAWS_CCIP_ABI,  window.config.nft_caws_avax_address, 
            );
  
            if (!isApproved) {
              setbuttonText("Approving");
              setbuttonStatus("loadingApprove");
               await cawsContract.methods
                .approve(sourceBridge_address, selectNftId)
                .send({ from: coinbase })
                .then(()=>{
                setbuttonText("Transfer");
                setbuttonStatus("successApprove");
                setisApproved(true);
                })
                .catch((e) => {
                  window.alertify.error(e?.message);
                  setbuttonText("Approve");
                  setbuttonStatus("errorApprove");
                  setisApproved(false);
                });
  
              
            } else if (isApproved) {
              const contract = new web3.eth.Contract(
                window.CCIP_ABI, sourceBridge_address, 
              );

              setbuttonText("Transferring");
              setbuttonStatus("loadingDeposit");

             await contract.methods
                .BridgeNFT(
                  destinationChainSelector,
                  destinationBridge_address,
                  0,
                  selectNftId
                )
                .send({ from: coinbase })
                .then(()=>{
                  setbuttonStatus("successDeposit");
                  setbuttonText("Successfully Transferred");
                  onSuccessTransfer();
                  setTimeout(() => {
                    setSelectedNftId(0);
                    setisApproved(false);
                    setbuttonStatus("initial");
                  }, 4000);
                })
                .catch((e) => {
                  window.alertify.error(e?.message);
                  console.error(e);
                  setbuttonText("Transfer");
                  setbuttonStatus("errorDeposit");
                });
  
               
            }}
        }
      } else if (filterTitle === "Base Network") {
        if (finalNftType === "land") {
          if(window.WALLET_TYPE === "binance"){
          const sourceBridge_address = window.config.ccip_base_wod_address;
          const destinationBridge_address = window.config.ccip_eth_wod_address;
          const destinationChainSelector =
            window.config.destination_chain_selector_eth;
          // const web3 = new Web3(window.ethereum);
          const contract = new ethers.Contract(
            sourceBridge_address,
            window.CCIP_ABI,
            binanceW3WProvider.getSigner()
          );

          const landContract = new ethers.Contract(
            window.config.nft_land_base_address,
            window.LAND_CCIP_ABI,
            binanceW3WProvider.getSigner()
          );

          if (!isApproved) {
            setbuttonText("Approving");
            setbuttonStatus("loadingApprove");
            const txResponse = await landContract
              .approve(sourceBridge_address, selectNftId, { from: coinbase })
              .catch((e) => {
                window.alertify.error(e?.message);
                setbuttonText("Approve");
                setisApproved(false);
                setbuttonStatus("errorApprove");
              });

            const txReceipt = await txResponse.wait();
            if (txReceipt) {
              setbuttonText("Transfer");
              setisApproved(true);
              setbuttonStatus("successApprove");
            }
          } else if (isApproved) {
            setbuttonText("Transferring");
            setbuttonStatus("loadingDeposit");
            const txResponse = await contract
              .BridgeNFT(
                destinationChainSelector,
                destinationBridge_address,
                0,
                selectNftId,
                { from: coinbase }
              )
              .catch((e) => {
                window.alertify.error(e?.message);
                console.error(e);
                setbuttonText("Transfer");
                setbuttonStatus("errorDeposit");
              });

            const txReceipt = await txResponse.wait();
            if (txReceipt) {
              setbuttonStatus("successDeposit");
              setbuttonText("Successfully Transferred");
              onSuccessTransfer();
              setTimeout(() => {
                setSelectedNftId(0);
                setisApproved(false);
                setbuttonStatus("initial");
              }, 4000);
            }
          }} else if(window.WALLET_TYPE !== "binance"){
            const sourceBridge_address = window.config.ccip_base_wod_address;
            const destinationBridge_address = window.config.ccip_eth_wod_address;
            const destinationChainSelector =
              window.config.destination_chain_selector_eth;
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(
              window.CCIP_ABI, sourceBridge_address,
            
            );
  
            const landContract = new web3.eth.Contract(window.LAND_CCIP_ABI, window.config.nft_land_base_address);
  
            if (!isApproved) {
              setbuttonText("Approving");
              setbuttonStatus("loadingApprove");
               await landContract.methods
                .approve(sourceBridge_address, selectNftId)
                .send({ from: coinbase })
                .then(()=>{
                  setbuttonText("Transfer");
                setisApproved(true);
                setbuttonStatus("successApprove");
                })
                .catch((e) => {
                  window.alertify.error(e?.message);
                  setbuttonText("Approve");
                  setisApproved(false);
                  setbuttonStatus("errorApprove");
                });
  
               
            } else if (isApproved) {
              setbuttonText("Transferring");
              setbuttonStatus("loadingDeposit");
               await contract.methods
                .BridgeNFT(
                  destinationChainSelector,
                  destinationBridge_address,
                  0,
                  selectNftId
                ).send({ from: coinbase })
                .then(()=>{
                  setbuttonStatus("successDeposit");
                  setbuttonText("Successfully Transferred");
                  onSuccessTransfer();
                  setTimeout(() => {
                    setSelectedNftId(0);
                    setisApproved(false);
                    setbuttonStatus("initial");
                  }, 4000);
                })
                .catch((e) => {
                  window.alertify.error(e?.message);
                  console.error(e);
                  setbuttonText("Transfer");
                  setbuttonStatus("errorDeposit");
                });
  
              
            }}
        } else if (finalNftType === "caws") {
          if(window.WALLET_TYPE === "binance"){
          const sourceBridge_address = window.config.ccip_base_caws_address;
          const destinationBridge_address = window.config.ccip_eth_caws_address;
          const destinationChainSelector =
            window.config.destination_chain_selector_eth;
          const cawsContract = new ethers.Contract(
            window.config.nft_caws_base_address,
            window.CAWS_CCIP_ABI,
            binanceW3WProvider.getSigner()
          );

          if (!isApproved) {
            setbuttonText("Approving");
            setbuttonStatus("loadingApprove");
            const txResponse = await cawsContract
              .approve(sourceBridge_address, selectNftId, { from: coinbase })
              .catch((e) => {
                window.alertify.error(e?.message);
                setbuttonText("Approve");
                setisApproved(false);
                setbuttonStatus("errorApprove");
              });

            const txReceipt = await txResponse.wait();
            if (txReceipt) {
              setbuttonText("Transfer");
              setisApproved(true);
              setbuttonStatus("successApprove");
            }
          } else if (isApproved) {
            const contract = new ethers.Contract(
              sourceBridge_address,
              window.CCIP_ABI,
              binanceW3WProvider.getSigner()
            );
            setbuttonText("Transferring");
            setbuttonStatus("loadingDeposit");
            const txResponse = await contract
              .BridgeNFT(
                destinationChainSelector,
                destinationBridge_address,
                0,
                selectNftId,
                { from: coinbase }
              )
              .catch((e) => {
                window.alertify.error(e?.message);
                console.error(e);
                setbuttonText("Transfer");
                setbuttonStatus("errorDeposit");
              });

            const txReceipt = await txResponse.wait();
            if (txReceipt) {
              setbuttonStatus("successDeposit");
              setbuttonText("Successfully Transferred");
              onSuccessTransfer();
              setTimeout(() => {
                setSelectedNftId(0);
                setisApproved(false);
                setbuttonStatus("initial");
              }, 4000);
            }
          }
        } else if(window.WALLET_TYPE !== "binance"){
            const sourceBridge_address = window.config.ccip_base_caws_address;
            const destinationBridge_address = window.config.ccip_eth_caws_address;
            const destinationChainSelector =
              window.config.destination_chain_selector_eth;
            const web3 = new Web3(window.ethereum);

            const cawsContract = new web3.eth.Contract(
              window.CAWS_CCIP_ABI, window.config.nft_caws_base_address,
            );
  
            if (!isApproved) {
              setbuttonText("Approving");
              setbuttonStatus("loadingApprove");
              await cawsContract.methods
                .approve(sourceBridge_address, selectNftId)
                .send({ from: coinbase })
                .then(()=>{
                  setbuttonText("Transfer");
                  setisApproved(true);
                  setbuttonStatus("successApprove");
                })
                .catch((e) => {
                  window.alertify.error(e?.message);
                  setbuttonText("Approve");
                  setisApproved(false);
                  setbuttonStatus("errorApprove");
                });
  
             
            } else if (isApproved) {
              const contract = new web3.eth.Contract(
                window.CCIP_ABI, sourceBridge_address, 
              );
              setbuttonText("Transferring");
              setbuttonStatus("loadingDeposit");
              await contract.methods
                .BridgeNFT(
                  destinationChainSelector,
                  destinationBridge_address,
                  0,
                  selectNftId
                )
                .send({ from: coinbase })
                .then(()=>{
                  setbuttonStatus("successDeposit");
                  setbuttonText("Successfully Transferred");
                  onSuccessTransfer();
                  setTimeout(() => {
                    setSelectedNftId(0);
                    setisApproved(false);
                    setbuttonStatus("initial");
                  }, 4000);
                })
                .catch((e) => {
                  window.alertify.error(e?.message);
                  console.error(e);
                  setbuttonText("Transfer");
                  setbuttonStatus("errorDeposit");
                });
            }}
        }
      }
    }
  };

  useEffect(() => {
    if (chainId === 1) {
      setFilterTitle("Ethereum");
      updateDestinationFilterTitle("Ethereum");
      setSelectedNftId(0);
    } else if (chainId === 56) {
      setFilterTitle("BNB Chain");
      updateDestinationFilterTitle("BNB Chain");
      setSelectedNftId(0);
    } else if (chainId === 43114) {
      setFilterTitle("Avalanche");
      updateDestinationFilterTitle("Avalanche");
      setSelectedNftId(0);
    } else if (chainId === 8453) {
      setFilterTitle("Base Network");
      updateDestinationFilterTitle("Base Network");
      setSelectedNftId(0);
    } else {
      setFilterTitle("Select");
      setDestinationFilterTitle("Select");
      setSelectedNftId(0);
    }
  }, [chainId]);

  useEffect(() => {
    checkNFTApproval();
  }, [filterTitle, destinationFilterTitle, selectNftId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "NFT Bridge";
  }, []);

  return (
    <div
      className="container-fluid mt-lg-5 pt-lg-5 d-flex justify-content-end p-0"
      style={{ minHeight: "72vh", maxWidth: "2400px" }}
    >
      {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

      <div
        className="container-nft  d-flex  align-items-start px-4  position-relative"
        style={{ backgroundSize: "cover" }}
      >
        <div className="custom-container mt-5 mt-lg-4 mx-0 position-relative">
          <div className="nft-bridge-hero-wrapper p-3 mt-5 mb-3 mt-lg-0 position-relative">
            <div className="position-absolute ccip-wrapper">
              <a
                href="https://chain.link/cross-chain"
                target="_blank"
                rel="noreferrer"
                className="ccip-link d-flex align-items-center gap-1"
              >
                <img src={'https://cdn.worldofdypians.com/wod/ccipLogo.svg'} alt="" />
              </a>
            </div>
            <div className="row mx-0 align-items-center justify-content-between m-0 gap-4 gap-lg-0">
              <div className="col-12 col-lg-6">
                <div className="d-flex flex-column gap-3">
                  <h6 className="nft-page-title pt-4 pt-lg-0 mt-0">
                    NFT <span style={{ color: "#8c56ff" }}>Bridge</span>
                  </h6>

                  <p className="collection-desc">
                    NFT Bridge ensures a smooth and secure transfer of digital
                    assets, providing users with a seamless experience in
                    navigating and trading CAWS and Genesis Land NFTs across
                    Ethereum, BNB Chain, Avalanche, and Base Network.
                  </p>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                  <img
                    src={'https://cdn.worldofdypians.com/wod/bridgenft.webp'}
                    className="w-100 bridgenftImg"
                    alt=""
                  />
                  <span className="powered-by-text d-flex text-center gap-3 align-items-center">
                    <a
                      href="https://chain.link/cross-chain"
                      target="_blank"
                      rel="noreferrer"
                      className="ccip-link d-flex align-items-center gap-1"
                    >
                      <img
                        src={"https://chain.link/badge-cross-chain-black"}
                        alt=""
                      />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="nft-bridge-page-wrapper d-flex flex-column gap-3 p-3">
            <div className="d-flex flex-column flex-lg-row align-items-center gap-4 justify-content-between">
              <span className="nft-bridge-select-route">
                Select Bridge Route
              </span>
              <div className="d-flex flex-column flex-lg-row gap-4 align-items-center justify-content-between">
                <div className="d-flex gap-2 align-items-center">
                  <span className="nft-bridge-label">From</span>
                  <div className="dropdown filters-dropdown">
                    <button
                      className="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle gap-1"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <h6 className="filter-nav-title mb-0 d-flex align-items-center gap-2">
                          {filterTitle !== "Select" && (
                            <img
                              src={
                                filterTitle === "Ethereum"
                                  ? 'https://cdn.worldofdypians.com/wod/eth.svg'
                                  : filterTitle === "BNB Chain"
                                  ? 'https://cdn.worldofdypians.com/wod/bnbIcon.svg'
                                  : filterTitle === "Avalanche"
                                  ? 'https://cdn.worldofdypians.com/wod/avaxIcon.svg'
                                  : 'https://cdn.worldofdypians.com/wod/base.svg'
                              }
                              alt=""
                            />
                          )}
                          {filterTitle}
                        </h6>
                      </div>
                      <img src={'https://cdn.worldofdypians.com/wod/dropdownIcon.svg'} alt="" />
                    </button>
                    <ul className="dropdown-menu nft-dropdown-menu  p-2 w-100">
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilterTitle("Ethereum");
                          handleEthPool();
                        }}
                      >
                        <span className="d-flex align-items-center gap-2">
                          <img src={'https://cdn.worldofdypians.com/wod/eth.svg'} alt="" />
                          Ethereum
                        </span>
                      </li>
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilterTitle("BNB Chain");
                          handleBnbPool();
                        }}
                      >
                        <span className="d-flex align-items-center gap-2">
                          <img src={'https://cdn.worldofdypians.com/wod/bnbIcon.svg'} alt="" />
                          BNB Chain
                        </span>
                      </li>
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilterTitle("Avalanche");
                          handleAvaxPool();
                        }}
                      >
                        <span className="d-flex align-items-center gap-2">
                          <img src={'https://cdn.worldofdypians.com/wod/avaxIcon.svg'} alt="" />
                          Avalanche
                        </span>
                      </li>
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilterTitle("Base Network");
                          handleBasePool();
                        }}
                      >
                        <span className="d-flex align-items-center gap-2">
                          <img src={'https://cdn.worldofdypians.com/wod/base.svg'} alt="" /> Base Network
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <span className="nft-bridge-label">To</span>
                  <div className="dropdown filters-dropdown">
                    <button
                      className="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle gap-1"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <h6 className="filter-nav-title mb-0 d-flex align-items-center gap-2">
                          {destinationFilterTitle !== "Select" && (
                            <img
                              src={
                                destinationFilterTitle === "Ethereum"
                                  ? 'https://cdn.worldofdypians.com/wod/eth.svg'
                                  : destinationFilterTitle === "BNB Chain"
                                  ? 'https://cdn.worldofdypians.com/wod/bnbIcon.svg'
                                  : destinationFilterTitle === "Avalanche"
                                  ? 'https://cdn.worldofdypians.com/wod/avaxIcon.svg'
                                  : 'https://cdn.worldofdypians.com/wod/base.svg'
                              }
                              alt=""
                            />
                          )}
                          {destinationFilterTitle}
                        </h6>
                      </div>
                      <img src={'https://cdn.worldofdypians.com/wod/dropdownIcon.svg'} alt="" />
                    </button>
                    <ul className="dropdown-menu nft-dropdown-menu  p-2 w-100">
                      {destinationFilterArray &&
                        destinationFilterArray.length > 0 &&
                        destinationFilterArray.map((item, index) => {
                          return (
                            <li
                              key={index}
                              className="nft-dropdown-item"
                              onClick={() => {
                                setDestinationFilterTitle(item.title);
                                //   sortNfts("all");
                              }}
                            >
                              <span className="d-flex align-items-center gap-2">
                                <img
                                  src={`https://cdn.worldofdypians.com/wod/${item.logo}.svg`}
                                  alt=""
                                />{" "}
                                {item.title}
                              </span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <span className="w-100 new-stake-divider mt-3 mb-4"></span>
            <div className="row mx-0 gap-3 align-items-start">
              <div className="col-lg-6 col-12">
                <div className="d-flex flex-column gap-3">
                  <div
                    className="d-flex flex-column align-items-center gap-2 position-relative tooltipicon"
                    style={{ textDecoration: "none" }}
                    onClick={showNftSelectionPopup}
                  >
                    <div className="position-relative package-blur">
                      <div className="first-box-blur first-bigbox-blur d-none d-lg-flex align-items-end justify-content-center"></div>
                      <div className="second-box-blur d-none d-lg-flex second-bigbox-blur"></div>
                      <img
                        src={
                          selectNftId === 0
                            ? 'https://cdn.worldofdypians.com/wod/emptycawswod.png'
                            : finalNftType === "land"
                            ? `https://mint.worldofdypians.com/thumbs/${selectNftId}.png`
                            : `https://mint.dyp.finance/thumbs/${selectNftId}.png`
                        }
                        alt=""
                        className="blur-img blur-img-big"
                      />
                    </div>
                  </div>
                  <button
                    className={`btn ${
                      isConnected && selectNftId === 0
                        ? "pill-btn"
                        : isConnected && selectNftId !== 0
                        ? "conflux-btn"
                        : "pill-btn"
                    } px-4 py-2 mt-lg-4 mx-auto ${
                      windowSize.width > 991 ? "w-50" : "w-100"
                    } `}
                    onClick={() => {
                      !isConnected
                        ? showWalletConnect()
                        : selectNftId === 0
                        ? showNftSelectionPopup()
                        : handleTransferNft();
                    }}
                  >
                    {!isConnected ? (
                      "Connect wallet"
                    ) : selectNftId === 0 ? (
                      "Select NFT"
                    ) : (
                      <>
                        {buttonText} NFT{" "}
                        {finalNftType === "caws" ? "CAWS" : "Genesis"} #
                        {selectNftId}{" "}
                        {(buttonText === "Approving" ||
                          buttonText === "Transferring") && (
                          <div
                            className="spinner-border "
                            role="status"
                            style={{ height: "0.7rem", width: "0.7rem" }}
                          ></div>
                        )}
                      </>
                    )}
                  </button>
                </div>
              </div>
              {windowSize.width < 768 && (
                <span className="w-100 new-stake-divider mt-3"></span>
              )}
              <div className="col-lg-5 col-12">
                <div className="d-flex flex-column gap-2">
                  <span className="bridge-guide-text">
                    Bridge Process Guide
                  </span>
                  <div>
                    <div>
                      <ul className="timeline-bridge mt-4" id="timeline">
                        <li
                          class={`li ${isConnected && coinbase && "complete"} `}
                        >
                          <div className="status">
                            <div className="gap-1 d-flex flex-column gap-2 align-items-start timeline-wrapper-item">
                              <h4 className="listtext"> Connect Wallet </h4>
                              <span className="status-desc">
                                Connect your wallet in order to start migration
                                process. Your wallet chain will be associated as
                                default.
                              </span>
                            </div>
                          </div>
                        </li>
                        <li
                          class={` li ${
                            destinationFilterTitle !== "Select" &&
                            isConnected &&
                            "complete"
                          } `}
                        >
                          <div className="status">
                            <div className="gap-1 d-flex flex-column gap-2 align-items-start timeline-wrapper-item">
                              <h4 className="listtext">
                                {" "}
                                Select the bridge route{" "}
                              </h4>
                              <span className="status-desc">
                                Choose your preferred bridge route between
                                Ethereum, BNB Chain, Avalanche, and Base
                                Network.
                              </span>
                            </div>
                          </div>
                        </li>
                        <li
                          class={` li ${
                            destinationFilterTitle !== "Select" &&
                            isConnected &&
                            selectNftId !== 0 &&
                            isApproved &&
                            "complete"
                          } `}
                        >
                          <div className="status">
                            <div className="gap-1 d-flex flex-column gap-2 align-items-start timeline-wrapper-item">
                              <h4 className="listtext">
                                Select NFT and Approve
                              </h4>
                              <span className="status-desc">
                                Select the NFT you wish to bridge, whether from
                                CAWS or WOD Genesis Land NFTs. After selection,
                                use the approve button and approve the
                                transaction in your wallet.
                              </span>
                            </div>
                          </div>
                        </li>
                        <li
                          class={` li ${
                            destinationFilterTitle !== "Select" &&
                            isConnected &&
                            selectNftId !== 0 &&
                            isApproved &&
                            buttonText.includes("Transfer") &&
                            "complete"
                          } `}
                        >
                          <div className="status">
                            <div className="gap-1 d-flex flex-column gap-2 align-items-start timeline-wrapper-item">
                              <h4 className="listtext">
                                Start Transfering your NFT
                              </h4>
                              <span className="status-desc">
                                After approval is executed successfully, use the
                                transfer button and confirm the transaction in
                                your wallet.
                              </span>
                            </div>
                          </div>
                        </li>
                        <li
                          class={` li ${
                            buttonStatus === "successDeposit" && "complete"
                          } `}
                          style={{ height: windowSize.width > 992 ? 0 : "" }}
                        >
                          <div
                            className="status p-0"
                            style={{ height: windowSize.width > 992 ? 0 : "" }}
                          >
                            <div className="gap-1 d-flex flex-column gap-2 align-items-start timeline-wrapper-item2">
                              <h4
                                className="listtext"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                Wait NFT transfer
                              </h4>
                              <span className="status-desc">
                                Your NFT will be automatically added to your
                                wallet in the destination chain. This process
                                might take 5 to 30 minutes.
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <NftPopup
          onModalClose={() => {
            setshowPopup(false);
            setnftType("land");
          }}
          nftItem={nftType === "land" ? myNFTSLand : myNFTSCaws}
          onTabSelect={(value) => {
            setnftType(value);
          }}
          itemSelected={selectNftId}
          handleConfirmTransfer={(value, value2) => {
            setfinalNftType(value2);
            setSelectedNftId(value);
            setshowPopup(false);
          }}
          previousNftType={finalNftType}
        />
      )}
    </div>
  );
};

export default NFTBridge;
