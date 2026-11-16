'use client';

import * as React from 'react';
import { backgroundUploadManager } from './background-upload-manager';

export function useBackgroundUploads() {
  return React.useSyncExternalStore(
    backgroundUploadManager.subscribe,
    backgroundUploadManager.getSnapshot,
    backgroundUploadManager.getServerSnapshot,
  );
}
