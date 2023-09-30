import { config } from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./db/connectDB.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

// dotenv
config();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// db
connectDB();

app.get("/", (req, res) => {
  res.send("Hello there");
});

// routes - /api/users
app.use("/api/users", userRouter);

// 404 - not found error
app.use("*", notFound);

// error middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
