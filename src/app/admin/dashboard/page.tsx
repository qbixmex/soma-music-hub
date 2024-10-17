import { getPublishedDashboardArticles, getDraftDashboardArticles } from "@/actions";
import { DashboardArticles } from "./(components)";

const DashboardPage = async () => {
  const { articles: productionArticles } = await getPublishedDashboardArticles();
  const { articles: draftArticles } = await getDraftDashboardArticles();

  return (
    <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <DashboardArticles
        title="Published Articles"
        subTitle="articles on production"
        articles={productionArticles ?? []}
        emptyMessage="No articles on production"
      />
      <DashboardArticles
        title="Queue Articles"
        subTitle="articles on draft"
        articles={draftArticles ?? []}
        emptyMessage="No articles on draft"
      />
    </section>
  );
};

export default DashboardPage;