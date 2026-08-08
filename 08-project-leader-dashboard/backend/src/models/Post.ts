import { IPost } from "@/types/api.js";
import {Schema, model } from "mongoose";

const postSchema = new Schema<IPost>({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "Author ID is required"],
        index: true,
    },
    content: {
        type: String,
        minlength: [1, "Content cannot be empty"],
        maxLength: [500, "Content cannot exceed 500 characters"],
        required: [true, "Content is required"],
    },
    likes: {
        type: Number,
        min: [0, "Likes cannot be negative"],
        default: 0,
    },
    views: {    
        type: Number,
        min: [0, "Views cannot be negative"],
        default: 0,
    },
    score: {
        type: Number,
        min: [0, "Score cannot be negative"],
        default: 0,
    },
}, {timestamps: true});
