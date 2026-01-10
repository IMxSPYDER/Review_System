import Link from "next/link"
import { FeedbackForm } from "@/components/feedback-form"
import { Sparkles, ArrowRight } from "lucide-react"

export const metadata = {
  title: "FeedbackAI – AI Powered Feedback System",
  description: "Share feedback and get instant AI-powered analysis",
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <nav className="relative border-b border-border/50 bg-card/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                FeedbackAI
              </span>
            </div>
            <Link
              href="/admin"
              className="group flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-all hover:bg-secondary/80 hover:shadow-md"
            >
              Admin Dashboard
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Feedback
          </div>
          <h1 className="mb-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Share Your Experience
          </h1>
          <p className="mx-auto max-w-md text-pretty text-muted-foreground">
            Help us improve with your valuable feedback. Our AI will analyze and respond instantly.
          </p>
        </div>
        <FeedbackForm />
      </div>
    </main>
  )
}
