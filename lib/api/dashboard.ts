const PRODUCTION_API_BASE_URL = 'https://pixiesest-backend-production.up.railway.app/api/v1';

function getApiBaseUrl() {
  const configuredUrl = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;
  const fallbackUrl = process.env.NODE_ENV === 'production' ? PRODUCTION_API_BASE_URL : 'http://localhost:8000/api/v1';
  return (configuredUrl ?? fallbackUrl).replace(/\/$/, '');
}

export class DashboardApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'DashboardApiError';
    this.status = status;
  }
}

export type DashboardOverview = {
  user: {
    id: string;
    email: string;
    display_name: string;
    first_name: string;
  };
  stats: {
    photos: number;
    photos_this_month: number;
    videos: number;
    video_duration_seconds: number;
    collections: number;
    published_collections: number;
    active_collections: number;
    folders: number;
    sets: number;
    favorite_lists: number;
    pending_favorite_lists: number;
    downloads: number;
    downloads_this_week: number;
    gallery_views: number;
    gallery_views_this_week: number;
    storage_used_bytes: number;
    storage_limit_bytes: number;
  };
  recent_uploads: Array<{
    id: string;
    filename: string;
    media_type: string;
    status: string;
    thumbnail_url: string;
    created_at: string;
  }>;
  latest_collection: {
    id: string;
    slug: string;
    title: string;
    status: string;
    cover_url: string;
    counts: {
      photos: number;
      videos: number;
      favorites: number;
      downloads: number;
      views: number;
      sets: number;
    };
  } | null;
};

export async function getDashboardOverview(accessToken: string): Promise<DashboardOverview> {
  const response = await fetch(`${getApiBaseUrl()}/dashboard/overview/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new DashboardApiError(response.status, `Dashboard request failed with status ${response.status}`);
  }

  return response.json();
}
