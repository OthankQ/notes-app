const fs = require('fs');
const getNotes = () => 'Your notes...';

// Function to add notes
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log('New note added!');
  } else {
    console.log('Note title taken!');
  }
};

// Function to remove notes
const removeNote = title => {
  const notes = loadNotes();
  const removableNote = notes.filter(note => note.title === title);

  if (removableNote.length !== 0) {
    const newList = notes.filter(note => note.title !== title);
    saveNotes(newList);
    console.log('Note removed!');
  } else {
    console.log(`Can't find the note with that title!`);
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
  getNotes,
  addNote,
  removeNote
};
