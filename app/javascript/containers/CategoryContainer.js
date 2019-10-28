import React, { Component } from "react";
import CategoryTile from "../tiles/CategoryTile";
import PriceField from "../tiles/PriceField";
import RestaurantContainer from "./RestaurantContainer";
import { Link } from "react-router";
import LikedContainer from "./LikedContainer";

class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      yelpReturn: [],
      category: "",
      selectedId: null,
      location: "",
      price: 1,
      likes: [],
      dislikes: [],
      popup: false,
      popupFinal: false
    };
    this.setSelectedStep = this.setSelectedStep.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.setSelectedChoice = this.setSelectedChoice.bind(this);
    this.textChange = this.textChange.bind(this);
    this.handleYelpFetch = this.handleYelpFetch.bind(this);
    this.yelpCall = this.yelpCall.bind(this);
    this.addLiked = this.addLiked.bind(this);
    this.addDisliked = this.addDisliked.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  setSelectedStep(stepId) {
    if (stepId === this.state.selectedId) {
      this.setState({ selectedId: null });
    } else {
      this.setState({ selectedId: stepId });
    }
  }

  finalround(event) {
    if (this.state.likes.length > 0) {
      alert("Final Round, one like only. Make it good!");
      window.scrollTo(0, 0)
    }
  }
  setSelectedChoice(userChoice) {
    if (userChoice === this.state.category) {
      this.setState({ category: "" });
    } else if (userChoice === "American (New)") {
      userChoice = "newamerican";
      this.setState({ category: userChoice });
    } else if (userChoice === "American (Traditional)") {
      userChoice = "tradamerican";
      this.setState({ category: userChoice });
    } else if (userChoice === "Asian Fusion") {
      userChoice = "asianfusion";
      this.setState({ category: userChoice });
    } else if (userChoice === "Barbeque") {
      userChoice = "bbq";
      this.setState({ category: userChoice });
    } else if (userChoice === "Breakfast & Brunch") {
      userChoice = "breakfast_brunch";
      this.setState({ category: userChoice });
    } else if (userChoice === "Indian") {
      userChoice = "indpak";
      this.setState({ category: userChoice });
    } else if (userChoice === "Fast Food") {
      userChoice = "hotdog";
      this.setState({ category: userChoice });
    } else if (userChoice === "Middle Eastern") {
      userChoice = "mideastern";
      this.setState({ category: userChoice });
    } else if (userChoice === "Modern European") {
      userChoice = "modern_european";
      this.setState({ category: userChoice });
    } else if (userChoice === "Steakhouses") {
      userChoice = "steak";
      this.setState({ category: userChoice });
    } else if (userChoice === "Sushi Bars") {
      userChoice = "sushi";
      this.setState({ category: userChoice });
    } else if (userChoice === "Tapas/Small Plates") {
      userChoice = "tapasmallplates";
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
        this.setState({ categories: new_categories });
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
          alert(`${error}. Check your location.`);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        if (body.data.length === 0) {
          this.setState({ popup: true });
        }

        let yelpJSON = body.data;
        this.setState({ yelpReturn: yelpJSON });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleYelpFetch(event) {
    event.preventDefault();
    let url = `/api/v1/restaurants/search?location=${
      this.state.location
    }&categories=${this.state.category}&price=${this.state.price}`;
    this.yelpCall(url);
  }

  textChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  addLiked(likePayload) {
    let currentLike = this.state.likes;
    if (!this.state.likes.includes(likePayload)) {
      this.setState({ likes: currentLike.concat(likePayload) });
    }
  }

  addDisliked(dislikedPayload) {
    let currentDislike = this.state.dislikes;
    if (!this.state.dislikes.includes(dislikedPayload)) {
      this.setState({ dislikes: currentDislike.concat(dislikedPayload) });
    }
  }

  closePopup(event) {
    this.setState({ popup: false });
  }

  render() {
    console.log(this.state);
    let visibility;
    let visibilityR;
    if (this.state.yelpReturn.length > 0) {
      visibility = "invisible";
      visibilityR = "";
    } else {
      visibilityR = "invisible";
    }

    let visibilityL;
    if (
      this.state.likes.length + this.state.dislikes.length ===
      this.state.yelpReturn.length
    ) {
      visibilityL = "";
      this.finalround(event);
    } else {
      visibilityL = "invisible";
    }

    let popup;
    let overlay;
    if (this.state.popup === true) {
      popup = "popup";
      overlay = "overlay";
    } else {
      popup = "invisible";
      overlay = "invisible";
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

    let confirmed = this.state.likes.concat(this.state.dislikes);

    return (
      <div className="background">
        <div className="center">
          <div className={overlay}>
            <div className={popup}>
              <div>
                <h2 className="centerErrorMessage">No Results!</h2>
                Hi, Eso searches for exact criteria. Try to be as specific as
                you can so we can help recommend places! Adjust your price or
                have more info in location.
                <div className="centerErrorMessage">
                  <button
                    onClick={this.closePopup}
                    className="like-dislike-button"
                  >
                    Try again!
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={visibilityL}>
            <LikedContainer likeArray={this.state.likes} />
          </div>
          <div className={visibilityR}>
            <RestaurantContainer
              confirmed={confirmed}
              yelpdata={this.state.yelpReturn}
              addLiked={this.addLiked}
              addDisliked={this.addDisliked}
            />
          </div>
          <div className={visibility}>
            <h2 className="welcome">Welcome To Eso</h2>
            <br />
            <div className="row">
              <div className="small-4 columns">
                <form className="other-category">
                  <br />
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
              <div>
                <br />
                <button
                  onClick={this.handleYelpFetch}
                  className="small-4 columns like-dislike-button-home"
                >
                  Submit
                </button>
              </div>
            </div>
            <br />
            <div>
              <div>{categoryList}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryContainer;
