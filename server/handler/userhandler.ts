import { NextFunction, Request, Response } from "express";
import User, { UserDocument } from "../model/userModel";
import { IUser } from "../types";
import { UpdateQuery } from "mongoose";

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    users,
  });
}

export async function getUser(
  req: Request<{ id: String }>,
  res: Response,
  next: NextFunction
) {
  const users = await User.findOne(req.params.id);
  res.status(200).json({
    status: "success",
    users,
  });
}

export async function updateUser(
  req: Request<{ id: String }, UpdateQuery<IUser>>,
  res: Response,
  next: NextFunction
) {
  const UpdatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    UpdatedUser,
  });
}

export async function deleteUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const UpdatedUser = await User.deleteMany();
  res.status(200).json({
    status: "ok",
  });
}
