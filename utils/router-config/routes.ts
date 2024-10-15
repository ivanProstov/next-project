const formatPath = () => {
  const HOME = "/home";
  const ABOUT = "/about";
  const BOARD = "/board";
  // const LOGIN = "/login";
  // const REGISTRATION = "/registration";
  return {
    HOME,
    ABOUT,
    BOARD,
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
  {
    title: "Board",
    path: Path.BOARD,
  },
];
