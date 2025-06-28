'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BlogEditor from '@/components/blog/BlogEditor';
import { BlogPost } from '@/types/blog';
// import postsData from '@/data/post.json';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import getBlogById from '@/app/api/blogs/getBlogById';
import updateBlog from '@/app/api/blogs/updateBlog';
import useAuth from '@/hooks/auth/useAuth';

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    // const foundPost = postsData.find((p: BlogPost) => p.id === params.id);
    setIsLoading(true);
    const fetchData = async () => {
      if (params.id == undefined) {
        setPost(null);
        setIsLoading(false);
        return;
      }
      const foundPost = await getBlogById(params.id?.toString());
      setPost(foundPost);
      setIsLoading(false);
    };
    fetchData();
  }, [params.id]);

  const handleSubmit = async (blogData: Partial<BlogPost>) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      if (params.id !== undefined)
        console.log(
          await updateBlog((await getToken())!, blogData, params.id?.toString())
        );

      // In a real app, you would update in your backend/database
      console.log('Updating blog post:', { id: params.id, ...blogData });

      // Redirect to admin page
      router.push('/blog/mine');
    } catch (error) {
      console.error('Error updating blog post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/blog/mine');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Post Not Found
          </h2>
          <p className="text-gray-600 font-light mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push('/admin')}
            className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300"
          >
            Back to Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 pt-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-light text-gray-900">
              Edit{' '}
              <span className="font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Post
              </span>
            </h1>
            <div className="my-2 prose prose-violet max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {`**Edit your post!** _Markdown supported._ [Markdown Guide](https://www.markdownguide.org/)`}
              </ReactMarkdown>
            </div>
            <p className="text-gray-600 font-light mt-1">
              Update your blog article
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BlogEditor
          initialData={post}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          submitButtonText="Update Post"
        />
      </main>
    </div>
  );
}
