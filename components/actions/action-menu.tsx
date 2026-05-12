'use client';
import * as React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Dropdown, DropdownItem, DropdownSeparator } from '@/components/ui/dropdown';
import { Button } from '@/components/ui/button';

export type ActionItem = { id: string; label: string; icon?: React.ReactNode; danger?: boolean } | 'divider';

export function ActionMenu({ items, onSelect }: { items: ActionItem[]; onSelect: (id: string) => void }) {
  return (
    <Dropdown trigger={<Button size="icon" variant="ghost"><MoreHorizontal size={14}/></Button>}>
      {items.map((it, i) => it === 'divider'
        ? <DropdownSeparator key={i}/>
        : <DropdownItem key={i} icon={it.icon} danger={it.danger} onClick={() => onSelect(it.id)}>{it.label}</DropdownItem>)}
    </Dropdown>
  );
}
