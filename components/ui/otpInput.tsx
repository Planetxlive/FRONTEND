'use client';

import React, { useRef, useState } from 'react';

interface OtpInputProps {
  length?: number;
  onChangeOtp: (otp: string) => void;
}

export default function OtpInput({ length = 6, onChangeOtp }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    if (index >= 0 && index < length) {
      inputs.current[index]?.focus();
    }
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.charAt(value.length - 1) || '';
    setOtp(newOtp);
    onChangeOtp(newOtp.join(''));

    if (value && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        onChangeOtp(newOtp.join(''));
      } else {
        focusInput(index - 1);
      }
    }

    if (e.key === 'ArrowLeft') {
      focusInput(index - 1);
    }
    if (e.key === 'ArrowRight') {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').trim().replace(/\s/g, '');
    if (!/^\d+$/.test(paste)) return;

    const newOtp = [...otp];
    for (let i = 0; i < length; i++) {
      newOtp[i] = paste[i] || '';
    }
    setOtp(newOtp);
    onChangeOtp(newOtp.join(''));

    const nextIndex = Math.min(paste.length, length - 1);
    focusInput(nextIndex);
  };

  return (
    <div onPaste={handlePaste} className="flex w-full gap-2 justify-between">
      {otp.map((digit, idx) => (
        <input
          key={idx}
          ref={el => {
            inputs.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={e => handleChange(e.target.value, idx)}
          onKeyDown={e => handleKeyDown(e, idx)}
          className="w-10 h-12 text-center border border-gray-300 rounded text-xl focus:outline-none focus:ring-2 focus:ring-black"
        />
      ))}
    </div>
  );
}
