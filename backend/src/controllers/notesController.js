export function getAllNotes(req, res) {
    res.status(200).send("Welcome to Notes!")
}

export function createNote(req, res) {
    res.status(201).json({"message": "Note CREATED successfully!"})
}

export function updateNote(req, res) {
    res.status(200).json({"message": "Note UPDATED successfully!"})
}

export function deleteNote(req, res) {
    res.status(200).json({"message": "Note DELETED successfully!"})
}