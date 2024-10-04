import { LinkProps } from "next/link";
import { SC } from "./styled";
import { ReactNode } from "react";

export const Link = (props: LinkProps & { text: string | ReactNode }) => (
  <SC.Link className="link" {...props}>
    {props.text}
  </SC.Link>
);