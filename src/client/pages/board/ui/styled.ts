import styled from "styled-components";
import { Row as RowComponent } from "antd";

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  .btn-add-board {
    max-width: 300px;
    height: 60px;
    width: 100%;
  }
  svg {
    width: 36px;
    height: 36px;
  }
`;

const Description = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 42px;
`;

const Row = styled(RowComponent)`
  max-width: 1920px;
  width: 100%;
  margin: auto;
`;
export const SC = { ButtonWrapper, Description, RowWrapper, Row };
