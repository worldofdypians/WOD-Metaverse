import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
 


const renderer = ({ days, hours, minutes }) => {
  return (
    <>
      <div className="d-flex align-items-center gap-1">
        <div className="d-flex flex-column align-items-center">
          <h6 className="profile-time-number mb-0">
            {days < 10 ? "0" + days : days}
          </h6>
          <span className="profile-time-desc mb-0">Days</span>
        </div>
        <h6 className="profile-time-number mb-0">:</h6>
        <div className="d-flex flex-column align-items-center">
          <h6 className="profile-time-number mb-0">
            {hours < 10 ? "0" + hours : hours}
          </h6>
          <span className="profile-time-desc mb-0">Hours</span>
        </div>
        <h6 className="profile-time-number mb-0">:</h6>
        <div className="d-flex flex-column align-items-center">
          <h6 className="profile-time-number mb-0">
            {minutes < 10 ? "0" + minutes : minutes}
          </h6>
          <span className="profile-time-desc mb-0">Minutes</span>
        </div>
      </div>
    </>
  );
};
const ActiveProfileEvent = ({ onOpenEvent, event, userEarnedUsd, data }) => {
 
  return (
    <div
      className="profile-event-item d-flex flex-column position-relative mb-1"
      onClick={onOpenEvent}
      style={{ transform: "translateX(0px)" }}
    >
      <div className="profile-event-top d-flex align-items-center justify-content-between p-2">
        <div className="d-flex align-items-center gap-2">
          <img
            src={
              data.logo
            }
            height={16}
            width={16}
            alt=""
            className="profilebannerimg"
          />
          <div className="d-flex flex-column">
            <h6 className="profile-event-title d-flex align-items-center gap-1 mb-0">
              {event.title}
              <div
                className="profile-event-tag position-relative d-flex align-items-center justify-content-center px-1"
                style={{ top: 0, right: 0 }}
              >
                {event.status === "Live" && (
                  <div
                  className="pulsatingDot"
                    style={{ width: 7, height: 7, marginRight: 5 }}
                  ></div>
                )}
                <span
                  className="profile-event-tag-text mb-0"
                  style={{ color: "#B71061" }}
                >
                  {event.status}
                </span>
              </div>
            </h6>
            <span className="profile-event-rewards mb-0">
              {event.totalRewards}
            </span>
          </div>
        </div>
        <Countdown renderer={renderer} date={event.eventDuration} />
      </div>
      <div className="profile-event-bottom p-2 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-1">
          <img
            src={event.eventType === "Explore & Mine" ? 'https://cdn.worldofdypians.com/wod/cyanExplore.svg' : 'https://cdn.worldofdypians.com/wod/cyanFind.svg'}
            height={15}
            width={15}
            alt=""
          />
          <span className="mb-0 event-bottom-text">{event.eventType}</span>
        </div>
        {userEarnedUsd != undefined && (
          <div className="d-flex align-items-center gap-1 eventusd">
            {/* {event.title === "Dypius" && event.activeTab !== 'dypiusv2' ? (
          <img src={dypius} height={15} width={15} alt="" />
        ) : ( */}
            <img src={'https://cdn.worldofdypians.com/wod/cyanDollar.svg'} height={15} width={15} alt="" />
            {/* )} */}
            <span className="mb-0 event-bottom-text">
              {event.title === "Dypius" && event.activeTab !== "dypiusv2" ? (
                <>{getFormattedNumber(userEarnedUsd, 0)} DYP</>
              ) : (
                <>${getFormattedNumber(userEarnedUsd, 2)}</>
              )}
            </span>
          </div>
        )}
        <div className="d-flex align-items-center gap-1">
          <img src={'https://cdn.worldofdypians.com/wod/cyanDate.svg'} height={15} width={15} alt="" />
          <span className="mb-0 event-bottom-text">{event.date}</span>
        </div>
        <img src={'https://cdn.worldofdypians.com/wod/cyanArrow.svg'} height={15} width={15} alt="" />
      </div>
    </div>
  );
};

export default ActiveProfileEvent;
