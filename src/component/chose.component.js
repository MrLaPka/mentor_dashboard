import React, { Component } from "react";
import s from "./app.component.css";
const json = require('./data.json');
class Chose extends Component {
    render() {
        return (
          <textarea className={s.chose}/>
        );
    }
}
export default Chose;