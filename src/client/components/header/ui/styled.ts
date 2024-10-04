import styled from "styled-components";

const Header = styled.header`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  margin-bottom: 10px;
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

const Nav = styled.nav`
  display: flex;
  align-items: center;
  ul {
    margin: 0;
  }
`;

export const SC = { Header, Ul, Nav };
