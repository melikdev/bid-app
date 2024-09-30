import SingleBid from "@/components/single-bid"
import prisma from "@/libs/client"
import { auth } from "@clerk/nextjs/server"

const MyAuctions = async () => {
  const { userId } = auth()

  if (!userId) return null

  const res = await prisma.bid.findMany({
    where: {
      userId: userId,
    },
  })

  return (
    <div className="flex flex-wrap gap-10 mt-20 justify-center">
      {res.map((bid) => (
        <SingleBid bid={bid} key={bid.id} />
      ))}
    </div>
  )
}

export default MyAuctions
