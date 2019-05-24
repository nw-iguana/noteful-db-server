
const NotesService = {
    getAllNotes(dbInstance) {
        return dbInstance
            .select('*')
            .from('notes')
    },

    insertNote(dbInstance, newNote) {
        return dbInstance
            .insert(newNote)
            .into('notes')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getNoteById(dbInstance, id) {
        return dbInstance
            .from('notes')
            .select('*')
            .where({ note_id: id })
            .first()
    },

    deleteNote(dbInstance, id) {
        return dbInstance
            .where({ note_id: id })
            .del()
    }


}

module.exports = NotesService