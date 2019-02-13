import React from "react";
import { Link } from "react-router";

const RestaurantIndexTile = props => {
  return (
    <div>
      <li>
        <Link to={props.url} target="blank" className="text-center">
          {props.name}
        </Link>
      </li>
    </div>
  );
};

export default RestaurantIndexTile;
