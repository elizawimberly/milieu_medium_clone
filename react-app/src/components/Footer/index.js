/******************************** IMPORTS ********************************/
// libraries
import React from "react";
// local files
import "./Footer.css";
// import "./FooterAccount.css";
// import githubLogo from "../../../assets/social-media-branding/github-logo.png";

/******************************* COMPONENT *******************************/
function Footer() {
  /**************** render component *****************/
  return (
    <div className="FooterAccount-container">
      <div className="footer-left">
        {/* <a href="https://www.flickr.com/help/privacy" className="footerText">
          Privacy
        </a>
        <a href="https://www.flickr.com/help/terms" className="footerText">
          Terms
        </a>
        <a href="https://www.flickr.com/help/cookies" className="footerText">
          Sitemap
        </a> */}
        <a
          href="https://www.linkedin.com/in/eliza-wimberly-773896205/"
          className="footerText"
        >
          Contact the site developer on LinkedIn
        </a>
      </div>

      {/* <div className="footer-middle">
        <span className="footerText">
          Flare. Connecting people through photography.
        </span>
      </div> */}

      <div className="footer-right">
        <a
          href="https://github.com/elizawimberly"
          className="footerText"
          // id="footer-logo-container"
        >
          {/* <img src={githubLogo} alt="logo" className="footer-logo"></img> */}
          {/* <i class="fa-brands fa-github" className="footerText"></i> */}
          {/* <i class="fa-brands fa-square-github" className="footerText"></i> */}
          Contact on Github
        </a>
      </div>
    </div>
  );
}

/******************************** EXPORTS ********************************/
export default Footer;
