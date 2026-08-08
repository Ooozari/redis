import { Types, Document } from "mongoose";
import type { ScoreEventReason } from "@/constants/index.js";

export interface IPost extends Document {
  authorId: Types.ObjectId;
  content: string;
  likes: number;
  views: number;
  score: number;
}

export interface IScoreEvent extends Document {
  userId: Types.ObjectId;
  score: number;
  reason: ScoreEventReason;
}
