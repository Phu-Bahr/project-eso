import React, { Component } from "react";
import LikedTile from "../tiles/LikedTile";

class LikedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let likedList = [];
    if (this.props.likeArray) {
      let likedData = this.props.likeArray;
      likedList = likedData.map(winners => {
        let likedCat = [];
        likedCat = winners.categories.map(
          categories => `*${categories.title}*`
        );

        return (
          <LikedTile
            key={winners.id}
            alias={winners.alias}
            categories={likedCat}
            price={winners.price}
            location={winners.location}
            rating={winners.rating}
            url={winners.url}
            imageUrl={winners.image_url}
            coordinates={winners.coordinates}
            name={winners.name}
          />
        );
      });
    }
    return (
      <div>
        <div>{likedList}</div>
      </div>
    );
  }
}

export default LikedContainer;
