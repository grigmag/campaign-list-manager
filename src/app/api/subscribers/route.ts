import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  return NextResponse.json({
    data: [{ name: "John Doe", email: "john@doe.com" }],
  });
}
