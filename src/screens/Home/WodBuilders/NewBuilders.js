import React from "react";
import "./_wodbuilders.scss";

const NewBuilders = () => {
  const builders = [
    {
      name: "BNB Chain",
      icon: "bnbIcon",
      banner: "bnbChainBanner.webp",
      link: "https://x.com/BNBCHAIN/status/1821018678550306906",
      backer: true,
    },

    {
      name: "CORE",
      icon: "core",
      banner: "coreBanner.png",
      link: "https://x.com/Coredao_Org/status/1790336632823910804",
      backer: true,
    },
    {
      name: "Base",
      icon: "base",
      banner: "baseBanner.png",
      // link: "https://x.com/Coredao_Org/status/1790336632823910804",
      backer: false,
    },
    {
      name: "MultiversX",
      icon: "multiversx",
      banner: "multiversBanner.png",
      link: "https://x.com/MultiversX/status/1790422563849466280",
      backer: false,
    },
    {
      name: "CoinMarketCap",
      icon: "cmcIcon",
      banner: "coinmarketcapBanner.png",
      link: "https://twitter.com/CoinMarketCap/status/1736697110073119098",
      backer: false,
    },
    {
      name: "CoinGecko",
      icon: "coingeckoIcon",
      banner: "coingeckoBanner.png",
      link: "https://twitter.com/coingecko/status/1702286607846682909",
      backer: false,
    },
    {
      name: "Viction",
      icon: "viction",
      banner: "victionBanner.png",
      link: "https://x.com/VictionEco/status/1789987120083562640",
      backer: true,
    },
    {
      name: "SKALE",
      icon: "skaleIcon",
      banner: "skaleBanner.webp",
      link: "https://twitter.com/SkaleNetwork/status/1777372050832658644",
      backer: true,
    },
    {
      name: "Manta",
      icon: "manta",
      banner: "mantaBanner.webp",
      link: "https://x.com/MantaNetwork/status/1819260085945749903",
      backer: true,
    },
    {
      name: "Taiko",
      icon: "taiko",
      banner: "taikoBanner.webp",
      // link: "https://x.com/MantaNetwork/status/1819260085945749903",
      backer: true,
    },
    {
      name: "Conflux",
      icon: "confluxIcon",
      banner: "confluxBanner.png",
      link: "https://twitter.com/Conflux_Network/status/1677017988497563660",
      backer: true,
    },
    {
      name: "BabyDoge",
      icon: "babydogeIcon",
      banner: "babyDogeBanner.webp",
      link: "https://twitter.com/BabyDogeCoin/status/1777714397667893544",
      backer: false,
    },
    {
      name: "Avalanche",
      icon: "avaxIcon",
      banner: "avalancheBanner.png",
      link: "https://twitter.com/ArtOnAvax/status/1666852593480658944",
      backer: false,
    },
    {
      name: "Chainlink",
      icon: "chainlinkIcon",
      banner: "chainlinkBanner.png",
      link: "https://twitter.com/smartcontract/status/1639280913870893056?s=46&t=nb0doR-1o7k9PQ3EaZE8aw",
      backer: false,
    },

    {
      name: "Coin98",
      icon: "coin98Icon",
      banner: "coin98Banner.png",
      link: "https://twitter.com/coin98_wallet/status/1628742662047272961",
      backer: false,
    },
    {
      name: "Gate.io",
      icon: "gateIcon",
      banner: "gateBanner.png",
      link: "https://twitter.com/gate_io/status/1628384476496527361?s=20",
      backer: false,
    },
    {
      name: "MEXC Global",
      icon: "mexcIcon",
      banner: "mexcBanner.png",
      link: "https://twitter.com/MEXC_Official/status/1651888989098455043",
      backer: false,
    },
    {
      name: "Easy2Stake",
      icon: "easy2stakeIcon",
      banner: "easy2stakeBanner.png",
      link: "https://twitter.com/Easy2Stake/status/1654120741221326850",
      backer: false,
    },

    {
      name: "KuCoin",
      icon: "kucoinIcon",
      banner: "kucoinBanner.png",
      backer: false,
    },

    {
      name: "SEI",
      icon: "seiLogo",
      banner: "seiBanner.webp",
      link: "https://x.com/worldofdypians/status/1795177907821617607",
      backer: false,
    },
    {
      name: "Immutable",
      icon: "immutable",
      banner: "immutableBanner.png",
      link: "https://x.com/Immutable/status/1813966964957884795",
      backer: false,
    },
    {
      name: "Cookie3",
      icon: "cookie3",
      banner: "cookie3Banner.webp",
      link: "https://x.com/Cookie3_com/status/1824052238404255889",
      backer: true,
    },
    {
      name: "Midle",
      icon: "midle",
      banner: "midleBanner.webp",
      link: "https://x.com/midle_official/status/1819705076966940996",
      backer: false,
    },
    {
      name: "DogeCoin",
      icon: "dogecoinIcon",
      banner: "dogecoinBanner.webp",
      backer: false,
    },
    {
      name: "Binance Web3",
      icon: "binanceWeb3",
      banner: "bnbChainBanner.webp",
      // link: "https://x.com/Web3WithBinance/status/1834512410041831902",
      backer: true,
    },

    {
      name: "Playground",
      icon: "playground",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "AlterVerse",
      icon: "alterverse",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "KlapAI",
      icon: "klapai",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "Magic Store",
      icon: "magic",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "GGPLAY",
      icon: "ggplay",
      banner: "kucoinBanner.png",
      link: "https://x.com/GGPlayOfficial/status/1801263235221647731",
      backer: false,
    },
    {
      name: "KAPGAMES",
      icon: "kapgames",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "Micro3",
      icon: "micro3",
      banner: "kucoinBanner.png",
      backer: false,
    },

    {
      name: "Cyborg",
      icon: "cyborg",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "SpaceID",
      icon: "spaceId",
      banner: "kucoinBanner.png",
      backer: false,
    },

    {
      name: "Hamster Chain",
      icon: "hamsterChain",
      banner: "kucoinBanner.png",
      backer: false,
    },

    {
      name: "Balance",
      icon: "balance",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "WorldShards",
      icon: "worldshards",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "Finceptor",
      icon: "finceptor",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "Creo Engine",
      icon: "creoengine",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "IBC Group",
      icon: "ibc",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "UQUID",
      icon: "uquid",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "Saving DAO",
      icon: "savingDao",
      banner: "kucoinBanner.png",
      backer: false,
    },
  ];
  return (
    <div className={`w-100  mx-0 `}>
      <div className="d-flex flex-column gap-2">
        <div className="row mx-0 w-100 gap-4 gap-lg-0 d-flex flex-column flex-lg-row flex-md-column align-items-center justify-content-between">
          <div
            className={`builder-item p-3 d-flex flex-column gap-3 gap-lg-0 justify-content-between `}
          >
            <div className="builders-first-half"></div>
            <div className="new-builders-second-half">
              {builders.map((item, index) => (
                <div
                  key={index}
                  className={`d-flex flex-column align-items-center gap-2`}
                >
                  {item.icon === "klapai" ||
                  item.icon === "manta" ||
                  item.icon === "alterverse" ||
                  item.icon === "worldshards" ||
                  item.icon === "binanceWeb3" ||
                  item.icon === "savingDao" ||
                  item.icon === "hamsterChain" ||
                  item.icon === "creoengine" ? (
                    <img
                      src={require(`./assets/${item.icon}.png`)}
                      width={45}
                      height={45}
                      alt=""
                      style={{ scale: item.icon === "hamsterChain" ? "2" : "" }}
                    />
                  ) : (
                    <img
                      src={require(`./assets/${item.icon}.svg`)}
                      width={45}
                      height={45}
                      alt=""
                    />
                  )}

                  <span
                    className={`new-builder-title mb-0`}
                    style={{ fontWeight: "400" }}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex flex-column flex-lg-row gap-2 col-lg-5"></div>
        </div>
      </div>
    </div>
  );
};

export default NewBuilders;
