import * as React from 'react';
import { cn } from '@/lib/utils';
export const Table = ({ className, ...p }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-x-auto"><table className={cn('w-full text-sm', className)} {...p}/></div>
);
export const THead = (p: React.HTMLAttributes<HTMLTableSectionElement>) => <thead {...p}/>;
export const TBody = (p: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...p}/>;
export const TR = ({ className, ...p }: React.HTMLAttributes<HTMLTableRowElement>) => <tr className={cn('hover:bg-panel/60', className)} {...p}/>;
export const TH = ({ className, ...p }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn('text-left py-3 px-3.5 mono text-[10px] uppercase tracking-wider text-muted border-b border-line', className)} {...p}/>
);
export const TD = ({ className, ...p }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn('py-3.5 px-3.5 border-b border-line align-middle', className)} {...p}/>
);
