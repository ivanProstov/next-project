import LinkNext from "next/link";
import styled from "styled-components";

const Link = styled(LinkNext)`
  &.link {
    color: #01939a;
  }
  position: relative;
  transition: color 0.5s ease;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px;
    height: 1px;
    width: 0;
    background-color: #01939a;
    transition: width 0.5s ease;
  }
  &:hover {
    &:before {
      width: 100%;
    }
  }
`;

export const SC = {
  Link,
};
