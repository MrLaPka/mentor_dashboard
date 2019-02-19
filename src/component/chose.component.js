import React, { Component } from "react";
import s from "./app.component.css";
import AsyncSelect from 'react-select/lib/Async';

const json = require('./data.json');
const choseMentors = Object.keys(json).map(item => {
  return Object({
    values: String(json[item].linkToMentorGitHub).toLowerCase(),
    label:  String(json[item].linkToMentorGitHub)
  });
}
); 

const filterMentors = (inputValue) => {
  return choseMentors.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterMentors(inputValue));
    }, 1000);
  });
  
class Chose extends Component {
  render() {
    return (
      <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} className={s.chose}/>
    );
  }
}
export default Chose;