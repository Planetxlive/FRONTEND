'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogEditor from '@/components/blog/BlogEditor';
import { BlogPost } from '@/types/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useAuth from '@/hooks/auth/useAuth';
import createBlog from '@/app/api/blogs/createBlog';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUserBlogs } from '@/app/store/features/blogs/blogsSlice';
import getUserBlogs from '@/app/api/blogs/getUserBlogs';

export default function CreateBlogPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const handleSubmit = async (blogData: Partial<BlogPost>) => {
    setIsSubmitting(true);

    try {
      const token = await getToken();
      if (!token) {
        toast.error('Authentication required');
        return;
      }

      // Show loading toast
      const loadingToast = toast.loading('Creating your blog post...');

      // Create the blog
      await createBlog(token, blogData);

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success('Blog post created successfully!');

      // Refresh user blogs in Redux
      try {
        const updatedBlogs = await getUserBlogs(token);
        dispatch(setUserBlogs(updatedBlogs));
      } catch (error) {
        console.error('Error refreshing blogs:', error);
      }

      // Redirect to admin page
      router.push('/blog/mine');
    } catch (error: unknown) {
      console.error('Error creating blog post:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to create blog post. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (
      confirm(
        'Are you sure you want to cancel? Any unsaved changes will be lost.'
      )
    ) {
      toast.error('Blog creation cancelled');
      router.push('/blog/mine');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 pt-20">
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
