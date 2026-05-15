import type {
  Folder, Collection, Set, Media, FavoriteList, DownloadLog,
  ActivityEvent, Photographer,
} from './types';
import { unsplash } from './utils';

const PHOTOS = {
  ceremony: [
    'photo-1519741497674-611481863552','photo-1465495976277-4387d4b0b4c6',
    'photo-1606490194859-07c18c9f0968','photo-1511795409834-ef04bbd61622',
    'photo-1525772764200-be829a350797','photo-1583939003579-730e3918a45a',
    'photo-1519225421980-715cb0215aed','photo-1537633552985-df8429e8048b',
    'photo-1542042161-4ec92e64b56e','photo-1591604466107-ec97de577aff',
    'photo-1525258946800-98cfd641d0de','photo-1469371670807-013ccf25f16a',
  ],
  portraits: [
    'photo-1494578379344-d6c710782a3d','photo-1469371670807-013ccf25f16a',
    'photo-1525772764200-be829a350797','photo-1583939003579-730e3918a45a',
    'photo-1525258946800-98cfd641d0de','photo-1606800052052-a08af7148866',
    'photo-1546195643-70f48f9c5b87','photo-1591604466107-ec97de577aff',
    'photo-1591604129939-f1efa4d9f7fa','photo-1519741497674-611481863552',
  ],
  details: [
    'photo-1606216794074-735e91aa2c92','photo-1551892589-865f69869476',
    'photo-1519225421980-715cb0215aed','photo-1606490194859-07c18c9f0968',
    'photo-1519741497674-611481863552','photo-1532712938310-34cb3982ef74',
    'photo-1591608971362-f08b2a75731a','photo-1606800052052-a08af7148866',
  ],
  reception: [
    'photo-1464366400600-7168b8af9bc3','photo-1525772764200-be829a350797',
    'photo-1469371670807-013ccf25f16a','photo-1583939003579-730e3918a45a',
    'photo-1511795409834-ef04bbd61622','photo-1465495976277-4387d4b0b4c6',
    'photo-1591604466107-ec97de577aff','photo-1525258946800-98cfd641d0de',
  ],
};

function makeMedia(photoId: string, setId: string, collectionId: string, idx: number,
                   faved=false, isPrivate=false): Media {
  return {
    id: `${collectionId}-${setId}-${idx}`,
    filename: `LUMEN_${String(1000 + idx).padStart(4,'0')}.jpg`,
    src: unsplash(photoId, 1600),
    thumb: unsplash(photoId, 480),
    width: 1600,
    height: idx % 3 === 0 ? 2000 : 1067,
    sizeMB: parseFloat((4 + (idx * 0.13) % 5).toFixed(1)),
    type: idx % 11 === 0 ? 'video' : 'photo',
    status: 'ready',
    durationSec: idx % 11 === 0 ? 18 + idx : undefined,
    faved,
    private: isPrivate,
    downloadable: true,
    setId,
    collectionId,
    uploadedAt: '2026-05-04T10:00:00Z',
    camera: { make: 'Sony', model: 'A7R V', lens: '50mm f/1.4 GM', iso: 400, shutter: '1/250', aperture: 'f/2.0' },
  };
}

export const SETS: Record<string, Set> = {
  ceremony:  { id: 'ceremony',  title: 'Ceremony',         cover: unsplash(PHOTOS.ceremony[0], 1200),  visibility: 'public', photoCount: 124, videoCount: 1, videoDurationSec: 22, order: 1 },
  portraits: { id: 'portraits', title: 'Couple Portraits', cover: unsplash(PHOTOS.portraits[0], 1200), visibility: 'public', photoCount: 96,  videoCount: 0, videoDurationSec: 0,  order: 2 },
  details:   { id: 'details',   title: 'Details',          cover: unsplash(PHOTOS.details[0], 1200),   visibility: 'public', photoCount: 78,  videoCount: 0, videoDurationSec: 0,  order: 3 },
  reception: { id: 'reception', title: 'Reception',        cover: unsplash(PHOTOS.reception[0], 1200), visibility: 'client', photoCount: 118, videoCount: 3, videoDurationSec: 78, order: 4 },
};

export const SET_MEDIA: Record<string, Media[]> = {
  ceremony:  PHOTOS.ceremony.map((p, i)  => makeMedia(p, 'ceremony',  'c1', i+1, i===2 || i===5)),
  portraits: PHOTOS.portraits.map((p, i) => makeMedia(p, 'portraits', 'c1', i+1, i===0 || i===1 || i===7)),
  details:   PHOTOS.details.map((p, i)   => makeMedia(p, 'details',   'c1', i+1, i===3, i===6)),
  reception: PHOTOS.reception.map((p, i) => makeMedia(p, 'reception', 'c1', i+1)),
};

export const ALL_MEDIA: Media[] = Object.values(SET_MEDIA).flat();

export const FOLDERS: Folder[] = [
  { id: 'f1', slug: 'weddings-2026', name: 'Weddings 2026',  cover: unsplash(PHOTOS.ceremony[2], 1200), collectionsCount: 1, hasPassword: false, showOnHomepage: true,  createdAt: '2026-01-04', description: 'All wedding galleries for 2026.' },
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'c1', slug: 'amelia-james', title: 'Amelia & James',
    couple: 'Amelia & James',
    venue: 'Sunstone Villa · Sonoma, California',
    description: 'A summer wedding in Sonoma. Light film, small moments.',
    date: 'May 4, 2026',
    cover: unsplash(PHOTOS.ceremony[2], 1600),
    folderId: 'f1', folderName: 'Weddings 2026',
    status: 'published',
    password: 'amelia26',
    downloadPin: '4827',
    counts: { photos: 412, videos: 4, videoDurationSec: 142, favorites: 38, downloads: 142, views: 1284, sets: 4 },
    sets: Object.values(SETS),
    createdAt: '2026-05-04',
  },
];

export const FAVORITE_LISTS: FavoriteList[] = [
  { id: 'fv1', clientName: 'Amelia Trent', clientEmail: 'amelia.t@gmail.com', collectionId: 'c1', collectionTitle: 'Amelia & James', status: 'submitted', mediaIds: ALL_MEDIA.slice(0, 38).map(m => m.id), notes: [
    { mediaId: ALL_MEDIA[0].id, text: 'Can we get this one bigger? Maybe a print for above the mantle.' },
    { mediaId: ALL_MEDIA[3].id, text: 'My grandmother loves this one.' },
    { mediaId: ALL_MEDIA[7].id, text: 'Black and white version please?' },
    { mediaId: ALL_MEDIA[12].id, text: 'For the album cover.' },
  ], shareToken: 'sh_amelia_38', updatedAt: 'Today' },
  { id: 'fv2', clientName: 'James Harlow', clientEmail: 'james.harlow@me.com', collectionId: 'c1', collectionTitle: 'Amelia & James', status: 'active', mediaIds: ALL_MEDIA.slice(0, 22).map(m => m.id), notes: [{ mediaId: ALL_MEDIA[5].id, text: 'Send to my parents.' }], shareToken: 'sh_james_22', updatedAt: 'Today' },
];

export const DOWNLOAD_LOGS: DownloadLog[] = [
  { id: 'd1', clientEmail: 'amelia.t@gmail.com', collectionId: 'c1', collectionTitle: 'Amelia & James', fileLabel: 'Ceremony · ZIP',  type: 'gallery',   sizeMB: 1200, status: 'complete',  date: 'Today, 11:14' },
  { id: 'd2', clientEmail: 'james.harlow@me.com', collectionId: 'c1', collectionTitle: 'Amelia & James', fileLabel: 'LUMEN_0212.jpg', type: 'original',  sizeMB: 8.4,  status: 'complete',  date: 'Today, 10:02' },
  { id: 'd6', clientEmail: 'j.harlow@me.com', collectionId: 'c1', collectionTitle: 'Amelia & James', fileLabel: 'Portraits · ZIP', type: 'gallery',   sizeMB: 744, status: 'failed', date: 'May 8' },
];

export const ACTIVITY: ActivityEvent[] = [
  { id: 'a1', type: 'favorite', actor: 'amelia.t@gmail.com', target: 'Amelia & James', note: 'Added 38 favorites', collectionId: 'c1', time: '2 min ago' },
  { id: 'a2', type: 'download', actor: 'james.harlow@me.com', target: 'Amelia & James / Ceremony', note: 'Downloaded gallery ZIP · 1.2 GB', collectionId: 'c1', time: '14 min ago' },
  { id: 'a4', type: 'comment', actor: 'amelia.t@gmail.com', target: 'LUMEN_0212.jpg', note: 'Left a note: "Can we get this one bigger?"', collectionId: 'c1', time: '2 hr ago' },
  { id: 'a9', type: 'view', actor: 'guest', target: 'Amelia & James', note: 'Viewed gallery (4 min)', collectionId: 'c1', time: '3 days ago' },
];

export const PHOTOGRAPHER: Photographer = {
  id: 'p1',
  email: 'mara@lumen.studio',
  displayName: 'Mara Lin',
  businessName: 'Lumen Studio',
  bio: 'Wedding & editorial photographer based in Sonoma. Available for travel worldwide. Light, film, and small moments.',
  website: 'lumen.studio',
  instagram: '@lumen.studio',
  phone: '+1 (415) 555-0184',
  avatar: unsplash('photo-1438761681033-6461ffad8d80', 200),
  storage: { usedGB: 312, totalGB: 500, originalsGB: 244, previewsGB: 48, thumbsGB: 20 },
};

export const STUDIO_STATS = {
  photos: 412, videos: 4, videoDurationSec: 142,
  collections: 1, folders: 1, sets: 4,
  downloads: 142, favoriteLists: 2, views: 1284,
};
