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
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

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
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlzIjoiNjY2YzJhYmUxMzdhNzEyZTRiMDg3MGY5In0sImlhdCI6MTcxOTEzMDk1OH0.04Nr0ogK31B6oJ_t-rzpmoQ14IBB09b6SWuMiyHCW7A'
      }
    });
    const json = response.json();
    console.log(json);

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }



  // //Edit a note
  // const editNote = async (id, title, description, tag) => {
  //   //API Call
  //   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlzIjoiNjY2YzJhYmUxMzdhNzEyZTRiMDg3MGY5In0sImlhdCI6MTcxOTEzMDk1OH0.04Nr0ogK31B6oJ_t-rzpmoQ14IBB09b6SWuMiyHCW7A'
  //     },
  //     body: JSON.stringify({ title, description, tag })
  //   });
  //   const json = await response.json();
  //   console.log(json);

  //   let newNotes = JSON.parse(JSON.stringify(notes));
  //   //Logic to edit in client
  //   for (let index = 0; index < newNotes.length; index++) {
  //     const element = newNotes[index];
  //     if (element._id === id) {
  //       newNotes[index].title = title;
  //       newNotes[index].description = description;
  //       newNotes[index].tag = tag;
  //       break;
  //     }
  //   }
  //   console.log(notes);
  //   setNotes(notes);
  // }

  //-----------------------------------------------------------
  //upate a note
  const editNote = async (id, title, description, tag) => {
    //API fetch
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlzIjoiNjY2YzJhYmUxMzdhNzEyZTRiMDg3MGY5In0sImlhdCI6MTcxOTEzMDk1OH0.04Nr0ogK31B6oJ_t-rzpmoQ14IBB09b6SWuMiyHCW7A",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    getNotes();
  };
  //-----------------------------------------------------------

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;