const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

(async () => {
  const passwordHash = await bcrypt.hash('admin', 12);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: { 
      name: 'Admin', 
      username: 'admin',
      role: 'ADMIN',
      forcePasswordChange: true,
      passwordHash 
    },
    create: {
      name: 'Admin',
      username: 'admin',
      email: 'admin@example.com',
      role: 'ADMIN',
      forcePasswordChange: true,
      passwordHash,
    },
  });

  console.log('User created/updated: admin@example.com');
  await prisma.$disconnect();
})().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
