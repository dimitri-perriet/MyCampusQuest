import mongoose, { Schema } from "mongoose";

const questSchema = new Schema({
    name: String,
    validate_code: String,
    description: String,
    lat: String,
    lon: String,
});

const quest = mongoose.models.quest || mongoose.model("quest", questSchema);

export default quest;