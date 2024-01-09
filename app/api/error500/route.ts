import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("teste error 500 no backend");
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
