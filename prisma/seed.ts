import { PrismaClient } from "@prisma/client";
import { randEmail, randFullName, randAddress, randPhoneNumber } from '@ngneat/falso';
const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  for (let i = 0; i < 1000; i++) {
    let address = randAddress()
    let item = {
      name: randFullName(),
      email: randEmail(),
      phone: randPhoneNumber(),
      addressStreet: String(address.street),
      city: String(address.city),
      zipCode: String(address.zipCode),
      county: String(address.county),
      country: String(address.country)
    }
    const group = await prisma.user.create({
      data: item,
    })
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })