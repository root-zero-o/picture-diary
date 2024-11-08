import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    message: "next api 테스트 ~~",
  });
};
