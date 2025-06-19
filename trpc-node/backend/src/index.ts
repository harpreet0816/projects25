import express from "express";
import cors from "cors";
import { urlRouter } from "./routers/urlRouter";

// interfacing allow express to recieve request then directly convert that request according for trpc 
import * as trpcExpress from "@trpc/server/adapters/express";

const app = express();

app.use(cors());

app.use("/trpc", trpcExpress.createExpressMiddleware({
    router: urlRouter
}));

app.listen(3000, ()=> {
    console.log("server running on port 3000");
})