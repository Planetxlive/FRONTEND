/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BlogPost {
  id: string;
  userId: string;
  title: string;
  excerpt: string;
  image: string;
  tags: string[];
  category: string;
  content: string;
  location: string;
  contactInfo: string;
  createdAt: string;
  updatedAt: string;
  likes: any;
  comments: any;
  user: {
    id: string;
    name: string;
    coverURL: string;
  };
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
}
