import Link from "next/link";
import NavBar  from "./_components/NavBar";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import CreateProject from "./_components/CreateProject";

export default async function Home() {
  
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col   bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      
      <CreateProject />
    </main>
  );
}

