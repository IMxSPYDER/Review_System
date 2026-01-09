import "./config/env.js";   // MUST be first

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
