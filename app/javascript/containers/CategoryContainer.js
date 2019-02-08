import React, { Component } from "react";
import CategoryTile from "../tiles/CategoryTile";
import PriceField from "../tiles/PriceField";
import RestaurantContainer from "./RestaurantContainer";
import { Link } from "react-router";

class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      yelpReturn: [],
      category: "",
      selectedId: null,
      location: "",
      price: 1
    };
    this.setSelectedStep = this.setSelectedStep.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.setSelectedChoice = this.setSelectedChoice.bind(this);
    this.textChange = this.textChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.yelpCall = this.yelpCall.bind(this);
    // this.randomClick = this.randomClick.bind(this);
  }

  setSelectedStep(stepId) {
    if (stepId === this.state.selectedId) {
      this.setState({ selectedId: null });
    } else {
      this.setState({ selectedId: stepId });
    }
  }

  setSelectedChoice(userChoice) {
    if (userChoice === this.state.category) {
      this.setState({ category: "" });
    } else if (userChoice === "Comfort Food") {
      userChoice = "comfortfood";
      this.setState({ category: userChoice });
    } else if (userChoice === "Eastern European") {
      userChoice = "eastern_european";
      this.setState({ category: userChoice });
    } else if (userChoice === "Food Trucks") {
      userChoice = "foodtrucks";
      this.setState({ category: userChoice });
    } else if (userChoice === "Middle Easter") {
      userChoice = "mideastern";
      this.setState({ category: userChoice });
    } else {
      this.setState({ category: userChoice });
    }
  }

  handlePriceChange(event) {
    let newPrice = event.target.value;
    this.setState({ price: newPrice });
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
        const shuffled = new_categories.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 20);
        this.setState({ categories: selected });
      });
  }

  yelpCall(url) {
    fetch(url)
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
        let yelpJSON = body.data;
        this.setState({ yelpReturn: yelpJSON });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  textChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let url = `/api/v1/restaurants/search?location=${
      this.state.location
    }&categories=${this.state.category}&price=${this.state.price}`;
    this.yelpCall(url);
  }

  // let url = "/api/v1/restaurants/search?"
  // formPayload.forEach((key, value) => {
  //   url += _________ (key=value)
  // }

  // randomClick() {
  //   let myArr = this.state.categories;
  //   let randomItem = myArr[Math.floor(Math.random() * myArr.length)];
  //   this.setState({ categories: randomItem });
  // }

  render() {
    console.log(this.state);
    let visibility;
    let visibilityR;
    if (this.state.yelpReturn.length > 0) {
      visibility = "invisible";
      visibilityR = "visible";
    } else {
      visibility = "visible";
      visibilityR = "invisible";
    }

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
        <div className={visibilityR}>
          <RestaurantContainer yelpdata={this.state.yelpReturn} />
        </div>
        <div className={visibility}>
          <h2>Hello, Please Click your Categories</h2>
          <div className="row">
            <div className="small-4 columns">
              <form className="other-category">
                <PriceField
                  label="Price"
                  name="price"
                  onChange={this.handlePriceChange}
                  value={this.state.price}
                  dollarvalue={this.state.dollarprice}
                />
              </form>
            </div>
            <div className="small-4 columns other-category">
              <form>
                <h4>Location</h4>
                <div>
                  <label htmlFor="location" />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="City and State or Zip"
                    value={this.state.location}
                    onChange={event => this.textChange(event)}
                  />
                </div>
              </form>
            </div>
            <div className="small-4 columns other-category">
              <button onClick={this.handleFormSubmit}>Submit</button>
            </div>
          </div>
          <div className="row">
            <div>{categoryList}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryContainer;
