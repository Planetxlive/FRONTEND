'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Link, Check } from 'lucide-react';
import Image from 'next/image';
import uploadImage from '@/lib/upload';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  error?: string;
}

export default function ImageUpload({
  value,
  onChange,
  error: err,
}: ImageUploadProps) {
  const [isUrlMode, setIsUrlMode] = useState(true);
  const [urlInput, setUrlInput] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(err);

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
    }
  };

  const handleFileSelect = async (file: File) => {
    // In a real application, you would upload the file to your server or cloud storage
    // For this demo, we'll create a local URL
    // const url = URL.createObjectURL(file);
    const { url, error } = await uploadImage(file);
    if (url) onChange(url);
    else setError(error);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));

    if (imageFile) {
      handleFileSelect(imageFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const clearImage = () => {
    onChange('');
    setUrlInput('');
  };

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setIsUrlMode(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isUrlMode
              ? 'bg-white text-violet-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Link className="w-4 h-4 inline mr-2" />
          URL
        </button>
        <button
          type="button"
          onClick={() => setIsUrlMode(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            !isUrlMode
              ? 'bg-white text-violet-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Upload className="w-4 h-4 inline mr-2" />
          Upload
        </button>
      </div>

      {/* Current Image Preview */}
      {value && (
        <div className="relative group">
          <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden">
            <Image
              src={value}
              alt="Featured image preview"
              className="w-full h-full object-cover"
              width={320}
              height={180}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <button
                type="button"
                onClick={clearImage}
                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* URL Input Mode */}
      {isUrlMode && (
        <div className="space-y-3">
          <div className="flex space-x-3">
            <input
              type="url"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
              className={`flex-1 px-4 py-3 bg-white border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                error
                  ? 'border-red-300 focus:border-red-400'
                  : 'border-gray-200 focus:border-violet-400'
              }`}
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="px-6 py-3 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Check className="w-4 h-4" />
              <span>Set</span>
            </button>
          </div>

          {/* Suggested URLs */}
          <div className="text-sm text-gray-600">
            <p className="mb-2 font-medium">Suggested sources:</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://pexels.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors duration-200"
              >
                Pexels
              </a>
              <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors duration-200"
              >
                Unsplash
              </a>
              <a
                href="https://pixabay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors duration-200"
              >
                Pixabay
              </a>
            </div>
          </div>
        </div>
      )}

      {/* File Upload Mode */}
      {!isUrlMode && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer ${
            isDragging
              ? 'border-violet-400 bg-violet-50'
              : error
                ? 'border-red-300 hover:border-red-400'
                : 'border-gray-300 hover:border-violet-400'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className="space-y-4">
            <div
              className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                isDragging ? 'bg-violet-100' : 'bg-gray-100'
              }`}
            >
              <ImageIcon
                className={`w-8 h-8 ${isDragging ? 'text-violet-500' : 'text-gray-400'}`}
              />
            </div>

            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                {isDragging ? 'Drop your image here' : 'Upload an image'}
              </p>
              <p className="text-gray-600 text-sm">
                Drag and drop an image file, or click to browse
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Supports: JPG, PNG, GIF, WebP (Max 10MB)
              </p>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
