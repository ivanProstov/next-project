import * as yup from "yup";
import { useMemo } from "react";
import { IBoardsData } from "@/src/client/pages/board/interfaces";

// TODO: собрать в единое место
const REQUIRED_FIELD = "required field";

export const useValidationSchema = () => {
  return useMemo(
    (): yup.ObjectSchema<IBoardsData> =>
      yup.object().shape({
        _id: yup.string(),
        name: yup.string().required(REQUIRED_FIELD),
        prefix: yup.string().required(REQUIRED_FIELD),
        description: yup.string(),
        users: yup.array().of(yup.string().required(REQUIRED_FIELD)),
        columns: yup.array().of(yup.string().required(REQUIRED_FIELD)),
      }),
    [],
  );
  // return yup.object().shape({
  //   email: yup.string().email("Invalid email").required("Email is required"),
  //   password: yup
  //     .string()
  //     .min(3, "Password must be at least 6 characters")
  //     .required("Password is required"),
  //   rememberMe: yup.boolean(),
  // });
};
