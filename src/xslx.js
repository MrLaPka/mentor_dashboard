const fs = require('fs');

if (typeof require !== 'undefined') XSLX = require('xlsx');
const mentorScore = XSLX.readFile('src/xslx/Mentor-students pairs.xlsx');
const tasksFromFile = XSLX.readFile('src/xslx/Tasks.xlsx');
const marksFromFile = XSLX.readFile('src/xslx/Mentor score.xlsx');

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

const sheet2 = mentorScore.Sheets['second_name-to_github_account'];
const mentors = getMentors(sheet2);

//================================================
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

let pairs = getPairs(mentorScore.Sheets['pairs']);

for (let i = 0; i < pairs.length;i++){
    for (let j = 0; j < mentors.length; j++) {
        if (mentors[j].name + ' ' + mentors[j].surname === pairs[i].interviewer) {
            pairs[i].linkToMentorGitHub = String(mentors[j].linkToMentorGitHub);
            if (String(pairs[i].linkToMentorGitHub).indexOf('https://github.com/') != -1) {
                pairs[i].linkToMentorGitHub = String(pairs[i].linkToMentorGitHub).replace('https://github.com/', '');   
            }

            else if (String(pairs[i].linkToMentorGitHub).indexOf('http://github.com/') != -1) {
                pairs[i].linkToMentorGitHub = String(pairs[i].linkToMentorGitHub).replace('http://github.com/', '');  
            }
            
            else if (String(pairs[i].linkToMentorGitHub).indexOf('https:/github.com/') != -1) {
                pairs[i].linkToMentorGitHub = String(pairs[i].linkToMentorGitHub).replace('https:/github.com/', '');
            }

            else if (String(pairs[i].linkToMentorGitHub).indexOf('http:/github.com/') != -1) {
                pairs[i].linkToMentorGitHub = String(pairs[i].linkToMentorGitHub).replace('https:/github.com/', '');
            }

            if (String(pairs[i].linkToMentorGitHub).indexOf('/') != -1) {
                pairs[i].linkToMentorGitHub = String(pairs[i].linkToMentorGitHub).replace('/', '');
            }
        }
    }   
}

for (let i = 0; i < pairs.length; i++) {
    delete pairs[i].interviewer;
}

//================================================

const getTask = (sheet, currentRow) => {
    const filedMapping2 = {
        task:   'A',
        link:   'B',
        status: 'C'
    }

    const task = {
        task:   sheet[filedMapping2.task + currentRow].v,
        status: sheet[filedMapping2.status + currentRow].v
    }
    if (sheet[filedMapping2.link + currentRow] !== undefined) {
        task.link = sheet[filedMapping2.link + currentRow].v;
    }
    else {
        task.link = '-';   
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
module.exports = { getTasks };
/* console.log(tasks);
const json = JSON.stringify(tasks, 0, 3);
fs.writeFile('./src/data.json', json, 'utf8', () => {
    console.log('writing is done!');
}); */
for (let i = 0; i < pairs.length; i++) {
    pairs[i].tasks = tasks;
}


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
        return getMark(sheet, row);
    });
};
const marks = getMarks(marksFromFile.Sheets['Form Responses 1']);
let count = 0;

for (let i = 0; i < pairs.length; i++) {
    pairs[i].marks = [];
    for (let j = 0; j < marks.length; j++) {
        if ('https://github.com/' + String(pairs[i].StudentGitHub).toLowerCase() === String(marks[j].StudentGitHub).toLowerCase() ||
            'https://github.com/' + String(pairs[i].StudentGitHub).toLowerCase() === String(marks[j].MentorGitHub).toLowerCase()) {
            pairs[i].marks[count] = marks[j];
            count++;
        }
    }
}


for (let j = 0; j < pairs.length; j++) {
    for (let i = 0; i < pairs[j].marks.length; i++) {
        if (!pairs[j].marks[i]) {
            pairs[j].marks.splice(i, 1);
            i--;
        }
        else {
            delete pairs[j].marks[i].StudentGitHub;
            delete pairs[j].marks[i].MentorGitHub;
        }
    }
}
let EmptyStudents = [];
let countForEmptyStudents = 0;
let arrToStudentsWithTasks = [];
let countForStudentsWithTasks = 0;
for (let i = 0; i < pairs.length; i++) {
    if (!pairs[i].marks.length) {
        EmptyStudents[countForEmptyStudents] = i; 
        countForEmptyStudents++;
    }
    else {
        arrToStudentsWithTasks[countForStudentsWithTasks] = i;
        countForStudentsWithTasks++;
    }
}
let newObjToEmptyStudents  = JSON.parse(JSON.stringify(pairs));
for (let i = 0; i < EmptyStudents.length; i++) {
    EmptyStudents[i] = newObjToEmptyStudents[EmptyStudents[i]];
    for (let j = 0; j < EmptyStudents[i].tasks.length; j++){
        EmptyStudents[i].tasks[j].mark = 0;
     } 
}
let newObjToStudentsWithTasks = JSON.parse(JSON.stringify(pairs));
for (let i = 0; i < arrToStudentsWithTasks.length; i++) {
    arrToStudentsWithTasks[i] = newObjToStudentsWithTasks[arrToStudentsWithTasks[i]];
    for (let j = 0; j < arrToStudentsWithTasks[i].tasks.length; j++) {
        for (let k = 0; k < arrToStudentsWithTasks[i].marks.length; k++) {
            if (String(arrToStudentsWithTasks[i].tasks[j].task).replace(/\s+/g, '') === String(arrToStudentsWithTasks[i].marks[k].task).replace(/\s+/g, '') ) {
                arrToStudentsWithTasks[i].tasks[j].mark = arrToStudentsWithTasks[i].marks[k].mark;
            }
            if (!("mark" in arrToStudentsWithTasks[i].tasks[j])) {
                arrToStudentsWithTasks[i].tasks[j].mark = 0;
            }
        }
    }
}

pairs = [...arrToStudentsWithTasks, ...EmptyStudents];
for (let i = 0; i < pairs.length; i++) {
    delete pairs[i].marks;
}  

      const json = JSON.stringify(pairs, 0, 3);
  fs.writeFile('./src/component/data.json', json, 'utf8', () => {
     console.log('writing is done!');
 });       