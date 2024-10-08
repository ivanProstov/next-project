import styled from "styled-components";
import { widthFormLogin } from "@/utils/constants";

const FormWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: translateY(-10%);
  form {
    width: ${widthFormLogin};
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  a {
    font-size: 18px;
  }
`;

const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  position: relative;
  & > .error {
    position: absolute;
    bottom: 100%;
    transform: translateY(10px);
  }
  & > .input {
    margin-top: 12px;
  }
`;

const Footer = styled.div`
  width: ${widthFormLogin};
  padding-top: 15px;
  margin-top: 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  gap: 0 10px;
  justify-content: space-between;
`;

const SpinWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

export const SC = {
  FormWrapper,
  FormFooter,
  InputWrapper,
  Footer,
  SpinWrapper,
};
