import { useState, useEffect } from "react";
import supabase from "../supabase/client";
import Navbar from "../components/Navbar";
import CreatePostCard from "../components/CreatePostCard";
import PostCard from "../components/PostCard";

const HomePage = () => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        const { data: userProfile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(userProfile);
      }
    };
    getSession();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      // This query now includes author profile and checks if the current user has liked each post
      const { data: postsData, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          author: profiles(*),
          likes(user_id)
        `
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else if (postsData) {
        const processedPosts = postsData.map((post) => ({
          ...post,
          viewer_interaction: {
            is_liked: post.likes.some(
              (like) => like.user_id === session?.user?.id
            ),
          },
        }));
        setPosts(processedPosts);
      }
      setLoading(false);
    };

    if (session) fetchPosts();
  }, [session]);

  const handleCreatePost = async ({ content, tag, file }) => {
    let mediaData = [];
    if (file) {
      const filePath = `${session.user.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("posts")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("posts").getPublicUrl(filePath);

      mediaData.push({ type: "image", url: publicUrl });
    }

    const { data: newPost, error } = await supabase
      .from("posts")
      .insert({
        content,
        author_id: session.user.id,
        tags: [tag],
        media: mediaData,
        stats: { likes_count: 0, comments_count: 0, shares_count: 0 },
      })
      .select("*, author: profiles(*), likes(user_id)")
      .single();

    if (error) {
      console.error("Error creating post:", error);
    } else {
      const processedPost = {
        ...newPost,
        viewer_interaction: { is_liked: false },
      };
      setPosts([processedPost, ...posts]);
    }
  };

  const handleToggleLike = async (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const isLiked = post.viewer_interaction.is_liked;
          return {
            ...post,
            stats: {
              ...post.stats,
              likes_count: isLiked
                ? post.stats.likes_count - 1
                : post.stats.likes_count + 1,
            },
            viewer_interaction: { is_liked: !isLiked },
          };
        }
        return post;
      })
    );

    const { error } = await supabase.rpc("toggle_like", {
      post_id_arg: postId,
    });
    if (error) console.error("Error toggling like:", error);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mt-10 flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary-600">
          Community Feed
        </h1>
        <div className="max-w-2xl mx-auto space-y-8">
          {profile && (
            <CreatePostCard
              currentUser={profile}
              onCreatePost={handleCreatePost}
            />
          )}
          {loading && <p className="text-center">Loading posts...</p>}
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              author={post.author}
              onToggleLike={handleToggleLike}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
