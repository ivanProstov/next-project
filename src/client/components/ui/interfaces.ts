import { InputProps } from "antd";

export interface IInputAndTextProps extends InputProps {
  value?: string;
  onOk?: () => Promise<boolean>;
  onCancel?: () => boolean;
  errorMessage?: string;
}
