import Link from 'next/link'
import React, { useEffect, useState } from 'react'


type Props = {
  url: string
  title: string
  isActive: boolean
}

const HeaderItem: React.FunctionComponent<Props> = ({
  url,
  title,
  isActive,
}) => {
  const [classNames, setClassNames] = useState('inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700')
  useEffect(() => {
    if (isActive) {
      setClassNames('inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900')
    }
  }, [isActive])

  return (
    <Link
      href={url}
      key={title}
      className={classNames}
    >
      {title}
    </Link>
  )
}

export default HeaderItem