import { useState, useRef } from "react";
import { Button } from "../components/ui/Button";
import { Textarea } from "../components/ui/TextArea";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "../components/ui/Card";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { Send, Paperclip, X } from "lucide-react";

const CreatePostCard = ({ currentUser, onCreatePost }) => {
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("update");
  const [file, setFile] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsPosting(true);
    await onCreatePost({ content, tag, file });

    console.log("Post created:", { content, tag, file });
    setContent("");
    setTag("update");
    setFile(null);
    setIsPosting(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const postTags = ["update", "opportunity", "request", "achievement"];

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Share with the Community</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={tag} onValueChange={setTag}>
          <TabsList className="grid w-full grid-cols-4 h-9">
            {postTags.map((t) => (
              <TabsTrigger key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Textarea
          placeholder={`What's on your mind, ${currentUser.full_name}?`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
        {file && (
          <div className="flex items-center justify-between text-sm p-2 bg-muted rounded-md">
            <p className="truncate">{file.name}</p>
            <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        <Button onClick={handleSubmit} disabled={!content.trim() || isPosting}>
          <Send className="mr-2 h-4 w-4" />
          {isPosting ? "Posting..." : "Post"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePostCard;
