const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

//Route 1: Get all the notes of a user using GET:'/api/notes/fetchallnotes'. Login reqd
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.status(200).send(notes);
  } catch (error) {
    console.error(error.message);
      res.status(500).send("Some error occured");
  }
});

//Route 2: Add the notes of a user using POST:'/api/notes/addnote'. Login reqd
router.post("/addnote",fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description can't be empty ").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag, pinned } = req.body;

      const note = new Notes({ title, description, tag, pinned, user: req.user.id });
      const savedNote = await note.save();
      res.send(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//Route 3: Update a note of an user using PUT:'/api/notes/update'. Login reqd
router.put("/updatenote/:id",fetchuser, async (req, res) => {
    try {
      let note =await Notes.findById(req.params.id)
      if(!note){return res.status(404).send("Note not found")}

      if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
      }

      const { title, description, tag, pinned } = req.body;
      //Create new note object
      const newNote = {}
      if(title){newNote.title = title}
      if(description){newNote.description = description}
      if(tag){newNote.tag = tag}
      {newNote.pinned = pinned}
      
      note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
      res.status(200).send("Note Edited Successfully")
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//Route 4: Delete a notes of an user using DELETE:'/api/notes/deletenote'. Login reqd
router.delete("/deletenote/:id",fetchuser, async (req, res) => {
    try {
      //Find the note to be deleted
      let note =await Notes.findById(req.params.id)
      if(!note){return res.status(404).send("Note not found")}

      //Allow delete only if user owns this note 
      if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
      }
      note = await Notes.findByIdAndDelete(req.params.id)
      res.status(200).json({"Success": "Note has been successfully deleted."})
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
