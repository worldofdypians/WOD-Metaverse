import React, { useEffect, useState } from "react";
import "./_timepiece.scss";
import TimepieceHero from "./TimepieceHero";
import TimePieceSticker from "./TimePieceSticker";
import TimePieceTraits from "../../components/TimepieceBenefits/TimepieceTraits";
import TimepieceBenefits from "../../components/TimepieceBenefits/TimepieceBenefits";
import TimePieceMint from "../../components/TimepieceMint/TimepieceMint";
import TimepieceChecklistModal from "./TimepieceChecklistModal";

const TimePiece = ({
  showWalletConnect,
  coinbase,
  isConnected,
  totalCreated,
  mintStatus,
  mintloading,
  chainId,
  nftName,
  textColor,
  handleMint,
  cawsArray,
  calculateCaws,
  timepieceMetadata
}) => {

  const [viewCollection, setViewCollection] = useState(false)

  const handleViewCollection = ()=>{
    setViewCollection(true)
  }


  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Timepiece";
  }, []);

  return (
    <div className="container-fluid px-0 d-flex mt-lg-5 pt-lg-5 align-items-center justify-content-center">
      {viewCollection === true && (
        <TimepieceChecklistModal
        coinbase={coinbase}
        isConnected={isConnected}
        onClose={()=>{setViewCollection(false)}}
        nftItem={timepieceMetadata}
        open={viewCollection}
        />
      )}
      <div
        className="d-flex w-100 flex-column home-main-wrapper"
        style={{ gap: 0, backgroundSize: "cover" }}
      >
        <TimepieceHero />
        <TimePieceSticker />
        <TimePieceMint
          showWalletConnect={showWalletConnect}
          handleViewCollection={handleViewCollection}
          coinbase={coinbase}
          isConnected={isConnected}
          totalCreated={totalCreated}
          mintStatus={mintStatus}
          mintloading={mintloading}
          chainId={chainId}
          nftName={nftName}
          textColor={textColor}
          handleMint={handleMint}
          cawsArray={cawsArray}
          calculateCaws={calculateCaws}
        />
        <TimePieceTraits />
        <TimepieceBenefits />
      </div>
    </div>
  );
};

export default TimePiece;
