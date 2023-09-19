import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { API_URL } from '../settings'


const fetchProfile = async () => {
  const response: any = await axios.get(`${API_URL}/auth/profile`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).catch((error) => {
      if (error.response.status === 401) {
        window.location.href = "/login"
      }
    })

  return response.data.identity
}


export function useQueryProfile() {
  return useQuery(
    ["profile"],
    fetchProfile,
    {
      refetchOnWindowFocus: false,
    }
  )
}
