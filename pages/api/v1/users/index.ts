import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors"

interface IOrderQuery {
  [key: string]: String
}

const prisma = new PrismaClient()

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  // const {orderId, cursor: myCursor, orderBy: myOrderBy} = req.query;
  
  const {page: pageIndex, orderBy: thisOrderBy} = req.query
  // let orderBy: orderQuery = {}
  let orderBy: IOrderQuery  = {}

  if (thisOrderBy) {
    let key: string = String(thisOrderBy).split('_')[0]
    let value: string = String(thisOrderBy).split('_')[1]
    orderBy[key] = value 
  }

  const users = await prisma.user.findMany({
    take: pageIndex ? 10: undefined,
    // skip: pageIndex ? 1: undefined,
    cursor: pageIndex ? {id: (Number(pageIndex)-1)*10+1} : undefined,
    orderBy: thisOrderBy ? orderBy : undefined,
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

  if (users) {res.status(200).json(users)} else {res.status(404).json({ error: "Not Found" })}
}

// export default handler;