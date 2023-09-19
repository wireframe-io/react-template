import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import HeadTag from '@wireframe/components/HeadTag'
import LoginForm from '@wireframe/components/LoginForm'
import { useRouter } from 'next/router'
import { API_URL } from '../settings'


type LoginProps = {
  email: string,
  password: string,
}

async function loginUser(credentials: LoginProps) {
  return axios.post(
    `${API_URL}/auth/login`,
    credentials,
  ).then((response) => {
    return response.data.token
  }).catch((error) => {
    if (error.response.status === 401) {
      throw "Email or Password is incorrect"
    }
    throw error
  })
}

const Home: NextPage = () => {
  const router = useRouter()

  const [verified, setVerified] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [app, setApp] = useState("auth");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const app = router.query.app
    if (typeof app !== "undefined") {
      if (typeof app !== "object") {
        setApp(app)
      } else {
        setApp(app[0])
      }
    }
  }, [router.query.app]);

  useEffect(() => {
    //setToken(localStorage.getItem('token'));
    if (token) {
      router.push("/")
    }
  }, [token, router]);

  const handleSubmit = async (email: string, password: string) => {
    const token = await loginUser({
      email,
      password
    }).catch((error) => {
      console.error(error);
      setError(error);
    });
    localStorage.setItem('token', token);
    setToken(token);
  }

  return (
    <>
      <HeadTag title="Login | Reader" description="Login to your Reader account" />

      <main>
        <LoginForm onSubmit={handleSubmit} error={error} />
      </main>

    </>
  )
}

export default Home
