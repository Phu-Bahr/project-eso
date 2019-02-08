import React, { Component } from "react";
import RestaurantTile from "../tiles/RestaurantTile";

class RestaurantContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
  }

  render() {
    let yelpList = [];
    if (this.props.yelpdata) {
      let yelpData = this.props.yelpdata;
      yelpList = yelpData.map(restaurant => {
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
          />
        );
      });
    }
    return (
      <div className="row">
        <div className="restaurant-show-row">
          <div>{yelpList}</div>
        </div>
      </div>
    );
  }
}

export default RestaurantContainer;
