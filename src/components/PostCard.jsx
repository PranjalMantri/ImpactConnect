import { useState, useEffect } from "react";
import supabase from "../supabase/client";
import {
  Heart,
  MessageSquare,
  Handshake,
  DollarSign,
  Lightbulb,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/Card";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

const getTagIcon = (tag) => {
  const iconProps = { className: "h-3 w-3 mr-1.5" };
  switch (tag) {
    case "achievement":
      return <Handshake {...iconProps} />;
    case "opportunity":
      return <Lightbulb {...iconProps} />;
    case "request":
      return <DollarSign {...iconProps} />;
    default:
      return null;
  }
};

const Comment = ({ comment }) => {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment?.author?.avatar_url || ""} />
        <AvatarFallback>{comment?.author?.full_name?.[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-grow rounded-lg bg-gray-100 px-3 py-2">
        <p className="text-sm font-semibold">{comment?.author?.full_name}</p>
        <p className="text-sm text-gray-600">{comment?.content}</p>
      </div>
    </div>
  );
};

const CommentInput = ({ currentUser, onAddComment }) => {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      setIsSubmitting(true);
      await onAddComment(commentText);
      setCommentText("");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={currentUser?.avatar_url || ""} />
        <AvatarFallback>{currentUser?.full_name?.[0]}</AvatarFallback>
      </Avatar>
      <Input
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        className="flex-grow"
        disabled={isSubmitting}
      />
      <Button
        type="submit"
        size="sm"
        disabled={!commentText.trim() || isSubmitting}
      >
        {isSubmitting ? "Posting..." : "Post"}
      </Button>
    </form>
  );
};

const PostCard = ({ post, author, onToggleLike, currentUser }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(
    post.stats.comments_count || 0
  );
  const [loadingComments, setLoadingComments] = useState(false);

  const isLiked = post.viewer_interaction.is_liked;
  const primaryTag = post.tags[0] || "update";

  useEffect(() => {
    const fetchComments = async () => {
      setLoadingComments(true);
      const { data, error } = await supabase
        .from("comments")
        .select("*, author:profiles(*)")
        .eq("post_id", post.id)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching comments:", error);
      } else {
        setComments(data);
        setCommentsCount(data.length);
      }
      setLoadingComments(false);
    };
    fetchComments();
  }, [showComments, post.id]);

  const handleAddComment = async (newCommentContent) => {
    const { data: newComment, error } = await supabase
      .from("comments")
      .insert({
        content: newCommentContent,
        author_id: currentUser.id,
        post_id: post.id,
      })
      .select("*, author:profiles(*)")
      .single();

    if (error) {
      console.error("Error adding comment:", error);
    } else if (newComment) {
      setComments([...comments, newComment]);
      setCommentsCount(comments.length + 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={author.avatar_url || ""} />
            <AvatarFallback>{author.full_name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="font-semibold">{author.full_name}</p>
            <p className="text-sm text-gray-500">
              {author.user_type.charAt(0).toUpperCase() +
                author.user_type.slice(1)}{" "}
              • {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
          <span className="flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
            {getTagIcon(primaryTag)}
            {primaryTag.charAt(0).toUpperCase() + primaryTag.slice(1)}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        {post.media?.[0]?.type === "image" && (
          <img
            src={post.media[0].url}
            alt="Post content"
            className="rounded-lg mb-4 border"
          />
        )}
        <p className="whitespace-pre-wrap">{post.content}</p>
      </CardContent>

      <CardFooter className="flex gap-4 border-t pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleLike(post.id)}
          className={`flex items-center ${
            isLiked
              ? "text-red-500 hover:bg-red-50"
              : "text-gray-500 hover:text-red-500"
          }`}
        >
          <Heart
            className={`mr-2 h-4 w-4 transition-colors ${
              isLiked ? "fill-current" : ""
            }`}
          />
          <span className="font-medium">{post.stats.likes_count}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
          className="flex items-center text-gray-500 hover:text-blue-600"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          <span className="font-medium">{commentsCount}</span>
        </Button>
      </CardFooter>

      {showComments && (
        <div className="p-4 pt-2 border-t space-y-4">
          <CommentInput
            currentUser={currentUser}
            onAddComment={handleAddComment}
          />
          {loadingComments ? (
            <p className="text-sm text-gray-500">Loading comments...</p>
          ) : (
            <div className="space-y-4">
              {comments.length > 0 &&
                comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default PostCard;
