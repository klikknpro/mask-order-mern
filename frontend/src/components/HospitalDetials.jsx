import React from "react";
import PropTypes from "prop-types";
import Hospital from "./Hospital";

const HospitalDetials = (hospital) => {
  return (
    <>
      <div>HospitalDetials</div>
      <label htmlFor={Hospital}>{hospital.name}</label>
    </>
  );
};

HospitalDetials.propTypes = {};

export default HospitalDetials;
