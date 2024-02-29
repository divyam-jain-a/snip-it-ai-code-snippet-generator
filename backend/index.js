import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserRouter } from "./routes/user.js";
import { SnippetRouter } from "./routes/snippet.js"
import cors from "cors"
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(cookieParser())
app.use('/auth', UserRouter)
app.use('/snippet', SnippetRouter)

// mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/authentication').then(() =>
    console.log(`Database Connected`)).catch(err => alert(err));

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port: ${process.env.PORT}`)
})