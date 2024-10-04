const formatPath = () => {
  const HOME = "/home";
  const ABOUT = "/about";
  // const LOGIN = "/login";
  // const REGISTRATION = "/registration";
  return {
    HOME,
    ABOUT,
  };
};

export const Path = formatPath();

// export const routesNoAuth = [
//   {
//     title: "Login",
//     path: Path.LOGIN,
//   },
//   {
//     title: "Registration",
//     path: Path.REGISTRATION,
//   },
// ];

export const routes = [
  {
    title: "Home",
    path: Path.HOME,
  },
  {
    title: "About",
    path: Path.ABOUT,
  },
];
