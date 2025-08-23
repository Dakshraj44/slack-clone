import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express"
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";


const app = express();

app.use(express.json()); //access to req.body

app.use(clerkMiddleware()); //req.auth will be available in the request object

app.use("/api/inngest", serve({ client: inngest, functions }));


app.get("/", (req, res) => {
    res.send("Hello World 123");
});

const startSever = async () => {
    try {
        await connectDB();
        if (ENV.NODE_ENV !== "production") {
            app.listen(ENV.PORT, () => {
                console.log("Server started on the port ", ENV.PORT);
            });
        }
    } catch (error) {
        console.error("Error starting the server :" ,error);
        process.exit(1);
    }
}

startSever()

export default app;