const fs = require('fs');

if (typeof require !== 'undefined') XSLX = require('xlsx');
const mentorScore = XSLX.readFile('src/xslx/Mentor-students pairs.xlsx');
const tasksFromFile = XSLX.readFile('src/xslx/Tasks.xlsx');
const marksFromFile = XSLX.readFile('src/xslx/Mentor score.xlsx');
//debugger;
//console.log('values',workSheetsFromFile.Sheets['pairs']['A2']['v']);

const filedMapping = {
    'name': 'A',
    'surname': 'B',
    'linkToMentorGitHub': 'E'
}

const getMentor = (sheet, currentRow) =>{

    const mentor = {
        name: sheet[filedMapping.name + currentRow].v,
        surname: sheet[filedMapping.surname + currentRow].v,
        linkToMentorGitHub: sheet[filedMapping.linkToMentorGitHub + currentRow].v
    }
    return mentor;

};

const getMentors = (sheet) =>{
 let count = 2;
 const rows= [];
    while (sheet[`A${count}`]){
        rows[count - 2] = count;
        count++;
    }
    return rows.map((row) =>{
        return getMentor(sheet, row)
    });
};

// const mentor = {
//     linkToMentorGitHub: 'https://github.com/mkinitcpio',
//     linkToStudentGitHub: 'https://github.com/Artsiom-Zhuk',
//     task: 'Code Jam "CoreJS"'
// }

const sheet2 = mentorScore.Sheets['second_name-to_github_account'];
//console.log('values', mentorScore.Sheets['Form Responses 1']['B2']['v']);
const mentors = getMentors(sheet2);
//console.log(mentors);
//const json = JSON.stringify(mentors, 0, 2);
 //fs.writeFile('data.json', json, 'utf8', () =>{
 //   console.log('writing is done!');
 //});

//================================================
//console.log(mentor.name+' '+ mentor.surname);
const getPair = (sheet, currentRow) => {
    const filedMapping1 = {
        interviewer: 'A',
        StudentGitHub: 'B',
        linkToMentorGitHub: 'E'
    }

    const pair = {
        interviewer: sheet[filedMapping1.interviewer + currentRow].v,
        StudentGitHub: sheet[filedMapping1.StudentGitHub + currentRow].v,
        linkToMentorGitHub: sheet[filedMapping1.linkToMentorGitHub + currentRow]
    }
    return pair;

};

const getPairs = sheet => {
    let count = 2;
    const rows = [];
    while (sheet[`A${count}`]) {
        rows[count - 2] = count;
        count++;
    }

    return rows.map((row) => {
        return getPair(sheet, row)
    });
};
const pairs = getPairs(mentorScore.Sheets['pairs']);

/* const results = pairs.map((pair) =>{
    const mentor = mentors.find(w => (w.name + ' ' + w.surname) === pair.interviewer);

    return{
        interviewer: mentor.interviewer,
        StudentGitHub: mentor.StudentGitHub,
        linkToMentorGitHub: mentor.linkToMentorGitHub 
    }
}); 

console.log('results', results); */

for (let i = 0; i < pairs.length;i++){
    for (let j = 0; j < mentors.length; j++) {
        if (mentors[j].name + ' ' + mentors[j].surname === pairs[i].interviewer) {
            pairs[i].linkToMentorGitHub = mentors[j].linkToMentorGitHub;
        }
    }   
}

for (let i = 0; i < pairs.length; i++) {
    delete pairs[i].interviewer;
}
 /* console.log('pairs', pairs);
const json = JSON.stringify(pairs, 0, 3);
 fs.writeFile('data.json', json, 'utf8', () =>{
    console.log('writing is done!');
 });  */
//================================================

const getTask = (sheet, currentRow) => {
    const filedMapping2 = {
        task: 'A',
        status: 'C'
    }

    const task = {
        task: sheet[filedMapping2.task + currentRow].v,
        status: sheet[filedMapping2.status + currentRow].v
    }
    return task;

};

const getTasks = sheet => {
    let count = 2;
    const rows = [];
    while (sheet[`A${count}`]) {
        rows[count - 2] = count;
        count++;
    }

    return rows.map((row) => {
        return getTask(sheet, row)
    });
};
const tasks = getTasks(tasksFromFile.Sheets['Sheet1']);

/* const results = pairs.map((pair) =>{
    const mentor = mentors.find(w => (w.name + ' ' + w.surname) === pair.interviewer);

    return{
        interviewer: mentor.interviewer,
        StudentGitHub: mentor.StudentGitHub,
        linkToMentorGitHub: mentor.linkToMentorGitHub 
    }
}); 

*/
//console.log('tasks', tasks);
/* for (let i = 0; i < pairs.length; i++) {
    for (let j = 0; j < mentors.length; j++) {
        if (mentors[j].name + ' ' + mentors[j].surname === pairs[i].interviewer) {
            pairs[i].linkToMentorGitHub = mentors[j].linkToMentorGitHub;
        }
    }
} */

for (let i = 0; i < pairs.length; i++) {
    pairs[i].tasks = tasks;
}

//  console.log('pairs', pairs);
// const json = JSON.stringify(pairs, 0, 3);
// fs.writeFile('data.json', json, 'utf8', () => {
//     console.log('writing is done!');
// }); 

//================================================

const getMark = (sheet, currentRow) => {
    const filedMapping3 = {
        mark: 'F',
        task: 'D',
        StudentGitHub: 'C',
        MentorGitHub: 'B'

    }

    const mark = {
        mark: sheet[filedMapping3.mark + currentRow].v,
        task: sheet[filedMapping3.task + currentRow].v,
        StudentGitHub: sheet[filedMapping3.StudentGitHub + currentRow].v,
        MentorGitHub:  sheet[filedMapping3.MentorGitHub + currentRow].v
    }
    return mark;

};

const getMarks = sheet => {
    let count = 2;
    const rows = [];
    while (sheet[`A${count}`]) {
        rows[count - 2] = count;
        count++;
    }

    return rows.map((row) => {
        return getMark(sheet, row)
    });
};
const marks = getMarks(marksFromFile.Sheets['Form Responses 1']);
//console.log('marks', marks);
/*  for (let i = 0; i < pairs.length; i++) {
     for (let j = 0; j < marks.length; j++) {
         if ('https://github.com/' + pairs[i].StudentGitHub === marks[j].StudentGitHub) {
             for (let k = 0; k < pairs[i].tasks.length; k++) {
                 if (pairs[i].tasks[k].task === marks[j].task || pairs[i].tasks[k].task + ' ' === marks[j].task) {
                     pairs[i].tasks[k].mark = marks[j].mark;
                     break;
                 }
             }
         }
    }
 } */
/*  for (let i = 0; i < pairs.length; i++) {
    for (let j = 0; j < marks.length; j++) {
        if ('https://github.com/' + String(pairs[i].StudentGitHub).toLowerCase() === String(marks[j].StudentGitHub).toLowerCase()){
            for (let k = 0; k < pairs[i].tasks.length; k++) {
                if (String(pairs[i].tasks[k].task).replace(/\s+/g, '') === String(marks[j].task).replace(/\s+/g, '')) {
                    pairs[i].tasks[k].mark = marks[j].mark;
                    //console.log(pairs[i].tasks[k].mark);
                    break;
                }
            }
}
    }
}  */
  for (let i = 0; i < pairs.length; i++) {
    for (let j = 0; j < marks.length; j++){  
              if ('https://github.com/' + String(pairs[i].StudentGitHub).toLowerCase() === String(marks[j].StudentGitHub).toLowerCase() ||
                  'https://github.com/' + String(pairs[i].StudentGitHub).toLowerCase() === String(marks[j].MentorGitHub).toLowerCase()) {
                  for (let k = 0; k < pairs[i].tasks.length; k++) {
                 if (String(pairs[i].tasks[k].task).replace(/\s+/g, '') === String(marks[j].task).replace(/\s+/g, '')) {
                     pairs[i].tasks[k].mark = marks[j].mark;                    
                     break;
                      }
                      if (!("mark" in pairs[i].tasks[k])) {
                          pairs[i].tasks[k].mark = 0; 
                      }
                  } 
        }
    }
    //console.log(pairs[i]);
} 

/* for (let i = 0; i < pairs.length; i++) {
    console.log(pairs[i]);
    }   */
/* let obj = [];
for (let i = 0; i < pairs.length; i++) {
    obj[i] = pairs[i].StudentGitHub;
} */
//console.log(obj);

/* let obj2 = [];
let count = 0;
for (let i = 0; i < obj.length; i++) {
    for (let j = 0; j < marks.length; j++) {
        if ('https://github.com/' + String(obj[i]).toLowerCase() === String(marks[j].StudentGitHub).toLowerCase() ||
            'https://github.com/' + String(obj[i]).toLowerCase() === String(marks[j].MentorGitHub).toLowerCase()) {
            obj2[count] = marks[j];
             for (let i = 0; i < pairs[0].tasks.length; i++) {
                if (String(pairs[i].tasks[i].task).replace(/\s+/g, '') === String(obj2[j].task).replace(/\s+/g, '')){

                }
            } 
            count++;
        }
    }
} */

/* for (let i = 0; i < pairs[0].tasks.length; i++) {
    for (let j = 0; j < obj2.length; j++) {
        if (String(pairs[i].tasks[i].task).replace(/\s+/g, '') === String(obj2[j].task).replace(/\s+/g, '')) {
            console.log(obj2[j].task);
            obj2[j].status = pairs[i].tasks[i].status;
             for (let k = 0; k < pairs[i].tasks.length; k++) {
                pairs[i].tasks[k].task = obj2[j].task;
                pairs[i].tasks[k].mark = obj2[j].mark;
            } 
        }
        if (String(obj2[j].task).replace(/\s+/g, '') === 'Presentation') {
            obj2.splice(j, 1);  
        }
    }
}
 */
/* for (let i = 0; i < pairs.length; i++) { 
    pairs[i].tasks = {}; 
} */

/* for (let i = 0; i < pairs.length; i++) {
     for (let j = 0; j < obj2.length; j++) {
        if ('https://github.com/' + String(pairs[i].StudentGitHub).toLowerCase() === String(obj2[j].StudentGitHub).toLowerCase() ||
            'https://github.com/' + String(pairs[i].StudentGitHub).toLowerCase() === String(obj2[j].MentorGitHub).toLowerCase()) {
            pairs[i].tasks += obj2[j];
        }
    } 
} */

/*   for (let i = 0; i < pairs.length; i++) {
     console.log(pairs[i]);
}   */
//console.log(obj2);
        const json = JSON.stringify(pairs, 0, 3);
 fs.writeFile('./src/component/data.json', json, 'utf8', () => {
     console.log('writing is done!');
 });      