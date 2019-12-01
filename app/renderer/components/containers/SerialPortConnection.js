import React, { Component } from "react";

import { connect } from "react-redux";
import * as home_actions from "../../actions/houston-actions";


class SerialPortConnection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "processing" // default status processing
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    console.log(this.state);
    console.log(this.props.data_port)
    console.log("CLICK");
    event.preventDefault();
  }

  render() {
    console.log(this.props);
    console.log(this.state);

    return (
      <section className="form-postdata">
        <div className="input-group">
          <select
            name="port"
            value={this.state.status}
            onChange={this.handleChange}
          >
            {console.log(this.props)
            /*all_ports.map(ports =>{
                <option value={ports}>{ports}</option>
              })*/}
          </select>
          <input
            type="submit"
            className="form-control container__input--button"
            value="Connect"
            onClick={this.handleSubmit}
          />
        </div>
      </section>
    );
  }
}


const mapStateToProps = state => ({
    data_port: state.data_port,
});
const mapDispatch = dispatch => (
  {
      //getPorts: command => dispatch(sendCommand(command))
  }
);

/* Magic to hook up the state to the props */
export default connect(
  mapStateToProps,
  home_actions
)(SerialPortConnection);
