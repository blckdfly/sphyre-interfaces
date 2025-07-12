import React, { useState } from 'react';
import { QrCode, Zap } from 'lucide-react';
import ScanActionPortal from './ScanActionPortal';
import QRScanner from './QRScanner';

interface ScanActionPopupProps {
  visible: boolean;
  onClose: () => void;
  onRequestCollect: () => void;
  onShareInPerson: () => void;
}

const ScanActionPopup: React.FC<ScanActionPopupProps> = ({
  visible,
  onClose,
  onRequestCollect,
  onShareInPerson,
}) => {
  const [showScanner, setShowScanner] = useState(false);

  if (!visible) return null;

  // Show QR scanner if requested
  if (showScanner) {
    return (
      <ScanActionPortal>
        <QRScanner 
          onClose={() => {
            setShowScanner(false);
            onClose();
          }}
          onScan={(data) => {
            console.log('QR Code scanned:', data);
            setShowScanner(false);
            onRequestCollect();
          }}
        />
      </ScanActionPortal>
    );
  }

  const popup = (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-end justify-center pb-20 pointer-events-auto"
    onClick={onClose}
    >
      {/* Popup positioned above navbar */}
      <div className="bg-blue-600 w-full max-w-md rounded-3xl px-6 py-4 shadow-xl mx-4 pointer-events-auto"
      onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-around items-center">
          <div
            className="flex flex-col items-center cursor-pointer text-white"
            onClick={() => setShowScanner(true)}
          >
            <div className="mb-4">
              <QrCode size={32} className="text-white" />
            </div>
            <div className="text-center">
              <div className="text-base font-medium">Respond</div>
              <div className="text-base font-medium">or Collect</div>
            </div>
          </div>

          <div className="w-px h-20 bg-white/30 mx-4"></div>

          <div
            className="flex flex-col items-center cursor-pointer text-white"
            onClick={onShareInPerson}
          >
            <div className="mb-4">
              <Zap size={32} className="text-white" />
            </div>
            <div className="text-center">
              <div className="text-base font-medium">Share</div>
              <div className="text-base font-medium">In-Person</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <ScanActionPortal>{popup}</ScanActionPortal>;
};

export default ScanActionPopup;
