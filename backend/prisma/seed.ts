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

  // Create Sample Products matching the automotive niche
  const products = [
    {
      name: 'Porsche 911 GT3 RS 3D Frame',
      description: '1:24 scale diecast mounted on a carbon-fiber backboard with a sleek black wood shadow box frame.',
      price: 149.99,
      imageUrl: '/assets/porsche-frame.jpg',
      category: 'Diecast Frames',
      stock: 10,
    },
    {
      name: 'Nissan GT-R R35 JDM 3D Frame',
      description: '1:24 scale replica of the legendary Godzilla, featuring custom acrylic lighting effects inside.',
      price: 139.99,
      imageUrl: '/assets/gtr-frame.jpg',
      category: 'Diecast Frames',
      stock: 12,
    },
    {
      name: 'Custom Car Edit Frame',
      description: 'Your own car, immortalized. Provide a photo, and we craft a custom digital edit in a premium frame.',
      price: 89.99,
      imageUrl: '/assets/custom-frame.jpg',
      category: 'Custom Frames',
      stock: 100,
    },
    {
      name: 'JDM Legends Premium Poster',
      description: 'Museum-quality archival paper poster featuring hand-drawn retro illustrations of classic Japanese sport cars.',
      price: 29.99,
      imageUrl: '/assets/jdm-poster.jpg',
      category: 'Car Posters',
      stock: 50,
    },
    {
      name: 'Ferrari F40 Classic Blueprint',
      description: 'High-definition blueprint print of the iconic Ferrari F40 in a minimalist aluminum frame.',
      price: 59.99,
      imageUrl: '/assets/f40-blueprint.jpg',
      category: 'Other Frames',
      stock: 8,
    },
    {
      name: 'Turbocharger Housing Lamp',
      description: 'Genuine salvaged turbocharger housing converted into a high-end industrial desk lamp.',
      price: 199.00,
      imageUrl: '/assets/turbo-lamp.jpg',
      category: 'Lighting',
      stock: 3,
    },
    {
      name: 'V8 Piston Wall Clock',
      description: 'Real V8 engine piston converted into a heavy-duty wall clock. Polished finish.',
      price: 110.00,
      imageUrl: '/assets/piston-clock.jpg',
      category: 'Decor',
      stock: 5,
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Automotive sample products seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
