import { Skeleton } from '@/components/ui/skeleton';

/**
 * Loading 페이지 (Server Component)
 * Suspense fallback으로 사용
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Skeleton */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <div className="hidden md:flex items-center space-x-8">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Skeleton */}
        <section className="min-h-screen flex items-center justify-center pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Skeleton className="h-16 w-full max-w-2xl" />
                <Skeleton className="h-16 w-full max-w-2xl" />
                <Skeleton className="h-24 w-full max-w-2xl" />
                <div className="flex gap-4">
                  <Skeleton className="h-11 w-32" />
                  <Skeleton className="h-11 w-32" />
                </div>
              </div>
              <div className="relative w-full max-w-md mx-auto">
                <Skeleton className="w-full aspect-square rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Skeleton */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-48 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 rounded-xl border bg-card">
                  <Skeleton className="h-7 w-32 mx-auto mb-6" />
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <Skeleton key={j} className="h-8 w-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
