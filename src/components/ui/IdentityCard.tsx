'use client';

import React from 'react';

interface CredentialCardProps {
    title: string;
    onClick?: () => void;
}

const IdentityCard: React.FC<CredentialCardProps> = ({ title, onClick }) => {
    return (
        <div
            className="bg-gray-200 p-4 rounded-md mb-4 cursor-pointer"
            onClick={onClick}
        >
            <p className="font-medium">{title}</p>
        </div>
    );
};

export default IdentityCard;