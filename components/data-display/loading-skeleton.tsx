import { Skeleton } from '@/components/ui/skeleton';

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border border-line rounded-md overflow-hidden bg-surface">
          <Skeleton className="aspect-[4/3] w-full rounded-none"/>
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-3/4"/>
            <Skeleton className="h-3 w-1/2"/>
          </div>
        </div>
      ))}
    </div>
  );
}

export function MediaGridSkeleton({ count = 16 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
      {Array.from({ length: count }).map((_, i) => <Skeleton key={i} className="aspect-square"/>)}
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="border border-line rounded-md bg-surface divide-y divide-line">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <Skeleton className="h-4 flex-1"/>
          <Skeleton className="h-4 w-24"/>
          <Skeleton className="h-4 w-24"/>
        </div>
      ))}
    </div>
  );
}
