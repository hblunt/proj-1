import React from "react";
import StartupForm from "@/components/StartupForm";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSession();

  if (!session) redirect("/");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Create a new startup</h1>
      </section>
      <StartupForm />
    </>
  );
};

export default page;
