'use client';

import Link from "next/link";
import { useSession } from "next-auth/react";

const PostActions = ({ postId }: { postId: string }) => {
  const { data: session } = useSession();

  return (
    <div className="flex space-x-4">
      {session ? (
        <Link
          href={`/blog/update/${postId}`}
          className="inline-block px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
        >
          Edit Post
        </Link>
      ) : (
        <Link
          href="/login"
          className="inline-block px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          Login to Edit
        </Link>
      )}

      <Link
        href="/"
        className="inline-block px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PostActions;