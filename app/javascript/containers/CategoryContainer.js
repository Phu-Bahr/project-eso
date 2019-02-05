import React, { Component } from "react";
import CategoryTile from "../tiles/CategoryTile";
import PriceField from "../tiles/PriceField";

class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      choices: [],
      selectedId: null,
      price: 1,
      dollarprice: "$"
    };
    this.setSelectedStep = this.setSelectedStep.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
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

  handlePriceChange(event) {
    let newPrice = event.target.value;
    this.setState({ price: newPrice });
    if (newPrice === 1) {
      this.setState({ dollarprice: "$" });
    } else if (newPrice === 2) {
      this.setState({ dollarprice: "$$" });
    } else if (newPrice === 3) {
      this.setState({ dollarprice: "$$$" });
    } else if (newPrice === 4) {
      this.setState({ dollarprice: "$$$$" });
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
    console.log(this.state.price);
    console.log(this.state.dollarprice);
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
        <h1>Welcome Back, you can do it!</h1>
        <div>
          <form className="panel">
            <PriceField
              label="Price"
              name="price"
              onChange={this.handlePriceChange}
              value={this.state.price}
              dollarvalue={this.state.dollarprice}
            />
          </form>
        </div>
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
