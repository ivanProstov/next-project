import { useRouter } from "next/router";
import { routes } from "@/utils/router-config/routes";
import { ILayoutProps } from "./interfaces";
import { AuthLayout } from "./components/auth-layout";
import { NoAuthLayout } from "./components/no-auth-layout";

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const router = useRouter();
  const isAuthPage = routes.some(({ path }) => router.pathname === path);

  return (
    <>
      {isAuthPage ? (
        <AuthLayout>{children}</AuthLayout>
      ) : (
        <NoAuthLayout>{children}</NoAuthLayout>
      )}
    </>
  );
};
