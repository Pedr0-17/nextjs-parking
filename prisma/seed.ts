import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with test users...');

  // Limpiar datos existentes
  await prisma.parkingHistory.deleteMany({});
  await prisma.user.deleteMany({});

  // Crear usuarios de prueba
  const users = await prisma.user.createMany({
    data: [
      {
        pin: '1234',
        name: 'Carlos López',
        email: 'carlos@parking.local',
        isAdmin: false,
      },
      {
        pin: '5678',
        name: 'Admin User',
        email: 'admin@parking.local',
        isAdmin: true,
      },
      {
        pin: '0000',
        name: 'Test User',
        email: 'test@parking.local',
        isAdmin: false,
      },
      {
        pin: '9999',
        name: 'Juan Pérez',
        email: 'juan@parking.local',
        isAdmin: false,
      },
      {
        pin: '2024',
        name: 'María García',
        email: 'maria@parking.local',
        isAdmin: false,
      },
    ],
  });

  console.log(`✅ Created ${users.count} users`);

  // Crear historial de prueba
  const history = await prisma.parkingHistory.createMany({
    data: [
      {
        userId: 1, // Asumiendo que el primer usuario creado es ID 1 (Carlos)
        spaceNumber: 1,
        checkIn: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
        checkOut: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hora atrás
        duration: 60,
      },
      {
        userId: 1,
        spaceNumber: 3,
        checkIn: new Date(Date.now() - 30 * 60 * 1000), // 30 minutos atrás
        checkOut: null,
        duration: null,
      },
      {
        userId: 2,
        spaceNumber: 5,
        checkIn: new Date(Date.now() - 45 * 60 * 1000), // 45 minutos atrás
        checkOut: null,
        duration: null,
      },
    ],
  });

  console.log(`✅ Created ${history.count} history records`);
  console.log('✨ Database seeded successfully!');
}

main()
  .catch((error) => {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
