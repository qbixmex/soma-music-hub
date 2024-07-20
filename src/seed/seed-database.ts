import { prisma } from "../lib";
import { initialData } from "./seeds";
import "dotenv/config";

const main = async () => {

  console.log('Clearing data 🧹');

  await prisma.article.deleteMany();
  console.log('Deleted all tables 👍');

  console.log('Seed started 🚀');

  const { articles } = initialData;

  await prisma.article.createMany({ data: articles });

  console.log('Articles Inserted 👍');

  console.log('Seed executed 🎉');
}

(() => {
  if ( process.env.NODE_ENV === 'production' ) return;
  main();
})();
