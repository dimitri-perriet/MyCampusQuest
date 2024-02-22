import { dbConnect, db } from "@/libs/dbConnect";
import {NextResponse} from "next/server";

export async function POST(request) {
  await dbConnect();

  const { userId, questId } = await request.json();

  const userProgressionCollection = db.collection('user_progression');

  const existingQuest = await userProgressionCollection.findOne({ userId: userId, questId: questId });

  if (existingQuest) {
    return NextResponse.json({ message: 'Quest already completed by the user' });
  }

  const userProgression = {
    userId: userId,
    questId: questId,
    completed: true,
    completed_at: new Date()
  };

  await userProgressionCollection.insertOne(userProgression);

  return NextResponse.json({ message: 'User progression saved successfully' });
}

export async function GET(request) {
  await dbConnect();

  const userId = request.nextUrl.searchParams.get("userID");

  const userProgressionCollection = db.collection('user_progression');

  const completedQuests = await userProgressionCollection.find({ userId: userId, completed: true }).toArray();

  return NextResponse.json(completedQuests);
}