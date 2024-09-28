import prisma from "@/libs/client"
import "./globals.css"
import SingleBid from "@/components/single-bid"

export default async function Home() {
  const bids = await prisma.bid.findMany()

  return (
    <>
      <h1 className="text-4xl font-bold text-white mt-20 text-center">
        Current Auctions
      </h1>
      <div className="flex flex-wrap gap-10 mt-20 justify-center">
        {bids.map((bid) => (
          <SingleBid key={bid.id} bid={bid} />
        ))}
      </div>
    </>
  )
}
