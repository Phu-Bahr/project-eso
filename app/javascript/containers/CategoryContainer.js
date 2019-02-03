import React, { Component } from "react";
import CategoryTile from "../tiles/CategoryTile";

class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>HELLO FROM CONTAINER</h1>
        <div>
          <CategoryTile />
        </div>
      </div>
    );
  }
}

export default CategoryContainer;
