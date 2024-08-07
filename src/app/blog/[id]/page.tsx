// app/blog/[id]/page.tsx
import { getPostById } from "@/lib/action";
import { PostType } from "@/lib/types";
import { notFound } from "next/navigation";
import React from "react";
import PostActions from "@/components/postActions";

const Page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const post: PostType = (await getPostById(params.id)) as PostType;
  if (!post) {
    notFound();
  }
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{post.content}</p>
        <PostActions postId={post.id} />
      </div>
    </div>
  );
};

export default Page;