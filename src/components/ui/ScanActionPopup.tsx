import React from 'react';
import { QrCode, Zap, X } from 'lucide-react';
import ScanActionPortal from './ScanActionPortal';

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
  if (!visible) return null;

  const popup = (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl px-6 py-4 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>
        <h3 className="text-center text-lg font-semibold text-gray-800 mb-6">
          Select Action
        </h3>
        <div className="flex justify-around">
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={onRequestCollect}
          >
            <div className="bg-blue-100 p-3 rounded-full mb-2">
              <QrCode size={28} className="text-blue-600" />
            </div>
            <span className="text-sm text-gray-800 text-center">Respond or Collect</span>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={onShareInPerson}
          >
            <div className="bg-blue-100 p-3 rounded-full mb-2">
              <Zap size={28} className="text-blue-600" />
            </div>
            <span className="text-sm text-gray-800 text-center">Share In-Person</span>
          </div>
        </div>
      </div>
    </div>
  );

  return <ScanActionPortal>{popup}</ScanActionPortal>;
};

export default ScanActionPopup;