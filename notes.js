const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateCheck = notes.filter(note => note.title === title);
    if (duplicateCheck.length === 0) {
        notes.push(({
            title: title,
            body: body
        }))
        console.log(chalk.greenBright(`Note- \'${title}\' added`));
        saveNotes(notes);
    }
    else {
        console.log(chalk.redBright(`
Error! Duplicate Note Found! 
change the title to add again.`));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const finalNotes = notes.filter(note => note.title !== title);
    if (finalNotes.length < notes.length) {
        console.log(chalk.green(`Note- \'${title}\' removed`));
        saveNotes(finalNotes);
    }
    else {
        console.log(chalk.red(`No note titled- \'${title}\' found`));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    if (notes.length > 0) {
        console.log(chalk.underline.bgBlue("---All present Notes---"));
        notes.forEach(note => {
            console.log(chalk.yellowBright(`${note.title}\n`));
            console.log(chalk.cyanBright(`${note.body}\n`));
            console.log('------------------------');
        });
    }
     else {
        console.log(chalk.red(`No notes found!`));
     }
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(elem => elem.title === title);
    if(note) {
        console.log(chalk.underline.bgBlue('---Note Description---\n'));
        console.log(chalk.yellowBright(`${note.title}\n`));
        console.log(chalk.cyanBright(`${note.body}\n`));
        console.log('\n');
    } 
    else {
        console.log(chalk.red(`No note titled- \'${title}\' found`));
    }
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (e) {
        return []
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}