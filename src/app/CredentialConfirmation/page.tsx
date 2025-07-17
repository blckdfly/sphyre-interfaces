'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function CredentialConfirmationPage() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleBack = () => {
        router.push('/CredentialSelection');
    };

    const handleConfirm = async () => {
        setIsProcessing(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Show success message
        alert('Credential shared successfully!');

        // Navigate back to main wallet
        router.push('/SSIWalletIdentity');
    };

    const handleCancel = () => {
        router.push('/SSIWalletIdentity');
    };

    if (!mounted) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <p className="text-black">Loading...</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white px-4 py-4 flex items-center border-b border-gray-200">
                <button onClick={handleBack} className="mr-3">
                    <ArrowLeft size={24} className="text-gray-600" />
                </button>
                <h1 className="text-lg font-medium text-gray-900">Confirm Sharing</h1>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 py-8 flex flex-col">
                <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                        Confirm credential sharing
                    </h2>

                    {/* Selected Credential Preview */}
                    <div className="mb-8">
                        <div className="relative overflow-hidden rounded-2xl">
                            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white relative">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 bg-blue-500/10">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="font-semibold text-lg mb-1">Lumera Employee Badge</h3>
                                    <p className="text-sm opacity-90 mb-4">Lumera Labs</p>

                                    {/* Bottom Icons */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                                <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                                            </div>
                                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                                <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                                            </div>
                                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                                <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                                            </div>
                                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                                <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sharing Information */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Information being shared:</h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <CheckCircle size={16} className="text-green-500 mr-3" />
                                <span className="text-gray-700">Age verification (over 21)</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle size={16} className="text-green-500 mr-3" />
                                <span className="text-gray-700">Employee status</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle size={16} className="text-green-500 mr-3" />
                                <span className="text-gray-700">Organization affiliation</span>
                            </div>
                        </div>
                    </div>

                    {/* Requester Information */}
                    <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 mb-6">
                        <h4 className="font-medium text-blue-900 mb-2">Sharing with:</h4>
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-xs font-bold">A</span>
                            </div>
                            <div>
                                <p className="font-medium text-blue-900">Aurora Verifier</p>
                                <p className="text-sm text-blue-700">Trusted credential verifier</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleConfirm}
                        disabled={isProcessing}
                        className={`w-full py-4 rounded-full font-medium text-lg transition-colors ${
                            isProcessing
                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        {isProcessing ? 'Sharing...' : 'Confirm & Share'}
                    </button>
                    <button
                        onClick={handleCancel}
                        className="w-full text-gray-600 py-4 font-medium text-lg hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}