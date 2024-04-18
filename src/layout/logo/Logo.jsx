import React from "react";
import { Link } from "react-router-dom";
import BillPadiLogo from "../../images/billpadi-logo.png";

const Logo = () => {
  return (
    <Link to={`/`} className="logo-link">
      <img className="logo-light logo-img" src={BillPadiLogo} alt="logo" />
      <img className="logo-dark logo-img" src={BillPadiLogo} alt="logo" />
      <img className="logo-small logo-img logo-img-small" src={BillPadiLogo} alt="logo" />
    </Link>
  );
};

export default Logo;
