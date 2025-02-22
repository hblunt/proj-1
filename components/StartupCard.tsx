import React from "react";
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Startup } from "@/sanity.types";
import { Author } from "@/sanity.types";

export type StartupTypeCard = {
  _id: string;
  title: string | null;
  slug: {
    current?: string;
  } | null;
  _createdAt: string;
  author: {
    _id: string;
    name: string | null;
    image: string | null;
    bio: string | null;
  } | null;
  views: number | null;
  description: string | null;
  image: string | null;
  category: string | null;
};

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  console.log("Rendering StartupCard with post:", post);

  const {
    _id,
    _createdAt,
    views,
    author,
    description,
    image,
    category,
    title,
  } = post;

  return (
    <li className="startup-card group max-w-[400px]">
      <div className="flex-between">
        <p className="startup-card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/startup/${author?._id}`}>
          <Image
            className="rounded-full"
            src="https://picsum.photos/200/300"
            alt="placeholder"
            width={48}
            height={48}
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <Image
          src={image || "/placeholder.jpg"}
          alt="placeholder"
          className="startup-card_img"
          width={300}
          height={300}
        />
      </Link>
      <div className="flex-between mt-5 gap-3">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${post._id}`}>Read More</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
