import React, { Component } from "react";
import RestaurantIndexTile from "../tiles/RestaurantIndexTile";

import { Link } from "react-router";

class MakeData1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_rest: [],
      name: "",
      formattedCategories: []
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
        let categoriesArr = [];
        let restaurants = body.restaurants[0].UserRestaurants;
        let restaurantsArr = restaurants.map(restaurant =>
          restaurant.yelpcategory.map(yelpCat => {
            categoriesArr.push(yelpCat);
          })
        );

        let a = categoriesArr;
        let result = {};
        for (var i = 0; i < a.length; ++i) {
          if (!result[a[i]]) result[a[i]] = 0;
          ++result[a[i]];
        }

        let categoriesArray = Object.keys(result);
        let categoryInstances = Object.values(result);
        let categoryAverages = [];
        for (var i = 0; i < categoryInstances.length; ++i) {
          let average = Math.floor(
            (categoryInstances[i] / restaurants.length) * 100
          );
          categoryAverages.push(average);
        }

        let formattedCats = [];
        for (var i = 0; i < categoriesArray.length; ++i) {
          let restaurantsHash = {};
          restaurantsHash["category"] = categoriesArray[i];
          restaurantsHash["instances"] = categoryInstances[i];
          restaurantsHash["average"] = categoryAverages[i];
          formattedCats.push(restaurantsHash);
        }

        this.setState({ formattedCategories: formattedCats });
        this.setState({
          user_rest: body.restaurants[0].UserRestaurants,
          name: body.restaurants[0].UserName
        });
      });
  }

  render() {
    console.log(this.state);
    return <div>Hello</div>;
  }
}

export default MakeData1;
