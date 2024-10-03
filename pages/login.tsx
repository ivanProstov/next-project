import { Login as LoginComponents } from "../src/client/pages/login";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

export default function Login() {
  return <LoginComponents />;
}
