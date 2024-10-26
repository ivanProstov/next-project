import { Input, Spin, Typography } from "antd";
import { useState } from "react";
import { CloseIcon, EditIcon, OkIcon } from "../../icons";
import { IInputAndTextProps } from "../interfaces";
import { SC } from "../styled";

export const InputAndText = ({
  onCancel,
  onOk,
  errorMessage,
  ...rest
}: IInputAndTextProps) => {
  const [isMode, setIsMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { Text } = Typography;

  const onHandleOk = () => {
    if (!loading && onOk) {
      setLoading(true);
      void onOk()
        .then((data) => {
          console.log("data >>> ", data);

          setIsMode(!data);
        })
        .catch(() => setIsMode(true))
        .finally(() => setLoading(false));

      return;
    }
    setIsMode(false);
  };

  const onHandleCancel = () => {
    if (!loading && onCancel) {
      setIsMode(!onCancel());
      return;
    }
    setIsMode(false);
  };

  return (
    <SC.InputWrapp>
      {loading && (
        <SC.SpinWrapper>
          <Spin />
        </SC.SpinWrapper>
      )}
      {errorMessage && (
        <SC.ErrorWrapper>
          <Text type="danger" className="error">
            {errorMessage}
          </Text>
        </SC.ErrorWrapper>
      )}
      <Input
        status={(errorMessage && "error") || ""}
        placeholder="Column"
        {...rest}
        disabled={!isMode || loading}
      />
      {!isMode && (
        <SC.IconWrapp>
          <EditIcon onClick={() => !loading && setIsMode(true)} />
        </SC.IconWrapp>
      )}
      {isMode && (
        <SC.IconWrapp>
          <OkIcon color="#058373" onClick={onHandleOk} />
          <CloseIcon color="#e8404a" onClick={onHandleCancel} />
        </SC.IconWrapp>
      )}
    </SC.InputWrapp>
  );
};
