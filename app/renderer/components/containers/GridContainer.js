import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

//REDUX
import { connect } from "react-redux";
import * as home_actions from "../../actions/catwan-actions";

/**
 * Component
 */
import SerialPortConnection from "./SerialPortConnection";

class GridContainer extends Component {
  render() {
    return (
      <MDBContainer>
        {/*<CommandSubmit /> send data from serial port*/}
        <MDBRow className="justify-content-center">
          <MDBCol md="3" className="container__row--col">
            <span className="container__row--span">data 1</span>
            <br />
            {this.props.data_port.data.charAt(0)}
          </MDBCol>
          <MDBCol md="3" className="container__row--col">
            <span className="container__row--span">data 2</span>
            <br />
            {this.props.data_port.data.charAt(1)}
          </MDBCol>
          <MDBCol md="3" className="container__row--col">
            <span className="container__row--span">data 3</span>
            <br />
            {this.props.data_port.data.charAt(2)}
          </MDBCol>
        </MDBRow>
        <SerialPortConnection />
      </MDBContainer>
    );
  }
}

const mapStateToProps = state => ({
  data_port: state.data_port
});

/* Magic to hook up the state to the props */
export default connect(
  mapStateToProps,
  home_actions
)(GridContainer);
