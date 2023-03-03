import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string
}

const Page = (props: Props) => {
  const { children, className = '' } = props;

  return <div className={className}>{children}</div>;
};

export default Page;
