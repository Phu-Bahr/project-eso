import React, { Component } from "react";
import LikedTile from "../tiles/LikedTile";

class LikedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: [],
      dislike: []
    };
    this.setFinalRestaurant = this.setFinalRestaurant.bind(this);
    this.setIgnoreRestaurant = this.setIgnoreRestaurant.bind(this);
  }

  setFinalRestaurant(setRestaurant) {
    let currentLike = this.state.like;
    this.setState({ like: currentLike.concat(setRestaurant) });
  }

  setIgnoreRestaurant(ignore) {
    let currentDislike = this.state.dislike;
    this.setState({ dislike: currentDislike.concat(ignore) });
  }

  render() {
    console.log("Liked Container => ", this.state);
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

        let likedCat = [];
        likedCat = winner.categories.map(categories => `*${categories.title}*`);

        let visibility;
        if (this.state.dislike.includes(winner)) {
          visibility = "invisible";
        }

        let visibilityFinal;
        if (this.state.like.length > 0) {
          visibilityFinal = "invisible";
        }

        return (
          <LikedTile
            key={winner.id}
            show={visibility}
            hideAll={visibilityFinal}
            alias={winner.alias}
            categories={likedCat}
            price={winner.price}
            location={winner.location}
            rating={winner.rating}
            url={winner.url}
            imageUrl={winner.image_url}
            coordinates={winner.coordinates}
            name={winner.name}
            like={handleLikeClick}
            dislike={handleDislikeClick}
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
