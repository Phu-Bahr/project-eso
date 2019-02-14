import React from "react";

const CategoryTile = props => {
  return (
    <div
      className={"small-3 columns show-tile fade" + " " + props.highlighted}
      onClick={props.handleClick}
    >
      <div className="center-rest-tile">
        <div className="rest-tile-text">{props.name}</div>
      </div>
    </div>
  );
};

export default CategoryTile;
