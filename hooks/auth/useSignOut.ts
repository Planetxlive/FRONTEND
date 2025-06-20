import { useClerk } from '@clerk/clerk-react';

export default function useSignOut() {
  const { signOut } = useClerk();
  return { signOut };
}
