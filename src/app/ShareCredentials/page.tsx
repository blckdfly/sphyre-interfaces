'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import CredentialItem from '@/components/ui/CredentialItem';

export default function ShareCredentials() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleBack = () => {
        router.back();
    };

    const credentials = [
        {
            id: 1,
            title: 'Lemura Employee Badge',
            domain: 'licha.org IDV',
            logo: '/assets/logo-licha.png',
            isOnline: true
        },
        {
            id: 2,
            title: 'NeptuneVisa Clearance VC',
            domain: 'licha.org IDV',
            logo: '/assets/logo-licha.png',
            isOnline: true
        },
        {
            id: 3,
            title: 'Nomadic Access Pass',
            domain: 'licha.org IDV',
            logo: '/assets/logo-licha.png',
            isOnline: true
        }
    ];

    const handleCredentialOptions = (credentialId: number) => {
        console.log(`Options clicked for credential ${credentialId}`);
        // Handle credential options menu
    };

    const handleCredentialClick = (credentialId: number) => {
        console.log(`Credential ${credentialId} clicked`);
        // Handle credential selection/sharing
    };

    if (!mounted) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white px-4 py-4 flex items-center border-b border-gray-200">
                <button
                    onClick={handleBack}
                    className="mr-4 p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <ChevronLeft size={24} className="text-gray-700" />
                </button>
                <h1 className="text-lg font-semibold text-gray-900">Share Credentials</h1>
            </div>

            {/* Description */}
            <div className="px-4 py-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                    You can share your information using the following options.
                </p>
            </div>

            {/* Credentials List */}
            <div className="flex-1 px-4 space-y-4">
                {credentials.map((credential) => (
                    <CredentialItem
                        key={credential.id}
                        id={credential.id}
                        title={credential.title}
                        domain={credential.domain}
                        logo={credential.logo}
                        isOnline={credential.isOnline}
                        onOptionsClick={handleCredentialOptions}
                        onClick={handleCredentialClick}
                    />
                ))}
            </div>
        </div>
    );
}