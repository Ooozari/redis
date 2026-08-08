import { IUser } from "@/types/user.js";
import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      minLength: [3, "Username must be at least 3 characters long"],
      maxLength: [120, "Username cannot exceed 120 characters"],
      required: [true, "Username is required"],
      unique: [true, "Username already exists"],
      index: true,
    },
  },

  { timestamps: true },
);

export const User = model<IUser>("Users", userSchema);
