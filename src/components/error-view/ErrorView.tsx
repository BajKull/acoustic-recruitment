import classNames from "classnames";

interface IProps extends React.HTMLAttributes<HTMLParagraphElement> {
  error: string;
}

const ErrorView = ({ error, className, ...props }: IProps) => {
  const clsP = classNames("flex flex-col items-center", className);
  return (
    <p className={clsP} {...props}>
      <span className="text-3xl">⚠️</span>
      <span className="text-4xl mt-2">Oops! Something went wrong.</span>
      <span className="text-red-700 text-lg mt-10">{error}</span>
    </p>
  );
};

export default ErrorView;
