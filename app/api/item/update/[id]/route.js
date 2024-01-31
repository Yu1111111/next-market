import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function PUT(req, context) {
  const reqBody = await req.json();
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(context.params.id);

    if (singleItem.email === reqBody.email) {
      await ItemModel.updateOne({ _id: context.params.id }, reqBody);
      return NextResponse.json({
        message: "⭕️編集成功⭕️",
      });
    } else {
      return NextResponse.json({
        message: "他の人が作成したアイテムは編集できないよ！",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "❌編集失敗❌",
    });
  }
}
