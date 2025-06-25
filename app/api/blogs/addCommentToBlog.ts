import config from "@/lib/config";
import axios from "axios";

// TODO: Add a form to add comment
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function addComment(token: string, id: string, comment: any){
    const url = `${config.backendUrl}blog/comment/${id}`
    const res = await axios.post(url, comment, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data.comment;
}