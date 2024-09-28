import prisma from "@/libs/client"
import { auth } from "@clerk/nextjs/server"

const Bid = async ({ params }: { params: { id: string } }) => {
  const paramId = parseInt(params.id)

  const { userId } = auth()

  if (!userId) return null

  const user = await prisma.user.findFirst({
    where: { id: userId },
  })

  const data = await prisma.bid.findFirst({
    where: { id: paramId },
  })

  return (
    <div className="flex flex-wrap gap-10 mt-20 justify-center">
      <div className="left">
        <h1 className="text-4xl font-bold text-white mt-20 text-center">
          {data?.title}
        </h1>
        <h2>Starting price: ${data?.price}</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
          place bid
        </button>
      </div>
      <div className="right">
        <h1 className="text-4xl font-bold text-white mt-20 text-center">
          CURRENT BIDS
          <div className="current-bids"></div>
        </h1>
      </div>
    </div>
  )
}

export default Bid
