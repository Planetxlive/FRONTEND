'use client';

import { useEffect, ReactNode, useContext, createContext } from 'react';
import { X } from 'lucide-react';
import { Button } from './button';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const ModalContext = createContext<{ onClose: () => void } | null>(null);

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ onClose }}>
      <div
        className="fixed inset-0 bg-black/40 z-[100] flex justify-center items-center"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full"
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
}

Modal.Title = function ModalTitle({ children }: { children: ReactNode }) {
  const ctx = useContext(ModalContext);
  if (!ctx) return null;

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold">{children}</h2>
      <Button
        variant={'ghost'}
        onClick={ctx.onClose}
        className="text-gray-500 hover:text-black transition"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
  );
};

Modal.Body = function ModalBody({ children }: { children: ReactNode }) {
  return <div className="space-y-4 text-sm">{children}</div>;
};
