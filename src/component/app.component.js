import React, { Component } from "react";
import s from "./app.component.css";
const json = require('./data.json');
class MyComponent extends Component {
  render() {
    const students = Object.keys(json).map(item =>
      <td className={s.cells}>
        {json[item].StudentGitHub}
        </td>
       );
    const tasks = Object.keys(json[0].tasks).map(item =>
      <tr className={s.cells}>
        {json[0].tasks[item].task}
        {Object.keys(json).map(() =>
      <td className={s.cells}>
        </td>
       )}
      </tr>
    ); 
    return(
      <table className={s.intro}>
        <tr>
        <td></td>
        {students}
      </tr>
          {tasks}
      </table>
    );
  }
}
export default MyComponent;