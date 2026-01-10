import { fetchReviews } from "@/lib/api"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function AdminPage() {
  const reviews = await fetchReviews()

  export const metadata = {
  title: "FeedbackAI – AI Admin Panel",
  description: "Share feedback and get instant AI-powered analysis",
}

  // map backend → UI model
  const mappedReviews = reviews.map((r: any) => ({
    id: r._id,
    rating: r.rating,
    review: r.review,
    aiSummary: r.summary,
    aiAction: r.recommendedAction,
    aiResponse: r.aiResponse,
    timestamp: new Date(r.createdAt),
  }))

  return <AdminDashboard initialReviews={mappedReviews} />
}
