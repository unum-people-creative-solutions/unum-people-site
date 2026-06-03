'use client';

import React from 'react';
import { BrandValues } from '@/components/BrandValues';
import { HeroSection } from '@/components/home/HeroSection';
import { ManifestoSection } from '@/components/home/ManifestoSection';
import { EcosystemSection } from '@/components/home/EcosystemSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { CRMHighlightSection } from '@/components/home/CRMHighlightSection';
import { FinalCTABanner } from '@/components/home/FinalCTABanner';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <ManifestoSection />
      <EcosystemSection />
      <ToolsSection />
      <CRMHighlightSection />
      <BrandValues />
      <FinalCTABanner />
    </div>
  );
}
