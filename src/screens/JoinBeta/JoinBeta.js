import React, { useEffect, useState } from "react";
import "./_joinbeta.scss";
import axios from "axios";
import getFormattedNumber from "../Caws/functions/get-formatted-number";
 

const JoinBeta = ({ coinbase, handleRegister }) => {
  const requirements = [
    "Access to a PC that meets minimum system requirements",
    "Member of Dypius Discord Server",
    "Must own an active Twitter account ",
    "Able to provide an Email Address",
    "Supported Web 3 Wallet available",
    "Screen capturing software ",
    "Good Communication Skills",
    "Attention to Detail",
  ];

  const tasks = [
    "Follow Team instructions",
    "Download and install latest updates",
    "Frequent login and testing",
    "Explore game in its entirety",
    "Create feedback tickets",
    "Document game bugs and findings",
    "Provide valuable suggestions",
    "Engage with community",
    "Share experiences on social media",
  ];

  const benefits = [
    "Early content access",
    "Assist in improving World of Dypians",
    "Access to private Discord channels",
    "Meet new community members",
    "Exclusive Beta giveaways",
    "Priority on employee openings",
    "Monetary compensation and other special prizes",
    "Gain valuable experience",
    "Become certified WOD Beta Tester",
    "Improve your potential employment opportunities",
  ];

  const [seats, setSeats] = useState();
  const [betaSeats, setBetaSeats] = useState();

  const countWhitelist = async () => {
    await axios
      .get("https://api3.dyp.finance/api/whitelist/count")
      .then((data) => {
        setSeats(data.data.count);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const countBeta = async () => {
    await axios
      .get("https://api3.dyp.finance/api/beta_tester_application/count")
      .then((data) => {
        setBetaSeats(data.data.count);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    countWhitelist();
    countBeta();
    window.scrollTo(0, 0);
    document.title = "Join Beta";
  }, []);

  return (
    <div className="container-fluid mt-lg-5 pt-lg-5 px-0 d-flex align-items-center justify-content-center">
      <div className="d-flex w-100 flex-column beta-main-wrapper py-5">
        <div className="row w-100 pt-5 pt-lg-0 px-3 px-lg-5 mx-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-6">
            <h6 className="explorer-grid-title">Beta Tester Application</h6>
            <p className="ways-to-amplify-desc">
              Apply to become a World of Dypians beta tester to gain early
              access to the latest game updates and features, entrance to
              private tester discord channels, provide valuable feedback to
              developers, and earn rewards while enjoying exciting gameplay.
            </p>
            <p className="ways-to-amplify-desc">
              If your application is selected to become a beta tester, you will
              have the opportunity to help shape the development of the game and
              make a significant contribution to the success of World of
              Dypians.
            </p>
          </div>
          <div className="col-12 col-lg-5">
            <div className="join-beta-banner  d-flex justify-content-center  flex-column gap-2">
              <h6 className="market-banner-title">
                Apply to become a WOD Beta Tester
              </h6>
              <div className="d-flex align-items-end justify-content-between">
                <div className="d-flex flex-column">
                  <span className="registered">Already registered</span>
                  <div className="d-flex align-items-center gap-1">
                    <img src={'https://cdn.worldofdypians.com/wod/joinBetaIconMain.svg'} alt="" />
                    <h6 className="registered-amount mb-0">
                      {getFormattedNumber(seats + betaSeats, 0)}
                    </h6>
                  </div>
                </div>

                <button
                  className="action-btn px-4 px-lg-5 d-flex align-items-center gap-2"
                  onClick={handleRegister}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row w-100 justify-content-between px-3 px-lg-5 mx-0">
          <div className="d-flex flex-column gap-2 info-grid-item">
            <div className="d-flex align-items-center gap-2">
              <img src={'https://cdn.worldofdypians.com/wod/requirementsIcon.svg'} alt="requirements" />
              <h6 className="market-banner-title mb-0">Requirements</h6>
            </div>
            <div className="d-flex flex-column gap-3 beta-info-wrapper p-3">
              {requirements.map((item) => (
                <div className="d-flex align-items-start gap-2">
                  <img
                    src={'https://cdn.worldofdypians.com/wod/checkIcon.svg'}
                    alt="check"
                    style={{ position: "relative", top: "2px" }}
                  />
                  <span className="ways-to-amplify-desc">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex flex-column gap-2 info-grid-item">
            <div className="d-flex align-items-center gap-2">
              <img src={'https://cdn.worldofdypians.com/wod/tasksIcon.svg'} alt="requirements" />
              <h6 className="market-banner-title mb-0">Tasks</h6>
            </div>
            <div className="d-flex flex-column gap-3 beta-info-wrapper p-3">
              {tasks.map((item) => (
                <div className="d-flex align-items-start gap-2">
                  <img
                    src={'https://cdn.worldofdypians.com/wod/checkIcon.svg'}
                    alt="check"
                    style={{ position: "relative", top: "2px" }}
                  />
                  <span className="ways-to-amplify-desc">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex flex-column gap-2 info-grid-item">
            <div className="d-flex align-items-center gap-2">
              <img src={'https://cdn.worldofdypians.com/wod/benefitsIcon.svg'} alt="requirements" />
              <h6 className="market-banner-title mb-0">Benefits</h6>
            </div>
            <div className="d-flex flex-column gap-3 beta-info-wrapper p-3">
              {benefits.map((item) => (
                <div className="d-flex align-items-start gap-2">
                  <img
                    src={'https://cdn.worldofdypians.com/wod/checkIcon.svg'}
                    alt="check"
                    style={{ position: "relative", top: "2px" }}
                  />
                  <span className="ways-to-amplify-desc">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinBeta;
