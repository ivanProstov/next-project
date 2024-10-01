import styled from "styled-components";

const Header = styled.header`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  margin: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Ul = styled.ul`
  display: flex;
  gap: 12px;
  list-style: none;
  & a {
    color: cornflowerblue;
  }
`;

export const SC = { Header, Ul };
