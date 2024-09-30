"use client"

import bidSubmit from "@/actions/createBidAction"
import { UploadButton } from "@/utils/uploadthing"
import { useState } from "react"

const CreateBid = () => {
  const [img, setImg] = useState("")

  return (
    <div className="bg-slate-500 h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const form = e.target as HTMLFormElement
          const formData = new FormData(form)
          await bidSubmit(formData)
        }}
        className="space-y-6"
      >
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
        <div className="">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const imgUrl = res[0].url
              setImg(imgUrl)
              alert("Upload Completed")
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`)
            }}
          />
          <input
            style={{ display: "none" }}
            type="text"
            name="img"
            value={img}
            onChange={() => {}}
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
