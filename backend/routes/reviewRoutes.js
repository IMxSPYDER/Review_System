import express from "express";
import Review from "../models/Review.js";
import { analyzeReview } from "../services/openaiService.js";

const router = express.Router();

/* POST: Submit Review */
router.post("/review", async (req, res) => {
  const { rating, review } = req.body;

  if (!rating || !review || review.trim() === "") {
    return res.status(400).json({ error: "Rating and review are required" });
  }

  let aiData;
  try {
    aiData = await analyzeReview(review);
  } catch (error) {
    console.error("OpenAI Error:", error);
    aiData = {
      summary: "General feedback",
      recommendedAction: "Manual follow-up",
      userResponse: "Thank you for your feedback!"
    };
  }

  const savedReview = await Review.create({
    rating,
    review,
    summary: aiData.summary,
    recommendedAction: aiData.recommendedAction,
    aiResponse: aiData.userResponse
  });

  res.json(savedReview);
});

/* GET: Admin Fetch */
router.get("/reviews", async (_, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
});

export default router;
