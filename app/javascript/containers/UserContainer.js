import React, { Component } from "react";

class UserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
  }

  render() {
    return (
      <div className="row">
        <h1>Tony's Restaurants</h1>
        <ul>
          <li>
            Viga <button className="button tiny">Rate</button>
            <button className="button tiny">Review</button>
          </li>

          <li>
            Falafel King <button className="button tiny">Rate</button>
            <button className="button tiny">Review</button>
          </li>
          <li>
            Al's Subs <button className="button tiny">Rate</button>
            <button className="button tiny">Review</button>
          </li>
          <li>
            Wendy's <button className="button tiny">Rate</button>
            <button className="button tiny">Review</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default UserContainer;
