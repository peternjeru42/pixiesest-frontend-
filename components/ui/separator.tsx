import { cn } from '@/lib/utils';
export const Separator = ({ className, vertical }: { className?: string; vertical?: boolean }) => (
  <div className={cn(vertical ? 'w-px h-full bg-line' : 'h-px w-full bg-line', className)}/>
);
