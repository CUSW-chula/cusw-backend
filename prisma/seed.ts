import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seeding...')
  
  // Create a user with email bunyawatnaunnak@gmail.com
  const user = await prisma.user.upsert({
    where: { email: 'bunyawatnaunnak@gmail.com' },
    update: {},
    create: {
      email: 'bunyawatnaunnak@gmail.com',
      name: 'Bunyawat Naunnak',
      organization: 'Chulalongkorn University',
      position: 'Developer',
      isOutsource: false,
      admin: true,
      head: false,
      activated: true,
    },
  })

  console.log('✅ User created:', user)
  console.log('🎉 Seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
