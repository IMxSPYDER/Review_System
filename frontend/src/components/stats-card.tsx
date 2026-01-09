import type { LucideIcon } from "lucide-react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  icon: LucideIcon
  description?: string
  trend?: {
    value: number
    positive: boolean
  }
  highlight?: "success" | "warning"
}

export function StatsCard({ title, value, icon: Icon, description, trend, highlight }: StatsCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-2xl border-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        highlight === "success" && "bg-gradient-to-br from-success/5 to-success/10 shadow-lg shadow-success/10",
        highlight === "warning" && "bg-gradient-to-br from-warning/5 to-warning/10 shadow-lg shadow-warning/10",
        !highlight && "bg-card shadow-lg shadow-primary/5",
      )}
    >
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold tracking-tight text-foreground">{value}</p>
              {trend && (
                <span
                  className={cn(
                    "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold",
                    trend.positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
                  )}
                >
                  {trend.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {trend.value}
                </span>
              )}
            </div>
            {description && <p className="text-xs font-medium text-muted-foreground">{description}</p>}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
              highlight === "success" && "bg-success/20 shadow-inner",
              highlight === "warning" && "bg-warning/20 shadow-inner",
              !highlight && "bg-primary/10 shadow-inner",
            )}
          >
            <Icon
              className={cn(
                "h-6 w-6",
                highlight === "success" && "text-success",
                highlight === "warning" && "text-warning",
                !highlight && "text-primary",
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
