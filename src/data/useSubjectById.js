import { useQuery } from "@tanstack/react-query"

const { getSubjects, getSubjectById } = require("@/api/subjects/subjects")

const useSubjectById = (id) => {

  const { isError, isLoading, data } = useQuery({
    queryKey: ['subject-by-id', id],
    queryFn: () => getSubjectById(id),
    select: (data) => (data.data)
  })

  return {
    isError,
    isLoading,
    data
  }
}

export default useSubjectById