import express, { NextFunction, Request, Response } from "express";
import * as userhander from "../handler/userhandler";
import * as authhandler from "../handler/authhandler";
const router = express.Router();

router.post("/login", authhandler.login);
router.post("/signup", authhandler.signUP);

router.get("/");

router.route("/").get(userhander.getUsers).delete(userhander.deleteUsers);
router.route("/:id").get(userhander.getUser).patch(userhander.updateUser);

export default router;
