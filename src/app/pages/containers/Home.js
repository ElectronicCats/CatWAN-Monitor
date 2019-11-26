import React, { Component, Fragment } from "react";

/**
 * Components
 */
import Loader from "../../components/Loader";

/**
 * Sass
 */
import "../style/Home.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  
  render() {
    console.log(this.state);
    return (
      <Fragment>
        {this.state.loading && (
          <div className="loader">
            <Loader />
          </div>
        )}
      </Fragment>
    );
  }
}

export default Home;
