import React, { Component } from "react";
import RestaurantTile from "../tiles/RestaurantTile";
import { Link } from "react-router";

class RestaurantContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: [],
      dislike: []
    };

    this.addLikedRestaurant = this.addLikedRestaurant.bind(this);
    this.setCurrentRestaurant = this.setCurrentRestaurant.bind(this);
  }

  setCurrentRestaurant(setID) {
    this.setState({ liked: setID });
  }

  addLikedRestaurant(event) {
    event.preventDefault();
    let likePayload = this.state.liked;
    this.props.addLiked(likePayload);
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

        return (
          <RestaurantTile
            key={restaurant.id}
            alias={restaurant.alias}
            categories={restaurant.categories}
            price={restaurant.price}
            location={restaurant.location}
            rating={restaurant.rating}
            url={restaurant.url}
            imageUrl={restaurant.image_url}
            coordinates={restaurant.coordinates}
            name={restaurant.name}
            like={handleLikeClick}
            confirm={addLikedRestaurant}
          />
        );
      });
    }
    return (
      <div className="row">
        <div className="restaurant-show-row">
          <div>{yelpList}</div>
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
