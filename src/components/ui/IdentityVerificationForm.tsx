'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, Upload } from 'lucide-react';

interface IdentityVerificationFormProps {
    onBack?: () => void;
}

const IdentityVerificationForm: React.FC<IdentityVerificationFormProps> = ({ onBack }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        givenName: '',
        surname: '',
        gender: 'male',
        placeOfBirth: '',
        dateOfBirth: '',
        nationality: '',
        documentImage: null as File | null
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleGenderChange = (gender: 'male' | 'female') => {
        setFormData(prev => ({ ...prev, gender }));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, documentImage: file }));
        }
    };

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        // Navigate back to identity page or show success message
        router.push('/SSIWalletIdentity');
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.push('/SSIWalletIdentity');
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-white px-4 py-4 flex items-center border-b border-gray-200">
                <button onClick={handleBack} className="mr-3">
                    <ArrowLeft size={24} className="text-black" />
                </button>
                <h1 className="text-lg font-semibold text-black">Identity Verification</h1>
            </div>

            {/* Form */}
            <div className="px-4 py-6 space-y-6">
                {/* Given Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-black">Given Name</label>
                    <input
                        type="text"
                        value={formData.givenName}
                        onChange={(e) => handleInputChange('givenName', e.target.value)}
                        className="w-full px-3 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your given name"
                    />
                </div>

                {/* Surname */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-black">Surname</label>
                    <input
                        type="text"
                        value={formData.surname}
                        onChange={(e) => handleInputChange('surname', e.target.value)}
                        className="w-full px-3 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your surname"
                    />
                </div>

                {/* Gender */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-black">Gender</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={() => handleGenderChange('male')}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-black">Male</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={() => handleGenderChange('female')}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-black">Female</span>
                        </label>
                    </div>
                </div>

                {/* Place of Birth */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-black">Place of Birth</label>
                    <input
                        type="text"
                        value={formData.placeOfBirth}
                        onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
                        className="w-full px-3 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your place of birth"
                    />
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-black">Date of Birth</label>
                    <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="w-full px-3 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                        style={{ maxWidth: '100%' }}
                    />
                </div>

                {/* Nationality */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-black">Nationality</label>
                    <input
                        type="text"
                        value={formData.nationality}
                        onChange={(e) => handleInputChange('nationality', e.target.value)}
                        className="w-full px-3 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your nationality"
                    />
                </div>

                {/* Document Image Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-black">
                        Please make sure that the picture you look is clear and sharp
                    </label>
                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="document-upload"
                        />
                        <label
                            htmlFor="document-upload"
                            className="w-full h-40 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            {formData.documentImage ? (
                                <div className="text-center">
                                    <div className="text-green-600 mb-2">
                                        <Upload size={24} />
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {formData.documentImage.name}
                                    </span>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="text-gray-400 mb-2">
                                        <Camera size={32} />
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        Tap to upload document photo
                                    </span>
                                </div>
                            )}
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-4 rounded-full font-medium text-lg hover:bg-blue-700 transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IdentityVerificationForm;
