import * as yup from "yup";

// TODO: собрать в единое место
const REQUIRED_FIELD = "required field";
export const useValidationSchema = () => {
  return yup.object().shape({
    columns: yup.array().of(
      yup.object().shape({
        _id: yup.string(),
        name: yup.string().required(REQUIRED_FIELD),
      }),
    ),
  });
};
