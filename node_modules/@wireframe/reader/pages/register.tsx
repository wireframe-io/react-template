import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import HeadTag from '@wireframe/components/HeadTag'
import Logo from '@wireframe/components/Logo'
import { API_URL } from '../settings'


type LoginProps = {
  email: string,
  password: string,
}

async function createUser(credentials: LoginProps) {
  return axios.post(
    `${API_URL}/auth/register`,
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

const Register: NextPage = () => {
  const router = useRouter()

  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (token) {
      router.push("/")
    }
  }, [token, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    await createUser({
      email,
      password,
    }).catch((error) => {
      console.error(error);
      setError(error);
    });

    const token = await loginUser({
      email,
      password,
    }).catch((error) => {
      console.error(error);
      setError(error);
    });

    localStorage.setItem('token', token);
    setToken(token);
  }

  return (
    <div>
      <HeadTag title="Register | Reader" description="Register for a Reader account" />

      <main>
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
            <div className="text-center mb-20">
              <Logo src="/logo.png" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create an account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {(error) && (
                  <div className="text-red-500 font-bold">{error}</div>
                )}

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}

export default Register
