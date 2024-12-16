import React from "react";
import PropTypes from "prop-types";

const TimepieceItem = ({
  modalId,
  nft,
  isStake,
  checked,
  checklistItemID,
  onChange,
  coinbase,
  isConnected,
  refreshNfts
}) => {


  return (
    <>
      <div
        className="nft-caw-card"
        data-toggle="modal"
        data-target={modalId}
        style={{ width: 195 }}
       
      >
        <div
          className="elevated-stake-container"
          style={{
            background: "transparent",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <div
            style={{
              background: "#26264F",
              
            }}
            className="sub-container"
          >
            <img
              src={nft.image}
              className="nft-img"
              alt=""
            />
            <p
              style={{
                color: "#C0CBF7", fontSize: 14
              }}
            >
              {String(nft.name)}
            </p>
            <div className="footer" style={{ flexDirection: "column" }}>
              <div className="d-flex w-100 justify-content-between align-baseline">
                <p
                  className="nft-id"
                  style={{
                    color: "#F7F7FC",
                  }}
                >
                  {String(nft.name.slice(15,nft.name.length))}
                </p>
                
              </div>
              
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
TimepieceItem.propTypes = {
  modalId: PropTypes.string,
  nft: PropTypes.object,
  isStake: PropTypes.bool,
  checked: PropTypes.bool,
  checklistItemID: PropTypes.number,
  onChange: PropTypes.func,
  // onNftCheckListClick: PropTypes.func,
  countDownLeft: PropTypes.any,
};

export default TimepieceItem;
