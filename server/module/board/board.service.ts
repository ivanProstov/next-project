import { IBoard } from "@/server/models/board/interface";
import Board from "../../models/board";

export class BoardService {
  public async createBoard(values: IBoard & { userId?: string }) {
    const { name, columns = [], tasks = [], users = [], userId } = values;
    const setUsers = new Set([...users, userId]);
    const board = new Board({
      name,
      columns,
      tasks,
      users: [...setUsers],
    });
    await board.save();
    return board;
  }

  public async getBoards(userId?: string) {
    return Board.find({ users: { $in: [userId] } }, "name _id");
  }
}
