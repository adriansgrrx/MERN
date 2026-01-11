import express from "express"
import { createNote, deleteNote, getAllNotes, getNote, updateNote } from "../controllers/notesController.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get("/", getAllNotes);
router.get("/:id", getNote);
router.post("/", createNote); 
router.put("/:id", updateNote); 
router.delete("/:id", deleteNote); 

export default router