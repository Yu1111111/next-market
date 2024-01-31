import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export async function POST(req) {
  const reqBody = await req.json();
  try {
    await connectDB();
    await UserModel.create(reqBody);
    return NextResponse.json({ message: "⭕️ユーザー登録成功！" });
  } catch (error) {
    return NextResponse.json({ message: "❌ユーザー登録失敗" });
  }
}
