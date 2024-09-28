import SingleBid from "@/components/single-bid"
import prisma from "@/libs/client"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"

const MyAuctions = async () => {
  const { userId } = auth()

  if (!userId) return null

  const res = await prisma.bid.findMany({
    where: {
      userId: userId,
    },
  })

  console.log(res)

  return (
    <div className="flex flex-wrap gap-10 mt-20 justify-center">
      {res.map((bid) => (
        <Link href={`/bid/${bid.id}`} key={bid.id}>
          <SingleBid bid={bid} key={bid.id} />
        </Link>
      ))}
    </div>
  )
}

export default MyAuctions
