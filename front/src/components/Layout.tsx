import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Search, Plus, Bell, User, Maximize2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col ml-64">
        {/* Top Navigation */}
        <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  className="pl-10 h-10 w-80 bg-background/50 border-0 rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate("/new-campaign")}
                className="bg-primary hover:bg-primary/90 transition-colors rounded-lg px-6 text-sm font-medium"
              >
                New Campaign
              </Button>
              
              <Button variant="ghost" size="icon" className="rounded-full">
                <Maximize2 className="w-4 h-4" />
              </Button>
              
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-coral rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">1</span>
                </div>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}