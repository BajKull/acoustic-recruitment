import ROUTES from "@/constants/routes";
import Article from "@/pages/article/article";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorBoundary from "@/views/layouts/ErrorBoundary";

const ARTICLE_ID = "db4930e9-7504-4d9d-ae6c-33facca754d1";
const ARTICLE_PATH = `${
  import.meta.env.VITE_API_URL
}/api/859f2008-a40a-4b92-afd0-24bb44d10124/delivery/v1/content/${ARTICLE_ID}`;

const server = setupServer(
  rest.get(ARTICLE_PATH, (_req, res, ctx) => {
    return res(
      ctx.json({
        id: "db4930e9-7504-4d9d-ae6c-33facca754d1",
        thumbnail: {
          id: "c98d44eb-5976-42a1-97d6-9a5840fa9fb4",
          url: "/api/859f2008-a40a-4b92-afd0-24bb44d10124/delivery/v1/resources/9a069bfa086cfe1ae7c98e789fec1c58",
        },
        elements: {
          heading: {
            elementType: "text",
            value: "Top article title",
          },
          author: {
            elementType: "text",
            value: "John Doe",
          },
          body: {
            values: [
              '<h2><span style="font-family:&#39;arial&#39; , &#39;helvetica&#39; , sans-serif">Hey there</span></h2>\n',
              "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n",
            ],
            elementType: "formattedtext",
          },
          date: {
            elementType: "datetime",
            value: "2020-09-06T22:00:00Z",
          },
          mainImage: {
            elementType: "group",
            value: {
              leadImage: {
                mode: "shared",
                profiles: ["3428916c-b356-4b47-aeb2-5eb8e3494b00"],
                renditions: {
                  lead: {
                    source:
                      "/delivery/v1/resources/0874022e-89fe-448e-af2f-d7a88b7baa04?resize=1200px:881px&crop=1200:624;0,128",
                    width: 1200,
                    height: 624,
                    transform: {
                      scale: 0.8,
                      crop: {
                        x: 0,
                        y: 128,
                        width: 1200,
                        height: 624,
                      },
                    },
                    url: "/859f2008-a40a-4b92-afd0-24bb44d10124/dxresources/0874/0874022e-89fe-448e-af2f-d7a88b7baa04.jpg?resize=1200px%3A881px&crop=1200%3A624%3B0%2C128",
                  },
                  card: {
                    source:
                      "/delivery/v1/resources/0874022e-89fe-448e-af2f-d7a88b7baa04?resize=640px:470px&crop=640:360;0,55",
                    width: 640,
                    height: 360,
                    transform: {
                      scale: 0.42666,
                      crop: {
                        x: 0,
                        y: 55,
                        width: 640,
                        height: 360,
                      },
                    },
                    url: "/859f2008-a40a-4b92-afd0-24bb44d10124/dxresources/0874/0874022e-89fe-448e-af2f-d7a88b7baa04.jpg?resize=640px%3A470px&crop=640%3A360%3B0%2C55",
                  },
                  default: {
                    width: 1500,
                    source:
                      "/delivery/v1/resources/0874022e-89fe-448e-af2f-d7a88b7baa04",
                    height: 1101,
                    url: "/859f2008-a40a-4b92-afd0-24bb44d10124/dxresources/0874/0874022e-89fe-448e-af2f-d7a88b7baa04.jpg",
                  },
                },
                asset: {
                  fileName: "1650268279.jpg",
                  altText: "",
                  fileSize: 2643234,
                  width: 1500,
                  mediaType: "image/jpeg",
                  id: "e0480047-72e0-49ce-a7ca-29e8196620fe",
                  resourceUri:
                    "/delivery/v1/resources/0874022e-89fe-448e-af2f-d7a88b7baa04",
                  height: 1101,
                },
                elementType: "image",
                url: "/859f2008-a40a-4b92-afd0-24bb44d10124/dxresources/0874/0874022e-89fe-448e-af2f-d7a88b7baa04.jpg",
              },
              leadImageCaption: {
                elementType: "text",
                value: "Listen your voice",
              },
              leadImageCredit: {
                elementType: "text",
              },
            },
            typeRef: {
              id: "fe31fbf4-4bc4-4ffa-9b27-615af51d23fe",
            },
          },
        },
        name: "Sample Article",
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

describe("Article route", () => {
  it("Should render an article", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter
          initialEntries={[ROUTES.ARTICLE.PATH.replace(":id", ARTICLE_ID)]}
        >
          <Routes>
            <Route path={ROUTES.ARTICLE.PATH} element={<Article />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    await screen.findByText("Top article title");
    expect(screen.getByText("Top article title")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Hey there")).toBeInTheDocument();
  });
  it("Should render article error message", async () => {
    server.use(
      rest.get(ARTICLE_PATH, (_req, res, ctx) => {
        return res(ctx.body(JSON.stringify({})), ctx.status(500));
      })
    );
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter
          initialEntries={[ROUTES.ARTICLE.PATH.replace(":id", ARTICLE_ID)]}
        >
          <Routes>
            <Route path={ROUTES.ARTICLE.PATH} element={<Article />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    await screen.findByText("Oops! Something went wrong.");
    expect(
      screen.getByText("Article couldn't be retrieved. Try again later.")
    ).toBeInTheDocument();
  });
  it("Should render message sent by server", async () => {
    const CUSTOM_SERVER_ERROR_MSG = "Test error message";
    const ERROR_CODE = 404;
    server.use(
      rest.get(ARTICLE_PATH, (_req, res, ctx) => {
        return res(
          ctx.body(
            JSON.stringify({
              errors: {
                code: ERROR_CODE,
                description: CUSTOM_SERVER_ERROR_MSG,
                message: CUSTOM_SERVER_ERROR_MSG,
              },
            })
          ),
          ctx.status(ERROR_CODE)
        );
      })
    );
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter
          initialEntries={[ROUTES.ARTICLE.PATH.replace(":id", ARTICLE_ID)]}
        >
          <Routes>
            <Route path={ROUTES.ARTICLE.PATH} element={<Article />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    await screen.findByText("Oops! Something went wrong.");
    expect(screen.getByText(CUSTOM_SERVER_ERROR_MSG)).toBeInTheDocument();
  });
  it("Should render error with invalid data sent back caught by error boundary", async () => {
    server.use(
      rest.get(ARTICLE_PATH, (_req, res, ctx) => {
        return res(ctx.body(JSON.stringify({})));
      })
    );
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter
          initialEntries={[ROUTES.ARTICLE.PATH.replace(":id", ARTICLE_ID)]}
        >
          <Routes>
            <Route
              path={ROUTES.ARTICLE.PATH}
              element={
                <ErrorBoundary>
                  <Article />
                </ErrorBoundary>
              }
            />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    await screen.findByText("Oops! Something went wrong.");
    expect(screen.getByText("Refresh page")).toBeInTheDocument();
  });
});
