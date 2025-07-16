import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Eye, ChevronRight, TrendingUp, Target, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface CampaignCardProps {
  campaign: {
    id: string;
    title: string;
    goal: string;
    status: "planning" | "review" | "published" | "paused";
    lastUpdated: string;
    channels: string[];
    engagement?: number;
    progress?: number;
  };
  onClick: () => void;
}

const statusConfig = {
  planning: {
    label: "In Planning",
    variant: "secondary" as const,
    color: "bg-info text-info-foreground",
  },
  review: {
    label: "Needs Review",
    variant: "secondary" as const,
    color: "bg-warning text-warning-foreground",
  },
  published: {
    label: "Published",
    variant: "secondary" as const,
    color: "bg-success text-success-foreground",
  },
  paused: {
    label: "Paused",
    variant: "secondary" as const,
    color: "bg-muted text-muted-foreground",
  },
};

export function CampaignCard({ campaign, onClick }: CampaignCardProps) {
  console.log("HELLO")
  const [data, setData] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem("campaign");
    console.log(stored);
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, [])

  return (
    <Card className="group cursor-pointer bg-gradient-card border-0 shadow-lg rounded-2xl overflow-hidden" onClick={onClick}>
      <CardHeader className="pb-4 px-6 pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {campaign.title}
            </CardTitle>
            <div className="flex items-center text-xs text-muted-foreground mt-3">
              <Clock className="w-3 h-3 mr-1" />
              {campaign.lastUpdated}
            </div>
          </div>
          <div className="p-2 rounded-full bg-accent/50 group-hover:bg-primary/10 transition-colors duration-300">
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 px-6 pb-6">
        <div className="space-y-5">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/30">
            <div className="p-2 rounded-lg bg-primary/10">
              <Target className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {campaign.goal}
            </p>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/30">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-wrap gap-2 flex-1">
              {campaign.channels.map((channel) => (
                <Badge key={channel} variant="outline" className="text-xs px-3 py-1 rounded-full bg-background/50">
                  {channel}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}