import mongoose from "mongoose";

const SnippetSchema = new mongoose.Schema({
    title: { type: String },
    language: { type: String },
    snippet: { type: String },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required:true
    }
})

const snippetModel = mongoose.model("snippet", SnippetSchema)
export { snippetModel as snippet }