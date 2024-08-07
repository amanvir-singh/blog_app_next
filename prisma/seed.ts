import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "John",
    email: "john@example.com",
    password: "password123",
    posts: {
      create: [
        {
          title: "Exploring Next.js",
          content: "Next.js is a React framework for production.",
          published: true,
        },
      ],
    },
  },
  {
    name: "Jane",
    email: "jane@example.com",
    password: "password123",
    posts: {
      create: [
        {
          title: "Understanding Prisma",
          content: "Prisma is an ORM for Node.js and TypeScript.",
          published: true,
        },
      ],
    },
  },
  {
    name: "Alex",
    email: "alex@example.com",
    password: "password123",
    posts: {
      create: [
        {
          title: "Getting Started with TypeScript",
          content: "TypeScript is a typed superset of JavaScript.",
          published: true,
        },
        {
          title: "GraphQL Basics",
          content: "GraphQL is a query language for your API.",
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });