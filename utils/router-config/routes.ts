const formatPath = () => {
  const HOME = "/home";
  const ABOUT = "/about";
  return {
    HOME,
    ABOUT,
  };
};

export const Path = formatPath();

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
