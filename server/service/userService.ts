import axios from "axios";
import qs from "qs";
import User, { UserDocument } from "../model/userModel";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

interface GoogleTokensResult {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

export async function googleOAuthToken(code: String) {
  const url = "https://oauth2.googleapis.com/token";
  const value = {
    code,
    clientId: process.env.GOOGLECLIENTID,
    clientSecret: process.env.GOOGLECLIENTSECRET,
    redirectURL: process.env.GOOGLEOAUTHRDIRECTURL,
    grant_type: "authorization_code",
  };
  try {
    const res = await axios.post<GoogleTokensResult>(url, qs.stringify(value), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (error: any) {
    console.error(error.response.data.error);
    throw new Error(error.message);
  }
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export async function getGoogleUser({
  id_token,
  access_token,
}): Promise<GoogleUserResult> {
  try {
    const res = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function findAndUpdateUser(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions = {}
) {
  return User.findOneAndUpdate(query, update, options);
}
