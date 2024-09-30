import deleteBidAction from "@/actions/deleteBidAction"

const DeleteBid = () => {
  return (
    <div className="">
      <form action={deleteBidAction}>
        <input style={{ display: "none" }} type="text" name="id" />
        <button>Delete</button>
      </form>
    </div>
  )
}

export default DeleteBid
