import Note from "../models/Note.js"

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function createNote(req, res) {
    try {
        const {title, content} = req.body;
        const savedNote = new Note({title, content});

        await savedNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNote", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function updateNote(req, res) {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            {title, content}, 
            {
                new: true
            }
        );
        if (!updatedNote) return res.status(404).json({message: "Note NOT FOUND."});
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function deleteNote(req, res) {
    try {
        const {title, content} = req.body;
        const deletedNote = await Note.findByIdAndDelete(
            req.params.id, 
            {title, content}, 
            {
                new: true
            }
        );
        if (!deletedNote) return res.status(404).json({message: "Note NOT FOUND."});
        res.status(200).json({message: "Note DELETED successfully."});
    } catch (error) {
        console.error("Error in deleteNote", error);
        res.status(500).json({message:"Internal server error"});
    }
}