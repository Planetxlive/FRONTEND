import config from '@/lib/config';
import axios from 'axios';

export default async function deleteBlog(token: string, id: string) {
  try {
    const response = await axios.delete(`${config.backendUrl}blog/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return { success: true, message: 'Blog deleted successfully' };
    } else {
      throw new Error('Failed to delete blog');
    }
  } catch (error: unknown) {
    console.error('Delete blog error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to delete blog'
    );
  }
}
