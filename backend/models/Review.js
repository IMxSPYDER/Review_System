import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  rating: Number,
  review: String,
  summary: String,
  recommendedAction: String,
  aiResponse: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Review", ReviewSchema);
