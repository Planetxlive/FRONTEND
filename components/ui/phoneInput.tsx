"use client";

import { ChangeEvent, ChangeEventHandler } from "react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  id: string;
}

export default function PhoneInput({ value, onChange, id }: PhoneInputProps) {
  const isOnlyNumbers = (str: string) => {
    return /^\d*$/.test(str);
  };
  const changed = (e: ChangeEvent<HTMLInputElement>) => {
    if(!isOnlyNumbers(e.target.value) || e.target.value.length > 10) return;
    onChange(e.target.value);
  };
  return (
    <input
      type="tel"
      placeholder="Enter your Phone Number"
      id={id}
      value={value}
      onChange={changed}
      className="w-full border-2 border-black rounded-md text-lg p-2 focus:outline-none focus:ring-black"
    />
  );
}
