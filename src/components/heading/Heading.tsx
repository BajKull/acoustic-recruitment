import React from "react";
import classNames from "classnames";

type Headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface IProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: Headings;
  as?: Headings;
}
const textSize = {
  h1: "text-4xl",
  h2: "text-3xl",
  h3: "text-2x;",
  h4: "text-xl",
  h5: "text-lg",
  h6: "text-base",
};

const Heading = ({ level, as, className, children, ...props }: IProps) => {
  const CustomLevel = level;
  const clsHeading = classNames(
    "font-semibold",
    className,
    textSize[as || level]
  );
  return (
    <CustomLevel className={clsHeading} {...props}>
      {children}
    </CustomLevel>
  );
};

export default Heading;
