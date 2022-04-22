import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Hospital = ({ hospital }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [hospitalID, setHospitalID] = useState(undefined);

  const clicked = () => {
    isClicked === false ? setIsClicked(true) : setIsClicked(false);
  };

  useEffect(() => {
    console.log(hospitalID);
  }, [hospitalID]);

  return (
    <>
      <div>
        <input
          type="radio"
          value={hospital.id}
          name="hospital"
          onChange={(e) => setHospitalID(e.target.value)}
        />
        {hospital.name}
      </div>
      <div>
        {isClicked === true ? `Address: ${hospital.address.address}` : ""}
      </div>
      <button variant="contained" onClick={clicked}>
        {isClicked === false ? "Show more" : "Show less"}
      </button>
    </>
  );
};

Hospital.propTypes = {};

export default Hospital;
