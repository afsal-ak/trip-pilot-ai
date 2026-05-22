import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./presentation/routes/userRoutes";
import { errorHandler } from "./presentation/middlewares/errorHandler";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morganLogger from "./presentation/middlewares/logger";

const app = express();
const PORT = process.env.PORT || 4001;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/trip-pilot=ai");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

// Middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(morganLogger);
app.use(bodyParser.json());

// Routes
app.use("/api/user", userRoutes);

// Error handler
app.use(errorHandler);

// Start server
connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
