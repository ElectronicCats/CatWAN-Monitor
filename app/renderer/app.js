import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";


/**Components */
import MainComponent from "./components/MainComponent";
import Navbar from "./components/Navbar";

const rootElement = document.querySelector(
  document.currentScript.getAttribute("data-container")
);

// Render the main component, the parent for everything else on the page
// Wrap the app and allow redux store access
ReactDOM.render(
  <Fragment>
    <Navbar />
    <Provider store={store}>
      <MainComponent />
    </Provider>
  </Fragment>,
  rootElement
);
