import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  #__next {
    height: 100%; /* Занимает всю высоту окна браузера */
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle;
