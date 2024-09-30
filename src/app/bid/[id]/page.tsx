import deleteBidAction from "@/actions/deleteBidAction"
import prisma from "@/libs/client"
import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import formatDate from "@/utils/format-date"

const Bid = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth()

  if (!userId) return null
  const paramId = parseInt(params.id)

  const data = await prisma.bid.findFirst({
    where: { id: paramId },
  })

  if (!data) return null

  const { formattedDate, diffInMinutes } = formatDate(new Date(data?.createdAt))

  return (
    <div className="flex flex-wrap gap-52 mt-20 justify-center">
      <div className="left flex flex-col gap-10 items-center">
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
        <p className="text-center bg-yellow-200 text-yellow-600 font-bold py-2 px-4 rounded-md">
          {diffInMinutes === 0 && "Just now"}
          {diffInMinutes > 0 && `${diffInMinutes} minutes ago`}
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
        <h1 className="text-4xl font-bold text-white mt-20 text-center">
          CURRENT BIDS
        </h1>
        {/* <div className="max-h-96 overflow-y-scroll flex flex-col gap-2 p-20"> */}
        <div className="bg-white flex flex-col items-center justify-center gap-3 max-w-52 rounded-md p-5 shadow-md">
          <div>
            <span>John Doe</span> bidded <span>200$</span>
          </div>
          <div className="text-gray-400">just now</div>
        </div>
      </div>
    </div>
  )
}

export default Bid
