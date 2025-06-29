'use client';

import React from 'react';
import { Wallet, Scan, ActivitySquare } from 'lucide-react';

interface BottomNavProps {
    onAddClick: () => void;
    onScanClick: () => void;
    onActivityClick: () => void;
    activeTab?: 'identity' | 'scan' | 'activity';
}

const BottomNav: React.FC<BottomNavProps> = ({onAddClick, onScanClick, onActivityClick, activeTab = 'identity',}) => {
    return (
        <div className="relative teal py-3 flex justify-between items-center px-8 text-white">
            {/* Identity */}
            <div
                onClick={onAddClick}
                className="flex flex-col items-center cursor-pointer"
            >
                <Wallet
                    size={24}
                    className={`${activeTab === 'identity' ? 'text-black' : 'text-black/50'}`}
                />
                <span className={`text-xs mt-1 ${activeTab === 'identity' ? 'text-black' : 'text-black/50'}`}>
                    Identity
                </span>
            </div>

            {/* Scan (center FAB style) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-3">
                <div
                    onClick={onScanClick}
                    className="bg-blue-600 rounded-full w-14 h-14 flex items-center justify-center cursor-pointer shadow-lg"
                >
                    <Scan size={28} className="text-white" />
                </div>
            </div>

            {/* Activity */}
            <div
                onClick={onActivityClick}
                className="flex flex-col items-center cursor-pointer"
            >
                <ActivitySquare
                    size={24}
                    className={`${activeTab === 'activity' ? 'text-black' : 'text-black/50'}`}
                />
                <span className={`text-xs mt-1 ${activeTab === 'activity' ? 'text-black' : 'text-black/50'}`}>
                    Activity
                </span>
            </div>
        </div>
    );
};

export default BottomNav;