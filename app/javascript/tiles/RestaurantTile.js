import React from "react";
import { Link } from "react-router";

const RestaurantTile = props => {
  console.log("tile",props.url);
  
  let photosLink = `https://www.yelp.com/biz_photos/${props.alias}`;
  let reviewLink = `https://www.yelp.com/biz/${props.alias}?sort_by=date_desc`;

  return (
    <div className={props.show}>
      <div className="background_fade glow-border">
        <div>
          <div className="row res-padding">
            <div className="small-6 columns fill">
              <Link to={photosLink} target="blank">
                <img src={props.imageUrl} className="center-cropped" />
              </Link>
            </div>
            <div className="small-6 columns">
              <div>
                <div>
                  <br />
                  <div className="text-center" style={{ marginTop: "20px" }}>
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
                      Rating: {props.rating} ☆ |
                      <Link to={reviewLink} target="blank">
                        Reviewed:
                      </Link>
                      {props.reviewCount}| Price: {props.price}
                    </div>
                    <div>{props.categories}</div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="row">
                <div className="small-6 columns text-right">
                  <button className="like-dislike-button" onClick={props.like}>
                    LIKE
                  </button>
                </div>
                <div className="small-6 columns">
                  <button
                    className="like-dislike-button"
                    onClick={props.dislike}
                  >
                    DISLIKE
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

export default RestaurantTile;
