import { Typography } from "antd";
import { SC } from "./ui/styled";
import { useForm, FormProvider } from "react-hook-form";
import { IFormInputs } from "./interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useValidationSchema } from "./lib/hooks/useValidationSchema";
import { Form } from "./ui/form";
import { registrationUrl } from "@/utils/constants";
import { Link } from "@/src/client/components/ui/link";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
export const Login = () => {
  const { Title } = Typography;

  const schema = useValidationSchema();

  const form = useForm<IFormInputs>({
    defaultValues: {
      email: undefined,
      password: undefined,
      rememberMe: false,
    },
    resolver: yupResolver(schema),
  });

  return (
    <SC.FormWrapper>
      <Title level={1}>Login</Title>
      <FormProvider {...form}>
        <Form />
      </FormProvider>
      <SC.Footer>
        <Link
          href={registrationUrl}
          text={
            <>
              <PlusOutlined /> Registration
            </>
          }
        />
        <Link
          href={registrationUrl}
          text={
            <>
              <RedoOutlined /> Forgot your password?
            </>
          }
        />
      </SC.Footer>
    </SC.FormWrapper>
  );
};
