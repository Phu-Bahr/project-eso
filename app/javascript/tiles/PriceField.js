import React from "react";

const PriceField = props => {
  return (
    <div>
      <label>
        {props.label} = {props.dollarvalue}
        <br />
        <input
          type="range"
          min="1"
          max="4"
          onChange={props.onChange}
          name={props.name}
          value={props.value}
        />
      </label>
    </div>
  );
};

export default PriceField;
