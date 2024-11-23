import { NextResponse, type NextRequest } from "next/server";
import { campaignMonitorService } from "~/campaignMonitor/campaignMonitorService";
import type { CreateSubscriberRequestDto } from "~/app/api/subscribers/_dto/createSubscriber.dto";
import type { DeleteSubscriberRequestDto } from "~/app/api/subscribers/_dto/deleteSubscriber.dto";
import type { GetSubscribersResponseDto } from "~/app/api/subscribers/_dto/getSubscribers.dto";

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

// NOTE Having a DELETE /subscribers instead of
// e.g. /subscribers/[email] route is a bit weird,
// but avoids potential issues such as
// weird encoding of special characters in the URL
export async function DELETE(request: NextRequest) {
  // TODO validate body
  const body = (await request.json()) as DeleteSubscriberRequestDto;

  try {
    await campaignMonitorService.deleteSubscriber(body.data.email);

    return NextResponse.json({
      status: 204,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to delete subscriber" },
      { status: 500 },
    );
  }
}
