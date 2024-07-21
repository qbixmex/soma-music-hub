import { FC } from "react";

type Props = {
  params: {
    slug: string;
  };
};

const ArticleDetailsPage: FC<Props> = ({ params: { slug } }) => {
  return (
    <h1>Article Slug: { slug }</h1>
  );
};

export default ArticleDetailsPage;