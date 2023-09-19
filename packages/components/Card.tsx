import Link from 'next/link'
import React from 'react'


type Props = {
  id: string
  title: string
  description: string
  url?: string
}

const Card: React.FunctionComponent<Props> = ({
  id,
  title,
  description,
  url,
}) => {
  const CardComponent = (
    <div key={id} className="text-left border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900 pb-3">
            {title}
          </h3>
          <p className="text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
  if (url) {
    // TODO: Do I need to add a check for startsWith http:// or https:// so
    // I can use an <a> instead of <Link>?
    return (
      <Link key={id} href={url}>
        {CardComponent}
      </Link>
    )
  }
  return CardComponent
}