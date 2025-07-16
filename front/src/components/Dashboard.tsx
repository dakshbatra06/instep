import { useState } from "react";
import { CampaignCard } from "./CampaignCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Sparkles, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockCampaigns = [
  {
    id: "1",
    title: "Summer Launch Campaign",
    goal: "Drive awareness for our new summer product line launch with focus on Gen Z audience",
    status: "planning" as const,
    lastUpdated: "2 hours ago",
    channels: ["Instagram", "Linkedin", "Email"],
    engagement: 67,
    progress: 45,
  },
  {
    id: "2",
    title: "Q4 Holiday Push",
    goal: "Increase sales during holiday season with multi-channel approach",
    status: "review" as const,
    lastUpdated: "1 hour ago",
    channels: ["Linkedin", "Email"],
    engagement: 84,
    progress: 80,
  },
  {
    id: "3",
    title: "Brand Awareness Campaign",
    goal: "Build brand recognition in new market segments",
    status: "published" as const,
    lastUpdated: "3 hours ago",
    channels: ["LinkedIn", "Twitter", "Email"],
    engagement: 92,
    progress: 100,
  },
  {
    id: "4",
    title: "Product Demo Series",
    goal: "Educate customers about product features through video content",
    status: "paused" as const,
    lastUpdated: "5 hours ago",
    channels: ["Tiktok", "Email"],
    engagement: 58,
    progress: 30,
  },
  {
    id: "5",
    title: "Spring Flash Sale",
    goal: "Boost sales with a limited-time offer for spring collection",
    status: "published" as const,
    lastUpdated: "6 hours ago",
    channels: ["Instagram", "Tiktok", "Email"],
    engagement: 75,
    progress: 90,
  },
  {
    id: "6",
    title: "Customer Feedback Drive",
    goal: "Collect customer feedback for product improvement",
    status: "review" as const,
    lastUpdated: "12 hours ago",
    channels: ["Email", "TikTok"],
    engagement: 60,
    progress: 50,
  },
  {
    id: "7",
    title: "Influencer Partnership",
    goal: "Leverage influencers to reach new audiences",
    status: "planning" as const,
    lastUpdated: "4 days ago",
    channels: ["Instagram", "TikTok"],
    engagement: 80,
    progress: 20,
  },

];

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredCampaigns = mockCampaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.goal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCampaignClick = (campaignId: string) => {
    navigate(`/campaign/${campaignId}`);
  };

  // Calculate dashboard stats
  const totalCampaigns = mockCampaigns.length;
  const newestCampaign = mockCampaigns.reduce((latest, c) => {
    // Assume lastUpdated is in a format like '2 hours ago', '1 day ago', etc. Use array order as fallback.
    // If you want to use a real date, update the data and logic accordingly.
    return latest ? latest : c;
  }, null as typeof mockCampaigns[0] | null) || mockCampaigns[0];

  // Flatten all channels and count occurrences
  const channelCounts: Record<string, number> = {};
  mockCampaigns.forEach(c => {
    c.channels.forEach(channel => {
      channelCounts[channel] = (channelCounts[channel] || 0) + 1;
    });
  });
  const mostUsedChannel = Object.entries(channelCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  const totalChannels = Object.keys(channelCounts).length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-medium text-foreground mb-2">Campaign Analytics</h1>
            <p className="text-muted-foreground">
              Monitor and manage your marketing campaigns
            </p>
          </div>
          <Button
            onClick={() => navigate("/new-campaign")}
            className="bg-primary hover:bg-primary/90 transition-colors rounded-md px-4 py-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Stat Cards (4 per row) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col items-start min-h-[100px]">
          <p className="text-xs text-muted-foreground mb-1">Total Campaigns</p>
          <p className="text-lg font-semibold text-foreground">{totalCampaigns}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col items-start min-h-[100px]">
          <p className="text-xs text-muted-foreground mb-1">Newest Campaign</p>
          <p className="text-lg font-semibold text-foreground">{newestCampaign.title}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col items-start min-h-[100px]">
          <p className="text-xs text-muted-foreground mb-1">Most Used Channel</p>
          <p className="text-lg font-semibold text-foreground">{mostUsedChannel}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col items-start min-h-[100px]">
          <p className="text-xs text-muted-foreground mb-1">Total Channels</p>
          <p className="text-lg font-semibold text-foreground">{totalChannels}</p>
        </div>
      </div>

      {/* Campaign Grid (2 per row, wider cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-2xl shadow-md min-h-[220px] min-w-[380px] flex flex-col justify-between p-6 transition-all">
            <CampaignCard
              campaign={campaign}
              onClick={() => handleCampaignClick(campaign.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}