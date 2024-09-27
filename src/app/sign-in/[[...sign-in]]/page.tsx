import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-16rem)] w-full">
      <SignIn />
    </div>
  )
}
