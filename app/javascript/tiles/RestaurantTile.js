import React from "react";
import { Link } from "react-router";

const RestaurantTile = props => {
  return (
    <div>
      <div className="rest-info">
        <div className="row rest-info-tile">
          <div className="small-6 columns">
            <div className="rest-tile-info">
              <img className="rest-img" src={props.imageUrl} />
            </div>
          </div>
          <div className="small-6 columns">
            <div className="rest-tile-info">
              <div className="center">
                <h1>
                  <Link to={props.url} target="blank" className="text-center">
                    {props.name}
                  </Link>
                </h1>
                <br />
                <h4 className="text-center">{props.location.address1}</h4>
                <h6 className="text-center">
                  {props.location.city}, {props.location.state}{" "}
                  {props.location.zip_code}
                </h6>
                <div className="categories text-center">
                  <p>
                    Rating: {props.rating} ☆ | Price: {props.price}
                  </p>
                  <p />
                </div>
              </div>
            </div>
          </div>
          <div className="medium-6 columns">
            <button>LIKE</button>
            <button>DISLIKE</button>
          </div>
        </div>
      </div>
      <div>
        <h1 className="row" align="center">
          <Link to="/restaurants" className="text-center">
            Your Restaurants
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default RestaurantTile;
