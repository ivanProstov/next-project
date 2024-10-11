import { UsersInRestAdapter } from "./users/users.in.rest.adapter";
import { Express } from "express";
import { IServiceInRestAdapter } from "@/server/module/interface";
import { authorizedPath } from "../../utils/constants";
import { AuthInRestAdapter } from "./auth/auth.in.rest.adapter";
import { UsersService } from "./users/users.service";
import { CryptoService } from "./crypto/crypto.service";
import { AuthService } from "./auth/auth.service";
import { MailerService } from "./mailer/mailer.service";
import { JwtService } from "./jwt/jwt.service";
import { BoardInRestAdapter } from "./board/board.in.rest.adapter";
import { BoardService } from "./board/board.service";

const cryptoService = new CryptoService();
const usersService = new UsersService(cryptoService);
const authService = new AuthService(
  usersService,
  cryptoService,
  new MailerService(),
  new JwtService(),
);
const usersInRestAdapter = new UsersInRestAdapter(usersService);

const authInRestAdapter = new AuthInRestAdapter(
  usersService,
  cryptoService,
  authService,
);

const boardInRestAdapter = new BoardInRestAdapter(new BoardService());

const serviceAdapters: IServiceInRestAdapter<any>[] = [
  usersInRestAdapter,
  authInRestAdapter,
  boardInRestAdapter,
];

export const initializeEndpoints =
  (services: IServiceInRestAdapter<any>[]) => (server: Express) => {
    services.map(async (service) => {
      const init = await service.init();
      const isAuthorized = !service.notAuthorized ? `${authorizedPath}/` : "";

      const baseUrl = `/api/${isAuthorized}${service.basePath}/`;

      return init.map((elem) =>
        server[elem.method](
          `${baseUrl}${elem.url}`,
          (service as any)[elem.fn].bind(service),
        ),
      );
    });
  };

export const setupServer = initializeEndpoints(serviceAdapters);
