import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string
}

const Page = (props: Props) => {
  const { children, className = '' } = props;

  return <section className={className}>{children}</section>;
};

export default Page;
