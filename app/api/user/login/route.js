import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { SignJWT } from "jose";

export async function POST(req) {
  const reqBody = await req.json();
  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email: reqBody.email });
    if (savedUserData) {
      //ユーザー情報が存在する場合
      if (reqBody.password === savedUserData.password) {
        //パスワードが正しかった場合

        const secretKey = new TextEncoder().encode("next-market-app-book");
        const paylord = { email: reqBody.email };
        const token = await new SignJWT(paylord)
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("1d")
          .sign(secretKey);

        console.log(token);

        return NextResponse.json({
          message: "⭕️ログイン成功！",
          token: token,
        });
      } else {
        //パスワードが異なった場合
        return NextResponse.json({
          message: "❌ログイン失敗。パスワードが間違ってるよ。",
        });
      }
    } else {
      //ユーザー情報が存在しない場合
      return NextResponse.json({
        message: "❌ログイン失敗。アカウント登録して出直してくれ。",
      });
    }
  } catch (error) {
    return NextResponse.json({ message: "❌ログイン失敗。" });
  }
}
