import React, { Component } from "react";
import s from "./app.component.css";
import AsyncSelect from 'react-select/lib/Async';

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
/*    choseOneMentor.forEach((item, i, arr) => {
    if (item == arr[i + 1]) {
      arr.splice(i, 1);
    }
  });  */

  return choseOneMentor;
}
const choseMentors = normalizedMentors(choseOneMentor).map(item => {
  return Object({
    values: String(item).toLowerCase(),
    label: String(item)
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