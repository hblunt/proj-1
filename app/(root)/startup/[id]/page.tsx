import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY_BY_ID } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

import markdownit from "markdown-it";

const md = new markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: { id: string } }) => {
  console.log("Received params:", params);
  console.log("ID used for fetching:", params.id);

  if (!params.id) {
    console.error("No ID provided in params");
    return notFound();
  }

  try {
    const post = await client.fetch(STARTUP_QUERY_BY_ID, {
      id: params.id,
    });

    console.log("Fetched post:", post);

    if (!post) {
      console.error("Post not found for ID:", params.id);
      return notFound();
    }

    const parsedContent = md.render(post.pitch || "");

    return (
      <>
        <section className="pink_container !min-h-[230px">
          <p className="tag">{formatDate(post?._createdAt)}</p>
          <h1 className="text-3xl text-center text-white work-sans mt-16">
            {post.title}
          </h1>
          <p className="sub-heading !max-w-5xl">{post.description}</p>
        </section>
        <section className="section_container">
          <Image
            src={post.image}
            alt="thumbnail"
            className="mx-auto max-h-[1000px] w-auto h-auto rounded-xl"
            width={1000}
            height={1000}
          />
          <div className="space-y-5 mt-10 max-w-4xl mx-auto">
            <div className="flex-between gap-5">
              <Link
                href={`/user/${post.author?._id}`}
                className="flex gap-2 items-center mb-3"
              >
                <Image
                  src={post.author.image}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="rounded-full drop-shadow-lg"
                />
                <div>
                  <p className="text-20-medium">{post.author.name}</p>
                  <p className="text-16-medium !text-black-300">
                    @{post.author.username}
                  </p>
                </div>
              </Link>
              <p className="category">{post.category}</p>
            </div>
            <h3 className="text-30-bold">Pitch Details</h3>
            {parsedContent ? (
              <article
                className="prose max-w-4xl font-work-sans break-all"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className="no-result">No pitch details available</p>
            )}
          </div>
          <hr className="divider" />

          {/* EDITOR SELECTED STARTUPS*/}

          <Suspense fallback={<Skeleton className="view_skeleton" />}>
            <View id={params.id} />
          </Suspense>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return notFound();
  }
};

export default Page;
