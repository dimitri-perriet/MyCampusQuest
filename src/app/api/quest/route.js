import { dbConnect, db } from "@/libs/dbConnect";
import {NextResponse} from "next/server";

export async function GET() {
  await dbConnect();

  const collection = db.collection('quest');
  const quests = await collection.find().toArray();

  return NextResponse.json(quests);
}