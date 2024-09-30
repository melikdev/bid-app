import deleteBidAction from "@/actions/deleteBidAction"
import prisma from "@/libs/client"
import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import Link from "next/link"

const Bid = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth()

  if (!userId) return null
  const paramId = parseInt(params.id)

  const data = await prisma.bid.findFirst({
    where: { id: paramId },
  })

  if (!data) return null

  const createdAtDate = new Date(data?.createdAt)

  // Format the date in the desired format
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  })

  // Calculate the difference between the current time and the createdAtDate
  const diff = Date.now() - createdAtDate.getTime()
  const diffInMinutes = Math.floor(diff / (1000 * 60))

  return (
    <div className="flex flex-wrap gap-10 mt-20 justify-center">
      <div className="left flex flex-col gap-10 items-center">
        <h1 className="text-4xl font-bold text-white mt-20 text-center">
          {data?.title}
        </h1>
        <p className="text-center ">
          {diffInMinutes === 0 && "Just now"}
          {diffInMinutes > 0 && `${diffInMinutes} minutes ago`}
        </p>
        <Image
          className="object-fill border-2 rounded-md max-h-52 max-w-52"
          src={data?.imgUrl}
          alt="image"
          width={300}
          height={300}
        />
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
      <div className="right">
        <h1 className="text-4xl font-bold text-white mt-20 text-center">
          CURRENT BIDS
        </h1>
      </div>
    </div>
  )
}

export default Bid
