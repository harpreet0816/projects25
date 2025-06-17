import { cs } from '@repo/db/clients'

console.log(cs);

import { PrismaClient} from "@repo/db/client"
const prisma = new PrismaClient()

async function test() {
  const result = await prisma.$queryRaw`SELECT 1`
  console.log(result)
}
test()