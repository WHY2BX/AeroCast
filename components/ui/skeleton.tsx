// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
    <div className={`${shimmer}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-4">
          <CardSkeleton />
        </div>
        <div className="space-y-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
      </div>
    </>
  );
}

export function ForecastSkeleton() {
  return (
    <div className="p-4">
      <div className="h-5 w-36 bg-gray-200 rounded-md mb-2"></div> {/* Title Skeleton */}
      <div className="space-y-2">
        {/* Table Header Skeleton */}
        <div className="grid grid-cols-3 text-sm text-muted-foreground">
          <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-36 bg-gray-200 rounded-md"></div>
        </div>

        {/* Rows Skeleton */}
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 text-sm">
            <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-12 bg-gray-200 rounded-md"></div>
              <div className="h-6 w-6 bg-gray-200 rounded-full"></div> {/* Icon Placeholder */}
            </div>
            <div className="h-4 w-36 bg-gray-200 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

