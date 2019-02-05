import React from "react";

const LocationFormTile = props => {
  return (
    <div>
      <h1 className={props.highlighted} onClick={props.handleClick}>
        HELLO FROM LOCATION tile
      </h1>
    </div>
  );
};

export default LocationFormTile;
