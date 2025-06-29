import React from 'react';
import Image from 'next/image';

interface ProfileBarProps {
    username: string;
}

const ProfileBar: React.FC<ProfileBarProps> = ({ username }) => {
    return (
        <div className="flex items-center">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-300 mr-3">
                <Image
                    src="/api/placeholder/40/40"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover"
                />
            </div>
            <span className="font-medium">@{username}</span>
        </div>
    );
};

export default ProfileBar;