import classNames from "classnames";
import { Link, LinkProps } from "react-router-dom";

const CustomLink = ({ className, children, ...props }: LinkProps) => {
  const clsLink = classNames(
    "border-0 rounded-md text-white font-semibold bg-gray-800 hover:bg-gray-700 focus:bg-gray-700 w-fit px-5 py-2",
    className
  );
  return (
    <Link className={clsLink} {...props}>
      {children}
    </Link>
  );
};

export default CustomLink;
