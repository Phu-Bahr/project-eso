import React, { Component } from "react";
import { Link } from "react-router";

const LikedTile = props => {
  return (
    <div className={props.show}>
      <div className="background_fade glow-border">
        <div>
          <div className="row res-padding">
            <div className="small-6 columns fill">
              <img src={props.imageUrl} className="center-cropped" />
            </div>
            <div className="small-6 columns">
              <div>
                <div>
                  <br />
                  <div className="text-center">
                    <h2>
                      <Link to={props.url} target="blank">
                        {props.name}
                      </Link>
                    </h2>
                    <div>{props.location.address1}</div>
                    <div>
                      {props.location.city}, {props.location.state}{" "}
                      {props.location.zip_code}
                    </div>
                    <div>
                      Rating: {props.rating} ☆ | Reviewed: {props.reviewCount} |
                      Price: {props.price}
                    </div>
                    <div>{props.categories}</div>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="small-6 columns text-right">
                  <button className="like-dislike-button" onClick={props.like}>
                    Definitely!
                  </button>
                </div>
                <div className="small-6 columns">
                  <button
                    className="like-dislike-button"
                    onClick={props.dislike}
                  >
                    No Thanks.
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};
export default LikedTile;
