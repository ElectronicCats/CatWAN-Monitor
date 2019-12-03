import React, { Component } from "react";

import { connect } from "react-redux";
import * as home_actions from "../../actions/houston-actions";

import { getters, mutations, actions } from "../../modules/ports";

class SerialPortConnection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "prossesing",
      list_ports: this.props.list_ports
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    console.log(this.props.list_ports);
    console.log(getters);
    getters.LIST_PORTS();
    await this.getPorts();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    console.log(this.props.list_ports);

    event.preventDefault();
    {
      this.props.list_ports.map(port => <option value={port}>{port}</option>);
    }
    console.log("CLICK");
  }

  render() {
    console.log(this.props.list_ports);
    console.log(this.state);

    return (
      <section className="form-postdata">
        <div className="input-group">
          <select
            name="port"
            value={this.state.status}
            onChange={this.handleChange}
          >
            {this.props.list_ports.map(port => (
              <option value={port}>{port}</option>
            ))}
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
  list_ports: state.list_ports.listports
});

/* Magic to hook up the state to the props */
export default connect(
  mapStateToProps,
  home_actions
)(SerialPortConnection);
