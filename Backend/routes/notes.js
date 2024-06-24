const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Note = require("../models/Note")
const { body, validationResult } = require('express-validator');

//ROUTE 1 : Get all the notes using: GET "/api/notes/getuser". Login required.
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!")
    }
})

//ROUTE 2 : Add a new Note using: POST "/api/notes/addnote". Login required.
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        //If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            user: req.user.id, title, description, tag
        })
        const savedNote = await note.save();

        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!")
    }
})

//ROUTE 3 : Editing an existing Note using: PUT "/api/notes/updatenote". Login required.
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    //Create a new note object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };


    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not Found");
    }

    if (note.user && note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed!");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });

})


//ROUTE 4 : Deleting an existing Note using: Pdelete "/api/notes/deletenote". Login required.
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    //Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not Found");
    }

    //Allow dleetion iff the note is owned by the user
    if (note.user && note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed!");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ "Success": "Note has been deleted", note: note });

})

module.exports = router;