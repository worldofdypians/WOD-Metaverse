import React, { useEffect, useState } from "react";
import "./_footer.scss";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import { useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";
import validateEmail from "../../hooks/validateEmail";
import axios from "axios";
import styled from "styled-components";


const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
});
const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
    fontFamily: "Poppins",
    zIndex: "2",
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Poppins",
  },
  "& .MuiSelect-select": {
    color: "#fff",
    fontFamily: "Poppins",
    zIndex: "1",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#AAA5EB",
    fontFamily: "Poppins",
    color: "#fff",
    background: "#080b2a",
    borderRadius: "8px",
  },
  "& .MuiOutlinedInput-input": {
    zIndex: "1",
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Poppins",
      background: "#080b2a",
      borderRadius: "8px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Poppins",
      color: "#fff",
      background: "#080b2a",
      borderRadius: "8px",
    },
  },
});
const Footer = () => {
  const location = useLocation();

  const year = new Date().getFullYear();
  const [error, setError] = useState({});
  const windowSize = useWindowSize();
  const [padding, setPadding] = useState(false);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [hoverState, setHoverState] = useState(false)

  const socials = [
    {
      icon: "twitterFooter",
      link: "https://twitter.com/worldofdypians",
    },

    {
      icon: "telegramFooter",
      link: "https://t.me/worldofdypians",
    },
    {
      icon: "discordFooter",
      link: "https://discord.gg/worldofdypians",
    },
    {
      icon: "githubFooter",
      link: "https://github.com/worldofdypians/",
    },
    {
      icon: "instagramFooter",
      link: "https://www.instagram.com/worldofdypians",
    },
    {
      icon: "facebookFooter",
      link: "https://www.facebook.com/worldofdypians",
    },
    // {
    //   icon: "reddit",
    //   link: "https://www.reddit.com/r/WorldofDypians/",
    // },
    // {
    //   icon: "tiktok",
    //   link: "https://www.tiktok.com/@worldofdypians",
    // },
    {
      icon: "youtubeFooter",
      link: "https://www.youtube.com/@worldofdypians",
    },
    {
      icon: "mediumFooter",
      link: "https://medium.com/@worldofdypians",
    },
    {
      icon: "emailFooter",
      link: "mailto:contact@worldofdypians.com",
    },
    {
      icon: "linkedinFooter",
      link: "https://www.linkedin.com/company/worldofdypians",
    },
    {
      icon: "miniappFooter",
      link: "https://t.me/WorldOfDypians_bot",
    },
    {
      icon: "cmcFooter",
      link: "https://coinmarketcap.com/currencies/world-of-dypians/",
    },
    {
      icon: "coingeckoFooter",
      link: "https://www.coingecko.com/en/coins/world-of-dypians",
    },
  ];

  const subscribe = async (e) => {
    e.preventDefault();
    setError(validateEmail(email));
    if (Object.keys(validateEmail(email)).length === 0) {
      const postEmail = {
        email: email,
      };

      if (email !== "") {
        axios
          .post("https://api3.dyp.finance/api/newsletter/insert", postEmail)
          .then((result) => {
            if (result.data.status === 1) {
              setSuccess(true);
            } else {
              setSuccess(false);
              setError({ email: result.data.message });
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    }
  };

  useEffect(() => {
    if (location.pathname.includes("shop")) {
      setPadding(true);
    } else {
      setPadding(false);
    }
  }, [location]);

  const scrollToTop = (name) => {
    if (location.pathname.includes(name)) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div
      className={`${
        padding ? "extra-padding" : null
      } footer-container ${location.pathname.includes("map") ? "d-none" : "d-flex"} justify-content-center align-items-center px-3 px-lg-5 w-100  `}
    >
      <div className="custom-container">
        <div className="d-flex align-items-center gap-lg-0 gap-4 justify-content-between flex-lg-row flex-column">
          <div className="d-flex footerlink-wrapper flex-column flex-lg-row flex-md-row align-items-center gap-2 gap-lg-5 gap-md-5">
            <NavLink to="/token" className="new-footer-link">
              WOD Token
            </NavLink>
            <NavLink to="/shop" className="new-footer-link">
            Shop
            </NavLink>
            <NavLink to="/staking" className="new-footer-link">
              Staking
            </NavLink>
            <NavLink to="/about#ourteam" className="new-footer-link">
              Team
            </NavLink>
            <a
              href="https://drive.google.com/drive/folders/18CTr6sfumvQXhy_XWve4IECEhBBk-esH?usp=sharing"
              className="new-footer-link"
              target="_blank"
              rel="noreferrer"
            >
              Brand
            </a>
            <NavLink to="/join-beta" className="new-footer-link">
              Join Beta
            </NavLink>
          </div>
          <a
                  className="game-event-download py-2 px-3 d-flex align-items-center gap-2"
                  onMouseEnter={() => setHoverState(true)}
                  onMouseLeave={() => setHoverState(false)}
                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                  target="_blank"
                >
                  <img src={hoverState ? "https://cdn.worldofdypians.com/wod/epicwhite.svg" : "https://cdn.worldofdypians.com/wod/epicblack.svg"} alt="icon" className="epicgame2" />
                  Download
                </a>
        </div>
        <hr className="footer-divider my-4" />
        <div className="d-flex flex-column-reverse flex-lg-row flex-md-row align-items-lg-center justify-content-between mb-5">
          <div className="d-flex flex-column flex-lg-row flex-md-row align-items-center gap-4 gap-lg-5 mt-4 mt-lg-0">
            <img src={"https://cdn.worldofdypians.com/wod/metaverse.svg"} height={64} alt="" />
            <div className="d-flex flex-column justify-content-between">
              <span className="copyright-text">
                ©{year} World of Dypians Ltd
              </span>
              <span className="trademark-text">
                All trademarks referenced herein are the properties of their
                respective owners.
              </span>
              <div className="d-flex align-items-center gap-lg-5 gap-3">
                <NavLink
                  to="/terms-of-service"
                  onClick={() => scrollToTop("terms")}
                  style={{ textDecoration: "none" }}
                  className="gray-footer-link"
                >
                  Terms of Service
                </NavLink>
                <NavLink to="/privacy-policy" className="gray-footer-link">
                  Privacy
                </NavLink>
                <NavLink to="/contact-us" className="gray-footer-link">
                  Contact Us{" "}
                </NavLink>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-4 footer-socials-wrapper">
            {socials.map((item, index) => (
              <a href={item.link} key={index} target="_blank" rel="noreferrer">
                <img
                  src={`https://cdn.worldofdypians.com/wod/${item.icon}.svg`}
                  alt=""
                  height={25}
                  width={25}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
