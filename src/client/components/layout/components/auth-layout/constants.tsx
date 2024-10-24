import { Header } from "../../../header";
import { ILayoutProps } from "../../interfaces";

export const AuthLayout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        {children}
      </main>
    </>
  );
};
