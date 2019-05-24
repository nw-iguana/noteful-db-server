const FoldersService = {
  getAllFolders(dbInstance) {
    return dbInstance.select("*").from("folders");
  },

  insertFolder(dbInstance, newFolder) {
    return dbInstance
      .insert(newFolder)
      .into("folders")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },

  getFolderById(dbInstance, id) {
    return dbInstance
      .from("folders")
      .select("*")
      .where({ folder_id: id })
      .first();
  },

  deleteFolder(dbInstance, id) {
    return dbInstance
      .from("folders")
      .where({ folder_id: id })
      .del();
  }
};

module.exports = FoldersService;
