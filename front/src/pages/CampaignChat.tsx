import { ChatInterface } from "@/components/ChatInterface";
import { useLocation } from "react-router-dom";

const CampaignChat = () => {
  const location = useLocation();
  return <ChatInterface campaign={location.state!.campaign.state}/>;
};

export default CampaignChat;