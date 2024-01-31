import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET(req, context) {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(context.params.id);
    return NextResponse.json({
      message: "⭕️一つのアイテムを取得しました。",
      singleItem: singleItem,
    });
  } catch (error) {
    return NextResponse.json({
      message: "❌一つのアイテムを取得できませんでした。",
    });
  }
}
