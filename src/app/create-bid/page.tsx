import prisma from "@/libs/client"
import { auth } from "@clerk/nextjs/server"

const CreateBid = async () => {
  const { userId } = auth()

  const bidSubmit = async (formData: FormData) => {
    "use server"

    if (!userId) return

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const price = formData.get("price") as string

    try {
      const res = await prisma.bid.create({
        data: {
          title,
          description,
          price: parseInt(price),
          userId: userId,
        },
      })
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="bg-slate-500 h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
      <form action={bidSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Bid Title
          </label>
          <input
            type="text"
            name="title"
            className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter bid title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Bid Description
          </label>
          <input
            name="description"
            className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter bid description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Bid Price
          </label>
          <input
            type="number"
            name="price"
            className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="bid price"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Bid
        </button>
      </form>
    </div>
  )
}

export default CreateBid
