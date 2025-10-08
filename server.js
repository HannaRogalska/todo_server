import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json())

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
