'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Camera, AlertCircle } from 'lucide-react';

interface QRScannerProps {
  onClose: () => void;
  onScan?: (data: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onClose, onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [permissionState, setPermissionState] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown');

  // Check camera permission status
  const checkCameraPermission = async () => {
    try {
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'camera' as PermissionName });
        setPermissionState(permission.state);

        // Listen for permission changes
        permission.onchange = () => {
          setPermissionState(permission.state);
          if (permission.state === 'granted') {
            startCamera();
          } else if (permission.state === 'denied') {
            setHasPermission(false);
          }
        };

        return permission.state;
      }
      return 'unknown';
    } catch (error) {
      console.error('Error checking camera permission:', error);
      return 'unknown';
    }
  };

  // Start camera stream
  const startCamera = async () => {
    try {
      setIsLoading(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
        setPermissionState('granted');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasPermission(false);
      setPermissionState('denied');
    } finally {
      setIsLoading(false);
    }
  };

  // Request camera permission with automatic system prompt
  const requestCameraPermission = async () => {
    try {
      setIsRequestingPermission(true);
      setIsLoading(true);

      // This will automatically trigger the browser's permission prompt
      await startCamera();
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      setHasPermission(false);
      setPermissionState('denied');
    } finally {
      setIsRequestingPermission(false);
      setIsLoading(false);
    }
  };

  // Show native permission request immediately
  const showNativePermissionPrompt = async () => {
    try {
      // Request permission immediately when component mounts
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some(device => device.kind === 'videoinput');

      if (!hasCamera) {
        throw new Error('No camera found');
      }

      // This will trigger native permission prompt
      await requestCameraPermission();
    } catch (error) {
      console.error('Error showing native permission prompt:', error);
      setHasPermission(false);
      setIsLoading(false);
    }
  };

  // Initialize camera on component mount
  useEffect(() => {
    const initializeCamera = async () => {
      // Check if we already have permission
      const permission = await checkCameraPermission();

      if (permission === 'granted') {
        startCamera();
      } else if (permission === 'prompt' || permission === 'unknown') {
        // Automatically show permission prompt
        showNativePermissionPrompt();
      } else if (permission === 'denied') {
        setHasPermission(false);
        setIsLoading(false);
      }
    };

    initializeCamera();

    // Cleanup function
    return () => {
      // Store ref value in a variable to avoid issues with cleanup
      const video = videoRef.current;
      if (video && video.srcObject) {
        const tracks = (video.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [checkCameraPermission, showNativePermissionPrompt]);

  // QR code detection logic
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current || isLoading || scanned) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const scanInterval = setInterval(() => {
        if (scanned) {
          clearInterval(scanInterval);
          return;
        }

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Simulate QR code detection
        setTimeout(() => {
          if (!scanned) {
            setScanned(true);
            const mockQRData = `QR-${Math.floor(Math.random() * 1000000)}`;
            console.log('QR code detected:', mockQRData);
            if (onScan) onScan(mockQRData);
          }
        }, 2000);
      }, 500);

      return () => clearInterval(scanInterval);
    };
  }, [isLoading, onScan, scanned, videoRef, canvasRef]);

  // Permission denied screen
  if (hasPermission === false || permissionState === 'denied') {
    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center text-white p-4">
          <div className="text-center max-w-sm">
            <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-bold mb-4">Camera Access Required</h2>
            <p className="text-center mb-6 text-gray-300">
              To scan QR codes, this app needs access to your camera.
              Please allow camera permission when prompted by your device.
            </p>

            <div className="space-y-4">
              <button
                  onClick={requestCameraPermission}
                  disabled={isRequestingPermission}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-full w-full transition-colors"
              >
                <Camera size={20} />
                {isRequestingPermission ? 'Requesting Permission...' : 'Allow Camera Access'}
              </button>

              <div className="text-sm text-gray-400">
                <p className="mb-2">If permission was denied:</p>
                <ol className="list-decimal list-inside text-left space-y-1">
                  <li>Look for camera icon in your browser address bar</li>
                  <li>Click it and select Allow</li>
                  <li>Or refresh the page and try again</li>
                </ol>
              </div>

              <div className="flex gap-3">
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-full flex-1 transition-colors"
                >
                  Refresh Page
                </button>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full flex-1 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }

  // Main scanner interface
  return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center">
          <button onClick={onClose} className="text-white hover:text-gray-300 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-lg font-medium ml-4">Scan QR Code</h1>
        </div>

        {/* Camera View */}
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="relative w-full max-w-sm aspect-square">
            {/* Frame border */}
            <div className="absolute inset-0 border-8 border-blue-600 rounded-lg z-10"></div>

            {/* Camera feed */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              {isLoading ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-black">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
                    <p className="text-white text-sm">
                      {isRequestingPermission ? 'Requesting camera access...' : 'Loading camera...'}
                    </p>
                  </div>
              ) : (
                  <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                  />
              )}
            </div>

            {/* Hidden canvas for QR detection */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Scan area indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-3/4 h-3/4 border-2 border-white/50 rounded-lg">
                {/* Scanning animation */}
                <div className="relative w-full h-full">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-green-500 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 text-center">
          <p className="text-white text-sm">
            {scanned ? 'QR code detected!' : 'Position the QR code within the frame to scan'}
          </p>
          {permissionState === 'granted' && (
              <p className="text-green-400 text-xs mt-2">Camera access granted</p>
          )}
        </div>
      </div>
  );
};

export default QRScanner;
