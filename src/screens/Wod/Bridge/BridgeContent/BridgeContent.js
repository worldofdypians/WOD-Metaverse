import React from "react";
import "./_bridgecontent.scss";
import eth from "../../../../components/Header/assets/eth.svg";
import bnb from "../../../../components/Header/assets/bnb.svg";
import wallet from "../../../../assets/wodAssets/wallet.svg";
import tooltip from "../../../../assets/wodAssets/tooltip.svg";
import bridgeSwitch from "../../../../assets/wodAssets/bridgeSwitch.svg";
import bridgeGuide from "../../../../assets/wodAssets/bridgeGuide.svg";
import copy from "../../../../assets/wodAssets/copy.svg";
import { TextField } from "@mui/material";
import styled from "styled-components";

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#fff",
    fontFamily: "Montserrat",
    fontSize: "14px",
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
    fontFamily: "Montserrat",
    fontSize: "14px",
    zIndex: "2",
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Montserrat",
    fontSize: "14px",
  },
  "& .MuiSelect-select": {
    color: "#fff",
    fontFamily: "Montserrat",
    fontSize: "14px",
    zIndex: "1",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#AAA5EB",
    fontFamily: "Montserrat",
    fontSize: "14px",
    color: "#fff",
    background: "#272450",
    borderRadius: "8px",
  },
  "& .MuiOutlinedInput-input": {
    zIndex: "1",
    color: "#fff",
    fontFamily: "Montserrat",
    fontSize: "14px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Montserrat",
      fontSize: "14px",
      background: "#272450",
      borderRadius: "8px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Montserrat",
      fontSize: "14px",
      color: "#fff",
      background: "#272450",
      borderRadius: "8px",
    },
  },
});

const BridgeContent = () => {
  return (
    <div className="ecosystem-wrapper position-relative d-flex justify-content-center align-items-center">
      <div className="custom-container w-100">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="bridge-token-wrapper p-3">
              <div className="w-100 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-4">
                  <button className="bridge-btn-active d-flex align-items-center gap-2 px-3 py-1">
                    <img src={eth} alt="" />
                    Ethereum
                  </button>
                  <button className="bridge-btn-inactive d-flex align-items-center gap-2 px-3 py-1">
                    <img src={bnb} alt="" />
                    BNB Chain
                  </button>
                </div>
                <button className="bridge-wallet-btn d-flex align-items-center gap-2 px-3 py-1">
                  <img src={wallet} width={20} height={20} alt="" />
                  Connect Wallet
                </button>
              </div>
              <div className="bridge-balance-wrapper d-flex p-2 mt-5 align-items-center justify-content-between">
                <span className="user-bridge-balance">Balance: 0.00 WOD</span>
                <h6 className="pool-bridge-balance mb-0">
                  Ethereum Pool: 2,300,000.00 WOD
                </h6>
              </div>
              <div className="bridge-balance-wrapper p-2 mt-5">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="user-bridge-balance">Deposit</span>
                  <img src={tooltip} alt="" />
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div className="d-flex align-items-center gap-2">
                    <StyledTextField
                      // error={businessErrors.business_name ? true : false}
                      size="small"
                      label="Amount"
                      id="business_name"
                      name="business_name"
                      // value={businessValues.business_name}
                      // helperText={businessErrors.business_name}
                      // required
                      // onChange={(e) => {
                      //   handleBusinessChange(e);
                      // }}
                      sx={{ width: "100%" }}
                    />
                    <button className="max-deposit-btn px-2">Max</button>
                  </div>
                  <button
                    className="bridge-btn-inactive d-flex align-items-center gap-2 px-3 py-1"
                    style={{ height: "37px" }}
                  >
                    Approve
                  </button>
                </div>
                <div className="d-flex justify-content-center mt-3 w-100">
                  <span className="user-bridge-balance">
                    Please approve before deposit
                  </span>
                </div>
              </div>
              <div className="d-flex w-100 justify-content-center mt-5">
                <img src={bridgeSwitch} alt="" />
              </div>
              <div className="mt-5 d-flex flex-column gap-2">
                <span className="user-bridge-balance">Withdraw</span>
                <div className="d-flex align-items-center gap-4">
                  <button className="bridge-btn-active d-flex align-items-center gap-2 px-3 py-1">
                    <img src={eth} alt="" />
                    Ethereum
                  </button>
                  <button className="bridge-btn-inactive d-flex align-items-center gap-2 px-3 py-1">
                    <img src={bnb} alt="" />
                    BNB Chain
                  </button>
                </div>
              </div>
              <div className="bridge-balance-wrapper p-2 mt-5">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="user-bridge-balance">Recieve</span>
                  <img src={tooltip} alt="" />
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div className="d-flex align-items-center gap-2">
                    <StyledTextField
                      // error={businessErrors.business_name ? true : false}
                      size="small"
                      label="Enter Deposit TX Hash"
                      id="business_name"
                      name="business_name"
                      // value={businessValues.business_name}
                      // helperText={businessErrors.business_name}
                      // required
                      // onChange={(e) => {
                      //   handleBusinessChange(e);
                      // }}
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <button
                    className="bridge-btn-inactive d-flex align-items-center gap-2 px-3 py-1"
                    style={{ height: "37px" }}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="bridge-token-wrapper p-3 h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <img src={bridgeGuide} alt="" />
                <h6 className="bridge-guide-title mb-0">
                  Bridge process guide
                </h6>
              </div>
              <hr className="bridge-divider my-4" />
              <div className="d-flex flex-column justify-content-between gap-3">
                <div className="bridge-guide-item d-flex align-items-center gap-2">
                  <div className="bridge-guide-pointer-active"></div>
                  <div className="d-flex flex-column">
                    <h6 className="bridge-guide-item-title mb-0">
                      Connect wallet
                    </h6>
                    <span className="bridge-guide-desc">
                      Connect your wallet in order to start using Dypius Bridge.
                      Your wallet chain will be associated as default.
                    </span>
                  </div>
                </div>
                <div className="bridge-guide-item d-flex align-items-center gap-2">
                  <div className="bridge-guide-pointer-inactive"></div>
                  <div className="d-flex flex-column">
                    <h6 className="bridge-guide-item-title mb-0">
                      Select chains
                    </h6>
                    <span className="bridge-guide-desc">
                      Select desired bridge chains at “FROM” and “TO” sections.
                      To change the "FROM” chain you need to change it in your
                      wallet.
                    </span>
                  </div>
                </div>
                <div className="bridge-guide-item d-flex align-items-center gap-2">
                  <div className="bridge-guide-pointer-inactive"></div>
                  <div className="d-flex flex-column">
                    <h6 className="bridge-guide-item-title mb-0">
                      Fill in amount
                    </h6>
                    <span className="bridge-guide-desc">
                      Check your balance and fill in the desired amount you want
                      to bridge. You can use “Max” button to fill in the maximum
                      amount.
                    </span>
                  </div>
                </div>
                <div className="bridge-guide-item d-flex align-items-center gap-2">
                  <div className="bridge-guide-pointer-inactive"></div>
                  <div className="d-flex flex-column">
                    <h6 className="bridge-guide-item-title mb-0">
                      Approve deposit
                    </h6>
                    <span className="bridge-guide-desc">
                      Approve the transaction and then deposit the assets. These
                      steps need confirmation in your wallet.
                    </span>
                  </div>
                </div>
                <div className="bridge-guide-item d-flex align-items-center gap-2">
                  <div className="bridge-guide-pointer-inactive"></div>
                  <div className="d-flex flex-column">
                    <h6 className="bridge-guide-item-title mb-0">
                      Deposit tokens
                    </h6>
                    <span className="bridge-guide-desc">
                      Confirm the transaction and deposit the assets into the
                      bridge contract. This step needs confirmation in your
                      wallet.
                    </span>
                  </div>
                </div>
                <div className="bridge-guide-item d-flex align-items-center gap-2">
                  <div className="bridge-guide-pointer-inactive"></div>
                  <div className="d-flex flex-column">
                    <h6 className="bridge-guide-item-title mb-0">
                      Fill in transaction hash
                    </h6>
                    <span className="bridge-guide-desc">
                      After successful deposit, fill in the transaction hash and
                      switch your wallet to the chosen bridge network.
                    </span>
                  </div>
                </div>
                <div className="bridge-guide-item d-flex align-items-center gap-2">
                  <div className="bridge-guide-pointer-inactive"></div>
                  <div className="d-flex flex-column">
                    <h6 className="bridge-guide-item-title mb-0">
                      Switch to destination chain. Wait timer & withdraw
                    </h6>
                    <span className="bridge-guide-desc">
                      Firstly go to your wallet and switch into the chain you
                      want to withdraw from. Wait for the timer to end and and
                      click withdraw button to receive the assets in the desired
                      chain.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BridgeContent;
