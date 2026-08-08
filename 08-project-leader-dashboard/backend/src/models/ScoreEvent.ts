import {
  SCORE_EVENT_POINTS_MAP,
  ScoreEventReason,
} from "@/constants/events.js";
import { IScoreEvent } from "@/types/api.js";
import { Schema, model } from "mongoose";

const scoreEventSchema = new Schema<IScoreEvent>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "User ID is required"],
      index: true,
    },
    score: {
      type: Number,
      required: [true, "Score is required"],
      validate: {
        validator: function (value: number) {
          const reason = (this as { reason: ScoreEventReason }).reason;
          return value === SCORE_EVENT_POINTS_MAP[reason];
        },
        message: "Score does not match the event reason",
      },
    },
    reason: {
      type: String,
      enum: Object.values(ScoreEventReason),
      required: [true, "Reason is required"],
    },
  },
  { timestamps: true },
);

export const ScoreEvent = model<IScoreEvent>("ScoreEvents", scoreEventSchema);
