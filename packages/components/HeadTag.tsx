
import Head from "next/head"
import React from "react"

type Props = {
  title: string
  description: any
}

const HeadTag: React.FunctionComponent<Props> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  )
}

export default HeadTag