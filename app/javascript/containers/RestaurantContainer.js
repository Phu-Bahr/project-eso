import React, { Component } from "react";
import RestaurantTile from "../tiles/RestaurantTile";
import { Link } from "react-router";

class RestaurantContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.setCurrentRestaurant = this.setCurrentRestaurant.bind(this);
    this.setCurrentDislikedRestaurant = this.setCurrentDislikedRestaurant.bind(
      this
    );
  }

  setCurrentRestaurant(setRestaurant) {
    this.props.addLiked([setRestaurant]);
  }

  setCurrentDislikedRestaurant(setRestaurant) {
    this.props.addDisliked([setRestaurant]);
  }

  render() {
    let yelpList = [];
    if (this.props.yelpdata) {
      let yelpData = this.props.yelpdata;
      yelpList = yelpData.map(restaurant => {
        let handleLikeClick = () => {
          this.setCurrentRestaurant(restaurant);
        };
        let handleDislikeClick = () => {
          this.setCurrentDislikedRestaurant(restaurant);
        };

        let yelpCat = [];
        yelpCat = restaurant.categories.map(categories => `| ${categories} |`);

        let visibility = "";
        if (this.props.confirmed.includes(restaurant)) {
          visibility = "invisible";
        } else {
          visibility = "";
        }

        return (
          <RestaurantTile
            key={restaurant.id}
            show={visibility}
            alias={restaurant.alias}
            categories={yelpCat}
            price={restaurant.price}
            location={restaurant.location}
            rating={restaurant.rating}
            url={restaurant.url}
            imageUrl={restaurant.image_url}
            coordinates={restaurant.coordinates}
            name={restaurant.name}
            like={handleLikeClick}
            dislike={handleDislikeClick}
            reviewCount={restaurant.review_count}
          />
        );
      });
    }
    return (
      <div className="row">
        <div>
          <div className="restaurant-show-row">
            <div className="">{yelpList}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantContainer;
