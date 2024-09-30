import prisma from "@/libs/client"
import Image from "next/image"

const Bid = async ({ params }: { params: { id: string } }) => {
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
      <div className="left flex flex-col gap-10">
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
        <form>
          <input type="hidden" name="id" value={paramId} />
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
