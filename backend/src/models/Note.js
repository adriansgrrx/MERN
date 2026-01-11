import mongoose from "mongoose";

// 1- create a schema
const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);

// 2- model based off that schema
const Note = mongoose.model("Note", noteSchema);

export default Note;