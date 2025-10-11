import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "../components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/Button";
import {
  Heart,
  MessageSquare,
  Handshake,
  DollarSign,
  Lightbulb,
} from "lucide-react";

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

const PostCard = ({ post, author, onToggleLike }) => {
  const isLiked = post.viewer_interaction.is_liked;
  const primaryTag = post.tags[0] || "update";

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
            <p className="text-sm text-muted-foreground">
              {author.user_type.charAt(0).toUpperCase() +
                author.user_type.slice(1)}{" "}
              • {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
          <span className="flex items-center text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium">
            {getTagIcon(primaryTag)}
            {primaryTag.charAt(0).toUpperCase() + primaryTag.slice(1)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {/* Render image if it exists in the media array */}
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
              ? "text-red-500 hover:bg-red-50/50"
              : "text-muted-foreground hover:text-red-500"
          }`}
        >
          <Heart
            className={`mr-2 h-4 w-4 transition-colors ${
              isLiked ? "fill-red-500" : ""
            }`}
          />
          <span className="font-medium">{post.stats.likes_count}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
