import styled from "styled-components";

const FormWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SC = {
  FormWrapper,
  FormFooter,
};
