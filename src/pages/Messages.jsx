import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
import { ScrollArea } from "../components/ui/ScrollArea";
import { Send } from "lucide-react";

// --- Dummy Data for Frontend Development ---

// The current user (a Volunteer)
const DUMMY_SESSION = {
  user: { id: "user-volunteer-123", email: "volunteer@example.com" },
};

// Dummy profiles for users in conversations
const DUMMY_PROFILES = {
  "user-volunteer-123": { full_name: "Anya Sharma", avatar_url: "/anya.jpg" },
  "user-ngo-456": {
    full_name: "Green Earth Foundation",
    avatar_url: "/green-earth.jpg",
  },
  "user-donor-789": { full_name: "John Donor", avatar_url: "/john.jpg" },
};

// Simplified conversation list. We'll map to the other participant's profile for display.
const DUMMY_CONVERSATIONS = [
  {
    conversation_id: "conv-1",
    other_participant_id: "user-ngo-456",
    conversations: { updated_at: "2025-10-10T11:00:00Z" },
  },
  {
    conversation_id: "conv-2",
    other_participant_id: "user-donor-789",
    conversations: { updated_at: "2025-10-09T15:30:00Z" },
  },
];

// Messages organized by conversation ID
const DUMMY_MESSAGES = {
  "conv-1": [
    {
      id: "msg-1-1",
      sender_id: "user-ngo-456",
      content:
        "Hello Anya, we saw your message about volunteering next Saturday. Are you available from 9 AM?",
      created_at: "2025-10-10T10:55:00Z",
    },
    {
      id: "msg-1-2",
      sender_id: "user-volunteer-123",
      content:
        "Yes, 9 AM works perfectly for me! Looking forward to helping out.",
      created_at: "2025-10-10T11:00:00Z",
    },
  ],
  "conv-2": [
    {
      id: "msg-2-1",
      sender_id: "user-donor-789",
      content:
        "Hi, I'm interested in the flood relief campaign. Is there a specific item that is most needed right now?",
      created_at: "2025-10-09T15:25:00Z",
    },
    {
      id: "msg-2-2",
      sender_id: "user-volunteer-123",
      content: "Thank you! We desperately need dry food and blankets.",
      created_at: "2025-10-09T15:30:00Z",
    },
  ],
};

// --- Component ---

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState("conv-1"); // Default to the first conversation
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState(DUMMY_CONVERSATIONS);
  const [messages, setMessages] = useState(
    DUMMY_MESSAGES[selectedConversation] || []
  );
  const session = DUMMY_SESSION; // Use dummy session

  // Effect to simulate data fetching when selected conversation changes
  useEffect(() => {
    if (selectedConversation) {
      // Simulate mapping messages with profiles
      const conversationMessages = DUMMY_MESSAGES[selectedConversation] || [];
      const messagesWithProfiles = conversationMessages.map((message) => ({
        ...message,
        profile: DUMMY_PROFILES[message.sender_id],
      }));
      setMessages(messagesWithProfiles);
    } else {
      setMessages([]);
    }
  }, [selectedConversation]);

  // Simplified mutation function
  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender_id: session.user.id,
      content: newMessage,
      created_at: new Date().toISOString(),
      profile: DUMMY_PROFILES[session.user.id],
    };

    // Simulate sending and updating the chat window
    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setNewMessage("");

    // console.log(`Message sent in ${selectedConversation}: ${newMsg.content}`);
  };

  const isSending = false; // Dummy sending state

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mt-8 flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Messages</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          {/* Conversation List */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                {conversations.map((conv) => {
                  const otherProfile = DUMMY_PROFILES[
                    conv.other_participant_id
                  ] || { full_name: "Unknown User" };
                  return (
                    <div
                      key={conv.conversation_id}
                      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/70 rounded-lg mb-2 transition-colors ${
                        selectedConversation === conv.conversation_id
                          ? "bg-muted"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedConversation(conv.conversation_id)
                      }
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={otherProfile.avatar_url} />
                        <AvatarFallback>
                          {otherProfile.full_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">
                          {otherProfile.full_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last active:{" "}
                          {new Date(
                            conv.conversations.updated_at
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {conversations.length === 0 && (
                  <p className="text-muted-foreground text-sm p-4">
                    No conversations yet
                  </p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Message Panel */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedConversation
                  ? DUMMY_PROFILES[
                      conversations.find(
                        (c) => c.conversation_id === selectedConversation
                      )?.other_participant_id
                    ]?.full_name || "Chat"
                  : "Select a conversation"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-[500px] p-0">
              {selectedConversation ? (
                <>
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => {
                        const isSender = message.sender_id === session.user?.id;
                        return (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${
                              isSender ? "flex-row-reverse" : ""
                            }`}
                          >
                            <Avatar className="h-8 w-8 mt-auto">
                              <AvatarImage
                                src={message.profile?.avatar_url || ""}
                              />
                              <AvatarFallback>
                                {message.profile?.full_name?.[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`p-3 rounded-xl max-w-[70%] text-sm ${
                                isSender
                                  ? "bg-primary text-primary-foreground rounded-br-none ml-auto"
                                  : "bg-muted rounded-tl-none mr-auto"
                              }`}
                            >
                              <p>{message.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  isSender
                                    ? "text-primary-foreground/80"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {new Date(
                                  message.created_at
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                  {/* Message Input */}
                  <div className="flex gap-2 p-4 border-t">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && newMessage.trim()) {
                          sendMessage();
                        }
                      }}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!newMessage.trim() || isSending}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  Select a conversation to start messaging
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Messages;
