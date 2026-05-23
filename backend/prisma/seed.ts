import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.message.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.user.deleteMany({});

  // Create Admin User
  const adminPassword = 'adminpassword123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  await prisma.user.create({
    data: {
      username: 'admin',
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin user created: admin / adminpassword123');

  // Create Sample Products
  const products = [
    {
      name: 'V8 Piston Clock',
      description: 'A desk clock made from a real V8 engine piston. Polished finish with a high-quality quartz movement.',
      price: 89.99,
      imageUrl: '/assets/piston-clock.jpg',
      category: 'Decor',
      stock: 15,
    },
    {
      name: 'Turbocharger Lamp',
      description: 'Industrial style lamp featuring a genuine salvaged turbocharger housing. Perfect for any gearhead cave.',
      price: 149.50,
      imageUrl: '/assets/turbo-lamp.jpg',
      category: 'Lighting',
      stock: 5,
    },
    {
      name: 'Connecting Rod Bottle Opener',
      description: 'Heavy-duty bottle opener crafted from a forged connecting rod.',
      price: 24.99,
      imageUrl: '/assets/conrod-opener.jpg',
      category: 'Accessories',
      stock: 50,
    },
    {
      name: 'Brake Disc Wall Clock',
      description: 'Large wall clock made from a cross-drilled performance brake rotor.',
      price: 120.00,
      imageUrl: '/assets/brake-clock.jpg',
      category: 'Decor',
      stock: 8,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Sample products seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
