import React from "react";

const CategoryTile = props => {
  return (
    <div className="small-3 columns show-tile" onClick={props.handleClick}>
      <div className={props.highlighted}>
        <div>{props.name}</div>
      </div>
    </div>
  );
};

export default CategoryTile;
