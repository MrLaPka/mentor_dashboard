import React, { Component } from "react";
import s from "./app.component.css";
const json = require('./data.json');
class MyComponent extends Component {
  render() {
     const color = (mark, status) => {
       if (mark !== 0)
         return "green";
       else if (mark === 0) {
         if (String(status) === "Checked") {
           return "red";
         }
         else if (String(status) === "Checking") {
           return "pink";
         }
         else if (String(status) === "In Progress") {
           return "yellow";
         }
         else if (String(status) === "ToDo") {
           return "gray";
         }
       }
    }
    const students = Object.keys(json).map(item =>
      <td className={s.cells}>
        {json[item].StudentGitHub}
        </td>
       );
    const tasks = Object.keys(json[0].tasks).map(item =>
      <tr className={s.cells}>
        <td>{json[0].tasks[item].task}</td>
        {Object.keys(json).map((mark) =>
          <td style={{ background: color(json[mark].tasks[item].mark, json[mark].tasks[item].status) }} className={s.cells}>{json[mark].tasks[item].mark}</td>
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