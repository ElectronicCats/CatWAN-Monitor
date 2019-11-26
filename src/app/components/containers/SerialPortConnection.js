import React from "react";
import "../style/GridContainer.scss";

const SerialPortConnection = () => {
  return (
    <section className="form-postdata">
      <form action="">
        <div className="input-group">
          <input
            type="text"
            className="form-control container__input--serial"
            placeholder="Serial Port"
          />
           <input
            type="submit"
            className="form-control container__input--button"
            value="Connect"
          />
        </div>
      </form>
    </section>
  );
};

export default SerialPortConnection;
