import React, { Component } from "react";
import LikedTile from "../tiles/LikedTile";
import { Link } from "react-router";

class LikedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: {},
      dislike: [],
      final: false
    };
    this.setFinalRestaurant = this.setFinalRestaurant.bind(this);
    this.setIgnoreRestaurant = this.setIgnoreRestaurant.bind(this);
    this.postRestaurant = this.postRestaurant.bind(this);
  }

  setFinalRestaurant(setRestaurant) {
    this.setState({ like: setRestaurant });
    this.postRestaurant(setRestaurant);
  }

  setIgnoreRestaurant(ignore) {
    let currentDislike = this.state.dislike;
    this.setState({ dislike: currentDislike.concat(ignore) });
  }

  postRestaurant(restaurant) {
    fetch("/api/v1/restaurants/", {
      method: "POST",
      body: JSON.stringify(restaurant),
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
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
        this.setState({ final: true });
        return (location.href = "/restaurants");
      });
  }

  render() {
    let likedList = [];
    if (this.props.likeArray) {
      let likedData = this.props.likeArray;
      likedList = likedData.map(winner => {
        let handleLikeClick = () => {
          this.setFinalRestaurant(winner);
        };
        let handleDislikeClick = () => {
          this.setIgnoreRestaurant(winner);
        };

        let yelpCat = [];
        yelpCat = winner.categories.map(categories => `| ${categories} |`);

        let visibility;
        if (this.state.dislike.includes(winner)) {
          visibility = "invisible";
        }

        let visibilityFinal;
        if (this.state.final === true) {
          visibilityFinal = "invisible";
        }

        return (
          <LikedTile
            key={winner.id}
            show={visibility}
            hideAll={visibilityFinal}
            alias={winner.alias}
            categories={yelpCat}
            price={winner.price}
            location={winner.location}
            rating={winner.rating}
            url={winner.url}
            imageUrl={winner.image_url}
            coordinates={winner.coordinates}
            name={winner.name}
            like={handleLikeClick}
            dislike={handleDislikeClick}
            reviewCount={winner.review_count}
          />
        );
      });
    }
    return (
      <div className="row">
        <div>
          <div>{likedList}</div>
        </div>
      </div>
    );
  }
}

export default LikedContainer;
