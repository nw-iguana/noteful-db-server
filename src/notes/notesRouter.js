const path = require('path')
const express = require('express')
const NotesService = require('./notesService')

const NotesRouter = express.Router()
const jsonParser = express.json();


NotesRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        NotesService.getAllNotes(knexInstance)
            .then(allNotes => {
                res.json(allNotes)
            })
            .catch(next)
    })


    .post(jsonParser, (req, res, next) => {
        const { note_name, note_content, folder_id } = req.body
        const newNote = { note_name, note_content, folder_id }
        const knexInstance = req.app.get('db');
        NotesService.insertNote(knexInstance, newNote)
            .then(insertedNote => {
                res
                    .status(201)
                    .json(insertedNote)
            })
            .catch(next)
    })

module.exports = NotesRouter