import React, { Component } from "react";

import { connect } from "react-redux";
import * as home_actions from "../../actions/houston-actions";

import { getters, mutations, actions } from "../../modules/ports";

class SerialPortConnection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "processing" // default status processing
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log(this.props.list_ports);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    console.log(this.state);
    console.log(this.props.data_port);

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
            <option value={this.props.list_ports[0]}>
              {this.props.list_ports[0]}
            </option>
          </select>
          <br />
          {this.props.list_ports[1]}
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
  list_ports: state.list_ports.listports
});

/* Magic to hook up the state to the props */
export default connect(
  mapStateToProps,
  home_actions
)(SerialPortConnection);
