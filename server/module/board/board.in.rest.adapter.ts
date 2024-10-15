import { IEndpointConfig, IServiceInRestAdapter } from "../interface";
import { Method, ServicesName } from "../constants";
import { Request, Response } from "express";
import { IBoard } from "@/server/models/board/interface";
import { BoardService } from "@/server/module/board/board.service";
import { IColumn } from "@/server/models/columns/interface";
import { ITask } from "@/server/models/task/interface";

export class BoardInRestAdapter
  implements IServiceInRestAdapter<BoardInRestAdapter>
{
  public basePath = ServicesName.BOARD;

  constructor(private readonly boardService: BoardService) {}

  public async init(): Promise<IEndpointConfig<BoardInRestAdapter>[]> {
    return [
      { url: "getBoards", method: Method.GET, fn: "getBoards" },
      { url: "getBoardInfo", method: Method.GET, fn: "getBoardInfo" },
      // { url: "getBoardById", method: Method.GET, fn: "getBoardById" },
      { url: "createBoard", method: Method.POST, fn: "createBoard" },
      { url: "updateBoard", method: Method.PUT, fn: "updateBoard" },
      { url: "getColumns", method: Method.GET, fn: "getColumns" },
      { url: "createColumn", method: Method.POST, fn: "createColumn" },
      { url: "updateColumn", method: Method.PUT, fn: "updateColumn" },
      { url: "getTask", method: Method.GET, fn: "getTask" },
      { url: "createTask", method: Method.POST, fn: "createTask" },
      { url: "updateTask", method: Method.PUT, fn: "updateTask" },
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

  public async getBoardInfo(
    req: Request<unknown, unknown, unknown, { id: string }>,
    res: Response,
  ) {
    try {
      const boardId = req.query.id;
      const userId = req.session.userId;
      const board = await this.boardService.getBoardWithUsersAndColumns(
        boardId,
        userId,
      );
      res.status(201).json(board);
    } catch (error) {
      res.status(500).json({ error: "Error get Board by id" });
    }
  }

  // TODO: проверить нужен ли этот метод публично
  public async getBoardById(
    req: Request<unknown, unknown, unknown, { id: string }>,
    res: Response,
  ) {
    try {
      const boardId = req.query.id;
      const board = await this.boardService.getBoardByIdOrError(boardId);
      res.status(201).json(board);
    } catch (error) {
      res.status(500).json({ error: "Error get Board by id" });
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

  public async updateBoard(
    req: Request<unknown, unknown, IBoard & { id: string }>,
    res: Response,
  ) {
    try {
      const userId = req.session.userId;
      const board = await this.boardService.updateBoard({
        ...req.body,
        userId,
      });
      res.status(201).json(board);
    } catch (error) {
      res.status(500).json({ error: "Error put updateBoard" });
    }
  }

  public async getColumns(req: Request, res: Response) {
    try {
      const columns = await this.boardService.getColumns();
      res.status(201).json(columns);
    } catch (error) {
      res.status(500).json({ error: "Error get Columns" });
    }
  }

  public async createColumn(
    req: Request<unknown, unknown, IColumn>,
    res: Response,
  ) {
    try {
      const column = await this.boardService.createColumn(req.body);
      res.status(201).json(column);
    } catch (error) {
      res.status(500).json({ error: "Error creating Column" });
    }
  }

  public async updateColumn(
    req: Request<unknown, unknown, IColumn & { id: string }>,
    res: Response,
  ) {
    try {
      const column = await this.boardService.updateColumn(req.body);
      res.status(201).json(column);
    } catch (error) {
      res.status(500).json({ error: "Error creating Column" });
    }
  }

  public async getTask(
    req: Request<unknown, unknown, unknown, { id: string }>,
    res: Response,
  ) {
    try {
      const userId = req.session.userId;
      const task = await this.boardService.getTask({ ...req.query, userId });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: "Error get Task" });
    }
  }

  public async createTask(
    req: Request<unknown, unknown, ITask>,
    res: Response,
  ) {
    try {
      const userId = req.session.userId;
      const task = await this.boardService.createTask({ ...req.body, userId });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: "Error creating Task" });
    }
  }
  public async updateTask(
    req: Request<unknown, unknown, ITask & { id: string }>,
    res: Response,
  ) {
    try {
      const userId = req.session.userId;
      const task = await this.boardService.updateTask({ ...req.body, userId });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: "Error creating Task" });
    }
  }
}
