import { prisma } from "../lib";
import { initialData } from "./seeds";
import "dotenv/config";

const main = async () => {

  console.log('Clearing data 🧹');

  await prisma.category.deleteMany();
  await prisma.article.deleteMany();

  console.log('Deleted all tables 👍');

  console.log('Seed started 🚀');

  const { categories, articles } = initialData;

  await prisma.category.createMany({ data: categories });

  const categoriesDB = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  },
    // <category_name, category_id>
    // example -> { id: '569202b7-...', name: 'Javascript' },
    {} as Record<string, string>
  );

  articles.forEach(async (article) => {
    const { category, ...attributesRest } = article;

    await prisma.article.create({
      data: {
        ...attributesRest,
        categoryId: categoriesMap[category.toLowerCase()],
      }
    });
  });

  console.log('Articles Inserted 👍');

  console.log('Seed executed 🎉');
}

(() => {
  if ( process.env.NODE_ENV === 'production' ) return;
  main();
})();
