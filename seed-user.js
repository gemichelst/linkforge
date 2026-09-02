const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

(async () => {
  const passwordHash = await bcrypt.hash('corenftpx1', 12);

  await prisma.user.upsert({
    where: { email: 'gemichelst@example.com' },
    update: { name: 'gemichelst', passwordHash },
    create: {
      name: 'gemichelst',
      email: 'gemichelst@example.com',
      passwordHash,
    },
  });

  console.log('User created/updated: gemichelst@example.com');
  await prisma.$disconnect();
})().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
