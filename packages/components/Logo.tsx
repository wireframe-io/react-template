import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


type Props = {
  light?: boolean
  height?: number
  src?: string
}

const Logo: React.FunctionComponent<Props> = ({
  light = false,
  height = 32,
  src = '/logo.png',
}) => {
  if (light) {
    src = '/logo-white.png'
  }

  return (
    <Link href="/" aria-label="Home">
      <Image
        src={src}
        height={height}
        width={180}
        alt="logo"
        className="w-auto mx-auto"
        loading="eager"
        decoding="auto"
        priority
      />
    </Link>
  )
}

export default Logo
