'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Import component
import ProfileBar from '@/components/ui/ProfileBar';
import IdentityCard from '@/components/ui/IdentityCard';
import ScanActionPopup from '@/components/ui/ScanActionPopup';
import ScanActionPortal from '@/components/ui/ScanActionPortal';

const BottomNav = dynamic(() => import('@/components/ui/BottomNav'), {
  ssr: false,
});

export default function SSIWalletIdentity() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showScanPopup, setShowScanPopup] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleIdentityClick = () => {
    console.log('Identity selected');
  };

  const handleActivityClick = () => {
    router.push('/SSIWalletActivity');
  };

  const handleRequestCollect = () => {
    setShowScanPopup(false);
    console.log('Respond or Collect clicked');
  };

  const handleShareInPerson = () => {
    setShowScanPopup(false);
    console.log('Share In-Person clicked');
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-screen bg-white">
        {/* Header */}
        <ProfileBar username="blackdoffly" />

        {/* Main content */}
        <div className="flex-grow px-4 pt-6 pb-24 bg-[#f5f8ff]">
          <div className="mb-6">
            <div className="relative w-full h-44 rounded-2xl bg-[#0D2B6B] text-white shadow-lg overflow-hidden p-4">
              <div className="absolute inset-0 opacity-10">
                <Image
                  src="/assets/lumera-badge.png"
                  alt="Background Texture"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </div>
              <div className="relative z-10">
                <p className="text-sm font-semibold">Lumera Employee Badge</p>
                <p className="text-xs mb-4">Lumera Labs</p>
              </div>
              <div className="absolute bottom-3 right-4 z-10 flex items-center gap-2">
                <Image
                  src="/sphyre-logo.svg"
                  alt="Sphyre"
                  width={20}
                  height={20}
                />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>
          </div>

          {/* Add New Data */}
          <div className="w-full bg-white border border-gray-300 rounded-xl p-4 mb-6 flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Plus size={20} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium">Add new data</p>
                <p className="text-xs text-gray-500">
                  Select which type of data you’d like to add
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-md font-semibold mb-2">Identity Statistic</h2>
          <IdentityCard
            title="Active Credentials"
            onClick={() => console.log('Active Credentials clicked')}
          />
          <IdentityCard
            title="Access Requests"
            onClick={() => console.log('Access Requests clicked')}
          />
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-10">
          <BottomNav
            onAddClick={handleIdentityClick}
            onScanToggle={() => setShowScanPopup(true)}
            onActivityClick={handleActivityClick}
            activeTab="identity"
          />
        </div>
      </div>

      {/* Always on top via Portal */}
      <ScanActionPortal>
        <ScanActionPopup
          visible={showScanPopup}
          onClose={() => setShowScanPopup(false)}
          onRequestCollect={handleRequestCollect}
          onShareInPerson={handleShareInPerson}
        />
      </ScanActionPortal>
    </>
  );
}