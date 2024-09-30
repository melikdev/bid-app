import prisma from "@/libs/client"
import formatDate from "@/utils/format-date"
import { auth } from "@clerk/nextjs/server"
import { Bid } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

const SingleBid = async ({ bid }: { bid: Bid }) => {
  const user = await prisma.user.findFirst({
    where: { id: bid.userId },
  })

  const { diffInMinutes, diffInHours } = formatDate(new Date(bid?.createdAt))

  return (
    <div className="bg-white flex flex-col items-center gap-3 w-52  rounded-md p-5 shadow-md">
      <Image
        className="object-cover border-2 rounded-md h-32"
        src={bid?.imgUrl}
        alt="image"
        width={200}
        height={200}
      />
      <h1 className="text-2xl font-bold text-black">{bid?.title}</h1>
      <p className="font-bold">
        Starting price: <span className="text-blue-600">${bid?.price}</span>
      </p>
      <p>By: {user?.username}</p>
      <p className="text-gray-500">
        {diffInMinutes === 0 && "Just now"}
        {diffInMinutes < 59
          ? `${diffInMinutes} minute(s) ago`
          : `${diffInHours} hour(s) ago`}
      </p>
      <Link
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        href={`/bid/${bid.id}`}
        key={bid.id}
      >
        <button>View</button>
      </Link>
    </div>
  )
}

export default SingleBid
