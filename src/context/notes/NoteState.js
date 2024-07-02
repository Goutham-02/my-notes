import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  //Get all Notes
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlzIjoiNjY2YzJhYmUxMzdhNzEyZTRiMDg3MGY5In0sImlhdCI6MTcxOTEzMDk1OH0.04Nr0ogK31B6oJ_t-rzpmoQ14IBB09b6SWuMiyHCW7A'
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }
  //Add a note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlzIjoiNjY2YzJhYmUxMzdhNzEyZTRiMDg3MGY5In0sImlhdCI6MTcxOTEzMDk1OH0.04Nr0ogK31B6oJ_t-rzpmoQ14IBB09b6SWuMiyHCW7A'
      },
      body: JSON.stringify({title, description, tag})
    });

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
    //API Call
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }
  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlzIjoiNjY2YzJhYmUxMzdhNzEyZTRiMDg3MGY5In0sImlhdCI6MTcxOTEzMDk1OH0.04Nr0ogK31B6oJ_t-rzpmoQ14IBB09b6SWuMiyHCW7A'
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;