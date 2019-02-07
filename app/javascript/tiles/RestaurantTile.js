import React from "react";
import { Link } from "react-router";

const RestaurantTile = props => {
  return (
    <div className="small-12 columns border">
      <div>
        <img src={props.imageUrl} />
        <div>{props.name}</div>
        <div>Rating{props.rating}</div>
        <div>Price{props.price}</div>
        <Link to={props.url} target="blank">
          Link to page
        </Link>
      </div>
    </div>
  );
};

export default RestaurantTile;
