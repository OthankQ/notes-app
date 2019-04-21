const fs = require('fs');
const chalk = require('chalk');

// Function to add notes
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.black.bgGreen('New note added!'));
  } else {
    console.log(chalk.bgRed('Note title taken!'));
  }
};

// Function to remove notes
const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.black.bgGreen('Note removed!'));
  } else {
    console.log(chalk.bgRed(`No note found!`));
  }
};

// Function to list notes
const listNotes = () => {
  console.log(chalk.green.inverse('Your notes:'));
  const notes = loadNotes();
  notes.map(note => console.log(note.title));
};

// Function to read notes
const readNote = title => {
  const notes = loadNotes();
  const foundNote = notes.find(note => note.title === title);

  if (foundNote) {
    console.log(chalk.inverse(foundNote.title));
    console.log(foundNote.body);
  } else {
    console.log(chalk.red('No note found with that title!'));
  }
};

// Reusable function to save notes
const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

// Reusable function to load in notes as JS object
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
};
