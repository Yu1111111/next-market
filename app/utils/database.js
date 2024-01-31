import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://cheese:mYuukosuge6537841@cluster0.ord1woj.mongodb.net/nextAppDataBase?retryWrites=true&w=majority"
    );
    console.log("MongoDBに接続したぜ。");
  } catch (error) {
    console.log("MongoDBの接続に失敗したぜ。");
    throw new Error();
  }
};

export default connectDB;
