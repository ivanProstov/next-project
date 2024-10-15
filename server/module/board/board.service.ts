import { IBoard } from "@/server/models/board/interface";
import Board from "../../models/board";
import Column from "../../models/columns";
import { IColumn } from "@/server/models/columns/interface";
import { ITask } from "@/server/models/task/interface";
import Task from "../../models/task";

export class BoardService {
  public async createBoard(values: IBoard & { userId?: string }) {
    const { name, columns = [], users = [], userId, prefix } = values;
    const setUsers = new Set([...users, userId]);
    const board = new Board({
      prefix,
      name,
      columns,
      users: [...setUsers],
    });
    await board.save();
    return board;
  }

  public async getBoardById(
    id: string,
    options?: Record<string, any>,
  ): Promise<IBoard | null> {
    return Board.findOne({ _id: id, ...options });
  }

  public async getBoardWithUsersAndColumns(id: string, userId?: string) {
    try {
      const board = await Board.findById(id)
        .populate({
          path: "users",
          select: "_id name",
        })
        .populate({ path: "columns", select: "_id name" })
        .exec();

      if (!board || !(await board.isUserInBoard(userId))) {
        throw new Error("Board not found");
      }

      // TODO: проверить что возвращается
      const tasks = await Task.find({ board: { $in: [id] } });
      const _id = board._id;
      const name = board.name;
      const prefix = board.prefix;
      const users = board.users;
      const columns = board.columns;
      return { _id, name, prefix, users, columns, tasks };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getBoardByIdOrError(
    id: string,
    options?: Record<string, any>,
  ): Promise<IBoard> {
    const board = await this.getBoardById(id, options);

    if (!board) {
      throw new Error("Board not found");
    }
    return board;
  }

  public async updateBoard(values: IBoard & { id: string; userId?: string }) {
    const { id, userId, ...data } = values;
    await this.getBoardByIdOrError(id, {
      users: { $in: [userId] },
    });
    return Board.findByIdAndUpdate(id, data, { new: true });
  }

  public async getBoards(userId?: string) {
    return Board.find({ users: { $in: [userId] } }, "name _id");
  }

  public async createColumn(value: IColumn) {
    const { name } = value;
    const column = new Column({
      name,
    });
    await column.save();
    return column;
  }

  public async updateColumn(values: IColumn & { id: string }) {
    const { id, ...data } = values;

    return Column.findByIdAndUpdate(id, data, { new: true });
  }

  public async getColumns() {
    return Column.find();
  }

  public async getTaskById(
    id: string,
    options?: Record<string, any>,
  ): Promise<ITask | null> {
    return Task.findById({ _id: id, ...options });
  }

  public async getTaskByIdOrError(id: string, options?: Record<string, any>) {
    const task = await this.getTaskById(id, options);

    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  }

  public async getTask({ id, userId }: { id: string; userId?: string }) {
    const task = await Task.findById(id)
      .populate({
        path: "board",
        select: "_id users columns",
        populate: [
          { path: "columns", select: "_id name" },
          {
            path: "users",
            select: "_id name email",
          },
        ],
      })
      .populate({ path: "creator", select: "_id name" })
      .populate({ path: "column", select: "_id name" })
      .exec();

    if (!task || !(await task.isUserInBoard(userId))) {
      throw new Error("Task not found");
    }

    return task;
  }
  public async createTask(values: ITask & { userId?: string }) {
    const {
      board,
      creator,
      column,
      executor,
      title,
      description,
      comments,
      userId,
    } = values;

    await this.getBoardByIdOrError(board as any, {
      users: { $in: [userId] },
      columns: { $in: [column] },
    });

    const task = new Task({
      board,
      creator: creator ?? userId,
      column,
      executor,
      title,
      description,
      comments,
    });
    await task.save();
    return task;
  }
  public async updateTask(values: ITask & { id: string; userId?: string }) {
    const { id, ...data } = values;

    await this.getBoardByIdOrError(data.board as any, {
      users: { $in: [data.userId] },
      columns: { $in: [data.column] },
    });

    return Task.findByIdAndUpdate(id, data, { new: true });
  }
}
