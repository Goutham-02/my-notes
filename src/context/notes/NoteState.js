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
          "_id": "667abcfa75c4490790318484",
          "title": "Breakfast",
          "description": "Dose and Poori",
          "tag": "Eat",
          "date": "2024-06-25T12:50:02.548Z",
          "__v": 0
        },
        {
          "_id": "667abcfa75c4490790318484",
          "title": "Breakfast",
          "description": "Dose and Poori",
          "tag": "Eat",
          "date": "2024-06-25T12:50:02.548Z",
          "__v": 0
        },
        {
          "_id": "667abcfa75c4490790318484",
          "title": "Breakfast",
          "description": "Dose and Poori",
          "tag": "Eat",
          "date": "2024-06-25T12:50:02.548Z",
          "__v": 0
        },
        {
          "_id": "667abcfa75c4490790318484",
          "title": "Breakfast",
          "description": "Dose and Poori",
          "tag": "Eat",
          "date": "2024-06-25T12:50:02.548Z",
          "__v": 0
        },
        {
          "_id": "667abcfa75c4490790318484",
          "title": "Breakfast",
          "description": "Dose and Poori",
          "tag": "Eat",
          "date": "2024-06-25T12:50:02.548Z",
          "__v": 0
        },
        {
          "_id": "667abcfa75c4490790318484",
          "title": "Breakfast",
          "description": "Dose and Poori",
          "tag": "Eat",
          "date": "2024-06-25T12:50:02.548Z",
          "__v": 0
        },
        {
          "_id": "667abcfa75c4490790318484",
          "title": "Breakfast",
          "description": "Dose and Poori",
          "tag": "Eat",
          "date": "2024-06-25T12:50:02.548Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial);
    return (
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;