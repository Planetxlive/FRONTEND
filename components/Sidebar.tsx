'use client';

import {
  X,
  Home,
  Eye,
  Heart,
  Search,
  FileText,
  CreditCard,
  Star,
  Settings,
  HelpCircle,
  LogOut,
  Dumbbell,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useSignOut from '@/hooks/auth/useSignOut';
import useAuth from '@/hooks/auth/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { signOut } = useSignOut();
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-all duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* User Profile */}
            {isSignedIn ? (
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500">
                    <AvatarImage src={user?.coverURL} alt="User" />
                    <AvatarFallback className="text-black text-lg font-semibold">
                      {`${user?.name.split(" ")[0][0] || ""}${user?.name.split(" ")[1][0] || ""}`}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {user?.name}
                        </h3>
                        <p className="text-sm text-gray-600">{user?.mobile}</p>
                      </div>
                      <Link href="/profile">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full"
                          onClick={onClose}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* My Activity */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">My Activity</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                    <Home className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-700">Contacted</p>
                  <p className="text-xs text-gray-500">Properties</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">08</p>
                </div>

                <div className="text-center p-3 bg-purple-50 rounded-xl border-2 border-purple-200 cursor-pointer">
                  <div className="w-10 h-10 mx-auto mb-2 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Eye className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-xs font-medium text-purple-700">Seen</p>
                  <p className="text-xs text-purple-600">Properties</p>
                  <p className="text-lg font-bold text-purple-900 mt-1">15</p>
                </div>

                <div className="text-center p-3 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-700">Saved</p>
                  <p className="text-xs text-gray-500">Properties</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">03</p>
                </div>

                <div className="text-center p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Search className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-700">Recent</p>
                  <p className="text-xs text-gray-500">Searches</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">12</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-6 space-y-2">
              <div
                onClick={() => {
                  onClose();
                  router.push('/blog');
                }}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Blogs</span>
              </div>

              {isSignedIn && (
                <div
                  onClick={() => {
                    onClose();
                    router.push('/blog/mine');
                  }}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <FileText className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">My Blogs</span>
                </div>
              )}

              <div
                onClick={() => {
                  onClose();
                  router.push('/gym');
                }}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <Dumbbell className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Gyms</span>
              </div>

              <div
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">My Reviews</span>
                </div>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  NEW
                </span>
              </div>

              <div
                onClick={onClose}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <CreditCard className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Payment History</span>
              </div>

              <div
                onClick={onClose}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Settings</span>
              </div>

              <div
                onClick={onClose}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Help & Support</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          {isSignedIn ? (
            <div className="p-6 border-t border-gray-200">
              <div
                onClick={() => signOut()}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 cursor-pointer transition-colors text-red-600"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
