import { NextResponse } from "next/server";
import { campaignMonitorService } from "~/campaignMonitor/campaignMonitorService";

export async function GET(_request: Request) {
  try {
    const results = await campaignMonitorService.getSubscribers();

    return NextResponse.json({
      data: results,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 },
    );
  }
}
