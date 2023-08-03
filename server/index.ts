import express from "express";
import routeUser from "./route/routerUser";

const app = express();

//to parsing incoming req body to json
app.use(express.json());

app.use("/v1/users", routeUser);
