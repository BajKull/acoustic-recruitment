import React from "react";

const LoadingView = ({
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return <p {...props}>Loading...</p>;
};

export default LoadingView;
