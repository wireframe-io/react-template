import type { NextPage } from 'next';

const Page: NextPage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem('token');
    window.location.replace("/")
  }

  return (
    <></>
  )
}

export default Page
