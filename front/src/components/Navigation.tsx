import { Button } from "@/components/ui/button";
import { Plus, Zap, BarChart3, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl shadow-lg flex items-center justify-center animate-glow">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CampaignAI
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300 rounded-xl"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300 rounded-xl"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300 rounded-xl"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>

            <Button
              onClick={() => navigate("/new-campaign")}
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg rounded-xl ml-4"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}