import React, { Component } from "react";

import { connect } from "react-redux";
import * as home_actions from "../../actions/houston-actions";

import { getters, mutations, actions } from "../../modules/ports";

class SerialPortConnection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "prossesing"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    console.log(getters);
    getters.LIST_PORTS();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleRefresh(e) {
    e.preventDefault();
    getters.LIST_PORTS();
  }

  handleSubmit(event) {
    console.log(this.props.list_ports);

    event.preventDefault();

    console.log("CLICK");
  }

  render() {
    console.table(this.props.list_ports);

    console.log(this.state);

    let ports = this.props.list_ports.map(
      function(port) {
        return (
          <option key={port} value={port}>
            {port}
          </option>
        );
      }.bind(this)
    );
    return (
      <section className="form-postdata">
        <div className="input-group">
          <select
            name="port"
            value={this.state.status}
            onChange={this.handleChange}
          >
            {ports}
          </select>
          <input
            type="submit"
            className="form-control container__input--button"
            value="Connect"
            onClick={this.handleSubmit}
          />
          <input
            type="submit"
            className="form-control container__input--button"
            value="Disconect"
            onClick={this.handleSubmit}
          />
          <input
            type="submit"
            className="form-control container__input--button"
            value="Refresh"
            onClick={this.handleRefresh}
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
