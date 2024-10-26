import LinkNext from "next/link";
import styled from "styled-components";

const Link = styled(LinkNext)<{ $size?: string }>`
  &.link {
    color: #01939a;
  }
  font-size: ${({ $size }) => $size || "16px"};
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

export const InputWrapp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  input.ant-input {
    color: #000;
  }
`;

export const IconWrapp = styled.div`
  width: 75px;
  display: flex;
  gap: 12px;
  svg {
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const SpinWrapper = styled.div`
  position: absolute;
  left: 0;
  transform: translateX(-100%);
`;

export const ErrorWrapper = styled.div`
  position: absolute;
  top: -2px;
  left: 10px;
  transform: translateY(-100%);
`;

export const SC = {
  Link,
  InputWrapp,
  IconWrapp,
  SpinWrapper,
  ErrorWrapper,
};
