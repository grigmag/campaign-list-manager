import { type Subscriber } from "~/types/Subscriber.interface";
import { env } from "../env";
import { type GetSubscribersCmResponseDto } from "./dto/getSubscribers.cm.dto";
import type { CreateSubscriberCmRequestDto } from "./dto/createSubscriber.cm.dto";

class CampaignMonitorService {
  private readonly baseUrl = "https://api.createsend.com/api/v3.3";
  private readonly apiKey = env.CAMPAIGN_MONITOR_API_KEY;
  private readonly clientId = env.CAMPAIGN_MONITOR_CLIENT_ID;
  private readonly listId = env.CAMPAIGN_MONITOR_LIST_ID;

  private readonly headers = {
    Authorization: `Basic ${Buffer.from(this.apiKey).toString("base64")}`,
    "Content-Type": "application/json",
  };

  async getSubscribers(): Promise<Subscriber[]> {
    const response = await fetch(
      `${this.baseUrl}/lists/${this.listId}/active.json`,
      { headers: this.headers },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch subscribers: ${response.statusText}`);
    }

    const data = (await response.json()) as GetSubscribersCmResponseDto;

    return data.Results.map((subscriber) => ({
      email: subscriber.EmailAddress,
      name: subscriber.Name,
    }));
  }

  async createSubscriber(subscriber: Subscriber): Promise<void> {
    const body: CreateSubscriberCmRequestDto = {
      EmailAddress: subscriber.email,
      Name: subscriber.name,
      ConsentToTrack: "Yes",
    };

    const response = await fetch(
      `${this.baseUrl}/subscribers/${this.listId}.json`,
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch subscribers: ${response.statusText}`);
    }
  }

  async deleteSubscriber(subscriber: Subscriber): Promise<void> {
    const params = new URLSearchParams({
      email: subscriber.email,
    });

    const response = await fetch(
      `${this.baseUrl}/subscribers/${this.listId}.json?${params}`,
      {
        method: "DELETE",
        headers: this.headers,
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch subscribers: ${response.statusText}`);
    }
  }
}

export const campaignMonitorService = new CampaignMonitorService();
