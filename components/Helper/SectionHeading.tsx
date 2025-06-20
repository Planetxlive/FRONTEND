'use client';
import React from 'react';

type props = {
  heading: string;
  sub?: string;
};

const SectionHeading = ({ heading, sub }: props) => {
  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-xl sm:text-3xl text-blue-950 font-bold">{heading}</h1>
      <p className="mt-2 text-gray-700 sm:text-base text-sm font-medium">
        {sub
          ? sub
          : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
      </p>
    </div>
  );
};
export default SectionHeading;
