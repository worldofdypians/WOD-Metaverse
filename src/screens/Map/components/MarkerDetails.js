import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { NavLink } from "react-router-dom";
import myRewardsIcon from "../assets/myRewardsIcon.svg";
import getFormattedNumber from "../../Caws/functions/get-formatted-number";

const renderer = ({ days, hours, minutes }) => {
  return (
    <>
      <div className="d-flex align-items-start popup-timer mt-4 mt-lg-0 gap-1">
        <div className="d-flex flex-column align-items-center gap-1">
          <h6
            className="profile-time-number-2 mb-0"
            style={{ fontSize: "16px" }}
          >
            {days < 10 ? "0" + days : days}
          </h6>
          <span
            className="profile-time-desc-2 mb-0"
            style={{ fontSize: "12px" }}
          >
            Days
          </span>
        </div>
        <h6 className="profile-time-number-2 mb-0" style={{ fontSize: "16px" }}>
          :
        </h6>
        <div className="d-flex flex-column align-items-center gap-1">
          <h6
            className="profile-time-number-2 mb-0"
            style={{ fontSize: "16px" }}
          >
            {hours < 10 ? "0" + hours : hours}
          </h6>
          <span
            className="profile-time-desc-2 mb-0"
            style={{ fontSize: "12px" }}
          >
            Hours
          </span>
        </div>
        <h6 className="profile-time-number-2 mb-0" style={{ fontSize: "16px" }}>
          :
        </h6>
        <div className="d-flex flex-column align-items-center gap-1">
          <h6
            className="profile-time-number-2 mb-0"
            style={{ fontSize: "16px" }}
          >
            {minutes < 10 ? "0" + minutes : minutes}
          </h6>
          <span
            className="profile-time-desc-2 mb-0"
            style={{ fontSize: "12px" }}
          >
            Minutes
          </span>
        </div>
      </div>
    </>
  );
};

const MarkerDetails = ({ show, marker, onClose, type }) => {
  const [past, setPast] = useState(false);

  useEffect(() => {
    return () => {
      setPast(false);
    };
  }, []);

  return (
    <div className={`marker-details-2 ${show && "marker-events-active"}`}>
      <>
        {type === "chain" ? (
          <div className="d-flex flex-column justify-content-between h-100">
            <div className="d-flex flex-column gap-2 h-100">
              <div className="d-flex map-sidebar-title-wrapper align-items-center justify-content-between p-3">
                <h6 className="map-sidebar-title mb-0">{marker.title}</h6>
                <a
                  href="javascript:void(0)"
                  class="closebtn-3"
                  onClick={onClose}
                >
                  ×
                </a>
              </div>
              <div className="marker-details-inner-wrapper d-flex flex-column gap-2 h-100">
                <div
                  className="px-3 w-100 d-flex justify-content-center"
                  style={{ borderRadius: "12px" }}
                >
                  <img
                    src={require(`../assets/chainImages/${marker.banner}`)}
                    alt={marker.title}
                    className="w-100"
                  />
                </div>
                <div className="d-flex flex-column gap-2 px-3 h-100 mb-3 justify-content-between">
                  <p className="custom-marker-content  mb-0">{marker?.desc}</p>
                  <div className="chain-marker-info-wrapper d-flex align-items-center justify-content-between p-2">
                    <div className="d-flex align-items-center gap-2">
                      <img src={marker.icon} width={24} height={24} alt="" />
                      <h6 className="chain-marker-title mb-0">
                        {marker.title.slice(0, marker.title.length - 5)}
                      </h6>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      {marker?.socials.map((item, index) => (
                        <a href={item.link} key={index} target="_blank">
                          <img src={item.icon} height={24} width={24} alt="" />
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="chain-marker-info-wrapper chain-marker-info-grid-2 p-2">
                    <div className="chain-marker-info-item gap-2 d-flex flex-column align-items-center justify-content-center py-2">
                      <h6 className="mb-0">{marker?.city}</h6>
                      <span>City</span>
                    </div>

                    <div className="chain-marker-info-item gap-2 d-flex flex-column align-items-center justify-content-center py-2">
                      <h6 className="mb-0">{marker?.size}</h6>
                      <span>Size</span>
                    </div>
                    <div className="chain-marker-info-item gap-2 d-flex flex-column align-items-center justify-content-center py-2">
                      <h6 className="mb-0">{marker?.rewards}</h6>
                      <span>Rewards</span>
                    </div>
                  </div>
                  <h6 className="chain-marker-benefits-title">Benefits</h6>
                  <div className="d-flex flex-column gap-1">
                    {marker.benefits.map((item, index) => (
                      <div
                        className="d-flex align-items-center gap-2"
                        key={index}
                      >
                        <div className="green-dot"></div>
                        <span className="custom-marker-content">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="chain-marker-info-wrapper d-flex align-items-center justify-content-between p-2">
                    <h6 className="chain-marker-benefits-title mb-0">
                      Features
                    </h6>
                    {marker.pastEvents.length === 0 &&
                    marker.events.length === 0 ? (
                      <></>
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className={`marker-event-time px-2 ${
                            !past && "marker-event-time-active"
                          }`}
                          onClick={() => setPast(false)}
                        >
                          Live
                        </span>
                        <span
                          className={`marker-event-time px-2 ${
                            past && "marker-event-time-active"
                          }`}
                          onClick={() => setPast(true)}
                        >
                          Past
                        </span>
                      </div>
                    )}
                  </div>
                  {past && marker.pastEvents.length > 0 ? (
                    <div className="chain-marker-info-grid">
                      {marker.pastEvents.map((item, index) => (
                        <NavLink
                          to={item.link}
                          className="marker-event-item p-1 d-flex flex-column align-items-center gap-1"
                          key={index}
                        >
                          <img src={item.image} className="w-100" alt="" />
                          <span>{item.title}</span>
                        </NavLink>
                      ))}
                    </div>
                  ) : !past && marker.events.length > 0 ? (
                    <div className="chain-marker-info-grid">
                      {marker.events.map((item, index) => (
                        <NavLink
                          to={item.link}
                          className="marker-event-item p-1 d-flex flex-column align-items-center gap-1"
                          key={index}
                        >
                          <img src={item.image} className="w-100" alt="" />
                          <span>{item.title}</span>
                        </NavLink>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="chain-marker-info-wrapper d-flex align-items-center justify-content-center w-100"
                      style={{ height: "87px" }}
                    >
                      <span className="no-features-span">
                        No Features Available
                      </span>
                    </div>
                  )}
                  {/* {marker.events.map((item, index) => (
                      <NavLink
                        to={item.link}
                        className="marker-event-item p-1 d-flex flex-column align-items-center gap-1"
                        key={index}
                      >
                        <img src={item.image} className="w-100" alt="" />
                        <span>{item.title}</span>
                      </NavLink>
                    ))} */}
                </div>
              </div>
            </div>
          </div>
        ) : type === "Treasure Hunt" ? (
          <div className="d-flex flex-column justify-content-between h-100">
            <div className="d-flex flex-column gap-2 h-100">
              <div className="d-flex map-sidebar-title-wrapper align-items-center justify-content-between p-3">
                <h6 className="map-sidebar-title mb-0">
                  {marker.title} Treasure Hunt
                </h6>
                <a
                  href="javascript:void(0)"
                  class="closebtn-3"
                  onClick={onClose}
                >
                  ×
                </a>
              </div>
              <div className="marker-details-inner-wrapper d-flex flex-column gap-2 h-100">
                <div
                  className="px-3 w-100 d-flex flex-column align-items-center justify-content-center"
                  style={{ borderRadius: "12px" }}
                >
                  <img
                    src={require(`../assets/chainImages/${marker.image}`)}
                    alt={marker.title}
                    className="w-75"
                  />
                  <div className="d-flex align-items-center justify-content-between chain-marker-info-wrapper p-3 w-100">
                    <span className="ends-in-span">Ends in</span>
                    <Countdown
                      renderer={renderer}
                      date={marker.popupInfo.eventDuration}
                    />
                  </div>
                </div>
                <div className="d-flex flex-column gap-2 px-3 h-100 mb-3 justify-content-between">
                  <div className="chain-marker-info-wrapper chain-marker-info-grid-2 p-2">
                    <div className="chain-marker-info-item gap-2 d-flex flex-column align-items-center justify-content-center py-2">
                      <h6 className="mb-0">{marker?.rewardAmount}</h6>
                      <span>{marker.rewardType} Rewards</span>
                    </div>

                    <div className="chain-marker-info-item gap-2 d-flex flex-column align-items-center justify-content-center py-2">
                      <h6 className="mb-0">{marker?.eventType}</h6>
                      <span>Gameplay</span>
                    </div>
                    <div className="chain-marker-info-item gap-2 d-flex flex-column align-items-center justify-content-center py-2">
                      <h6 className="mb-0">{marker?.popupInfo.chain}</h6>
                      <span>Chain</span>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <h6 className="chain-marker-benefits-title">Details</h6>
                    <p className="custom-marker-content  mb-0">
                      To join the event, players must hold a {marker.title} Beta
                      Pass NFT or be a Premium Subscriber. Engage daily in the{" "}
                      {marker.title} area for a chance at rewards and uncover
                      hidden treasures.
                    </p>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <h6 className="chain-marker-benefits-title">Benefits</h6>
                    <div className="d-flex flex-column gap-1">
                      <div className="d-flex align-items-center gap-2">
                        <div className="green-dot"></div>
                        <span className="custom-marker-content">
                          Daily Rewards range from $0.5 to $20
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <div className="green-dot"></div>
                        <span className="custom-marker-content">
                          Daily Points range from 5,000 to 50,000
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <div className="green-dot"></div>
                        <span className="custom-marker-content">
                          Exclusive Event Access
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <div className="green-dot"></div>
                        <span className="custom-marker-content">
                          Community Engagement
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <div className="green-dot"></div>
                        <span className="custom-marker-content">
                          Exploration Adventures
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <img src={myRewardsIcon} alt="" />
                      <h6 className="chain-marker-benefits-title">Benefits</h6>
                    </div>
                    <div className="chain-marker-info-wrapper p-3 d-flex flex-column">
                      <div className="d-flex align-items-end justify-content-between">
                        <span className="treasure-hunt-marker-span">
                          Rewards
                        </span>
                        <div className="d-flex align-items-end gap-2">
                          <span className="treasure-hunt-marker-value">
                            ${getFormattedNumber(marker.userEarnUsd, 1)}
                          </span>
                          <span className="treasure-hunt-marker-value">
                            ({getFormattedNumber(marker.userEarnCrypto, 0)} {marker.rewardType})
                          </span>
                        </div>
                      </div>
                      <div className="marker-divider"></div>
                      <div className="d-flex align-items-end justify-content-between">
                        <span className="treasure-hunt-marker-span">
                          Points
                        </span>
                          <span className="treasure-hunt-marker-value">
                            {getFormattedNumber(marker.userEarnPoints, 0)}
                          </span>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : type === "quest" ? (
          <div className="d-flex flex-column justify-content-between h-100">
            <div className="d-flex flex-column gap-2">
              <div className="d-flex map-sidebar-title-wrapper align-items-center justify-content-between p-3">
                <h6 className="map-sidebar-title mb-0">{marker.title}</h6>
                <a
                  href="javascript:void(0)"
                  class="closebtn-3"
                  onClick={onClose}
                >
                  ×
                </a>
              </div>
              <img src={marker.banner} alt={marker.title} className="w-100" />
              <div className="d-flex flex-column gap-4 ">
                <p className="custom-marker-content mb-0">
                  Quest Starts From: {marker.questGiver}
                </p>
                <div className="d-flex flex-column gap-2">
                  <p className="custom-marker-content mb-0">Description:</p>
                  <p className="custom-marker-content mb-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur nostrum
                  </p>
                </div>
              </div>
              <p className="custom-marker-content mb-0">Requirements:</p>
              <ul>
                {marker.conditions.map((condition, index) => (
                  <li className="custom-marker-content" key={index}>
                    {condition}
                  </li>
                ))}
              </ul>
              <p className="custom-marker-content mb-0">Rewards:</p>
              <ul>
                {marker.rewards.map((reward, index) => (
                  <li className="custom-marker-content" key={index}>
                    {reward}
                  </li>
                ))}
              </ul>
            </div>
            <div className="d-flex w-100 justify-content-center">
              <button className="land-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        ) : type === "area" ? (
          <div className="d-flex flex-column justify-content-between h-100">
            <div className="d-flex map-sidebar-title-wrapper align-items-center justify-content-between p-3">
              <h6 className="map-sidebar-title mb-0">{marker.title}</h6>
              <a href="javascript:void(0)" class="closebtn-3" onClick={onClose}>
                ×
              </a>
            </div>
          </div>
        ) : type === "event" ? (
          <div className="d-flex flex-column justify-content-between h-100">
            <div className="d-flex map-sidebar-title-wrapper align-items-center justify-content-between p-3">
              <h6 className="map-sidebar-title mb-0">{marker.title}</h6>
              <a href="javascript:void(0)" class="closebtn-3" onClick={onClose}>
                ×
              </a>
            </div>
          </div>
        ) : (
          <> </>
        )}
      </>
    </div>
  );
};

export default MarkerDetails;
