'use client';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import Popup from 'reactjs-popup';
import { signout } from '@/lib/actions/auth-actions';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const UserPopup = ({ openNav, setOpenNav, scrolled = false }) => {
  const { user, setUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    if (mounted) {
      localStorage.removeItem('user');

      setUser(null);
      await signout();
    }
  };

  // Only render component content after mounting on clientt
  if (!mounted) {
    // Return a placeholder with identical structure to avoid hydration mismatch
    return (
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
        <div className="rounded-lg bg-white/20 px-4 py-1.5 font-medium text-black transition-all duration-300 ease-out">
          <span>Login</span>
        </div>
        <div className="rounded-lg bg-white bg-opacity-90 px-6 py-1.5 font-medium text-black transition-all duration-300 ease-out">
          <span>Sign up</span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => {
        // router.push('/dashboard');
        setOpenNav(!openNav);
      }}
      className="flex flex-col items-center justify-center gap-5 md:flex-row"
    >
      {/* if username is not available and onboarding  is false*/}
      {user && !user?.username && !user?.onboarding ? (
        <Link
          href="/onboarding"
          className={`rounded-lg px-3 py-2 font-medium transition-colors duration-300 ${'bg-gray-100 text-black dark:bg-gray-800 dark:text-white'}`}
        >
          Finish Onboarding
        </Link>
      ) : user && user?.username ? (
        <>
          <Link
            href="/dashboard"
            className={`rounded-lg px-3 py-2 font-medium transition-colors duration-300 ${'bg-gray-100 text-black dark:bg-gray-800 dark:text-white'}`}
          >
            Load Dashboard
          </Link>
          <div className="h-[42px] w-[42px] overflow-hidden rounded-full border-[1px] border-solid border-gray-200 text-2xl text-white dark:border-gray-700">
            <Popup
              trigger={
                <button className="flex h-full w-full items-center justify-center rounded-full">
                  <Image
                    className="h-full w-full rounded-full object-cover"
                    src={user?.avatarURL || '/default-avatar.png'}
                    alt="Avatar"
                    width={42}
                    height={42}
                    style={{
                      borderRadius: '100%',
                      objectFit: 'cover',
                      height: '50px',
                      width: '50px',
                    }}
                  />
                </button>
              }
            >
              {(close) => (
                <aside className="flex w-[120px] flex-col items-center gap-3 rounded-lg border border-solid border-bento-violet bg-white p-3 text-gray-800 dark:bg-gray-900 dark:text-white">
                  <p className="font-medium">{user?.name?.split(' ')[0]}</p>
                  <button
                    onClick={() => {
                      handleSignOut();
                      close(); // Close the popup
                    }}
                    className="w-full rounded-md border border-solid border-bento-violet bg-bento-violet bg-opacity-90 py-2 text-sm font-medium text-white transition-all duration-200 ease-out"
                  >
                    Log Out
                  </button>
                </aside>
              )}
            </Popup>
          </div>
        </>
      ) : (
        <>
          <div
            className={`rounded-lg px-4 py-1.5 font-medium transition-all duration-300 ease-out ${
              scrolled ? 'bg-gray-100 text-black' : 'bg-white text-black'
            }`}
          >
            <Link href="/login" onClick={() => setOpenNav(!openNav)}>
              Login
            </Link>
          </div>
          <div
            className={`rounded-lg px-6 py-1.5 font-medium ${
              scrolled ? 'bg-black text-white' : 'bg-white text-black'
            } bg-opacity-90`}
          >
            <Link href="/signup" onClick={() => setOpenNav(!openNav)}>
              Sign up
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPopup;
