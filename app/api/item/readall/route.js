import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET() {
  try {
    await connectDB();
    const allItems = await ItemModel.find();
    return NextResponse.json({
      message: "⭕️全てのアイテムを読み込みました。",
      allItems: allItems,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "❌全てのアイテムを読み込めませんでした。",
    });
  }
}
export const revalidate = 0;
