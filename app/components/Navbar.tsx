"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  // Get session data using the useSession hook
  const { data: session, status } = useSession();

  return (
    <header className="px-5 py-3 bg-white shadow-md">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5">
          {status === "loading" ? (
            // Show loading state while session is being fetched
            <span>Loading...</span>
          ) : session ? (
            <>
              <Link href="/startup/create">
                <span>Profile</span>
              </Link>
              <button onClick={() => signOut()} className="hover:text-gray-600">
                <span>Logout</span>
              </button>
              <Link href={`/user/${session?.user?.name}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <button
              onClick={() => signIn("github")}
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
            >
              Sign in with GitHub
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
