import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./component/app.component";
import Chose from "./component/chose.component";
console.log(Chose.value);
ReactDOM.render(<div><Chose /><App /></div>, document.querySelector("#root"));
