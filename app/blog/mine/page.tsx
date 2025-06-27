'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Calendar,
  User,
} from 'lucide-react';
// import { BlogPost } from '@/types/blog';
// import postsData from '@/data/post.json';
import Image from 'next/image';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/app/store/store';
// import { deleteBlog } from '@/app/store/features/blogs/blogsSlice';
import { BlogPost } from '@/types/blog';
import useAuth from '@/hooks/auth/useAuth';
import getUserBlogs from '@/app/api/blogs/getUserBlogs';

export default function AdminPage() {
  // const [posts, setPosts] = useState<BlogPost[]>([]);
  // const posts = useSelector((state: RootState) => state.blogs.blogs) || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  // const dispatch = useDispatch();
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const { getToken } = useAuth();

  // useEffect(() => {
  //   setPosts(postsData);
  // }, []);

  const categories = Array.from(
    new Set(filteredPosts.map(post => post.category))
  ).sort();

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getUserBlogs((await getToken())!);
      setFilteredPosts(posts);
      console.log(`fetched data:`, posts);
    };
    fetchData();
  }, [getToken]);

  useEffect(() => {
    setFilteredPosts(
      filteredPosts.sort((a, b) => {
        if (sortBy === 'date')
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'author') return a.user.name.localeCompare(b.user.name);
        return 0;
      })
    );
  }, [filteredPosts, sortBy]);

  // const filteredPosts = posts
  //   .filter(post => {
  //     const matchesSearch =
  //       post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       post.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       post.category.toLowerCase().includes(searchQuery.toLowerCase());
  //     const matchesCategory =
  //       selectedCategory === 'All' || post.category === selectedCategory;
  //     return matchesSearch && matchesCategory;
  //   })
  //   .sort((a, b) => {
  //     if (sortBy === 'date')
  //       return (
  //         new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  //       );
  //     if (sortBy === 'title') return a.title.localeCompare(b.title);
  //     if (sortBy === 'author') return a.user.name.localeCompare(b.user.name);
  //     return 0;
  //   });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      // dispatch(deleteBlog(id));
      console.log(id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-light text-gray-900">
                Blog{' '}
                <span className="font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Administration
                </span>
              </h1>
              <p className="text-gray-600 font-light mt-1">
                Manage your blog content and articles
              </p>
            </div>

            <Link
              href="/blog/create"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Post</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-gray-200/50 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Search Posts
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by title, author, or category..."
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-violet-400 focus:outline-none transition-all duration-200 text-gray-900 font-medium"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Category
              </label>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-violet-400 focus:outline-none transition-all duration-200 text-gray-900 font-medium appearance-none"
                >
                  <option value="All">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-violet-400 focus:outline-none transition-all duration-200 text-gray-900 font-medium appearance-none"
              >
                <option value="date">Date (Newest)</option>
                <option value="title">Title (A-Z)</option>
                <option value="author">Author (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="text-3xl font-bold mb-2">
              {filteredPosts.length}
            </div>
            <div className="text-violet-100 font-medium">Total Posts</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="text-3xl font-bold mb-2">{categories.length}</div>
            <div className="text-blue-100 font-medium">Categories</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="text-3xl font-bold mb-2">
              {filteredPosts.length}
            </div>
            <div className="text-green-100 font-medium">Filtered Results</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="text-3xl font-bold mb-2">
              {new Set(filteredPosts.map(p => p.user.name)).size}
            </div>
            <div className="text-orange-100 font-medium">Authors</div>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-gray-200">
                <tr>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPosts.map(post => (
                  <tr
                    key={post.id}
                    className="hover:bg-violet-50/50 transition-colors duration-200"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-200 rounded-xl flex-shrink-0 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 font-light">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 font-medium">
                          {post.user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-800">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 font-medium">
                          {formatDate(post.updatedAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/blog/${post.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors duration-200"
                          title="View Post"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        <Link
                          href={`/blog/edit/${post.id}`}
                          className="p-2 text-violet-600 hover:bg-violet-100 rounded-xl transition-colors duration-200"
                          title="Edit Post"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-colors duration-200"
                          title="Delete Post"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-violet-400" />
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                No posts found
              </h3>
              <p className="text-gray-600 font-light">
                Try adjusting your search criteria or create a new post.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
