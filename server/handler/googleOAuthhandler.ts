import { NextFunction, Request, Response } from "express";
import {
  getGoogleUser,
  googleOAuthToken,
  findAndUpdateUser,
} from "../service/userService";
import { signToken } from "../utils/jwt";
import { IUser } from "../types";

export async function googleOAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //get the code that response from oAuth google
  const code = req.query.code as string;
  //get id and access token
  const { id_token, access_token } = await googleOAuthToken(code);
  const googleUser = await getGoogleUser({ id_token, access_token });
  //jwt.decode(id_token);

  if (!googleUser.verified_email) {
    return res.status(403).send("Google account is not verified");
  }

  const user = await findAndUpdateUser(
    {
      email: googleUser.email,
    },
    {
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
    },
    {
      upsert: true,
      new: true,
    }
  );

  // const accessToken = signToken(user?.id); // 15 minutes
  // const refreshToken = signToken(user?.id);

  // set cookies
  // res.cookie("accessToken", accessToken);

  // res.cookie("refreshToken", refreshToken);

  // redirect back to client
  const url = process.env.URLORIGIN as string;
  res.redirect(url);
}
