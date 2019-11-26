import React from "react";
import Spinner from "react-spinner-material";
function Loader(porps) {
  return (
    <div className="center">
      <Spinner
        size={120}
        spinnerColor={"rgb(37, 35, 38)"}
        spinnerWidth={2}
        visible={true}
      />
    </div>
  );
}

export default Loader;
