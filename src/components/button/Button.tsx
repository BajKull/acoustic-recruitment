import classNames from "classnames";
import React from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  secondary?: boolean;
}

const Button = ({
  children,
  className,
  primary,
  secondary,
  ...props
}: IProps) => {
  const clsBtn = classNames(
    "border-0 rounded-md text-white font-semibold px-5 py-2",
    className,
    {
      "bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-700": secondary,
      "bg-gray-800 hover:bg-gray-700 focus:bg-gray-700": primary,
    }
  );
  return (
    <button className={clsBtn} {...props}>
      {children}
    </button>
  );
};

export default Button;
