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

    this.addLikedRestaurant = this.addLikedRestaurant.bind(this);
    this.setCurrentRestaurant = this.setCurrentRestaurant.bind(this);
    this.addDislikedRestaurant = this.addDislikedRestaurant.bind(this);
  }

  setCurrentRestaurant(setID) {
    this.setState({ liked: setID });
  }

  setCurrentDislikedRestaurant(setID) {
    this.setState({ dislike: setID });
  }

  addLikedRestaurant(event) {
    event.preventDefault();
    let likePayload = this.state.liked;
    this.props.addLiked(likePayload);
  }

  addDislikedRestaurant(event) {
    event.preventDefault();
    let dislikedPayload = this.state.dislike;
    this.props.addDisliked(dislikedPayload);
  }

  render() {
    console.log("Restaurants Container state =>", this.state);

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

        return (
          <RestaurantTile
            key={restaurant.id}
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
            confirm={this.addLikedRestaurant}
            confirmDislike={this.addDislikedRestaurant}
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
