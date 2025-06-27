'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  User,
  Tag,
  Share2,
  Bookmark,
  ArrowLeft,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check,
} from 'lucide-react';
import { BlogPost } from '@/types/blog';
// import postsData from '@/data/post.json';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import getBlogById from '@/app/api/blogs/getBlogById';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [readingTime, setReadingTime] = useState(5);
  const articleRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const excerptRef = useRef<HTMLParagraphElement>(null);
  const [selectedText, setSelectedText] = useState('');
  const [shareMenuPos, setShareMenuPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [showTextShareMenu, setShowTextShareMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<
    { user: string; text: string; date: string }[]
  >([]);
  const [newComment, setNewComment] = useState('');

  // Get all blogs from Redux store
  const allBlogs = useSelector((state: RootState) => state.blogs.blogs) || [];

  // Calculate related posts based on tag similarity
  const relatedPosts = useMemo(() => {
    if (!post || !allBlogs.length) return [];

    // Filter out the current post and find posts with similar tags
    const otherPosts = allBlogs.filter(blog => blog.id !== post.id);

    console.log('Current post tags:', post.tags);
    console.log('Available posts for matching:', otherPosts.length);

    // Calculate similarity score for each post based on tag overlap
    const postsWithScore = otherPosts.map(blog => {
      const currentTags = post.tags || [];
      const blogTags = blog.tags || [];

      // Calculate tag similarity (Jaccard similarity)
      const intersection = currentTags.filter(tag =>
        blogTags.some(blogTag => blogTag.toLowerCase() === tag.toLowerCase())
      ).length;

      const union = new Set([...currentTags, ...blogTags]).size;
      const similarity = union > 0 ? intersection / union : 0;

      // Also consider category similarity
      const categoryBonus = blog.category === post.category ? 0.3 : 0;

      console.log(`Post "${blog.title}":`, {
        currentTags,
        blogTags,
        intersection,
        union,
        similarity,
        categoryBonus,
        totalScore: similarity + categoryBonus,
      });

      return {
        ...blog,
        similarity: similarity + categoryBonus,
      };
    });

    // Sort by similarity score (highest first) and take top 3
    const filtered = postsWithScore
      .filter(post => post.similarity > 0) // Only show posts with some similarity
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3)
      .map(({ ...rest }) => rest);

    console.log('Related posts found:', filtered.length);

    // If no tag matches found, show recent posts from same category
    if (filtered.length === 0) {
      const sameCategoryPosts = otherPosts
        .filter(blog => blog.category === post.category)
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
        .slice(0, 3);

      console.log(
        'Fallback: Same category posts found:',
        sameCategoryPosts.length
      );
      return sameCategoryPosts;
    }

    return filtered;
  }, [post, allBlogs]);

  useEffect(() => {
    const fetchData = async () => {
      const foundPost = await getBlogById(params.id?.toString() || '');
      if (foundPost) {
        setPost(foundPost);
        const wordCount = foundPost.excerpt.split(' ').length * 10; // Simulated content length
        setReadingTime(Math.ceil(wordCount / 200));
      }
    };
    fetchData();
  }, [params.id]);

  // Handle text selection in the article
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setShowTextShareMenu(false);
        setSelectedText('');
        return;
      }
      const text = selection.toString();
      if (text && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        // Only show if selection is inside the article, title, or excerpt
        const anchorNode = selection.anchorNode;
        const isInArticle =
          articleRef.current && articleRef.current.contains(anchorNode);
        const isInTitle =
          titleRef.current && titleRef.current.contains(anchorNode);
        const isInExcerpt =
          excerptRef.current && excerptRef.current.contains(anchorNode);
        if (isInArticle || isInTitle || isInExcerpt) {
          setSelectedText(text);
          setShareMenuPos({
            x: rect.left + window.scrollX + rect.width / 2,
            y: rect.top + window.scrollY - 40,
          });
          setShowTextShareMenu(true);
        } else {
          setShowTextShareMenu(false);
          setSelectedText('');
        }
      } else {
        setShowTextShareMenu(false);
        setSelectedText('');
      }
    };
    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection);
    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
    };
  }, []);

  const handleTextShare = (platform: string) => {
    if (!selectedText) return;
    const url = window.location.href;
    const text = `"${selectedText}"`;
    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`
        );
        break;
      case 'copy':
        navigator.clipboard.writeText(selectedText);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        break;
    }
    setShowTextShareMenu(false);
    setSelectedText('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        );
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        break;
    }
    setShowShareMenu(false);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back to Blog</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isBookmarked
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Bookmark
                  className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`}
                />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full transition-colors duration-200"
                >
                  <Share2 className="w-5 h-5" />
                </button>

                {showShareMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl p-2 min-w-[200px] z-50">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <Twitter className="w-5 h-5 text-blue-500" />
                      <span>Share on Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <Facebook className="w-5 h-5 text-blue-600" />
                      <span>Share on Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <Linkedin className="w-5 h-5 text-blue-700" />
                      <span>Share on LinkedIn</span>
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      {copySuccess ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-600" />
                      )}
                      <span>{copySuccess ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="relative py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-orange-500/5"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full mb-6">
              <Tag className="w-4 h-4 text-orange-600" />
              <span className="text-orange-700 font-semibold text-sm">
                {post.category}
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-8 leading-tight"
              ref={titleRef}
            >
              {post.title}
            </h1>

            <p
              className="text-xl text-gray-600 mb-8 font-light leading-relaxed max-w-3xl mx-auto"
              ref={excerptRef}
            >
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{post.user.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.updatedAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{post.views} views</span>
              </div>
              {post.location && (
                <div className="flex items-center space-x-2">
                  <span role="img" aria-label="Location">
                    📍
                  </span>
                  <span>{post.location}</span>
                </div>
              )}
              {post.contactInfo && (
                <div className="flex items-center space-x-2">
                  <span role="img" aria-label="Contact">
                    📞
                  </span>
                  <span>{post.contactInfo}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-16">
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>

      {/* Article Content */}
      <article
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        ref={articleRef}
      >
        <div className="prose prose-lg prose-gray max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Floating Share Menu for Selected Text */}
        {showTextShareMenu && shareMenuPos && (
          <div
            style={{
              position: 'absolute',
              left: shareMenuPos.x,
              top: shareMenuPos.y,
              zIndex: 1000,
              transform: 'translate(-50%, -100%)',
            }}
            className="bg-white border border-gray-200 rounded-xl shadow-xl p-2 flex space-x-2 animate-fade-in"
          >
            <button
              onClick={() => handleTextShare('twitter')}
              className="p-2 rounded-full hover:bg-gray-100"
              title="Share to Twitter"
            >
              <Twitter className="w-5 h-5 text-blue-500" />
            </button>
            <button
              onClick={() => handleTextShare('facebook')}
              className="p-2 rounded-full hover:bg-gray-100"
              title="Share to Facebook"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
            </button>
            <button
              onClick={() => handleTextShare('linkedin')}
              className="p-2 rounded-full hover:bg-gray-100"
              title="Share to LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-blue-700" />
            </button>
            <button
              onClick={() => handleTextShare('copy')}
              className="p-2 rounded-full hover:bg-gray-100"
              title="Copy Text"
            >
              {copySuccess ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        )}

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-3">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full text-sm font-medium hover:from-yellow-100 hover:to-orange-100 hover:text-orange-700 transition-all duration-300 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Engagement Actions */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  isLiked
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span className="font-medium">{isLiked ? '124' : '123'}</span>
              </button>

              <button
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full transition-colors duration-200"
                onClick={() => setShowComments(prev => !prev)}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">{comments.length}</span>
              </button>
            </div>

            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full hover:shadow-lg transition-all duration-200 font-semibold"
            >
              <Share2 className="w-5 h-5" />
              <span>Share Article</span>
            </button>
          </div>
        </div>

        {/* Comment Section */}
        {showComments && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 mt-[-60px]">
            <div className="mt-8 p-6 bg-gray-50 rounded-xl shadow-inner">
              <h4 className="text-lg font-semibold mb-4">Comments</h4>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (!newComment.trim()) return;
                  setComments([
                    ...comments,
                    {
                      user: 'Anonymous', // Replace with actual user if available
                      text: newComment,
                      date: new Date().toISOString(),
                    },
                  ]);
                  setNewComment('');
                }}
                className="flex flex-col gap-2 mb-6"
              >
                <textarea
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  rows={3}
                  placeholder="Write your comment..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                />
                <button
                  type="submit"
                  className="self-end px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Post Comment
                </button>
              </form>
              <div className="space-y-4">
                {comments.length === 0 && (
                  <p className="text-gray-500">
                    No comments yet. Be the first to comment!
                  </p>
                )}
                {comments.map((comment, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-lg shadow flex flex-col"
                  >
                    <span className="font-medium text-gray-800">
                      {comment.user}
                    </span>
                    <span className="text-gray-600">{comment.text}</span>
                    <span className="text-xs text-gray-400 mt-1">
                      {new Date(comment.date).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                Related Articles
              </h2>
              <p className="text-gray-600 font-light">
                Continue exploring our insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(relatedPost => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-orange-600 font-semibold mb-2">
                        {relatedPost.category}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{relatedPost.user.name}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(relatedPost.updatedAt)}</span>
                      </div>
                      {/* Show matching tags for debugging */}
                      {post && relatedPost.tags && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex flex-wrap gap-1">
                            {relatedPost.tags.slice(0, 3).map(tag => {
                              const isMatching = post.tags?.some(
                                currentTag =>
                                  currentTag.toLowerCase() === tag.toLowerCase()
                              );
                              return (
                                <span
                                  key={tag}
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    isMatching
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {tag}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Related Articles Message */}
      {post && relatedPosts.length === 0 && allBlogs.length > 1 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <Tag className="w-8 h-8 text-gray-500" />
              </div>
              <h2 className="text-2xl font-light text-gray-900 mb-4">
                No Related Articles Found
              </h2>
              <p className="text-gray-600 font-light mb-8 max-w-md mx-auto">
                This article has unique tags. Explore our other articles to
                discover more insights.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full hover:shadow-lg transition-all duration-200 font-semibold"
              >
                <span>Browse All Articles</span>
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Stay Updated with Market Insights
          </h2>
          <p className="text-xl text-gray-300 mb-8 font-light">
            Get the latest real estate trends and analysis delivered to your
            inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full hover:shadow-lg transition-all duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
}
