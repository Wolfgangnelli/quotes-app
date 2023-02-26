import React from "react";

interface Props {
  children: React.ReactNode;
}

const Page = (props: Props) => {
  const { children } = props;

  return <div>{children}</div>;
};

export default Page;
