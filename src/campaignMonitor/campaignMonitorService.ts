import { env } from "../env";
import { type GetSubscribersCmResponseDto } from "./dto/getSubscribers.cm.dto";

class CampaignMonitorService {
  private readonly baseUrl = "https://api.createsend.com/api/v3.3";
  private readonly apiKey = env.CAMPAIGN_MONITOR_API_KEY;
  private readonly clientId = env.CAMPAIGN_MONITOR_CLIENT_ID;
  private readonly listId = env.CAMPAIGN_MONITOR_LIST_ID;

  async getSubscribers() {
    const response = await fetch(
      `${this.baseUrl}/lists/${this.listId}/active.json`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(this.apiKey).toString("base64")}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch subscribers: ${response.statusText}`);
    }

    const data = (await response.json()) as GetSubscribersCmResponseDto;

    return data;
  }
}

export const campaignMonitorService = new CampaignMonitorService();
