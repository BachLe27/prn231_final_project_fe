import { redirect } from "next/navigation"

const page = () => {
  return (
    redirect('/manage/classes')
  )
}

export default page
