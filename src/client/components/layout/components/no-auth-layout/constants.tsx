import { ILayoutProps } from "../../interfaces";

export const NoAuthLayout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};
