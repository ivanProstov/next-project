import next from "next";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { middlewareHomeRedirect } from "./middleware/middlewareHomeRedirect";
import { startMiddlewarets } from "./middleware/startMiddlewarets";
import { middlewareAuthAPI } from "./middleware/middlewareAuthAPI";
import { middlewareLoginRedirect } from "./middleware/middlewareLoginRedirect";
import { middlewareAuth } from "./middleware/middlewareAuth";
import { authorizedPath, nameAccessToken } from "../utils/constants";
import MongoStore from "connect-mongo";
import { setupServer } from "./module";
import session from "express-session";
import { blockBrowserAccess } from "./middleware/blockBrowserAccess";

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
  server.use(
    session({
      name: nameAccessToken,
      secret: "your-secret-key",
      resave: false,
      store: MongoStore.create({
        mongoUrl: MONGO_URI,
        collectionName: "sessions",
      }),
      saveUninitialized: false,
      cookie: {
        secure: !dev,
        maxAge: 60 * 60 * 1000, // Сессия истекает через 30 минут
        httpOnly: true,
      },
    }),
  );
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

  server.all("*", (req: any, res: any) => {
    return handle(req, res);
  });

  // @ts-ignore
  server.listen(process.env.PORT, (err: any) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
