import { dbConnect, db } from "@/libs/dbConnect";
import {NextResponse} from "next/server";

export async function GET() {
  await dbConnect();

  const collection = db.collection('quest');
  const quests = await collection.find().toArray();

  return NextResponse.json(quests);
}

export async function POST(req) {
  await dbConnect();

  const { userId, questId } = req.body;
  console.log(req.body);

  const collection = db.collection('user_progression');
  await collection.insertOne({ userId, questId });

  return NextResponse.json({ message: 'User progress saved successfully' });
}