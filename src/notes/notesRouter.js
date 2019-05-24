const path = require("path");
const express = require("express");
const NotesService = require("./notesService");

const NotesRouter = express.Router();
const jsonParser = express.json();

NotesRouter.route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    NotesService.getAllNotes(knexInstance)
      .then(allNotes => {
        res.json(allNotes);
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { note_name, note_content, folder_id } = req.body;
    const newNote = { note_name, note_content, folder_id };
    const knexInstance = req.app.get("db");
    NotesService.insertNote(knexInstance, newNote)
      .then(insertedNote => {
        res.status(201).json(insertedNote);
      })
      .catch(next);
  });

NotesRouter.route("/:note_id")
  .all((req, res, next) => {
    NotesService.getNoteById(req.app.get("db"), req.params.note_id)
      .then(note => {
        if (!note) {
          return res.status(404).json({
            error: { message: `Note doesn't exist` }
          });
        }
        res.note = note;
        next();
      })
      .catch(next);
  })

  .get((req, res, next) => {
    res.json(res.note);
  })

  .delete((req, res, next) => {
    NotesService.deleteNote(req.app.get("db"), req.params.note_id)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = NotesRouter;
