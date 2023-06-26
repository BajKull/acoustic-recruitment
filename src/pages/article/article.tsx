import Heading from "@/components/heading/Heading";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import ArticleContent from "@/components/article-content/ArticleContent";
import LoadingView from "@/components/loading-view/LoadingView";
import ErrorView from "@/components/error-view/ErrorView";

const queryFn = async (id?: string) => {
  if (!id) throw new Error("Something went wrong.");
  const res = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/api/859f2008-a40a-4b92-afd0-24bb44d10124/delivery/v1/content/${id}`
  );
  const data = await res.json();
  if (res.ok) return data;
  throw new Error(
    data?.errors?.description ||
      "Article couldn't be retrieved. Try again later."
  );
};

const API_URL = `${import.meta.env.VITE_API_URL}`;

const Article = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery<Article, Error>(
    QUERY_KEYS.ARTICLE,
    () => queryFn(id),
    { refetchOnWindowFocus: false }
  );

  const heading = data?.elements.heading.value;
  const author = data?.elements.author.value || "Anonymous";
  const date = data?.elements.date.value
    ? format(new Date(data?.elements.date.value), "MMM dd, yyyy")
    : undefined;
  const mainImage = data?.elements.mainImage.value.leadImage.renditions;
  const srcSet = `
  ${API_URL}${mainImage?.default.url} ${mainImage?.default.width}w,
  ${API_URL}${mainImage?.lead.url} ${mainImage?.lead.width}w,
  ${API_URL}${mainImage?.card.url} ${mainImage?.card.width}w
  `;

  if (isLoading) return <LoadingView className="text-center lg:mt-20 mt-10" />;
  if (error)
    return <ErrorView error={error.message} className="lg:mt-20 mt-10" />;
  return (
    <article className="max-w-7xl px-5 mx-auto py-10">
      <Heading level="h1" className="text-center lg:mt-10">
        {heading}
      </Heading>
      <div className="flex mt-10 items-center">
        <div className="rounded-full h-10 w-10 flex justify-center items-center bg-gray-800 text-white">
          {author[0]}
        </div>
        <div className="ml-3">
          <p className="font-medium">{author}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <img
        className="w-full mt-10 object-cover min-h-[300px] max-h-[550px]"
        srcSet={srcSet}
        src={`${API_URL}${mainImage?.default.url} ${mainImage?.default.width}`}
        alt={data?.elements.mainImage.value.leadImageCaption.value}
      />
      <ArticleContent data={data?.elements.body.values.join(" ") || ""} />
    </article>
  );
};

export default Article;
