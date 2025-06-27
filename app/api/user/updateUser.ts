import { UserUpdateType } from "@/types/user";
import config from "@/lib/config";
import axios from "axios";

export default async function updateUser(sessionId: string, data: Partial<UserUpdateType>) {
    const url = `${config.backendUrl}user/`
    const res = await axios.patch(url, data, {
        headers: {
            Authorization: `Bearer ${sessionId}`
        }
    })
    console.log(res.data.user)
    return res.data.user;
}