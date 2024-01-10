import usePosts from "@/hooks/usePosts";
import { Post } from "@prisma/client";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}

export default function PostFeed({ userId }: PostFeedProps) {
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post: Post) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
}
