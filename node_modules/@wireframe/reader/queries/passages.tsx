import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { API_URL } from '../settings'


const fetchPassage = async ({ queryKey }: any) => {
  const book = queryKey[1]
  if (!book) return

  const chapter = queryKey[2]
  if (!chapter) return

  const response: any = await axios.get(`${API_URL}/passage`,
    {
      params: {
        book,
        chapter,
      },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).catch((error) => {
      if (error.response.status === 401) {
        window.location.href = "/login"
      }
    })

  return { "verses": response.data.verses, "footnotes": response.data.footnotes }
}

export function useQueryPassage(book: string, chapter: number) {
  return useQuery(
    ["passage", book, chapter],
    fetchPassage,
    {
      refetchOnWindowFocus: false,
    }
  )
}
