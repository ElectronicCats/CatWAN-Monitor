import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import * as home_actions from "../../actions/catwan-actions";

import { getters, actions } from "../../modules/ports";

class SerialPortConnection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "prossesing",
      url: "http://",
      portUrl: undefined,
      connect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);

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

  handleConnect(e) {
    e.preventDefault();
    actions.CONNECT_TO_SERIALPORT(
      this.state.port,
      this.state.url,
      this.state.portUrl,
      this.state.connect
    );

    this.setState({
      ...this.state,
      connect: true
    })

    console.log(this.state.port);
  }

  handleDisconnect(e) {
    e.preventDefault();
    this.setState({
      ...this.state,
      connect: false
    })
    console.log(this.state.connect)
    actions.CONNECT_TO_SERIALPORT(
      this.state.port,
      this.state.url,
      this.state.portUrl,
      this.state.connect
    );
  }

  handlePostData(e) {
    e.preventDefault();
    actions.CONNECT_TO_SERIALPORT(null, this.state.url, this.state.portUrl);
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
      <Fragment>
        <section className="form-postdata">
          <div className="input-group">
            <select name="port" onChange={this.handleChange}>
              <option value="Serialport">Serialport</option>
              {ports}
            </select>
            <input
              type="submit"
              className="form-control container__input--button"
              value="Connect"
              disabled={!this.state.url || !this.state.port || this.state.url === "Serialport"}
              onClick={this.handleConnect}
            />
            <input
              type="submit"
              className="form-control container__input--button"
              value="Disconnect"
              disabled={!this.state.url || !this.state.port || this.state.connect === false}
              onClick={this.handleDisconnect}
            />
            <input
              type="submit"
              className="form-control container__input--button container__input--refresh"
              value="Refresh"
              onClick={this.handleRefresh}
            />
          </div>
        </section>
        <section className="form-postdata">
          <form action="">
            <div className="input-group">
              <input
                type="text"
                className="form-control container__input"
                placeholder="Url"
                value={this.state.url}
                name="url"
                onChange={this.handleChange}
              />
              <input
                type="text"
                className="form-control container__input--port"
                placeholder="port"
                name="portUrl"
                onChange={this.handleChange}
              />
            </div>
          </form>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  list_ports: state.list_ports.listports,
  activePort: state.activePort
});

/* Magic to hook up the state to the props */
export default connect(
  mapStateToProps,
  home_actions
)(SerialPortConnection);
