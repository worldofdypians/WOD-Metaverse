import React from "react";
import "./_launchpool.scss";
import LaunchpoolHero from "./LaunchpoolHero";
import LaunchpoolStats from "./LaunchpoolStats";
import ExplorerGrid from "../Home/ExplorerGrid/ExplorerGrid";

const Launchpool = ({
  wodHolders,
  totalVolumeNew,
  totalSupply,
  monthlyPlayers,
}) => {
  return (
    <div className="container-fluid launchpool-mainhero-wrapper  px-0">
      <div className="d-flex flex-column gap-3">
        <LaunchpoolHero />
        <LaunchpoolStats />
        <ExplorerGrid
          totalSupply={totalSupply}
          monthlyPlayers={monthlyPlayers}
          wodHolders={wodHolders}
          totalVolumeNew={totalVolumeNew}
        />
      </div>
    </div>
  );
};

export default Launchpool;
