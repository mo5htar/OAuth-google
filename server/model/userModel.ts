import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
  id: String;
  email: string;
  name: string;
  password: string;
  pic: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserMethods {
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// this for hashing password before saving new user to mongoDB
userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const hash = await bcrypt.hash(user.password, 12);

  user.password = hash;

  return next();
});

// check password by compagrig with candPassword
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password);
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
