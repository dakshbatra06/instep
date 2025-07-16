import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User, ThumbsUp, ThumbsDown, RefreshCw, ChevronDown, ChevronUp, Sparkles, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  type: "ai" | "user";
  content: string;
  timestamp: Date;
  stage?: string;
  actions?: Array<{
    id: string;
    label: string;
    variant?: "default" | "outline" | "destructive";
  }>;
  expandable?: {
    title: string;
    content: string;
  };
}

export function ChatInterface({ campaign }) {
  const [count, setCount] = useState(1)
  console.log(campaign)
  const [messages, setMessages] = useState(() =>
    campaign && campaign.plan
      ? [{
          type: "ai",
          content: "Chosen marketing channels:" + campaign.channels + "\n\n" + campaign.plan + "\nDo you approve this plan (yes/no)?"
        }]
      : []
  );
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      type: "user",
      content: inputValue,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    try {

      // if (count == 1 || count == 4 || count == 5) {
      //   const response_bad = await fetch("https://70b745e14fe7.ngrok-free.app/respond", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ message: inputValue, session_id: "default" }),
      //   });
      // }
      
      const response = await fetch("https://70b745e14fe7.ngrok-free.app/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputValue, session_id: "default" }),
      });
      if (!response.ok) throw new Error("Failed to get AI response");
      const data = await response.json();
      let content = null;

      console.log(data.state)
    
      if (count==1) {
        content = data.state.channel_results.tiktok
        if (content == "" || content == null) {
          const response = await fetch("https://70b745e14fe7.ngrok-free.app/respond", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: inputValue, session_id: "default" }),
        });
          if (!response.ok) throw new Error("Failed to get AI response");
          const data = await response.json();
          content = data.state.channel_results.tiktok;
      }
    }
      else if (count==2) {
        content = data.state.channel_results.instagram 
        if (content == "" || content == null) {
          const response = await fetch("https://70b745e14fe7.ngrok-free.app/respond", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: inputValue, session_id: "default" }),
        });
          if (!response.ok) throw new Error("Failed to get AI response");
          const data = await response.json();
          content = data.state.channel_results.instagram;
      }
      } else if (count==3) {
        content = data.state.channel_results.email 
        if (content == "" || content == null) {
          const response = await fetch("https://70b745e14fe7.ngrok-free.app/respond", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: inputValue, session_id: "default" }),
        });
          if (!response.ok) throw new Error("Failed to get AI response");
          const data = await response.json();
          content = data.state.channel_results.email;
      }
      } else if (count == 4) {
        content = data.state.channel_results.linkedin 
        if (content == "" || content == null) {
          const response = await fetch("https://70b745e14fe7.ngrok-free.app/respond", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: inputValue, session_id: "default" }),
        });
          if (!response.ok) throw new Error("Failed to get AI response");
          const data = await response.json();
          content = data.state.channel_results.linkedin;
      }
      } else if (count ==5) {
        content = data.state.compliance_feedback 
        if (content == "" || content == null) {
          const response = await fetch("https://70b745e14fe7.ngrok-free.app/respond", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: inputValue, session_id: "default" }),
        });
          if (!response.ok) throw new Error("Failed to get AI response");
          const data = await response.json();
          content = data.state.compliance_feedback;
      }
      } else if (count ==6) {
        content = data.state.campaign_brief 
        if (content == "" || content == null) {
          const response = await fetch("https://70b745e14fe7.ngrok-free.app/respond", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: inputValue, session_id: "default" }),
        });
          if (!response.ok) throw new Error("Failed to get AI response");
          const data = await response.json();
          content = data.state.campaign_brief;
      }
      }
      setCount(count+1);
      
      const aiResponse = {
        type: "ai",
        content: content|| "AI did not return a response.",

      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (err) {
      console.log(err)
      setMessages(prev => [...prev, { type: "ai", content: "Sorry, there was an error getting a response from the AI." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-accent">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center animate-glow shadow-lg">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">AI Strategy Session</h1>
            </div>
            {campaign && (
              <Badge variant="outline" className="mb-6 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm">
                {campaign.title}
              </Badge>
            )}
          </div>

          {/* Chat Messages */}
          <div className="space-y-6 mb-8">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-4 animate-fade-in",
                  message.type === "user" ? "justify-end" : "justify-start"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {message.type === "ai" && (
                  <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
                <div className={cn(
                  "max-w-[80%]",
                  message.type === "user" ? "items-end" : "items-start"
                )}>
                  <Card className={cn(
                    "bg-gradient-card border-0 shadow-lg rounded-2xl overflow-hidden",
                    message.type === "user" ? "bg-gradient-primary text-primary-foreground" : ""
                  )}>
                    <CardContent className="p-6">
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        <ReactMarkdown>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                {message.type === "user" && (
                  <div className="w-10 h-10 bg-secondary rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <User className="w-5 h-5 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4 animate-fade-in">
                <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <Card className="bg-gradient-card border-0 shadow-lg rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <span className="text-sm text-muted-foreground">AI is thinking...</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <Card className="bg-gradient-card border-0 shadow-lg sticky bottom-6 rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Textarea
                  placeholder="Ask for changes, request more details, or approve the strategy..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 min-h-[60px] resize-none rounded-xl border-0 bg-background/50 shadow-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  className="rounded-xl px-6 py-4 text-lg font-semibold shadow-lg"
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}