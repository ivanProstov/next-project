import { Registration as RegistrationComponent } from "../src/client/pages/registration";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

export default function Registration() {
  return <RegistrationComponent />;
}
