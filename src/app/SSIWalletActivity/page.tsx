'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import ProfileBar from '@/components/ui/ProfileBar';
import ScanActionPopup from '@/components/ui/ScanActionPopup';
import ScanActionPortal from '@/components/ui/ScanActionPortal'; // ← penting!

const BottomNav = dynamic(() => import('@/components/ui/BottomNav'), {
  ssr: false,
});

export default function SSIWalletActivity() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showScanPopup, setShowScanPopup] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleIdentityClick = () => {
    router.push('/SSIWalletIdentity');
  };

  const handleActivityClick = () => {
    console.log('Activity clicked');
  };

  const handleRequestCollect = () => {
    setShowScanPopup(false);
    console.log('Respond or Collect clicked');
  };

  const handleShareInPerson = () => {
    setShowScanPopup(false);
    router.push('/ShareCredentials');
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
        {/* Profile Bar */}
        <ProfileBar username="blackdoffly" />

        {/* Main content */}
        <div className="flex-grow px-4 pt-6 pb-24 bg-white">
          <h2 className="text-lg font-bold mb-4 text-black">Recent Activity</h2>
          <div className="flex flex-col">
            <div className="py-2 border-b border-gray-200">
              <p className="text-gray-800">No recent activity to display</p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-10">
          <BottomNav
            onAddClick={handleIdentityClick}
            onScanToggle={() => setShowScanPopup(true)}
            onActivityClick={handleActivityClick}
            activeTab="activity"
          />
        </div>
      </div>

      {/* ScanActionPopup di luar DOM utama via Portal */}
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