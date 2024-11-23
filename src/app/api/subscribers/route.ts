import { NextResponse } from "next/server";
import { campaignMonitorService } from "~/campaignMonitor/campaignMonitorService";
import type { GetSubscribersResponseDto } from "~/dto/getSubscribers.dto";

export async function GET(_request: Request) {
  try {
    const subscribers = await campaignMonitorService.getSubscribers();

    const response: GetSubscribersResponseDto = {
      data: subscribers,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 },
    );
  }
}
