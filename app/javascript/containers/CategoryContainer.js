import React, { Component } from "react";
import CategoryTile from "../tiles/CategoryTile";
import LocationFormTile from "../tiles/LocationFormTile";

class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      choices: [],
      selectedId: null,
      address: "",
      city: "",
      state: "",
      zipCode: ""
    };
    this.setSelectedStep = this.setSelectedStep.bind(this);
    this.setSelectedChoice = this.setSelectedChoice.bind(this);
    this.textChange = this.textChange.bind(this);
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

  textChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    // console.log(this.state.selectedId);
    // console.log(this.state.choices);
    console.log(this.state);
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
        <div>
          <form className="callout">
            <h1>Location</h1>

            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={this.state.address}
                onChange={e => this.textChange(e)}
              />
            </div>

            <div>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={this.state.city}
                onChange={e => this.textChange(e)}
              />
            </div>

            <div>
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={this.state.state}
                onChange={e => this.textChange(e)}
              />
            </div>

            <div>
              <label htmlFor="zipCode">Zip Code:</label>
              <input
                type="text"
                id="zip-code"
                name="zipCode"
                value={this.state.zipCode}
                onChange={e => this.textChange(e)}
              />
            </div>
          </form>
        </div>
        <div>
          <LocationFormTile />
        </div>
        <div>
          <div>{categoryList}</div>
        </div>
      </div>
    );
  }
}

export default CategoryContainer;
