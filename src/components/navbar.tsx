import Link from "next/link"
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"
import prisma from "@/libs/client"
import { auth } from "@clerk/nextjs/server"

const Navbar = () => {
  // const { userId: currentUserId } = auth()

  // if (!currentUserId) return null

  // const user = await prisma.user.findFirst({
  //   where: { id: currentUserId },
  // })

  return (
    <div className="flex bg-slate-700 text-white justify-evenly items-center h-16 bg-surface-0 ">
      <div className="logo">
        <Link href="/">Bid App</Link>
      </div>

      <div className="links flex gap-3 items-center">
        <ClerkLoading>
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            {/* <span>{user?.username}</span> */}
            <Link href="/sign-in">Login/Register</Link>
          </SignedOut>
          <SignedIn>
            <Link className="bg-black rounded-md p-2" href="/create-bid">
              Create a Bid
            </Link>
            <UserButton />
          </SignedIn>
        </ClerkLoaded>
      </div>
    </div>
  )
}

export default Navbar
