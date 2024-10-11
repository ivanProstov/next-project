import { IEndpointConfig, IServiceInRestAdapter } from "../interface";
import { Method, ServicesName } from "../constants";
import { Request, Response } from "express";
import { IBoard } from "@/server/models/board/interface";
import { BoardService } from "@/server/module/board/board.service";

export class BoardInRestAdapter
  implements IServiceInRestAdapter<BoardInRestAdapter>
{
  public basePath = ServicesName.BOARD;

  constructor(private readonly boardService: BoardService) {}

  public async init(): Promise<IEndpointConfig<BoardInRestAdapter>[]> {
    return [
      { url: "createBoard", method: Method.POST, fn: "createBoard" },
      { url: "getBoards", method: Method.GET, fn: "getBoards" },
    ];
  }

  public async getBoards(req: Request, res: Response) {
    try {
      const boards = await this.boardService.getBoards(req.session.userId);
      res.status(201).json(boards);
    } catch (error) {
      res.status(500).json({ error: "Error get Boards" });
    }
  }

  public async createBoard(
    req: Request<unknown, unknown, IBoard>,
    res: Response,
  ) {
    try {
      const board = await this.boardService.createBoard({
        ...req.body,
        userId: req.session.userId,
      });

      res.status(201).json(board);
    } catch (error) {
      res.status(500).json({ error: "Error creating Board" });
    }
  }
}
