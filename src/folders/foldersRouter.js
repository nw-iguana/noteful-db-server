const path = require('path')
const express = require('express')
const FoldersService = require('./foldersService')

const FoldersRouter = express.Router()
const jsonParser = express.json();


FoldersRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        FoldersService.getAllFolders(knexInstance)
            .then(allFolders => {
                res.json(allFolders)
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { folder_title } = req.body
        const newFolder = { folder_title }
        const knexInstance = req.app.get('db');
        FoldersService.insertFolder(knexInstance, newFolder)
            .then(insertedFolder => {
                res
                    .status(201)
                    .json(insertedFolder)
            })
            .catch(next)
    })

module.exports = FoldersRouter