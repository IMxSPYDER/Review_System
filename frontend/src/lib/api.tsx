import { Review } from "@/types/review";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function submitReview(data: {
  rating: number;
  review: string;
}): Promise<Review> {
  const res = await fetch(`${BASE_URL}/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Failed to submit review");
  }

  return res.json();
}

export async function fetchReviews(): Promise<Review[]> {
  const res = await fetch(`${BASE_URL}/reviews`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
}
