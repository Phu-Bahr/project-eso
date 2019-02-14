import React from "react";

const CategoryTile = props => {
  return (
    <div
      className={"small-3 columns show-tile fade" + props.highlighted}
      onClick={props.handleClick}
    >
      <div>{props.name}</div>
    </div>
  );
};

export default CategoryTile;
