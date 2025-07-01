import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();
client.connect();

app.post("/submit", async (req, res) => {
    const { problemId, userId, code, language } = req.body;

    try {
        //push this to a database prisma.submission.create();
    client.lPush("submissions", JSON.stringify({problemId, userId, code, language}));

    res.json({
        message: "Submission recieved"
    })
    } catch (error) {
        res.json({
            message: "Submission failed"
        })
    }
    
})

app.listen(3000, ()=> {
    console.log("post is listening at port 3000");
})