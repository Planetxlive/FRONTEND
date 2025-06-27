import config from '@/lib/config';
import { BlogPost } from '@/types/blog';
import axios from 'axios';

export default async function createBlog(
  sessionId: string,
  blogData: Partial<BlogPost>
) {
  try {
    const url = `${config.backendUrl}blog/`;
    const response = await axios.post(url, blogData, {
      headers: {
        Authorization: `Bearer ${sessionId}`,
      },
    });

    if (response.status === 201) {
      return response.data.blog;
    } else {
      throw new Error('Failed to create blog');
    }
  } catch (error: unknown) {
    console.error('Create blog error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to create blog'
    );
  }
}
