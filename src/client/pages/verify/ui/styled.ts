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
export const SC = {
  FormWrapper,
  InputWrapper,
};
