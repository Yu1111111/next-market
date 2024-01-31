import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  console.log("こちらミドルウェア");
  // const token = await req.header.get("Authorization")?.split(" ")[1];
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZXhwIjoxNzA2NDg0OTI3fQ.-n4JMtGOFFLsWrOs5H2yZpE4mltzb-G-EscDCaZ5r2k";
  if (!token) {
    return NextResponse.json({ message: "トークンが存在しないよ" });
  }

  try {
    const secretKey = new TextEncoder().encode("next-market-app-book");
    const decodedJwt = await jwtVerify(token, secretKey);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({
      message: "トークンが一致しないよ。ログインし直してね。",
    });
  }
}

export const config = {
  matcher: [
    "/api/item/create",
    "/api/item/update/:path*",
    "/api/item/delete/:path*",
  ],
};
