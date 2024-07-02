import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "667abc8d75c449079031847e",
      "title": "Sleep",
      "description": "Sleep from 9 to 6",
      "tag": "Sleep",
      "date": "2024-06-25T12:48:13.682Z",
      "__v": 0
    },
    {
      "_id": "667abcfa75c449070318484",
      "title": "Breakfast",
      "description": "Dose and Poori",
      "tag": "Eat",
      "date": "2024-06-25T12:50:02.548Z",
      "__v": 0
    },
    {
      "_id": "667abcfa75c449079018484",
      "title": "Breakfast",
      "description": "Dose and Poori",
      "tag": "Eat",
      "date": "2024-06-25T12:50:02.548Z",
      "__v": 0
    },
    {
      "_id": "667abcfa75c44079318484",
      "title": "Breakfast",
      "description": "Dose and Poori",
      "tag": "Eat",
      "date": "2024-06-25T12:50:02.548Z",
      "__v": 0
    },
    {
      "_id": "667abcfa75c449079318484",
      "title": "Breakfast",
      "description": "Dose and Poori",
      "tag": "Eat",
      "date": "2024-06-25T12:50:02.548Z",
      "__v": 0
    },
    {
      "_id": "667abcfa75c490790318484",
      "title": "Breakfast",
      "description": "Dose and Poori",
      "tag": "Eat",
      "date": "2024-06-25T12:50:02.548Z",
      "__v": 0
    },
    {
      "_id": "667abcfa75c449079031484",
      "title": "Breakfast",
      "description": "Dose and Poori",
      "tag": "Eat",
      "date": "2024-06-25T12:50:02.548Z",
      "__v": 0
    },
    {
      "_id": "667acfa75c4490790318484",
      "title": "Breakfast",
      "description": "Dose and Poori",
      "tag": "Eat",
      "date": "2024-06-25T12:50:02.548Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial);

  //Add a note
  const addNote = (title, description, tag) => {
    // TODO: API Call
    console.log("Adding a new note");
    const note = {
      "_id": "6678d75c449079031847e",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-06-25T12:48:13.682Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }
  //Delete a note
  const deleteNote = (id) => {
    //TODO: API Call
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note)=> {return note._id!==id});
    setNotes(newNotes);
  }
  //Edit a note
  const editNote = (id, title, description, tag) => {

  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;