import express from "express";
import dotenv from "dotenv";
import todosRouter from "./routes/todos.js";
import authRouter from "./routes/auth.js";
import {connectDB} from "./data/db.js"



const app = express();

dotenv.config();

app.use(express.json());
app.use("/", todosRouter);
app.use("/user", authRouter);

const port = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`✅ Server started on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
  }
};

startServer();