'use client';

import React from 'react';
import Image from 'next/image';
import { Bell } from 'lucide-react';

interface ProfileBarProps {
    username: string;
}

const ProfileBar: React.FC<ProfileBarProps> = ({ username }) => {
    return (
        <div className="bg-black px-4 pt-6 pb-4 flex items-center justify-between">
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 mr-3">
                    <Image
                        src="/assets/profile.JPG"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="object-cover"
                    />
                </div>
                <span className="text-white font-medium">@{username}</span>
            </div>
            <button className="text-white">
                <Bell size={24} />
            </button>
        </div>
    );
};

export default ProfileBar;