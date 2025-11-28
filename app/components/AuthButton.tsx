import { User } from "firebase/auth";
import Image from "next/image";

interface AuthButtonProps {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export default function AuthButton({ user, loading, signInWithGoogle, logout }: AuthButtonProps) {
  return (
    <div className="flex justify-end mb-6 md:absolute md:top-6 md:right-6 md:mb-0 z-20">
      {loading ? (
        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse shadow-sm"></div>
      ) : user ? (
        <div className="group flex items-center gap-3 pl-1.5 pr-4 py-1.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 ease-out">
          {user.photoURL ? (
            <Image 
              src={user.photoURL} 
              alt={user.displayName || "User"} 
              width={36}
              height={36}
              className="rounded-full ring-2 ring-white dark:ring-zinc-800 object-cover shadow-sm"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {user.displayName?.[0] || "U"}
            </div>
          )}
          
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100 leading-none">
              {user.displayName?.split(' ')[0]}
            </span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
              Online
            </span>
          </div>

          <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block"></div>

          <button 
            onClick={logout}
            className="text-zinc-400 hover:text-red-500 transition-colors cursor-pointer p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="group flex items-center gap-3 pl-2 pr-5 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <div className="bg-white p-1.5 rounded-full">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-wide">Sign in</span>
        </button>
      )}
    </div>
  );
}
