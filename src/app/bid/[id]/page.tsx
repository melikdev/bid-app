import prisma from "@/libs/client"
import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import formatDate from "@/utils/format-date"

// Actions
import deleteBidAction from "@/actions/deleteBidAction"
import bidAuctionAction from "@/actions/bidAuctionAction"
import { clearScreenDown } from "readline"

const Bid = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth()

  if (!userId) return null
  const paramId = parseInt(params.id)

  const data = await prisma.bid.findFirst({
    where: { id: paramId },
  })

  const bidHistory = await prisma.bidHistory.findMany({
    where: { bidId: paramId },
    // find user of all bids
    include: {
      user: true,
    },
  })

  if (!data || !bidHistory) return null

  // find bidInterval of all bids
  const bidInterval = bidHistory.map((bid) => bid.bidInterval)

  // add every bidInterval to get sum
  const sum = bidInterval.reduce((acc, curr) => acc + curr, 0)

  // add sum to bid price
  const price = data?.price + sum

  const { diffInMinutes, diffInHours } = formatDate(new Date(data?.createdAt))

  return (
    <div className="flex flex-wrap gap-52 mt-20 justify-center relative">
      <div className="left flex flex-col gap-2 items-center">
        <h1 className="text-4xl font-bold text-white mt-20 text-center uppercase">
          {data?.title}
        </h1>
        <Image
          className="object-fill border-2 rounded-md max-h-52 max-w-52"
          src={data?.imgUrl}
          alt="image"
          width={300}
          height={300}
        />
        <div className="flex flex-col justify-between gap-2 items-center bg-blue-500 p-2 rounded-md text-white">
          <span>Starting price:</span>
          <span className="font-bold">${data?.price}</span>
          <div className="flex justify-between gap-2 animate-pulse">
            <span>Current auction price:</span>
            <span className="font-bold">${price}</span>
          </div>
        </div>
        <p className="text-center bg-yellow-200 text-yellow-600 font-bold py-2 px-4 rounded-md">
          {diffInMinutes === 0 && "Just now"}
          {diffInMinutes < 59
            ? `${diffInMinutes} minutes ago`
            : `${diffInHours} hours ago`}
        </p>
        <form action={deleteBidAction}>
          {userId === data?.userId && (
            <div>
              <button className="bg-red-700 p-2 rounded-md text-white">
                Delete this auction
              </button>
              <input
                className="hidden"
                type="text"
                name="id"
                value={paramId}
                readOnly
              />
            </div>
          )}
        </form>
      </div>
      <div className="right flex flex-col gap-10 items-center">
        <form action={bidAuctionAction}>
          <input
            className="hidden"
            type="text"
            name="id"
            value={paramId}
            readOnly
          />
          <input
            className="hidden"
            type="text"
            name="userId"
            value={userId}
            readOnly
          />
          <button className="absolute top-0 right-30 p-2 rounded-md bg-blue-700 text-white">
            Bid this auction
          </button>
        </form>
        <h1 className="text-4xl font-bold text-white mt-20 text-center">
          CURRENT BIDS
        </h1>
        <div className="bg-white flex flex-col items-center justify-center gap-3 max-w-52 rounded-md p-5 shadow-md">
          {bidHistory.length > 0 ? (
            <div>
              {bidHistory?.map((bid, index) => (
                <div className="flex justify-between gap-2" key={index}>
                  <span>{bid?.user?.username}</span>
                  <span>{bid?.bidInterval}$</span>
                </div>
              ))}
            </div>
          ) : (
            "No bids yet"
          )}
        </div>
      </div>
    </div>
  )
}

export default Bid
