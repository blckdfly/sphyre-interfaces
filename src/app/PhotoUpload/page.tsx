'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Camera, Upload, Check } from 'lucide-react';

export default function PhotoUploadPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [documentImage, setDocumentImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [verificationMethod, setVerificationMethod] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    // Retrieve form data from sessionStorage
    const storedFormData = sessionStorage.getItem('identity_verification_form');
    if (storedFormData) {
      try {
        const parsedData = JSON.parse(storedFormData);
        if (parsedData.verificationMethod) {
          setVerificationMethod(parsedData.verificationMethod);
        }
        // Note: We can't retrieve the File object from sessionStorage
        // so we'll need to have the user upload it again
      } catch (error) {
        console.error('Error parsing stored form data:', error);
      }
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocumentImage(file);

      // Create a preview URL for the image
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Store the file name in sessionStorage (we can't store the actual File object)
      const storedFormData = sessionStorage.getItem('identity_verification_form');
      const formData = storedFormData ? JSON.parse(storedFormData) : {};
      formData.documentImageName = file.name;
      sessionStorage.setItem('identity_verification_form', JSON.stringify(formData));
    }
  };

  const handleSubmit = async () => {
    if (documentImage) {
      try {
        // In a real implementation, you would upload the image to a server here

        // Check if we have a pending credential offer
        const pendingCredentialOffer = sessionStorage.getItem('credential_offer_pending');

        if (pendingCredentialOffer) {
          console.log('Processing pending credential offer');

          // Retrieve the complete form data
          const formData = sessionStorage.getItem('identity_verification_form');
          if (formData) {
            const parsedFormData = JSON.parse(formData);
            console.log('Accepting credential offer with form data:', parsedFormData);

            // Show loading state or spinner here

            // Simulate API call to accept credential
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Clear the credential offers from sessionStorage
            sessionStorage.removeItem('credential_offer');
            sessionStorage.removeItem('credential_offer_pending');

            alert('Credential accepted successfully!');
          }
        } else {
          // Regular form submission without credential offer
          console.log('Identity verification completed successfully');
          alert('Identity verification submitted successfully!');
        }

        // Clear form data from sessionStorage
        sessionStorage.removeItem('identity_verification_form');

        // Navigate back to the identity page
        router.push('/SSIWalletIdentity');
      } catch (error) {
        console.error('Error processing submission:', error);
        alert('There was an error processing your submission. Please try again.');
      }
    }
  };

  const handleBack = () => {
    router.push('/VerificationMethodSelection');
  };

  const getDocumentTypeName = () => {
    switch (verificationMethod) {
      case 'passport':
        return 'Passport';
      case 'driverLicense':
        return 'Driver License';
      case 'identityCard':
        return 'Identity Card';
      case 'residencePermit':
        return 'Residence Permit';
      default:
        return 'Document';
    }
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-black">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center border-b border-gray-200">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft size={24} className="text-black" />
        </button>
        <h1 className="text-lg font-semibold text-black">Upload Document Photo</h1>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        <h2 className="text-xl font-semibold text-black text-center">
          Upload Your {getDocumentTypeName()} Photo
        </h2>

        <p className="text-gray-600 text-center">
          Please make sure that the picture is clear and all information is readable
        </p>

        {/* Document Image Upload */}
        <div className="space-y-4">
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
              className={`w-full h-60 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
                previewUrl 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-300 bg-gray-100 hover:bg-gray-50'
              }`}
            >
              {previewUrl ? (
                <div className="relative w-full h-full p-2">
                  <Image 
                    src={previewUrl} 
                    alt="Document preview"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                    <Check size={16} />
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-gray-400 mb-2">
                    <Camera size={48} />
                  </div>
                  <span className="text-sm text-gray-500 block mb-1">
                    Tap to upload {getDocumentTypeName().toLowerCase()} photo
                  </span>
                  <span className="text-xs text-gray-400">
                    Supported formats: JPG, PNG
                  </span>
                </div>
              )}
            </label>
          </div>

          {documentImage && (
            <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center">
                <div className="text-green-600 mr-2">
                  <Upload size={20} />
                </div>
                <span className="text-sm text-gray-700 truncate max-w-[200px]">
                  {documentImage.name}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {(documentImage.size / 1024).toFixed(0)} KB
              </span>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-blue-800 font-medium mb-2">Tips for a good photo:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Ensure all text is clearly visible</li>
            <li>• Make sure the entire document is in the frame</li>
            <li>• Avoid glare or shadows on the document</li>
            <li>• Take the photo in good lighting</li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            className={`w-full py-4 rounded-full font-medium text-lg transition-colors ${
              documentImage
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!documentImage}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
