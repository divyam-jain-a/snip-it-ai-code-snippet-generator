import express from "express"
import { snippet } from "../models/Snippet.js";

const router = express.Router();

router.post('/add-snippet', (req, res) => {
    snippet.create({
        title: req.body.search,
        language: req.body.language,
        snippet: req.body.answer,
        userId: req.body.userId
    }).then(response => {
        return res.json(response)
    }).catch(err => console.log(err));
})

router.get('/all-snippets/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const snippets = await snippet.find({ userId: userId });
        res.json(snippets);
    } catch (error) {
        console.log(error);
    }
})

export { router as SnippetRouter }