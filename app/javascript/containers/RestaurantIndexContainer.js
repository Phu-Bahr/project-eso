import React, { Component } from "react";
import RestaurantIndexTile from "../tiles/RestaurantIndexTile";

class RestaurantIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_rest: [],
      name: ""
    };
  }

  componentDidMount() {
    fetch("/api/v1/restaurants")
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
          user_rest: body.restaurants[0].UserRestaurants,
          name: body.restaurants[0].UserName
        });
      });
  }

  render() {
    console.log(this.state.user_rest);
    let userName = this.state.name.substr(0, this.state.name.indexOf("@"));

    let userRestaurants = this.state.user_rest.map(restaurant => {
      return (
        <RestaurantIndexTile
          key={restaurant.id}
          name={restaurant.name}
          url={restaurant.url}
        />
      );
    });
    return (
      <div className="row">
        <h1>{userName}'s Restaurants</h1>
        <ul>{userRestaurants}</ul>
      </div>
    );
  }
}

export default RestaurantIndexContainer;
