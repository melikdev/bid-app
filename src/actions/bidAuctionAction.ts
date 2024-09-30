"use server"
import prisma from "@/libs/client"
import { revalidatePath } from "next/cache"

const bidAuctionAction = async (formData: FormData) => {
  const id = formData.get("id") as string
  const userId = formData.get("userId") as string

  await prisma.bidHistory.create({
    data: {
      bidId: parseInt(id),
      userId: userId,
    },
  })

  revalidatePath(`/bid/${id}`)
}

export default bidAuctionAction
