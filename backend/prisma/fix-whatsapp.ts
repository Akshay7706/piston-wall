import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.order.updateMany({
    where: { whatsapp: null },
    data: { whatsapp: 'N/A' }
  });
  console.log('Updated existing null whatsapp values');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
