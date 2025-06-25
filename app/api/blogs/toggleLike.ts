import config from "@/lib/config";
import axios from "axios";

// TODO: Add a blog viewing page
export default async function toggleLike(token: string, id: string){
    const url = `${config.backendUrl}blog/toggleLike/${id}`
    const res = await axios.post(url, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data.blog;
}