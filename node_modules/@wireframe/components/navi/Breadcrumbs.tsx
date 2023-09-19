import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import Link from "next/link"
import React from "react"


type Props = {
  home: string
  crumbs: any
}

const Breadcrumbs: React.FunctionComponent<Props> = ({ home, crumbs }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href={home} className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {crumbs.map((crumb: any) => (
          <li key={crumb.href}>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <Link
                href={crumb.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={true ? 'page' : undefined}
              >
                {crumb.name}
              </Link>
            </div>
          </li>

        ))}
      </ol>
    </nav>

  )
}

export default Breadcrumbs