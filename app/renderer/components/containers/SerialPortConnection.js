import React, { Component } from "react";

/**
 * List ports
 */

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
    this.props.get_orders(this.state.date, this.state.status);

    event.preventDefault();
  }

  render() {
    console.log(this.props);
    console.log(this.state);  

    return (
      <section className="form-postdata">
        <form action="">
          <div className="input-group">
            <select
              name="port"
              value={this.state.status}
              onChange={this.handleChange}
            >
              {all_ports.map(ports =>{
                <option value={ports}>{ports}</option>
              })}
            </select>
            <input
              type="submit"
              className="form-control container__input--button"
              value="Connect"
            />
          </div>
        </form>
      </section>
    );
  }
}

export default SerialPortConnection;
