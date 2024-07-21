import { FC } from "react";

type Props = {
  params: {
    slug: string;
  };
};

const ArticleEditPage: FC<Props> = ({ params: { slug } }) => {
  return (
    <h1>Article Edit Slug: { slug }</h1>
  );
};

export default ArticleEditPage;
