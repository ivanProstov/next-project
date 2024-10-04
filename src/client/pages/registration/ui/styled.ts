import styled from "styled-components";
import { widthFormLogin } from "@/utils/constants";
import { SmileOutlined } from "@ant-design/icons";

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
    gap: 15px;
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

const ContentPosition = styled.div<{ position?: string }>`
  display: flex;
  align-items: center;
  justify-content: ${({ position }) => position || "center"};
`;

const FormFooter = styled(ContentPosition)`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  width: ${widthFormLogin};
  padding-top: 15px;
  padding-bottom: 15px;
  margin-top: 15px;
  position: relative;
  //box-shadow: 2px -4px 9px rgba(0, 0, 0, 0);
  //transition: box-shadow 0.5s ease;
  //&:hover {
  //  box-shadow: 2px -4px 9px rgba(0, 0, 0, 0.2);
  //  transition: box-shadow 0.5s ease;
  //}
`;

const Icon = styled(SmileOutlined)`
  svg {
    fill: #01939a;
  }
`;

const SpinWrapper = styled.div`
  position: absolute;
`;

export const SC = {
  FormWrapper,
  InputWrapper,
  ContentPosition,
  FormFooter,
  Icon,
  SpinWrapper,
};
