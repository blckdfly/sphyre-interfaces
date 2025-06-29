'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import components
const BottomNav = dynamic(() => import('@/components/ui/BottomNav'), {
    ssr: false
});

export default function SSIWalletActivity() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    // Handle client-side mounting
    useEffect(() => {
        setMounted(true);
    }, []);

    // Handlers
    const handleIdentityClick = () => {
        router.push('/SSIWalletIdentity');
    };

    const handleScanClick = () => {
        router.push('/SSIWalletHome');
    };

    const handleActivityClick = () => {
        console.log('Activity clicked');
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
            <div className="flex-grow flex flex-col bg-white text-black p-4">
                <h2 className="text-lg font-bold mb-4">Recent Activity</h2>

                {/* Activity list would go here */}
                <div className="flex flex-col">
                    {/* You could map through activity items here */}
                    <div className="py-2 border-b border-gray-200">
                        <p className="text-gray-800">No recent activity to display</p>
                    </div>
                </div>

                {/* Empty space to ensure content doesn't get hidden behind bottom nav */}
                <div className="flex-grow"></div>
            </div>

            {/* Bottom Navigation */}
            <div className="w-full">
                <BottomNav
                    onAddClick={handleIdentityClick}
                    onScanClick={handleScanClick}
                    onActivityClick={handleActivityClick}
                    activeTab="activity"
                />
            </div>
        </div>
    );
}