"use server"
import prisma from "@/libs/client"
import { redirect } from "next/navigation"

const deleteBidAction = async (formData: FormData) => {
  const id = formData.get("id") as string

  await prisma.bid.delete({
    where: {
      id: parseInt(id),
    },
  })

  redirect("/")
}

export default deleteBidAction
