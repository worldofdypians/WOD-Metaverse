import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { dypiansTransport, leaderboards, quests } from "../mapdata/areas";
import teleportsIcon from "../assets/sidebarIcons/teleportsIcon.svg";
import questsIcon from "../assets/sidebarIcons/questsIcon.svg";
import leaderboardsIcon from "../assets/sidebarIcons/leaderboardsIcon.svg";
import areasIcon from '../assets/sidebarIcons/areasIcon.svg'

const DypiusDropdown = ({
  options,
  parent,
  onZoomIn,
  switches,
  setSwitches,
}) => {
  return (
    <div className="d-flex px-3 flex-column gap-2">
      <div
        className="d-flex py-1 w-100 align-items-center"
        style={{ borderBottom: "1px solid #828FBB" }}
      >
        <h6 className="sidebar-section-title mb-0">Dypians City</h6>
      </div>
      <div
        className={`section-switch-btn ${
          switches.leaderboards && "section-switch-btn-active"
        } d-flex align-items-center gap-2 p-2 w-100`}
        onClick={() =>
          setSwitches((prev) => ({
            ...prev,
            leaderboards: !switches.leaderboards,
          }))
        }
      >
        <img src={leaderboardsIcon} alt="" />
        <span>Leaderboards</span>
      </div>
      <div
        className={`section-switch-btn ${
          switches.teleports && "section-switch-btn-active"
        } d-flex align-items-center gap-2 p-2 w-100`}
        onClick={() =>
          setSwitches((prev) => ({
            ...prev,
            teleports: !switches.teleports,
          }))
        }
      >
        <img src={teleportsIcon} alt="" />
        <span>Teleports</span>
      </div>
      <div
        className={`section-switch-btn ${
          switches.quests && "section-switch-btn-active"
        } d-flex align-items-center gap-2 p-2 w-100`}
        onClick={() =>
          setSwitches((prev) => ({
            ...prev,
            quests: !switches.quests,
          }))
        }
      >
        <img src={questsIcon} alt="" />
        <span>Quests</span>
      </div>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls={`areas-content`}
          id={`areas-header`}
          sx={{
            background: "rgba(73, 71, 115, 0.70)",
            border: "1px solid #828FBB",
            borderRadius: "10px",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
          }}
        >
         <div className="d-flex align-items-center gap-2">
          <img src={areasIcon} alt="" />
           <span className="accordion-side-text">Areas</span>
         </div>
        </AccordionSummary>
        <AccordionDetails sx={{padding: 0, marginTop: "12px"}}>
          <div className="dypians-areas-grid">
           {options.map((item, index) => (
             <div key={index} className="areas-grid-item py-1 d-flex align-items-center justify-content-center"  onClick={() => onZoomIn(item, 18, "chain")}>
             <span>{item.title.slice(0, item.title.length - 5)}</span>
           </div>
           ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default DypiusDropdown;
