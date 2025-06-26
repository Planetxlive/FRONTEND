import config from "@/lib/config";
import { BlogPost } from "@/types/blog";
import axios from "axios";

export default async function createBlog(sessionId: string, blogData: Partial<BlogPost>) {
    const url = `${config.backendUrl}blog/`
    console.log(await axios.post(url, blogData, {
        headers: {
            Authorization: `Bearer ${sessionId}`
        }
    }))
}