'use client';

import { useEffect } from 'react';
import { captureTrackingParams } from '@/lib/tracking';

export function TrackingInitializer() {
  useEffect(() => {
    captureTrackingParams();
  }, []);

  return null;
}
