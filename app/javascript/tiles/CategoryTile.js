import React from "react";

const CategoryTile = props => {
  return (
    <div>
      <h1 className={props.highlighted} onClick={props.handleClick}>
        {props.name}
      </h1>
    </div>
  );
};

export default CategoryTile;
