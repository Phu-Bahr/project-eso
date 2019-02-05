import React, { Component } from "react";
import TextField from "../components/TextField";
import RatingField from "../components/RatingField";
import { browserHistory } from "react-router";

class ReviewFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      binge_val: 5,
      educational_val: 5,
      entertainment_val: 5,
      comment: ""
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleEducationalValChange = this.handleEducationalValChange.bind(
      this
    );
    this.handleEntertainmentValChange = this.handleEntertainmentValChange.bind(
      this
    );
    this.handleBingeValChange = this.handleBingeValChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRatingChange(event) {
    let newRating = event.target.value;
    this.setState({ rating: newRating });
  }

  render() {
    return (
      <div className="row">
        <br />
        <div className="form-header">
          Submit a New Review for {this.props.location.state.title}
        </div>
        <form onSubmit={this.handleSubmit} className="panel">
          <RatingField
            label="Price $-$$$$"
            name="rating"
            onChange={this.handleRatingChange}
            value={this.state.rating}
          />
        </form>
      </div>
    );
  }
}
export default ReviewFormContainer;
