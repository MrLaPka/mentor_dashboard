import React, { Component } from "react";
import Chose from './chose.component.js';
import s from "./app.component.css";
const json = require('./data.json');

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({ content: selectedOption });
  }


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
      const mentorStudents = (mentorGitHub) => {
        const students = json.filter(item => {
          return String(item.linkToMentorGitHub) === String(mentorGitHub)
        });
        return students.map(item => {
          return <td className={s.cells}>
            <a href={'https://github.com/' + String(item.StudentGitHub)} target= '_blank'>{item.StudentGitHub}</a>
          </td>
        });
    } 

    const tasks = (mentorGitHub) => {
      const studentMarks = json.filter(item => {
        return String(item.linkToMentorGitHub) === String(mentorGitHub)
      }); 
      return Object.keys(studentMarks[0].tasks).map(item => {
        return <tr className={s.cells}>
          <td>{studentMarks[0].tasks[item].task}</td>
            {
            studentMarks.map((marks) => {
              return <td style={{ background: color(marks.tasks[item].mark, marks.tasks[item].status) }} className={s.cells}>
                {marks.tasks[item].mark}
              </td>
            })}
        </tr>
      });
    }

    let { content } = this.state;
    if (content !== null) {
      return <div>
        <Chose value={content.label} handleChange={this.handleChange} />
        <table id="mainTable" className={s.intro}>
          <tr>
            <td></td>
            {mentorStudents(content.label)}
          </tr>
          {tasks(content.label)}
        </table>
      </div>
    }
    else if (content === null) {
      if (localStorage.length !== 0) {
        return <div>
          <Chose value={String(localStorage.getItem('mentor'))} handleChange={this.handleChange} />
          <table id="mainTable" className={s.intro}>
            <tr>
              <td></td>
              {mentorStudents(String(localStorage.getItem('mentor')))}
            </tr>
            {tasks(String(localStorage.getItem('mentor')))}
          </table>
        </div>
      }
      else {
        return <div>
          <Chose value={content} handleChange={this.handleChange} />
        </div>
      }
    }
  }
}

export default Table;