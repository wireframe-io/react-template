import { PlusCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import React from "react"


type Props = {
  text: string
  url: string
  illustration?: any
}

const EmptyState: React.FunctionComponent<Props> = ({ text, url, illustration }) => (
  <div className="pt-10">
    <div className={`mx-auto p-4 max-w-2xl`}>
      <Link
        href={url}
        type="button"
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {illustration}
        <PlusCircleIcon className="text-gray-400 h-12 w-12 mx-auto" />
        <span className="mt-2 block text-sm font-medium text-gray-900">{text}</span>
      </Link>
    </div>
  </div >
)

export default EmptyState