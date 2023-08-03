import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser } from "../types";
import { Request, Response } from "express";

export function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

export function createSendToken(
  user: IUser,
  statusCode,
  req: Request,
  res: Response
) {
  const token = signToken(user.id);
  const expire = process.env.JWT_COOKIE_EXPIRE_IN as any;
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + expire * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
}
