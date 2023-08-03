import { NextFunction, Request, Response } from "express";
import { IUser } from "../types";
import User from "../model/userModel";
import { createSendToken, signToken } from "../utils/jwt";
import AppError from "../utils/AppError";

export async function signUP(
  req: Request<{}, IUser>,
  res: Response,
  next: NextFunction
) {
  const newUser = await User.create(req.body);
  createSendToken(newUser.id, 200, req, res);
}

export async function login(
  req: Request<{}, IUser>,
  res: Response,
  next: NextFunction
) {
  let { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client

  createSendToken(user.id, 200, req, res);
}
