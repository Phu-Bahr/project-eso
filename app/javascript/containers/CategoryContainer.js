import React, { Component } from "react";
import CategoryTile from "../tiles/CategoryTile";

class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      choices: [],
      selectedId: null
    };
    this.setSelectedStep = this.setSelectedStep.bind(this);
    this.setSelectedChoice = this.setSelectedChoice.bind(this);
  }

  setSelectedStep(stepId) {
    if (stepId === this.state.selectedId) {
      this.setState({ selectedId: null });
    } else {
      this.setState({ selectedId: stepId });
    }
  }

  setSelectedChoice(userChoice) {
    if (userChoice === this.state.choices) {
      this.setState({ choices: [] });
    } else {
      this.setState({ choices: userChoice });
    }
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
    // console.log(this.state.selectedId);
    // console.log(this.state.choices);
    let categoryArr = this.state.categories;
    let categoryList = categoryArr.map(category => {
      let handleClick = () => {
        this.setSelectedStep(category.id);
        this.setSelectedChoice(category.name);
      };

      let highlighted;
      if (category.id === this.state.selectedId) {
        highlighted = "green";
      } else {
        highlighted = "";
      }

      return (
        <CategoryTile
          key={category.id}
          name={category.name}
          id={category.id}
          handleClick={handleClick}
          highlighted={highlighted}
        />
      );
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
