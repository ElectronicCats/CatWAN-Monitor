import React, { Component, Fragment } from "react";

/**
 * Components
 */
import GridContainer from "../../components/containers/GridContainer";

/**
 * Sass
 */
import "../style/Home.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  
  render() {
    console.log(this.state);
    return (
      <Fragment>
        <GridContainer />
      </Fragment>
    );
  }
}

export default Home;
