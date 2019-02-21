import React, { Component } from "react";
import s from "./app.component.css";
import Select from 'react-select';
const json = require('./data.json');
const choseOneMentor = Object.keys(json).map(item => {
  return String(json[item].linkToMentorGitHub);
}
); 

const normalizedMentors = (choseOneMentor) => {
   for (let i = 0; i < choseOneMentor.length; i++){
    for (let j = i + 1; j < choseOneMentor.length; j++){
      if (choseOneMentor[i] === choseOneMentor[j]) {
        choseOneMentor.splice(j, 1);
        j--;
      }
    }
  } 
  return choseOneMentor;
}
const choseMentors = normalizedMentors(choseOneMentor).map(item => {
  return Object({
    values: String(item).toLowerCase(),
    label: String(item)
  });
}
); 

class Chose extends Component {
  state = {
    selectedOption: null,
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    //console.log(`Option selected:`, selectedOption.values);
  }
  render() {
    const { selectedOption } = this.state;
    if (this.state.selectedOption !== null) {
      localStorage.clear();
      localStorage.setItem('mentor', this.state.selectedOption.label);
    }
    if (localStorage.length !==0) {
      return (
        <Select
          value={{
            values: String(localStorage.getItem('mentor').toLowerCase()),
            label: String(localStorage.getItem('mentor'))}}
          onChange={this.handleChange}
          options={choseMentors}
          className={s.chose}
        />
      ); 
    }
    
      return (
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={choseMentors}
          className={s.chose}
        />
      );
    
  }
}
export default Chose;