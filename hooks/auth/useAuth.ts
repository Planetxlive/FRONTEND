import { useAuth as useClerkAuth } from "@clerk/clerk-react";

export default function useAuth(){
    const { isSignedIn, getToken, sessionId } = useClerkAuth()
    return {
        isSignedIn,
        getToken,
        sessionId
    }
}