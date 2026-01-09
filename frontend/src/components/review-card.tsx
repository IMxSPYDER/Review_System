import type React from "react"
import { Star, Bot, Clock, ArrowRight, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Review {
  id: string
  rating: number
  review: string
  aiSummary: string
  aiAction: string
  timestamp: Date
}

interface ReviewCardProps {
  review: Review
  style?: React.CSSProperties
}

function getRatingColor(rating: number) {
  if (rating === 5) return "from-rating-excellent to-rating-excellent/80"
  if (rating === 4) return "from-rating-good to-rating-good/80"
  if (rating === 3) return "from-rating-neutral to-rating-neutral/80"
  if (rating === 2) return "from-rating-poor to-rating-poor/80"
  return "from-rating-bad to-rating-bad/80"
}

function getRatingBg(rating: number) {
  if (rating === 5) return "bg-rating-excellent/5"
  if (rating === 4) return "bg-rating-good/5"
  if (rating === 3) return "bg-rating-neutral/5"
  if (rating === 2) return "bg-rating-poor/5"
  return "bg-rating-bad/5"
}

function formatTimestamp(date: Date) {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}

export function ReviewCard({ review, style }: ReviewCardProps) {
  return (
    <Card
      className="group relative overflow-hidden rounded-2xl border-0 bg-card shadow-lg shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl animate-in fade-in slide-in-from-bottom-2"
      style={style}
    >
      {/* Gradient left accent border */}
      <div className={cn("absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b", getRatingColor(review.rating))} />

      <CardContent className="pl-6 pt-6">
        <div className="flex flex-col gap-5">
          {/* Header with rating and timestamp */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Star rating with background */}
              <div className={cn("flex items-center gap-1 rounded-xl px-3 py-1.5", getRatingBg(review.rating))}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-4 w-4",
                      star <= review.rating
                        ? "fill-star-active text-star-active"
                        : "fill-transparent text-star-inactive",
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-foreground">{review.rating}.0</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{formatTimestamp(review.timestamp)}</span>
            </div>
          </div>

          {/* Review text */}
          <p className="text-sm leading-relaxed text-foreground">{review.review}</p>

          <div className="space-y-3 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              AI Insights
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">Summary</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{review.aiSummary}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-t border-border/50 pt-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success/10">
                <ArrowRight className="h-4 w-4 text-success" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">Recommended Action</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{review.aiAction}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
