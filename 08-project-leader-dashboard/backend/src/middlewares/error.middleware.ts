import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError.js";
import mongoose from "mongoose";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log("Global Error Interceptor...");
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error instanceof mongoose.Error ? 400 : error.statusCode || 500;
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors || [],
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  return res.status(error.statusCode).json(response);
};
