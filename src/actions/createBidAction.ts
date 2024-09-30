"use server"
import prisma from "@/libs/client"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const bidSubmit = async (formData: FormData) => {
  const { userId } = auth()

  if (!userId) return

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const price = formData.get("price") as string
  const imgUrl = formData.get("img") as string

  await prisma.bid.create({
    data: {
      title,
      description,
      price: parseInt(price),
      userId: userId,
      imgUrl,
    },
  })

  redirect("/")
}

export default bidSubmit
