import React, { useEffect, useState } from "react";
import wodLogo from "../assets/wodLogo.svg";
import CheckboxDropdown from "./CheckboxDropdown";
import { Checkbox } from "@mui/material";
import { allAreas } from "../mapdata/areas";

const Sidebar = ({
  switches,
  setSwitches,
  chainAreas,
  handleMarkerClick,
}) => {


  const [search, setSearch] = useState("");
  const [sidebar, setSidebar] = useState(true);
  const [searchBox, setSearchBox] = useState(false);

  const handleSearch = (val) => {
    setSearch(val);
    if (val.length >= 2) {
      setSearchBox(true);
    } else {
      setSearchBox(false);
    }
  };

  function openNav() {
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("mySidebar").style.paddingLeft = "12px";
    document.getElementById("mySidebar").style.paddingRight = "12px";
    document.getElementById("main").style.marginLeft = "0px";
    setSidebar(true);
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("mySidebar").style.paddingLeft = "0";
    document.getElementById("mySidebar").style.paddingRight = "0";


    setSidebar(false);
  }

  useEffect(() => {
    const leafletControls = document.querySelectorAll(".leaflet-left");
    leafletControls.forEach((control) => {
      control.style.left = sidebar ? "300px" : "65px";
      control.style.top = "10px";
    });
  }, [sidebar]);


  useEffect(() => {
    openNav();
  }, []);

  return (
    <div>
      <div id="mySidebar" className="sidebar">
        <div className="d-flex align-items-center justify-content-end">
        <div className="d-flex align-items-center gap-2 w-100">
        <div className="position-relative w-100" style={{ zIndex: 6 }}>
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="map-search my-2"
            placeholder="Search..."
          />
         {search !== "" && 
          <span className="closebtn-2" onClick={() => {setSearch(""); setSearchBox(false)}}>
          ×
        </span>
         }
          <div
            className={`search-box ${
              searchBox ? "d-flex" : "d-none"
            } flex-column py-2`}
          >
            {allAreas
              .filter((item) => {
                return item.title.toLowerCase().includes(search.toLowerCase());
              })
              .map((item, index) => (
                <h6
                key={index}
                  className="search-item mb-0 p-3"
                  onClick={() => {
                    handleMarkerClick(item, 18);
                  }}
                >
                  {item.title}
                </h6>
              ))}
          </div>
        </div>
          <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
            ×
          </a>
        </div>
        </div>
       
        <div className="d-flex flex-column gap-2" style={{ zIndex: 2 }}>
         
          <CheckboxDropdown
            parent={"Dypians City"}
            options={chainAreas}
            onZoomIn={handleMarkerClick}
          />
          <div>
            <Checkbox
              checked={switches.regions}
              onChange={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  regions: !switches.regions,
                }))
              }
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "white",
                },
              }}
            />
            <span style={{ marginLeft: 8, color: "white" }}>Regions</span>
          </div>
          <div>
            <Checkbox
              checked={switches.areas}
              onChange={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  areas: !switches.areas,
                }))
              }
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "white",
                },
              }}
            />
            <span style={{ marginLeft: 8, color: "white" }}>Cities</span>
          </div>
        
          <div>
            <Checkbox
              checked={switches.quests}
              onChange={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  quests: !switches.quests,
                }))
              }
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "white",
                },
              }}
            />
            <span style={{ marginLeft: 8, color: "white" }}>Quests</span>
          </div>
          <div>
            <Checkbox
              checked={switches.bosses}
              onChange={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  bosses: !switches.bosses,
                }))
              }
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "white",
                },
              }}
            />
            <span style={{ marginLeft: 8, color: "white" }}>Game Bosses</span>
          </div>
          <div>
            <Checkbox
              checked={switches.teleports}
              onChange={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  teleports: !switches.teleports,
                }))
              }
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "white",
                },
              }}
            />
            <span style={{ marginLeft: 8, color: "white" }}>Teleports</span>
          </div>
          <div>
            <Checkbox
              checked={switches.craftingTables}
              onChange={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  craftingTables: !switches.craftingTables,
                }))
              }
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "white",
                },
              }}
            />
            <span style={{ marginLeft: 8, color: "white" }}>Crafting Tables</span>
          </div>
        </div>
      </div>
      <div id="main">
        <button
          className="openbtn"
          onClick={openNav}
          style={{ display: sidebar ? "none" : "flex" }}
        >
          ☰
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
