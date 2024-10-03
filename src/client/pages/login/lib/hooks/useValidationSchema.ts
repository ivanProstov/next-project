import * as yup from "yup";

export const useValidationSchema = () => {
  return yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(3, "Password must be at least 6 characters")
      .required("Password is required"),
    rememberMe: yup.boolean(),
  });
};
