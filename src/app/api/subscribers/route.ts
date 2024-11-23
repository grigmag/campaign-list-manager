import { NextResponse, type NextRequest } from "next/server";
import { campaignMonitorService } from "~/campaignMonitor/campaignMonitorService";
import type { CreateSubscriberRequestDto } from "~/dto/createSubscriber.dto";
import type { GetSubscribersResponseDto } from "~/dto/getSubscribers.dto";

export async function GET(_request: NextRequest) {
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

export async function POST(request: NextRequest) {
  // TODO validate body
  const body = (await request.json()) as CreateSubscriberRequestDto;

  try {
    await campaignMonitorService.createSubscriber(body.data);

    return NextResponse.json({
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create subscriber" },
      { status: 500 },
    );
  }
}
