const ROUTES = {
  INDEX: {
    PATH: "/",
    NAME: "Home",
  },
  ARTICLES: {
    PATH: "/articles",
    NAME: "Articles",
  },
  ARTICLE: {
    PATH: "/article/:id",
    NAME: "Article",
  },
};

export const NAVBAR_ROUTES = [ROUTES.INDEX, ROUTES.ARTICLES];

export default ROUTES;
