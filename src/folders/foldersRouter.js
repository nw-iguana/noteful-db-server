const path = require("path");
const express = require("express");
const FoldersService = require("./foldersService");

const FoldersRouter = express.Router();
const jsonParser = express.json();

FoldersRouter.route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    FoldersService.getAllFolders(knexInstance)
      .then(allFolders => {
        res.json(allFolders);
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const newFolder = req.body;
    console.log(newFolder);
    for (const [key, value] of Object.entries(newFolder))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });

    const knexInstance = req.app.get("db");
    FoldersService.insertFolder(knexInstance, newFolder)
      .then(insertedFolder => {
        res.status(201).json(insertedFolder);
      })
      .catch(next);
  });

FoldersRouter.route("/:folder_id")
  .all((req, res, next) => {
    FoldersService.getFolderById(req.app.get("db"), req.params.folder_id)
      .then(folder => {
        if (!folder) {
          return res.status(404).json({
            error: { message: `Folder doesn't exist` }
          });
        }
        res.folder = folder;
        next();
      })
      .catch(next);
  })

  .get((req, res, next) => {
    res.json(res.folder);
  })

  .delete((req, res, next) => {
    FoldersService.deleteFolder(req.app.get("db"), req.params.folder_id)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = FoldersRouter;
