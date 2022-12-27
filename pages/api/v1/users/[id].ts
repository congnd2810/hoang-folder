import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import NextCors from "nextjs-cors";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  const {
    id,
    password,
    username,
    name,
    email,
    phone,
    addressStreet,
    city,
    zipCode,
    county,
    country,
  } = req.query;
  switch (req.method) {
    case "GET":
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          phone: true,
          addressStreet: true,
          city: true,
          zipCode: true,
          county: true,
          country: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "Not Found" });
      }
      break;
    case "POST":
      try {
        let item = {
          name: String(name),
          password: String(password),
          username: String(username),
          email: String(email),
          phone: String(phone),
          addressStreet: addressStreet ? String(addressStreet) : "undefined",
          city: city ? String(city) : "undefined",
          zipCode: zipCode ? String(zipCode) : "undefined",
          county: county ? String(county) : "undefined",
          country: country ? String(country) : "undefined",
        };
        await prisma.user.create({
          data: item,
        });
        res.status(200).json({ status: "Post successful" });
      } catch (err) {
        console.log(err);
        res.status(404).json({ error: "Failed to post" });
      }
      break
    case "DELETE":
      try {
        await prisma.user.delete({
          where: { id: Number(id) },
        });
        res.status(200).json({ status: "Delete successful" });
      } catch (err) {
        console.log(err);
        res.status(404).json({ error: "Failed to delete" });
      }
      break
    case "PUT":
      try {
        let item: {[key: string]: string} = {} 
        if (name) item.name = String(name);
        if (password) item.password = String(password)
        if (email) item.email = String(email)
        if (phone) item.phone = String(phone)
        if (addressStreet) item.addressStreet = String(addressStreet)
        if (city) item.city = String(city)
        if (zipCode) item.zipCode = String(zipCode)
        if (county) item.county = String(county)
        if (country) item.country = String(country)
        await prisma.user.update({
          where: { id: Number(id) },
          data: item
        })
        res.status(200).json({ status: "Update successful" });
      }
      catch (err) {
        console.log(err)
        res.status(404).json({ error: "Failed to delete" });
      }
      break
  }
}
