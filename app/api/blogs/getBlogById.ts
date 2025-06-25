import config from "@/lib/config";
import axios from "axios";

// TODO: Add a blog viewing page
export default async function getBlogById(token: string, id: string){
    const url = `${config.backendUrl}blog/${id}`
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data.blog;
}