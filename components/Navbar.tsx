'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Menu, Download, Heart, User, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/auth/useAuth';
import { Modal } from './ui/modal';
import { Input } from './ui/input';
import { useSignUp } from '@/hooks/auth/useSignUp';
import OtpInput from './ui/otpInput';
import { useSignIn } from '@/hooks/auth/useSignIn';
import getUser from '@/app/api/user/getUser';
import { useDispatch } from 'react-redux';
import { setUser } from '@/app/store/features/user/userSlice';
import Sidebar from './Sidebar';
import { useRouter } from 'next/navigation';
import { setBlogs } from '@/app/store/features/blogs/blogsSlice';
import getAllBlogs from '@/app/api/blogs/getAllBlogs';

export default function Navbar() {
  const router = useRouter();
  const { isSignedIn, getToken } = useAuth();
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const onMenuClick = () => {
    setIsSidebarOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isSignedIn) {
        console.log(await getToken());
        dispatch(setUser(await getUser((await getToken()) || '')));
      }
      dispatch(setBlogs(await getAllBlogs()));
    };
    fetchData();
  }, [dispatch, getToken, isSignedIn]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  return (
    <>
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => {
          setIsSignUpModalOpen(false);
        }}
      />
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xl mx-2 sm:mx-4 mt-2 rounded-2xl sm:rounded-3xl border border-gray-200/50'
            : 'bg-transparent'
        }`}
      >
        <div
          className={`${
            isScrolled ? 'max-w-none' : 'max-w-7xl'
          } mx-auto px-3 sm:px-4 lg:px-8`}
        >
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8  rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              </div>
              <span
                className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900' : 'text-black'
                }`}
              >
                PlanetX
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-full px-4 py-2 transition-all duration-300 ${
                  isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <Download className="w-4 h-4 mr-2" />
                Download App
              </Button>
              {isSignedIn ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-full px-4 py-2 transition-all duration-300 ${
                      isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Saved
                  </Button>
                  <Button
                    className={`bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2 transition-all duration-300 ${
                      isScrolled ? 'shadow-md' : ''
                    }`}
                  >
                    Seller Dashboard
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSignInModalOpen(true)}
                    className={`rounded-full px-4 py-2 transition-all duration-300 ${
                      isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    Sign In
                  </Button>
                  <Button
                    className={`bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2 transition-all duration-300 ${
                      isScrolled ? 'shadow-md' : ''
                    }`}
                    onClick={() => setIsSignUpModalOpen(true)}
                  >
                    Sign Up
                  </Button>
                </>
              )}
              {/* Profile & Menu Button */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={async () => {
                    if (isSignedIn) {
                      await router.push('/profile');
                    } else {
                      setIsSignInModalOpen(true);
                    }
                  }}
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center"
                >
                  <User className="w-4 h-4 text-white" />
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMenuClick}
                  className={`rounded-full transition-all duration-300 ${
                    isScrolled
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Mobile/Tablet Navigation */}
            <div className="flex lg:hidden items-center space-x-2 sm:space-x-3">
              {/* Mobile Saved Button */}

              {isSignedIn ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-full p-2 transition-all duration-300 ${
                      isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>

                  {/* Mobile Seller Dashboard - Hidden on very small screens */}
                  <Button
                    className={`hidden sm:flex bg-green-500 hover:bg-green-600 text-white rounded-full px-3 py-2 text-sm transition-all duration-300 ${
                      isScrolled ? 'shadow-md' : ''
                    }`}
                  >
                    Seller
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSignInModalOpen(true)}
                    className={`rounded-full px-4 py-2 transition-all duration-300 ${
                      isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    Sign In
                  </Button>
                  <Button
                    className={`bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2 transition-all duration-300 ${
                      isScrolled ? 'shadow-md' : ''
                    }`}
                    onClick={() => setIsSignUpModalOpen(true)}
                  >
                    Sign Up
                  </Button>
                </>
              )}

              {/* Profile & Menu */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={async () => {
                    if (isSignedIn) {
                      await router.push('/profile');
                    } else {
                      setIsSignInModalOpen(true);
                    }
                  }}
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r cursor-pointer from-purple-500 to-blue-500 rounded-full flex items-center justify-center"
                >
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMenuClick}
                  className={`rounded-full p-2 transition-all duration-300 ${
                    isScrolled
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function isPhoneNumber(input: string) {
  return /^\d*$/.test(input);
}

function SignUpModal(props: ModalProps) {
  const {
    phoneNumber,
    setPhoneNumber,
    setOtp,
    isOtpStage,
    isLoading,
    signUp,
    verifyOtp,
    sendOtp,
    signUpError,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    isAuthComplete,
  } = useSignUp();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isPhoneNumber(val) || val.length > 10) return;
    setPhoneNumber(val);
  };
  const onVerifyPhone = async () => {
    await signUp();
  };

  const onVerify = async () => {
    await verifyOtp();
    if (isAuthComplete) props.onClose();
    // clearState()
  };

  return (
    <Modal {...props}>
      <Modal.Title>Sign Up</Modal.Title>
      <Modal.Body>
        <div className="flex flex-col justify-between gap-2 items-start">
          {signUpError && <p className="text-red-700">Error: {signUpError}</p>}
          {isOtpStage ? (
            <>
              <label className="text-xs text-gray-500">One Time Password</label>
              <OtpInput onChangeOtp={val => setOtp(val)} />
              <Button
                variant={'default'}
                onClick={sendOtp}
                className="bg-blue-800 hover:bg-blue-700 w-full"
              >
                Get Otp
              </Button>
              <Button
                variant={'default'}
                onClick={onVerify}
                className="bg-blue-800 hover:bg-blue-700 w-full"
              >
                Verify Otp
              </Button>
            </>
          ) : (
            <>
              <label className="text-xs text-gray-500">Phone Number</label>
              <Input type="tel" value={phoneNumber} onChange={onChange} />
              <label className="text-xs text-gray-500">First Name</label>
              <Input
                type="text"
                value={firstName || ''}
                onChange={e => setFirstName(e.target.value)}
              />
              <label className="text-xs text-gray-500">Last Name</label>
              <Input
                type="text"
                value={lastName || ''}
                onChange={e => setLastName(e.target.value)}
              />
              <Button
                variant={'default'}
                onClick={onVerifyPhone}
                className="bg-blue-800 hover:bg-blue-700 w-full"
              >
                {isLoading ? <>Loading</> : <>Verify Phone Number</>}
              </Button>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

function SignInModal(props: ModalProps) {
  const {
    phoneNumber,
    setPhoneNumber,
    setOtp,
    isOtpStage,
    isLoading,
    signIn,
    verifyOtp,
    sendOtp,
    signInError,
    isAuthComplete,
  } = useSignIn();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isPhoneNumber(val) || val.length > 10) return;
    setPhoneNumber(val);
  };
  const onVerifyPhone = async () => {
    await signIn();
  };

  const onVerify = async () => {
    await verifyOtp();
    if (isAuthComplete) props.onClose();
  };

  return (
    <Modal {...props}>
      <Modal.Title>Sign In</Modal.Title>
      <Modal.Body>
        <div className="flex flex-col justify-between gap-2 items-start">
          <label className="text-xs text-gray-500">
            {isOtpStage ? 'One Time Password' : 'Phone Number'}
          </label>
          {signInError && <p className="text-red-700">Error: {signInError}</p>}
          {isOtpStage ? (
            <>
              <OtpInput onChangeOtp={val => setOtp(val)} />
              <Button
                variant={'default'}
                onClick={sendOtp}
                className="bg-blue-800 hover:bg-blue-700 w-full"
              >
                Get Otp
              </Button>
              <Button
                variant={'default'}
                onClick={onVerify}
                className="bg-blue-800 hover:bg-blue-700 w-full"
              >
                Verify Otp
              </Button>
            </>
          ) : (
            <>
              <Input type="tel" value={phoneNumber} onChange={onChange} />
              <Button
                variant={'default'}
                onClick={onVerifyPhone}
                className="bg-blue-800 hover:bg-blue-700 w-full"
              >
                {isLoading ? <>Loading</> : <>Verify Phone Number</>}
              </Button>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
