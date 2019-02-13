import React, { Component } from "react";
import ChoiceTile from "../tiles/ChoiceTile";

class RestaurantIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_rest: [],
      name: []
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
        console.log(body);
        this.setState({
          user_rest: body.restaurants[0].UserRestaurants,
          name: body.restaurants[0].UserName
        });
      });
  }

  render() {
    console.log(this.state.user_rest);

    let user = this.state.user_rest.map(user => {
      return <ChoiceTile key={user.id} name={user.alias} />;
    });
    return (
      <div className="row">
        <h1>Tony's Restaurants</h1>
        <div>{user}</div>
      </div>
    );
  }
}

export default RestaurantIndexContainer;
