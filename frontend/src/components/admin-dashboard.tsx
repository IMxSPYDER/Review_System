"use client"

import { useState, useEffect } from "react"
import { fetchReviews } from "@/lib/api"
import Link from "next/link"
import {
  RefreshCw,
  Star,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  Filter,
  Sparkles,
  LayoutDashboard,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReviewCard } from "@/components/review-card"
import { StatsCard } from "@/components/stats-card"
import { cn } from "@/lib/utils"

export function AdminDashboard({ initialReviews }: { initialReviews: any[] }) {
  const [reviews, setReviews] = useState(initialReviews)
  const [filterRating, setFilterRating] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const filteredReviews =
    filterRating === "all"
      ? reviews
      : reviews.filter((r) => r.rating === Number(filterRating))

  const stats = {
    total: reviews.length,
    average: reviews.length
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "0",
    fiveStars: reviews.filter((r) => r.rating === 5).length,
    lowRatings: reviews.filter((r) => r.rating <= 2).length,
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)

    const fresh = await fetchReviews()
    setReviews(
      fresh.map((r: any) => ({
        id: r._id,
        rating: r.rating,
        review: r.review,
        aiSummary: r.summary,
        aiAction: r.recommendedAction,
        aiResponse: r.aiResponse,
        timestamp: new Date(r.createdAt),
      }))
    )

    setLastRefresh(new Date())
    setIsRefreshing(false)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh((prev) => prev)
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  /* ⬇️ EVERYTHING BELOW IS 100% UI — UNCHANGED */
  return (
     <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-60 -top-60 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-success/5 blur-3xl" />
        <div className="absolute -bottom-40 left-1/2 h-80 w-80 rounded-full bg-warning/5 blur-3xl" />
      </div>

      <header className="sticky top-0 z-10 border-b border-border/50 bg-card/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold tracking-tight text-foreground">FeedbackAI</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
                Updated {lastRefresh.toLocaleTimeString()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="rounded-xl border-2 bg-transparent font-medium transition-all hover:bg-muted"
              >
                <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
                <span className="ml-2 hidden sm:inline">Refresh</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <TrendingUp className="h-3.5 w-3.5" />
            Analytics Overview
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Feedback Dashboard</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Monitor and manage customer feedback with AI-powered insights
          </p>
        </div>

        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Reviews"
            value={stats.total.toString()}
            icon={MessageSquare}
            description="All time feedback"
          />
          <StatsCard
            title="Average Rating"
            value={stats.average}
            icon={TrendingUp}
            description="Based on all reviews"
            trend={{ value: 0.3, positive: true }}
          />
          <StatsCard
            title="5-Star Reviews"
            value={stats.fiveStars.toString()}
            icon={Star}
            description={`${((stats.fiveStars / stats.total) * 100).toFixed(0)}% of total`}
            highlight="success"
          />
          <StatsCard
            title="Low Ratings"
            value={stats.lowRatings.toString()}
            icon={AlertTriangle}
            description="Needs attention"
            highlight="warning"
          />
        </div>

        <Card className="mb-8 overflow-hidden rounded-2xl border-0 bg-card shadow-lg shadow-primary/5">
          <CardContent className="flex flex-wrap items-center gap-4 py-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                <Filter className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">Filters</span>
            </div>
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-[180px] rounded-xl border-2 font-medium">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
            {filterRating !== "all" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilterRating("all")}
                className="font-medium text-muted-foreground hover:text-foreground"
              >
                Clear filter
              </Button>
            )}
            <span className="ml-auto rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
              {filteredReviews.length} of {reviews.length} reviews
            </span>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-5">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} style={{ animationDelay: `${index * 50}ms` }} />
            ))
          ) : (
            <Card className="overflow-hidden rounded-2xl border-0 bg-card shadow-lg">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground">No reviews found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {filterRating !== "all"
                    ? `No ${filterRating}-star reviews available`
                    : "No reviews have been submitted yet"}
                </p>
                {filterRating !== "all" && (
                  <Button
                    variant="outline"
                    onClick={() => setFilterRating("all")}
                    className="mt-4 rounded-xl font-medium"
                  >
                    Show all reviews
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
