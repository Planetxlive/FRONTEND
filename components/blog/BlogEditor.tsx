'use client';

import { useState, useEffect } from 'react';
import {
  Save,
  X,
  Image as ImageIcon,
  Tag,
  FileText,
  Eye,
  Sparkles,
} from 'lucide-react';
import { BlogPost } from '@/types/blog';
import RichTextEditor from './RichTextEditor';
import ImageUpload from './ImageUpload';
import { toast } from 'react-hot-toast';

interface BlogEditorProps {
  initialData?: BlogPost;
  onSubmit: (data: Partial<BlogPost>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  submitButtonText: string;
}

export default function BlogEditor({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
  submitButtonText,
}: BlogEditorProps) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    image: '',
    tags: [] as string[],
    category: '',
    content: '',
    location: '',
    contactInfo: '',
  });
  const [content, setContent] = useState(initialData?.content || '');
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPreview, setIsPreview] = useState(false);

  const categories = [
    'Market Analysis',
    "Buyer's Guide",
    "Seller's Guide",
    'Investment',
    'Property Tips',
    'Finance',
    'Technology',
    'Sustainability',
    'Commercial',
    'Marketing',
    'Property Management',
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        excerpt: initialData.excerpt,
        image: initialData.image,
        tags: initialData.tags,
        category: initialData.category,
        content: initialData.content,
        location: initialData.location || '',
        contactInfo: initialData.contactInfo || '',
      });
    }
  }, [initialData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const missingFields: string[] = [];

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      missingFields.push('Title');
    }
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
      missingFields.push('Excerpt');
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
      missingFields.push('Category');
    }
    if (!formData.image.trim()) {
      newErrors.image = 'Featured image is required';
      missingFields.push('Featured Image');
    }
    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
      missingFields.push('Tags');
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
      missingFields.push('Location');
    }
    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = 'Contact info is required';
      missingFields.push('Contact Info');
    }
    if (!content.trim()) {
      missingFields.push('Content');
    }

    setErrors(newErrors);

    // Show toast with missing fields
    if (missingFields.length > 0) {
      const missingFieldsText = missingFields.join(', ');
      toast.error(
        `Please fill in the following required fields: ${missingFieldsText}`
      );
    }

    return Object.keys(newErrors).length === 0 && content.trim() !== '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }
    formData.content = content;
    onSubmit({
      ...formData,
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Editor Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Blog Editor
                </h2>
                <p className="text-gray-600 font-light">
                  Create engaging content for your audience
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isPreview
                    ? 'bg-violet-100 text-violet-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-2" />
                Preview
              </button>
            </div>
          </div>

          {/* Basic Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Title */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <FileText className="w-4 h-4 inline mr-2" />
                Post Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e => handleInputChange('title', e.target.value)}
                placeholder="Enter an engaging title for your blog post..."
                className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:outline-none transition-all duration-200 text-lg font-medium ${
                  errors.title
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-gray-200 focus:border-violet-400'
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-2">{errors.title}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Tag className="w-4 h-4 inline mr-2" />
                Category
              </label>
              <select
                value={formData.category}
                onChange={e => handleInputChange('category', e.target.value)}
                className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:outline-none transition-all duration-200 font-medium appearance-none ${
                  errors.category
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-gray-200 focus:border-violet-400'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-2">{errors.category}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Sparkles className="w-4 h-4 inline mr-2" />
                Tags
              </label>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a tag..."
                    className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-violet-400 focus:outline-none transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-3 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-2 bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-violet-500 hover:text-violet-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                {errors.tags && (
                  <p className="text-red-500 text-sm">{errors.tags}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={e => handleInputChange('location', e.target.value)}
                placeholder="Enter the location..."
                className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:outline-none transition-all duration-200 text-lg font-medium ${
                  errors.location
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-gray-200 focus:border-violet-400'
                }`}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-2">{errors.location}</p>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Contact Info
              </label>
              <input
                type="text"
                value={formData.contactInfo}
                onChange={e => handleInputChange('contactInfo', e.target.value)}
                placeholder="Enter contact information (email, phone, etc.)..."
                className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:outline-none transition-all duration-200 text-lg font-medium ${
                  errors.contactInfo
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-gray-200 focus:border-violet-400'
                }`}
              />
              {errors.contactInfo && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.contactInfo}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            <FileText className="w-4 h-4 inline mr-2" />
            Excerpt
          </label>
          <textarea
            value={formData.excerpt}
            onChange={e => handleInputChange('excerpt', e.target.value)}
            placeholder="Write a compelling excerpt that summarizes your blog post..."
            rows={4}
            className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:outline-none transition-all duration-200 resize-none font-light leading-relaxed ${
              errors.excerpt
                ? 'border-red-300 focus:border-red-400'
                : 'border-gray-200 focus:border-violet-400'
            }`}
          />
          {errors.excerpt && (
            <p className="text-red-500 text-sm mt-2">{errors.excerpt}</p>
          )}
        </div>

        {/* Featured Image */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            <ImageIcon className="w-4 h-4 inline mr-2" />
            Featured Image
          </label>
          <ImageUpload
            value={formData.image}
            onChange={url => handleInputChange('image', url)}
            error={errors.image}
          />
        </div>

        {/* Content Editor */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            <FileText className="w-4 h-4 inline mr-2" />
            Content
          </label>
          <RichTextEditor
            value={content}
            onChange={setContent}
            isPreview={isPreview}
          />
        </div>

        {/* Action Buttons */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 transition-all duration-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>{submitButtonText}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
