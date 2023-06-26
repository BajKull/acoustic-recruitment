import classNames from "classnames";
import cls from "./article-content.module.scss";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  data: string;
}

const ArticleContent = ({ data, className, ...props }: IProps) => {
  const clsDiv = classNames("mt-10", className, cls.dangerousHtml);
  return (
    <div
      className={clsDiv}
      dangerouslySetInnerHTML={{ __html: data }}
      {...props}
    />
  );
};

export default ArticleContent;
