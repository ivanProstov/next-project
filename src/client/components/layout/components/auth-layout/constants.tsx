import { Header } from "../../../header";
import { ILayoutProps } from "../../interfaces";

export const AuthLayout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};
