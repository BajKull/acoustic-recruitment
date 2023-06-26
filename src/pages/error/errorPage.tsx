import ErrorView from "@/components/error-view/ErrorView";
import CustomLink from "@/components/link/CustomLink";
import ROUTES from "@/constants/routes";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  const getErrorMessage = () => {
    if (isRouteErrorResponse(error))
      return error.error?.message || error.statusText;
    else if (error instanceof Error) return error.message;
    else if (typeof error === "string") return error;
    return "Unknown error";
  };
  return (
    <div className="lg:mt-20 mt-10">
      <ErrorView error={getErrorMessage()} />
      <CustomLink to={ROUTES.INDEX.PATH} className="mx-auto block mt-10">
        Go home
      </CustomLink>
    </div>
  );
};

export default ErrorPage;
