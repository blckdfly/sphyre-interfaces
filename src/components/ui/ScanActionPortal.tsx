'use client';

import React from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

const ScanActionPortal: React.FC<PortalProps> = ({ children }) => {
  if (typeof window === 'undefined') return null;

  const portalRoot = document.getElementById('portal-root');
  if (!portalRoot) return null;

  return createPortal(children, portalRoot);
};

export default ScanActionPortal;
