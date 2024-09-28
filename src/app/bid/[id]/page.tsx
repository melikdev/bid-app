import prisma from "@/libs/client"

const Bid = async ({ params }: { params: { id: string } }) => {
  const a = parseInt(params.id)

  const data = await prisma.bid.findFirst({
    where: { id: a },
  })

  return <div className="">{data?.title}</div>
}

export default Bid
