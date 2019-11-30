import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
//import "../style/GridContainer.css";

/**
 * Component
 */
import FormGroupPostData from "./FormGroupPostData";
import SerialPortConnection from "./SerialPortConnection";
import CommandSubmit from '../CommandSubmit'
const GridContainer = () => {
  return (
    <MDBContainer>
      {/*<CommandSubmit /> send data from serial port*/}
      <MDBRow className="justify-content-center">
        <MDBCol md="3" className="container__row--col">
          <span className="container__row--span">D1</span>
          <br />0
        </MDBCol>
        <MDBCol md="3" className="container__row--col">
          <span className="container__row--span">D2</span>
          <br />1
        </MDBCol>
        <MDBCol md="3" className="container__row--col">
          <span className="container__row--span">D3</span>
          <br />0
        </MDBCol>
      </MDBRow>
      <SerialPortConnection />
      <FormGroupPostData />
    </MDBContainer>
  );
};

export default GridContainer;
