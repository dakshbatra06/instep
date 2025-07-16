import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Sparkles, Target, Users, MessageSquare, Settings, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const channels = [
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "tiktok", label: "TikTok", icon: "🎵" },
  { id: "facebook", label: "Facebook", icon: "📘" },
  { id: "twitter", label: "Twitter", icon: "🐦" },
  { id: "linkedin", label: "LinkedIn", icon: "💼" },
  { id: "email", label: "Email", icon: "✉️" },
  { id: "sms", label: "SMS", icon: "📱" },
  { id: "youtube", label: "YouTube", icon: "🎥" },
];

const tones = [
  { id: "professional", label: "Professional" },
  { id: "casual", label: "Casual" },
  { id: "playful", label: "Playful" },
  { id: "authoritative", label: "Authoritative" },
  { id: "friendly", label: "Friendly" },
  { id: "urgent", label: "Urgent" },
];

export function NewCampaignForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    product: "",
    info:"",
    audience: "",
    tone: "",
    objectives: "",
    constraints: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [backendResponse, setBackendResponse] = useState<unknown>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBackendResponse(null);
    try {
      const response = await fetch("https://70b745e14fe7.ngrok-free.app/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to save campaign");
      const data = await response.json();
      setBackendResponse(data);
      // Optionally, get the new campaign ID from the backend:
      // localStorage.setItem("campaign", JSON.stringify(data));
      navigate(`/campaign/${data.session_id}/chat`, {state : {campaign: data}});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const isFormValid = formData.title && formData.product && formData.audience && formData.tone && formData.objectives;

  return (
    <div className="min-h-screen bg-gradient-accent">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 animate-glow shadow-lg">
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Create New Campaign</h1>
            <p className="text-muted-foreground text-lg">
              Let our AI strategist help you build the perfect marketing campaign
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="text-red-600 bg-red-100 rounded-lg px-4 py-2 mb-4">
                {error}
              </div>
            )}
            {backendResponse && (
              <div className="text-green-700 bg-green-100 rounded-lg px-4 py-2 mb-4">
                <pre className="whitespace-pre-wrap break-all text-xs">{JSON.stringify(backendResponse, null, 2)}</pre>
              </div>
            )}
            {/* Campaign Title */}
            <Card className="bg-gradient-card border-0 shadow-lg animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  Campaign Details
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-foreground">Campaign Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Summer Launch Campaign"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="mt-2 h-12 rounded-xl border-0 bg-background/50 shadow-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="product" className="text-sm font-medium text-foreground">Product/Service Description</Label>
                  <Textarea
                    id="product"
                    placeholder="Describe your product, key features, and unique selling points..."
                    value={formData.product}
                    onChange={(e) => setFormData(prev => ({ ...prev, product: e.target.value }))}
                    className="mt-2 rounded-xl border-0 bg-background/50 shadow-sm"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="objectives" className="text-sm font-medium text-foreground">Campaign Objectives</Label>
                  <Textarea
                    id="objectives"
                    placeholder="What do you want to achieve? (e.g., increase brand awareness, drive sales, generate leads)"
                    value={formData.objectives}
                    onChange={(e) => setFormData(prev => ({ ...prev, objectives: e.target.value }))}
                    className="mt-2 rounded-xl border-0 bg-background/50 shadow-sm"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Audience */}
            <Card className="bg-gradient-card border-0 shadow-lg animate-fade-in rounded-2xl overflow-hidden" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  Target Audience
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                <div>
                  <Label htmlFor="audience" className="text-sm font-medium text-foreground">Describe Your Target Audience</Label>
                  <Textarea
                    id="audience"
                    placeholder="e.g., Young professionals aged 25-35, tech-savvy, interested in sustainability..."
                    value={formData.audience}
                    onChange={(e) => setFormData(prev => ({ ...prev, audience: e.target.value }))}
                    className="mt-2 rounded-xl border-0 bg-background/50 shadow-sm"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="info" className="text-sm font-medium text-foreground">Brand Info</Label>
                  <Textarea
                    id="info"
                    placeholder="Share any important brand background, values, or context..."
                    value={formData.info}
                    onChange={(e) => setFormData(prev => ({ ...prev, info: e.target.value }))}
                    className="mt-2 rounded-xl border-0 bg-background/50 shadow-sm"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tone & Constraints */}
            <Card className="bg-gradient-card border-0 shadow-lg animate-fade-in rounded-2xl overflow-hidden" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Settings className="w-5 h-5 text-primary" />
                  </div>
                  Tone & Constraints
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                <div>
                  <Label htmlFor="tone" className="text-sm font-medium text-foreground">Brand Tone</Label>
                  <Input
                    id="tone"
                    placeholder="e.g., Professional, Playful, Friendly, etc."
                    value={formData.tone}
                    onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value }))}
                    className="mt-2 h-12 rounded-xl border-0 bg-background/50 shadow-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="constraints" className="text-sm font-medium text-foreground">Constraints (Optional)</Label>
                  <Textarea
                    id="constraints"
                    placeholder="Any restrictions, compliance needs, or must-avoid topics?"
                    value={formData.constraints}
                    onChange={(e) => setFormData(prev => ({ ...prev, constraints: e.target.value }))}
                    className="mt-2 rounded-xl border-0 bg-background/50 shadow-sm"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 transition-colors rounded-xl px-8 py-3 text-lg font-semibold shadow-lg"
                disabled={!isFormValid}
              >
                Next <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}