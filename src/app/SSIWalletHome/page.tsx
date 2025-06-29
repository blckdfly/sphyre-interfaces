// app/SSIWalletHome/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { QrCode, Zap, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Use the App Router's useRouter
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import the BottomNav component with ssr disabled
const BottomNav = dynamic(() => import('@/components/ui/BottomNav'), {
    ssr: false
});

export default function SSIWalletHome() {
    const [showActions, setShowActions] = useState(true);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    // Handle client-side mounting
    useEffect(() => {
        setMounted(true);
    }, []);

    // Handlers
    const handleRequestCollect = () => {
        console.log('Request or Collect clicked');
    };

    const handleShareInPerson = () => {
        console.log('Share In-Person clicked');
    };

    const handleIdentityClick = () => {
        router.push('/SSIWalletIdentity');
    };

    const handleScanClick = () => {
        setShowActions(!showActions);
        console.log('Scan clicked, actions toggled');
    };

    const handleActivityClick = () => {
        router.push('/SSIWalletActivity');
    };

    // Only render the component content on the client side
    if (!mounted) {
        return <div className="flex items-center justify-center h-screen bg-black">
            <p className="text-white">Loading...</p>
        </div>;
    }

    return (
        <div className="flex flex-col h-screen bg-black text-white">
            {/* Header */}
            <div className="bg-blue-600 p-4 flex items-center justify-between rounded-b-3xl">
                <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-300 mr-3">
                        <Image
                            src="/assets/profile.JPG"
                            alt="Profile"
                            width={40}
                            height={40}
                            className="object-cover"
                        />
                    </div>
                    <span className="font-medium">@blackdoffly</span>
                </div>
                <button className="text-white mr-2">
                    <Bell size={24} />
                </button>
            </div>

            {/* Main content */}
            <div className="flex-grow flex flex-col bg-white">
                {/* Empty space in the middle */}
                <div className="flex-grow"></div>

                {/* Action Buttons */}
                {showActions && (
                    <div className="bg-blue-600 p-4 rounded-t-3xl">
                        <div className="flex justify-between items-center">
                            <div
                                className="flex flex-col items-center border-r border-blue-400 pr-6 cursor-pointer text-white"
                                onClick={handleRequestCollect}
                            >
                                <QrCode size={24} className="mb-2" />
                                <span className="text-xs text-center">Respond or Collect</span>
                            </div>
                            <div
                                className="flex flex-col items-center pl-6 cursor-pointer text-white"
                                onClick={handleShareInPerson}
                            >
                                <Zap size={24} className="mb-2" />
                                <span className="text-xs text-center">Share In-Person</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Navigation */}
            <div className="w-full">
                <BottomNav
                    onAddClick={handleIdentityClick}
                    onScanClick={handleScanClick}
                    onActivityClick={handleActivityClick}
                    activeTab="scan"
                />
            </div>
        </div>
    );
}