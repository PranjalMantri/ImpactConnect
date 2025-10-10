import { useState } from "react";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/Button";
import { Textarea } from "../components/ui/TextArea";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "../components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/Tabs";
import {
  Heart,
  MessageSquare,
  Send,
  Handshake,
  DollarSign,
  Lightbulb,
} from "lucide-react";

// --- Dummy Data ---

// Dummy session for a logged-in Volunteer
const dummySession = { user: { id: "user-volunteer-123" } };

// Dummy profile for the current user
const dummyProfile = {
  full_name: "Anya Sharma",
  avatar_url: "/anya-avatar.jpg",
  user_type: "Volunteer",
};

// Dummy posts data reflecting NGO/Volunteer/Donor context
const dummyPosts = [
  {
    id: "post-1",
    content:
      "We successfully distributed 500 blankets to homeless shelters last night! Huge thanks to our volunteers and the generous donors who made this possible. 🙏",
    post_type: "achievement",
    created_at: "2025-10-09T10:00:00Z",
    likes_count: 85,
    comments_count: 22,
    user_id: "user-ngo-456",
    profile: {
      full_name: "Green Earth Foundation",
      avatar_url: "/green-earth.jpg",
      user_type: "NGO",
    },
    is_liked: false,
  },
  {
    id: "post-2",
    content:
      "We need 5 volunteers this Saturday for our beach clean-up drive. Transportation provided! Great for students needing community service hours. 🌊",
    post_type: "opportunity",
    created_at: "2025-10-08T15:30:00Z",
    likes_count: 31,
    comments_count: 10,
    user_id: "user-ngo-789",
    profile: {
      full_name: "Coastline Cleanup Crew",
      avatar_url: "/coastline.jpg",
      user_type: "NGO",
    },
    is_liked: true,
  },
  {
    id: "post-3",
    content:
      "Looking for a Donor who can sponsor a month of groceries for three families affected by the recent floods. Every contribution helps. Check our profile for details. 🥫",
    post_type: "request",
    created_at: "2025-10-07T09:15:00Z",
    likes_count: 15,
    comments_count: 8,
    user_id: "user-volunteer-123",
    profile: dummyProfile, // Current user posting a request
    is_liked: false,
  },
];

// --- Component ---

const CommunityFeed = () => {
  const [newPost, setNewPost] = useState("");
  const [postType, setPostType] = useState("update");
  const [posts, setPosts] = useState(dummyPosts);
  const [session] = useState(dummySession);

  // Simplified post creation
  const createPost = () => {
    if (!newPost.trim()) return;

    const newId = `post-${Date.now()}`;
    const newPostObject = {
      id: newId,
      content: newPost,
      post_type: postType,
      created_at: new Date().toISOString(),
      likes_count: 0,
      comments_count: 0,
      user_id: session.user.id,
      profile: dummyProfile,
      is_liked: false,
    };

    setPosts([newPostObject, ...posts]);
    setNewPost("");
    // console.log("Post created:", newPostObject);
  };

  // Simplified like toggle
  const toggleLike = (postId, currentIsLiked) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newLikesCount = currentIsLiked
            ? post.likes_count - 1
            : post.likes_count + 1;
          return {
            ...post,
            is_liked: !currentIsLiked,
            likes_count: newLikesCount,
          };
        }
        return post;
      })
    );
  };

  const postTypes = ["achievement", "opportunity", "update", "request"];
  const isPosting = false;

  // Helper to determine icon based on post type
  const getPostIcon = (type) => {
    switch (type) {
      case "achievement":
        return <Handshake className="h-3 w-3 mr-1" />;
      case "opportunity":
        return <Lightbulb className="h-3 w-3 mr-1" />;
      case "request":
        return <DollarSign className="h-3 w-3 mr-1" />;
      case "update":
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mt-10 flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary-600">
          Community Feed
        </h1>
        {/* Post Creation Card */}
        {session && (
          <Card className="mb-8 max-w-2xl mx-auto">
            <CardHeader>
              <h2 className="text-xl font-semibold">
                Share an Update or Opportunity
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={postType} onValueChange={(v) => setPostType(v)}>
                <TabsList className="grid w-full grid-cols-4 h-9">
                  {postTypes.map((type) => (
                    <TabsTrigger key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <Textarea
                placeholder={`Share a new ${postType} with the community...`}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={4}
              />
            </CardContent>
            <CardFooter>
              <Button
                onClick={createPost}
                disabled={!newPost.trim() || isPosting}
                className="ml-auto"
              >
                <Send className="mr-2 h-4 w-4" />
                Post
              </Button>
            </CardFooter>
          </Card>
        )}
        {/* Feed */}
        <div className="space-y-6 max-w-2xl mx-auto">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.profile?.avatar_url || ""} />
                    <AvatarFallback>
                      {post.profile?.full_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="font-semibold">{post.profile?.full_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {post.profile?.user_type} •{" "}
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="flex items-center text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium">
                    {getPostIcon(post.post_type)}
                    {post.post_type.charAt(0).toUpperCase() +
                      post.post_type.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{post.content}</p>
              </CardContent>
              <CardFooter className="flex gap-4 border-t pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleLike(post.id, post.is_liked)}
                  className={`flex items-center ${
                    post.is_liked
                      ? "text-red-500 hover:bg-red-50/50"
                      : "text-muted-foreground hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`mr-2 h-4 w-4 transition-colors ${
                      post.is_liked ? "fill-red-500" : ""
                    }`}
                  />
                  <span className="font-medium">{post.likes_count}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span className="font-medium">{post.comments_count}</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CommunityFeed;
