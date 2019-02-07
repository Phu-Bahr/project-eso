import React, { Component } from "react";
import CategoryTile from "../tiles/CategoryTile";
import PriceField from "../tiles/PriceField";

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

  yelpCall(formPayload) {
    fetch("/api/v1/restaurants", {
      method: "GET",
      body: JSON.stringify(formPayload)
    })
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
        let yelpJSON = body.businesses;
        this.setState({ yelpReturn: yelpJSON });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  textChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let formPayload = {
      category: this.state.category,
      location: this.state.location,
      price: this.state.price
    };
    console.log(formPayload);
    this.yelpCall(formPayload);
  }

  // randomClick() {
  //   let myArr = this.state.categories;
  //   let randomItem = myArr[Math.floor(Math.random() * myArr.length)];
  //   this.setState({ categories: randomItem });
  // }

  render() {
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
          <button onClick={this.handleFormSubmit}>Submit</button>
        </div>
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
          <form className="callout">
            <h1>Location</h1>

            <div>
              <label htmlFor="location">City and State or Zip</label>
              <input
                type="text"
                id="location"
                name="location"
                value={this.state.location}
                onChange={event => this.textChange(event)}
              />
            </div>
          </form>
        </div>
        <div>
          <div>{categoryList}</div>
        </div>
      </div>
    );
  }
}

export default CategoryContainer;
