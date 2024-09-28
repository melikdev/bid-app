import prisma from "@/libs/client"
import "./globals.css"
import SingleBid from "@/components/single-bid"
import Link from "next/link"

export default async function Home() {
  const bids = await prisma.bid.findMany()

  return (
    <>
      <h1 className="text-4xl font-bold text-white mt-20 text-center">
        Current Auctions
      </h1>
      <div className="flex flex-wrap gap-10 mt-20 justify-center">
        {bids.map((bid) => (
          <Link href={`/bid/${bid.id}`} key={bid.id}>
            <SingleBid key={bid.id} bid={bid} />
          </Link>
        ))}
      </div>
    </>
  )
}
