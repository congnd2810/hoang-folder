import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import NextCors from 'nextjs-cors'

const prisma = new PrismaClient()

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  const {id} = req.query
  const user = await prisma.user.findUnique({
    where: {id: Number(id)},
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      addressStreet: true,
      city: true,
      zipCode: true,
      county: true,
      country: true,
      createdAt: true,
      updatedAt: true
    }
  })
  console.log(user)
  if (user) {res.status(200).json(user)} else {res.status(404).json({ error: "Not Found" })}
}