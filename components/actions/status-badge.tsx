import { Badge } from '@/components/ui/badge';
import type { CollectionStatus, SetVisibility, FavoriteStatus, DownloadStatus } from '@/lib/types';

export function StatusBadge({ status }: { status: CollectionStatus | FavoriteStatus | DownloadStatus }) {
  return <Badge tone={status as any}>{status}</Badge>;
}

export function VisibilityBadge({ visibility }: { visibility: SetVisibility }) {
  if (visibility === 'public') return <Badge>Visible</Badge>;
  if (visibility === 'client') return <Badge>🔒 Client only</Badge>;
  return <Badge tone="archived">Hidden</Badge>;
}
