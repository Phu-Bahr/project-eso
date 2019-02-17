import React, { Component } from "react";
import RestaurantIndexTile from "../tiles/RestaurantIndexTile";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from "react-router";

class RestaurantIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_rest: [],
      name: "",
      formattedCategories: [],
      column: [
        {
          Header: "Name",
          accessor: "name",
          headerStyle: {
            textAlign: "left",
            fontWeight: "bold",
            backgroundColor: "#6F242F",
            color: "white"
          }
        },
        {
          Header: "Price",
          accessor: "price",
          width: 60,
          headerStyle: {
            textAlign: "left",
            fontWeight: "bold",
            backgroundColor: "#6F242F",
            color: "white"
          }
        },
        {
          Header: "Rating",
          accessor: "rating",
          width: 60,
          headerStyle: {
            textAlign: "left",
            fontWeight: "bold",
            backgroundColor: "#6F242F",
            color: "white"
          }
        },
        {
          Header: "Street",
          accessor: "street",
          headerStyle: {
            textAlign: "left",
            fontWeight: "bold",
            backgroundColor: "#6F242F",
            color: "white"
          }
        },
        {
          Header: "City",
          accessor: "city",
          headerStyle: {
            textAlign: "left",
            fontWeight: "bold",
            backgroundColor: "#6F242F",
            color: "white"
          }
        },
        {
          Header: "State",
          accessor: "state",
          width: 80,
          headerStyle: {
            textAlign: "left",
            fontWeight: "bold",
            backgroundColor: "#6F242F",
            color: "white"
          }
        },
        {
          Header: "Zip",
          accessor: "zip",
          width: 100,
          headerStyle: {
            textAlign: "left",
            fontWeight: "bold",
            backgroundColor: "#6F242F",
            color: "white"
          }
        },
        {
          Header: "Last Chosen",
          accessor: "updated_at",
          headerStyle: {
            textAlign: "left",
            fontWeight: "bold",
            backgroundColor: "#6F242F",
            color: "white"
          }
        },
        {
          Header: "Category",
          accessor: "yelpcategory",
          minWidth: 100,
          headerStyle: {
            textAlign: "left",
            fontWeight: "bold",
            backgroundColor: "#6F242F",
            color: "white"
          }
        }
      ],
      column2: [
        {
          Header: "Category",
          accessor: "category",
          headerStyle: {
            textAlign: "left",
            fontWeight: "bold",
            backgroundColor: "#6F242F",
            color: "white"
          }
        },
        {
          Header: "Instances",
          accessor: "instances",
          headerStyle: {
            textAlign: "left",
            fontWeight: "bold",
            backgroundColor: "#6F242F",
            color: "white"
          }
        },
        {
          Header: "Average %",
          accessor: "average",
          headerStyle: {
            textAlign: "left",
            fontWeight: "bold",
            backgroundColor: "#6F242F",
            color: "white"
          }
        }
      ]
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
    let userNameIndex = this.state.name.substr(0, this.state.name.indexOf("@"));
    let userName =
      userNameIndex.charAt(0).toUpperCase() + userNameIndex.slice(1);
    return (
      <div className="restaurant-index-background">
        <div className="row">
          <h1 className="welcome">{userName}'s Restaurants</h1>
          <div className="table-background">
            <ReactTable
              data={this.state.user_rest}
              columns={this.state.column}
              defaultPageSize={10}
              pageSizeOptions={[3, 5, 10]}
            />
          </div>
          <div className="table-background">
            <ReactTable
              data={this.state.formattedCategories}
              columns={this.state.column2}
              defaultPageSize={5}
              pageSizeOptions={[3, 5, 10]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantIndexContainer;
