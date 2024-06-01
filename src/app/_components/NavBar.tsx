"use client";
import React, { useState } from "react";
import { getServerAuthSession } from "../../server/auth";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/trpc/react";
const NavBar = () => {
  const [menuOpen, setmenuOpen] = useState(false);

  const session = api.user.getInfo.useQuery();
  return (
    <div>
      <nav className="flex w-full items-center justify-between bg-gradient-to-b from-white to-[#ffffffc4] p-4 text-slate-950 shadow-md ">
        <h1 className="font-jersey text-xl">Project Manager</h1>
        <div className="flex">
          <Link
            href={session.data?.user ? "api/auth/signout" : "api/auth/signin"}
            className="p-4 hover:rounded-lg hover:bg-slate-400"
          >
            {session.data?.user ? "Sign out" : "Sign in"}
          </Link>
          <img
            src={session ? session.data?.image ?? "/user.png" : "/user.png"}
            width={50}
            height={50}
            className="cursor-pointer rounded-full"
            onClick={() => setmenuOpen((prev) => !prev)}
          />
        </div>
        {menuOpen && (
          <div className=" font-jersey absolute right-0 top-16 flex flex-col rounded-lg bg-slate-100 p-4">
            <Link href="/" className="p-4 hover:rounded-lg hover:bg-slate-400">
              Home
            </Link>
            <Link
              href="/TasksPage"
              className="p-4 hover:rounded-lg hover:bg-slate-400"
            >
              Tasks
            </Link>
            <Link
              href="/ProjectsPage"
              className="p-4 hover:rounded-lg hover:bg-slate-400"
            >
              Projects
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
