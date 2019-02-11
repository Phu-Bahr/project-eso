import React, { Component } from "react";
import RestaurantTile from "../tiles/RestaurantTile";
import { Link } from "react-router";

class RestaurantContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: [],
      dislike: [],
      confirmed: []
    };

    this.confirmLikedRestaurant = this.confirmLikedRestaurant.bind(this);
    this.setCurrentRestaurant = this.setCurrentRestaurant.bind(this);
    this.confirmDislikedRestaurant = this.confirmDislikedRestaurant.bind(this);
    this.setCurrentDislikedRestaurant = this.setCurrentDislikedRestaurant.bind(
      this
    );
  }

  setCurrentRestaurant(setRestaurant) {
    this.setState({ liked: setRestaurant });
  }

  setCurrentDislikedRestaurant(setRestaurant) {
    this.setState({ dislike: setRestaurant });
  }

  confirmLikedRestaurant(event) {
    event.preventDefault();
    let likePayload = this.state.liked;
    this.props.addLiked(likePayload);
    let currentConfirmed = this.state.confirmed;
    this.setState({ confirmed: currentConfirmed.concat(likePayload) });
    this.setState({ liked: [] });
  }

  confirmDislikedRestaurant(event) {
    event.preventDefault();
    let dislikedPayload = this.state.dislike;
    this.props.addDisliked(dislikedPayload);
    let currentConfirmed = this.state.confirmed;
    this.setState({ confirmed: currentConfirmed.concat(dislikedPayload) });
    this.setState({ dislike: [] });
  }

  render() {
    console.log("restaurant container => ", this.state);

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
        yelpCat = restaurant.categories.map(
          categories => `*${categories.title}*`
        );

        let visibility = "";
        if (this.state.confirmed.includes(restaurant)) {
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
            confirm={this.confirmLikedRestaurant}
            confirmDislike={this.confirmDislikedRestaurant}
          />
        );
      });
    }
    return (
      <div className="row">
        <div>
          <div className="restaurant-show-row">
            <div>{yelpList}</div>
          </div>
          <div />
        </div>
        <div className="row">
          <h1>
            <Link to="/restaurants" className="text-center">
              Your Restaurants
            </Link>
          </h1>
        </div>
      </div>
    );
  }
}

export default RestaurantContainer;
