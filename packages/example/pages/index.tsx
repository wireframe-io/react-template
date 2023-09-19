import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Container from '@wireframe/components/Container'
import HeadTag from '@wireframe/components/HeadTag'
import Loader from '@wireframe/components/Loader'
import Logo from '@wireframe/components/Logo'
import { API_URL } from '../settings'


const Home: NextPage = () => {
  const router = useRouter()

  const [verified, setVerified] = useState<boolean | null>(null)

  useEffect(() => {
    let token = router.query.token
    if (typeof token !== "undefined") {
      if (typeof token === "string") {
        localStorage.setItem("token", token)
        window.location.replace("/")
      }
    }
  }, [router.query]);

  useEffect(() => {
    const fetchData = async () => {
      const verified = await axios.post(`${API_URL}/auth/verify_token`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        }).then((response) => {
          return response.data.success
        }).catch((error) => {
          console.error("token verification error", error)
          return false
        })

      setVerified(verified);
    }

    fetchData()
      .catch(console.error);
  }, []);

  if (verified === true) {
    router.push("/read")
  }

  if (verified !== false) return <Loader />

  return (
    <>
      <HeadTag title="Reader" description="Read a book" />

      <main>
        <Container className="pt-20 pb-16 text-center lg:pt-32">
          <div className="sm:mx-auto sm:w-full sm:max-w-3xl	 text-center">
            <div className="text-center mb-20">
              <Logo src="/logo.png" />
            </div>

            <h1 className="text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
              Read a <span className="text-blue-600">Book</span>
            </h1>

            <p className="mt-10 text-center text-sm">
              <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </a>
              &nbsp;or&nbsp;
              <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Register
              </a>
            </p>
          </div>
        </Container>
      </main>
    </ >
  )
}

export default Home
