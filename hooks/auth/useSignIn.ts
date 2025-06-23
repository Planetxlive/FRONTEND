/* eslint-disable @typescript-eslint/no-explicit-any */
import getUser from '@/app/api/user/getUser';
import { setUser } from '@/app/store/features/user/userSlice';
import { useAuth, useSignIn as useClerkSignIn } from '@clerk/clerk-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export function useSignIn() {
  const { signIn: clerkSignIn, setActive } = useClerkSignIn();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [signInError, setSignInError] = useState<string | null>(null);
  const [isOtpStage, setIsOtpStage] = useState<boolean>();
  const [isAuthComplete, setIsAuthComplete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { getToken } = useAuth();

  const signIn = async () => {
    setIsLoading(true);
    setSignInError(null);
    setIsOtpStage(false);
    try {
      await clerkSignIn?.create({
        identifier: `+91${phoneNumber}`,
        strategy: 'phone_code',
      });
      setIsOtpStage(true);
    } catch (err: any) {
      setSignInError(err.errors?.[0]?.message || 'Failed to sign in');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async () => {
    setIsLoading(true);
    setSignInError(null);
    try {
      await clerkSignIn?.prepareFirstFactor({
        phoneNumberId: `+91${phoneNumber}`,
        strategy: 'phone_code',
      });
    } catch (err: any) {
      setSignInError(err.errors?.[0]?.message || 'Failed to send otp');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    setSignInError(null);
    try {
      const result = await clerkSignIn?.attemptFirstFactor({
        code: otp,
        strategy: 'phone_code',
      });

      if (result?.status === 'complete') {
        console.log(await getToken());
        await setActive?.({ session: result.createdSessionId });
        const user = await getUser((await getToken()) || '');
        console.log(user);
        dispatch(setUser(user));
        setIsOtpStage(false);
        setIsAuthComplete(true);
      } else {
        setSignInError('Verification incomplete');
      }
    } catch (err: any) {
      setSignInError(err.errors?.[0]?.message || 'Invalid code');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    phoneNumber,
    setPhoneNumber,
    otp,
    setOtp,
    signInError,
    setSignInError,
    isAuthComplete,
    isOtpStage,
    isLoading,
    signIn,
    sendOtp,
    verifyOtp,
  };
}
