import next from "next";
import express, { Request, Response, NextFunction, json } from "express";
import mongoose from "mongoose";
import User from "./models/users/users";
import cookieParser from "cookie-parser";
import { blockBrowserAccess } from "./middleware/blockBrowserAccess";
import { middlewareHomeRedirect } from "./middleware/middlewareHomeRedirect";
import { startMiddlewarets } from "./middleware/startMiddlewarets";
import { middlewareAuthAPI } from "./middleware/middlewareAuthAPI";
import { middlewareLoginRedirect } from "./middleware/middlewareLoginRedirect";
import { middlewareAuth } from "./middleware/middlewareAuth";
import { authorizedPath, nameUsersInHeaders } from "../utils/constants";
import { setupServer } from "./module";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const MONGO_URI =
  "mongodb://root:297ugbT1DM@localhost:27017/glow?authSource=admin&authMechanism=SCRAM-SHA-1&directConnection=true";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.prepare().then(async () => {
  const server = express();

  server.use(express.json());
  server.use(cookieParser());

  server.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith("/api")) {
      startMiddlewarets(blockBrowserAccess)(req, res, next);
    }
    if (req.path.startsWith(`/api/${authorizedPath}`)) {
      startMiddlewarets(middlewareAuthAPI)(req, res, next);
    }
    next();
  });

  server.use(
    startMiddlewarets(
      middlewareAuth,
      middlewareHomeRedirect,
      middlewareLoginRedirect,
    ),
  );

  // do not remove await
  await setupServer(server);

  // server.post

  // server.get("/api/user", async (req: Request, res: Response) => {
  //   const user = req.get(nameUsersInHeaders);
  //   console.log("user 111 >>> ", user);
  //   // const users =  await User.find();
  //   // console.log("users >>> ", users)
  //   res.status(200).json(JSON.parse(user || ""));
  // });

  // server.post("/api/users", async (req, res) => {
  //   try {
  //     const { name, email } = req.body;
  //     const newUser = new User({ name, email });
  //     await newUser.save();
  //     res.status(201).json(newUser);
  //   } catch (error) {
  //     res.status(500).json({ error: "Error creating user" });
  //   }
  // });

  // server.get("/api/users", async (req, res) => {
  //   try {
  //     const users = await User.find();
  //     res.status(200).json(users);
  //   } catch (error) {
  //     res.status(500).json({ error: "Error fetching users" });
  //   }
  // });

  // Ваш кастомный код здесь
  // server.use((req: any, res: any, next: any) => {
  //
  //     // console.log('Custom middleware >>> ', req);
  //     next();
  // });

  server.all("*", (req: any, res: any) => {
    return handle(req, res);
  });

  // @ts-ignore
  server.listen(3000, (err: any) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
