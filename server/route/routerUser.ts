import express, { NextFunction, Request, Response } from "express";
import * as userhander from "../handler/userhandler";

const router = express.Router();

router.route("/").get(userhander.getUsers).delete(userhander.deleteUsers);
router.route("/:id").get(userhander.getUser).patch(userhander.updateUser);

export default router;
