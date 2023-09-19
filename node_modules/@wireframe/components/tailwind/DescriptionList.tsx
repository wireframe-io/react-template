import Link from "next/link"
import React from "react"


type Props = {
  title: string
  actions: [{ text: string, href: string, primary: boolean }]
}

const DescriptionList: React.FunctionComponent<Props> = ({ title, actions }) => {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4">
        {actions.map((action) => {
          if (action.primary) {
            return (
              <Link href={action.href} key={action.href}>
                <button
                  type="button"
                  className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {action.text}
                </button>
              </Link>
            )
          }
          return (
            <Link href={action.href} key={action.href}>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                key={action.href}
              >
                {action.text}
              </button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default DescriptionList