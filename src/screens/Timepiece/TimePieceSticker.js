import React from "react"; 


const TimePieceSticker = () => {
  return (
    <div className="row flex-column-reverse flex-lg-row px-3 px-lg-5 mt-0 caws-world-wrapper py-5 gap-4 gap-lg-0">
      <div className="col-12 col-lg-6 d-flex align-items-center">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-column">
            <h2 className="font-organetto caws-hero-title text-white">Caws Timepiece</h2>
            <h2
              className="font-organetto caws-hero-title"
              style={{ color: "#8C56FF" }}
            >
              NFT Collection
            </h2>
          </div>
          <p className="caws-hero-content text-white">
            The CAWS Timepiece NFT collection is the second official NFT
            collection created and produced by Dypius. Holders of the original
            CAWS NFT will be able to mint a Timepiece NFT for FREE for each
            original CAWS NFT held. In Addition, the Timepiece NFTs will provide
            users additional utility and perks in the World of Dypians Metaverse
            platform.
          </p>
          <div className={"linear-border-purple mt-4"} style={{width: 'fit-content'}}>
                <a className={`btn purple-btn px-4 d-flex gap-2 align-items-center`} href='https://opensea.io/collection/cawstimepiece' target='_blank' rel='noreferrer'>
                  <img src={"https://cdn.worldofdypians.com/wod/opensea.svg"} alt=''/>
                  Buy on OpenSea
                </a>
              </div>
        </div>
      </div>
      <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
        <img src={'https://cdn.worldofdypians.com/wod/timepieceBanner1.webp'} alt="caws banner" className="caws-banner" />
      </div>
    </div>
  );
};

export default TimePieceSticker;
