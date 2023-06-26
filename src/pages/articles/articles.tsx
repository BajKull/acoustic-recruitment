import Heading from "@/components/heading/Heading";
import List from "@/components/list/List";
import { QUERY_KEYS } from "@/constants/query-keys";
import ROUTES from "@/constants/routes";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const temp_description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const queryFn = async () => {
  const res = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/api/859f2008-a40a-4b92-afd0-24bb44d10124/delivery/v1/content/db4930e9-7504-4d9d-ae6c-33facca754d1`
  );
  const data = await res.json();
  if (res.ok) return data;
  throw new Error(
    data?.errors?.description || "Server is under heavy load. Try again later."
  );
};

const Articles = () => {
  const { isLoading, error, data } = useQuery<Article, Error>(
    QUERY_KEYS.ARTICLES,
    queryFn,
    { refetchOnWindowFocus: false }
  );

  const articles = data ? [data] : undefined;

  console.log(data);

  return (
    <section className="max-w-7xl px-5 mx-auto py-10">
      <Heading level="h1" className="text-center">
        Articles
      </Heading>
      <List
        loading={isLoading}
        error={error?.message}
        emptyText="There are no articles available at the moment."
        className="mt-10"
      >
        {articles?.map((article) => (
          <li
            className="flex p-10 bg-gray-50 shadow-sm rounded-md flex-col md:flex-row mb-5"
            key={article.id}
          >
            <Link
              to={ROUTES.ARTICLE.PATH.replace(":id", article.id)}
              className="md:basis-1/3"
            >
              <img
                src={import.meta.env.VITE_API_URL + article.thumbnail.url}
                alt={article.name}
                className="w-full object-cover"
              />
            </Link>
            <div className="ml-5 md:basis-2/3 mt-5 md:mt-0">
              <Link to={ROUTES.ARTICLE.PATH.replace(":id", article.id)}>
                <p className="font-semibold text-2xl">{article.name}</p>
              </Link>
              <p className="text-gray-500 text-sm mt-1">
                {article.elements.author.value}
              </p>
              <p className="mt-5 text-ellipsis line-clamp-4">
                {article.description || temp_description}
              </p>
            </div>
          </li>
        ))}
      </List>
    </section>
  );
};

export default Articles;
