export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    author: string;
    date: string;
    tags: string[];
    category: string;
  }
  
  export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    postsPerPage: number;
  }