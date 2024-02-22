import { dbConnect, db } from "@/libs/dbConnect";
import {NextResponse} from "next/server";

export async function POST(request) {
  await dbConnect();

  // Récupérer les données de la requête
  const { userId, questId } = await request.json();

  // Récupérer la collection de quêtes et de progression de l'utilisateur
  const userProgressionCollection = db.collection('user_progression');

  // Créer un nouvel objet de progression pour l'utilisateur
  const userProgression = {
    userId: userId,
    questId: questId,
    completed: true,
    completed_at: new Date()
  };

  // Ajouter la progression de l'utilisateur à la collection user_progression
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