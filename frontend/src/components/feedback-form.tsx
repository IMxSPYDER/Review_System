"use client"

import { useState } from "react"
import { Star, Bot, CheckCircle2, Loader2, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { submitReview } from "@/lib/api"

const MAX_CHARS = 500

export function FeedbackForm() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [aiResponse, setAiResponse] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    if (!review.trim()) {
      setError("Please write a review before submitting")
      return
    }
    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    setError("")
    setIsSubmitting(true)
    setIsLoadingAI(true)

    try {
      const savedReview = await submitReview({
        rating,
        review,
      })

      // Backend AI response
      setAiResponse(savedReview.aiResponse)

      setSubmitted(true)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
      setIsLoadingAI(false)
    }
  }

  const handleReset = () => {
    setRating(0)
    setHoveredRating(0)
    setReview("")
    setSubmitted(false)
    setAiResponse("")
    setError("")
  }

  const displayRating = hoveredRating || rating

  const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"]
  const ratingColors = [
    "",
    "text-rating-bad",
    "text-rating-poor",
    "text-rating-neutral",
    "text-rating-good",
    "text-rating-excellent",
  ]

  return (
    <div className="w-full max-w-md space-y-4">
      <Card className="relative overflow-hidden rounded-3xl border-0 bg-card shadow-xl shadow-primary/5">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-px rounded-[23px] bg-card" />

        <CardHeader className="relative z-10 pb-2 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Share Your Feedback
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            We'd love to hear about your experience
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10 space-y-6">
          {!submitted ? (
            <>
              {/* Rating */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">
                  How was your experience?
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className={cn(
                        "group rounded-xl p-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        star <= displayRating
                          ? "scale-110 bg-star-active/10"
                          : "hover:bg-muted",
                      )}
                    >
                      <Star
                        className={cn(
                          "h-8 w-8 transition-all duration-200",
                          star <= displayRating
                            ? "fill-star-active text-star-active drop-shadow-sm"
                            : "fill-transparent text-star-inactive group-hover:text-star-active/50",
                        )}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p
                    className={cn(
                      "text-center text-sm font-medium transition-colors",
                      ratingColors[rating],
                    )}
                  >
                    {ratingLabels[rating]}
                  </p>
                )}
              </div>

              {/* Review */}
              <div className="space-y-2">
                <label htmlFor="review" className="text-sm font-semibold text-foreground">
                  Tell us more
                </label>
                <Textarea
                  id="review"
                  placeholder="Share the details of your experience..."
                  value={review}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_CHARS) {
                      setReview(e.target.value)
                      setError("")
                    }
                  }}
                  className="min-h-[130px] resize-none rounded-2xl border-border/50 bg-muted/30 transition-all focus:border-primary/50 focus:bg-background"
                />
                <div className="flex items-center justify-end">
                  <span
                    className={cn(
                      "text-xs font-medium tabular-nums",
                      review.length >= MAX_CHARS
                        ? "text-destructive"
                        : "text-muted-foreground",
                    )}
                  >
                    {review.length}/{MAX_CHARS}
                  </span>
                </div>
              </div>

              {error && (
                <p className="text-sm font-medium text-destructive animate-in fade-in slide-in-from-top-1">
                  {error}
                </p>
              )}

              {/* Submit */}
              <Button
                onClick={handleSubmit}
                disabled={!review.trim() || rating === 0 || isSubmitting}
                className="w-full rounded-2xl bg-gradient-to-r from-primary to-primary/90 py-6 text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 cursor-pointer"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </>
          ) : (
            /* Success */
            <div className="space-y-6 py-4 text-center animate-in fade-in slide-in-from-bottom-2">
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-success/20" />
                <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-success to-success/80 shadow-lg shadow-success/30">
                  <CheckCircle2 className="h-10 w-10 text-success-foreground" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground">Thank You!</h3>
                <p className="mt-1 text-muted-foreground">
                  Your feedback has been submitted successfully
                </p>
              </div>

              <div className="flex justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-6 w-6",
                      star <= rating
                        ? "fill-star-active text-star-active"
                        : "fill-transparent text-star-inactive",
                    )}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                onClick={handleReset}
                className="rounded-2xl border-2 bg-transparent px-6 font-semibold transition-all hover:bg-muted"
              >
                Submit Another Review
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Response */}
      {submitted && (
        <Card className="relative overflow-hidden rounded-3xl border-0 bg-card shadow-xl shadow-primary/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <div className="absolute inset-px rounded-[23px] bg-card" />

          <CardContent className="relative z-10 pt-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-foreground">AI Response</p>
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </div>

                {isLoadingAI ? (
                  <div className="space-y-2.5 pt-1">
                    <div className="h-4 w-full animate-pulse rounded-lg bg-muted" />
                    <div className="h-4 w-4/5 animate-pulse rounded-lg bg-muted" />
                    <div className="h-4 w-3/5 animate-pulse rounded-lg bg-muted" />
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {aiResponse}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
