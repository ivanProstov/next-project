import { IBoardsData } from "../../interfaces";

export interface ICreateUpdateBoardProps {
  data: IBoardsData | undefined | boolean;
  onClose: () => void;
  setUpdateBoard: (data: IBoardsData) => void;
}
