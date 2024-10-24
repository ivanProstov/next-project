import { Board as BoardComponents } from "@/src/client/pages/board";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default function Board(props: {}) {
  return <BoardComponents {...props} />;
}
