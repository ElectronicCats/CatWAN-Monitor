import React from "react";

const FormGroupPostData = () => {
  return (
    <section className="form-postdata">
      <form action="">
        <div className="input-group">
          <input
            type="text"
            className="form-control container__input"
            placeholder="Url"
          ></input>
          <input
            type="text"
            className="form-control container__input--port"
            placeholder="port"
            aria-label="port"
          />
          <input
            type="submit"
            className="form-control container__input--button"
            value="Save"
          />
        </div>
      </form>
    </section>
  );
};

export default FormGroupPostData;
