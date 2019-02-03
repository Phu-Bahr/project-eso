import React, { Component } from "react";
import CategoryTile from "../tiles/CategoryTile";

class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      choices: []
    };
  }

  componentDidMount() {
    fetch("/api/v1/categories")
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
        let new_categories = body.categories;
        this.setState({ categories: new_categories });
      });
  }

  render() {
    console.log(this.state.categories);

    let categoryArr = this.state.categories;
    let categoryList = categoryArr.map(category => {
      return <CategoryTile key={category.id} name={category.name} />;
    });
    return (
      <div>
        <h1>HELLO FROM CONTAINER</h1>
        <div>
          <CategoryTile />
        </div>
        <div>
          <div>{categoryList}</div>
        </div>
      </div>
    );
  }
}

export default CategoryContainer;
