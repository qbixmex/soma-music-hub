import { prisma } from "../lib";
import { initialData } from "./seeds";
import "dotenv/config";
import bcrypt from 'bcryptjs';

const main = async () => {

  console.log('Clearing data 🧹');

  await prisma.article.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();

  console.log('Deleted all tables 👍');

  console.log('Seed started 🚀');

  const { categories, articles, users } = initialData;

  const usersData = users.map(user => {
    const encryptedPassword = bcrypt.hashSync(user.password, 10);  
    return {
      ...user,
      password: encryptedPassword
    };
  });

  await prisma.user.createMany({ data: usersData });

  console.log('Users Inserted 👍');

  await prisma.category.createMany({ data: categories });

  console.log('Categories Inserted 👍');

  const usersDB = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const categoriesDB = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const usersMap = usersDB.reduce((map, user) => {
    map[user.name.toLowerCase()] = user.id;
    return map;
  },
    // <user_name, user_id>
    // example -> { id: '38Yvd5B7-...', name: 'John Doe' },
    {} as Record<string, string>
  );

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  },
    // <category_name, category_id>
    // example -> { id: '569202b7-...', name: 'Javascript' },
    {} as Record<string, string>
  );

  articles.forEach(async (article) => {
    const { category, author, ...attributesRest } = article;

    await prisma.article.create({
      data: {
        ...attributesRest,
        categoryId: categoriesMap[category.toLowerCase()],
        authorId: usersMap[author.toLowerCase()],
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
