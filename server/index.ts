import express from "express";
import routeUser from "./route/routerUser";

const app = express();

//to parsing incoming req body to json
app.use(express.json());

app.use("/api/v1/user", routeUser);
app.use("/api/v1/oAuth/google");
