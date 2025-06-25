'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogEditor from '@/components/blog/BlogEditor';
import { BlogPost } from '@/types/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function CreateBlogPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (blogData: Omit<BlogPost, 'id'>) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, you would save to your backend/database
      console.log('Creating blog post:', blogData);

      // Redirect to admin page
      router.push('/admin');
    } catch (error) {
      console.error('Error creating blog post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-light text-gray-900">
              Create{' '}
              <span className="font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                New Post
              </span>
            </h1>
            <div className="my-2 prose prose-violet max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {`**Welcome!** _Write your post in markdown._ [Learn more](https://www.markdownguide.org/)`}
              </ReactMarkdown>
            </div>
            <p className="text-gray-600 font-light mt-1">
              Write and publish a new blog article
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BlogEditor
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          submitButtonText="Publish Post"
        />
      </main>
    </div>
  );
}
