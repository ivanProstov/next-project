import { routes } from "@/utils/router-config/routes";
import Link from "next/link";
import { onLogout } from "./lib/utils/on-logout";
import { useRouter } from "next/router";
import { SC } from "./ui/styled";

export const Header = () => {
  const { push } = useRouter();

  return (
    <SC.Header>
      <nav>
        <SC.Ul>
          {routes.map(({ title, path }) => (
            <li key={path}>
              <Link href={path}>{title}</Link>
            </li>
          ))}
        </SC.Ul>
      </nav>
      <button onClick={onLogout(push)}>log-out</button>
    </SC.Header>
  );
};
