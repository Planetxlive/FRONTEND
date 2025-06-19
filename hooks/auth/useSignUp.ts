import { useAuth, useSignUp as useClerkSignUp } from "@clerk/clerk-react";
import { useState } from "react";
import useLocation from "../location/useLocation";
import createUser from "@/app/api/user/createUser";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/store/features/user/userSlice";
import { SelectSingleProviderInternal } from "react-day-picker";
import { clear } from "console";

export function useSignUp() {
  const { signUp: clerkSignUp, setActive } = useClerkSignUp();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [signUpError, setSignUpError] = useState<string | undefined>(undefined);
  const [isOtpStage, setIsOtpStage] = useState<boolean>();
  const [isAuthComplete, setIsAuthComplete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastName, setLastName] = useState<string | undefined>(undefined);
  const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();
  const location = useLocation();
  const {getToken} = useAuth()
  const clearState = () => {
    setPhoneNumber("");
    setSignUpError("");
    setOtp("");
    setIsOtpStage(false);
    setIsAuthComplete(false);
    setIsLoading(false);
    setLastName(undefined);
    setFirstName(undefined);
  };
  const signUp = async () => {
    setIsLoading(true);
    setSignUpError(undefined);
    setIsOtpStage(false);
    try {
      await clerkSignUp?.create({
        firstName,
        lastName,
        phoneNumber: `+91${phoneNumber}`,
        strategy: "phone_code",
      });
      // sendOtp();
      setIsOtpStage(true);
    } catch (err: any) {
      setSignUpError(err.errors?.[0]?.message || "Failed to sIgn up");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async () => {
    setIsLoading(true);
    setSignUpError(undefined);
    try {
      await clerkSignUp?.preparePhoneNumberVerification({
        strategy: "phone_code",
      });
    } catch (err: any) {
      setSignUpError(err.errors?.[0]?.message || "Failed to send otp");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    setSignUpError(undefined);
    try {
      const result = await clerkSignUp?.attemptPhoneNumberVerification({
        code: otp,
      });
      console.log(result);
      if (result?.status === "complete") {
        console.log(await getToken());
        await setActive?.({ session: result.createdSessionId });
        console.log(location);
        const user = await createUser(await getToken() || "", {
          longitude: location.longitude,
          latitude: location.latitude,
          city: location.location.city,
          state: location.location.state,
          country: location.location.country,
        });
        console.log(user);
        dispatch(setUser(user));
        setIsOtpStage(false);
        setIsAuthComplete(true);
      } else {
        setSignUpError("Verification incomplete");
      }
    } catch (err: any) {
      setSignUpError(err.errors?.[0]?.message || "Invalid code");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phoneNumber,
    setPhoneNumber,
    otp,
    setOtp,
    signUpError,
    setSignUpError,
    isAuthComplete,
    isOtpStage,
    isLoading,
    signUp,
    sendOtp,
    verifyOtp,
    clearState,
  };
}
