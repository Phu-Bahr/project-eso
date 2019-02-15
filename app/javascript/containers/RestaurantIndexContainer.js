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
      formatedCategories: [],
      column: [
        {
          Header: "Name",
          accessor: "name"
        },
        {
          Header: "Street",
          accessor: "street"
        },
        {
          Header: "City",
          accessor: "city"
        },
        {
          Header: "State",
          accessor: "state",
          width: ""
        },
        {
          Header: "Zip",
          accessor: "zip"
        },
        {
          Header: "Last Chosen",
          accessor: "updated_at"
        },
        {
          Header: "Category",
          accessor: "yelpcategory"
        }
      ],
      column2: [
        {
          Header: "Category",
          accessor: "category"
        },
        {
          Header: "Instances",
          accessor: "instances"
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

        let formattedCats = [];
        for (var i = 0; i < categoriesArray.length; ++i) {
          let restaurantsHash = {};
          restaurantsHash["category"] = categoriesArray[i];
          restaurantsHash["instances"] = categoryInstances[i];
          formattedCats.push(restaurantsHash);
        }

        console.log(formattedCats);

        this.setState({ formatedCategories: formattedCats });
        this.setState({
          user_rest: body.restaurants[0].UserRestaurants,
          name: body.restaurants[0].UserName
        });
      });
  }

  render() {
    let userName = this.state.name.substr(0, this.state.name.indexOf("@"));
    console.log(this.state);

    return (
      <div className="restaurant-index-background">
        <div className="row">
          <h1 className="welcome">Your Restaurants</h1>
          <div className="table-background">
            <ReactTable
              data={this.state.user_rest}
              columns={this.state.column}
              defaultPageSize={10}
              pageSizeOptions={[3, 5, 10]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantIndexContainer;

// <div className="table-background">
//   <ReactTable
//     data={this.state.formatedCategories}
//     columns={this.state.column2}
//     defaultPageSize={10}
//     pageSizeOptions={[3, 5, 10]}
//   />
// </div>
