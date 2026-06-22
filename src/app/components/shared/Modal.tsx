import React from 'react';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-theme-bg-overlay backdrop-blur-sm" onClick={onClose}>
      <div className="bg-theme-bg-modal border border-theme-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-theme-border">
          <h2 className="text-lg font-bold text-theme-text-primary">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-theme-bg-card text-theme-text-muted hover:text-theme-text-primary transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
