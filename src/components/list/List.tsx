import classNames from "classnames";
import React from "react";
import LoadingView from "../loading-view/LoadingView";

interface IProps extends React.HTMLAttributes<HTMLUListElement> {
  loading?: boolean;
  error?: string;
  emptyText: string;
}

const List = ({
  children,
  className,
  emptyText,
  loading,
  error,
  ...props
}: IProps) => {
  const clsUl = classNames("flex flex-col", className);
  if (loading) return <LoadingView className="mt-10 text-center" />;
  else if (error)
    return <p className="text-red-700 text-center mt-10">{error}</p>;
  return (
    <ul className={clsUl} {...props}>
      {!children || (Array.isArray(children) && children.length === 0) ? (
        <li className="text-center">{emptyText}</li>
      ) : (
        children
      )}
    </ul>
  );
};

export default List;
